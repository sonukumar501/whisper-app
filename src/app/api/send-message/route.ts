import { UserModel } from "@/models/user.model";
import { messageModels } from "@/models/message.model";
import type { message } from "@/models.types/message.type";
import dbConnection from "@/lib/dbConnection";

export async function POST(request: Request) {
  await dbConnection();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (!user) {
      if (!user) {
        return Response.json(
          {
            message: "Unauthorized user",
          },
          { status: 401 },
        );
      }
    }
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          message: `${username} is not accepting messages`,
        },
        { status: 401 },
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as message);
    await user.save();
    return Response.json(
      {
        success: true,
        userMessages: "Message send successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/send-message:", error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
