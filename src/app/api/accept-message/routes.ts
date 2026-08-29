import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";

import { UserModel } from "@/models/user.model";
import dbConnection from "@/lib/dbConnection";

export async function POST(request: Request) {
  await dbConnection();
  const session = await getServerSession(authOption);

  const user = session?.user;

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 },
    );
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true },
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User accept messages status update successful",
        updatedUser,
      },
      { status: 200 },
    );

  } catch (error) {
    console.log("Failed to update user accept messages status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user accept messages status",
      },
      { status: 401 },
    );
  }
}

// GET method to send is user accepting messages

export async function GET(request: Request) {
  await dbConnection();
  const session = await getServerSession(authOption);
  const user = session?.user;
  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 },
    );
  }
  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    return Response.json(
      {
        success: true,
        isAccepting: foundUser.isAcceptingMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Failed to update user accept messages status", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user accept messages status",
      },
      { status: 401 },
    );
  }
}
