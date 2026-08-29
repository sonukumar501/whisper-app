import dbConnection from "@/lib/dbConnection";
import { UserModel } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";


export async function GET(reqeust: Request) {
  await dbConnection();

  try {
    const session = await getServerSession(authOption);
    const user = session?.user;
    if (!user) {
      return Response.json(
        {
          success:false,
          message: "Unauthorized user",
        },
        { status: 401 },
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    // const userMessages = await UserModel.aggregate([
    //   { $match: { _id: userId } },
    //   { $unwind: "$messages" },
    //   { $sort: { "messages.createdAt": -1 } },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       messages: { $push: "$messages" },
    //     },
    //   },
    // ]);

    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          messages: {
            $sortArray: {
              input: "$messages",
              sortBy: {
                createdAt: -1,
              },
            },
          },
        },
      },
    ]);

    if (!userMessages || userMessages.length == 0) {
      return Response.json(
        {
          success:false,
          message: "Messages not found",
        },
        { status: 404 },
      );
    }
    return Response.json(
      {
        success:true,
        userMessages: userMessages[0].messages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json(
      { success:false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
