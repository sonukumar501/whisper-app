import dbConnection from "@/lib/dbConnection";
import { UserModel } from "@/models/user.model";
import { z } from "zod";
import { verificationSchema } from "@/schemas/verifySchema";

const verificationQuery = z.object({
  verificationCode: verificationSchema,
});

export async function POST(request: Request) {
  await dbConnection();
  try {
    const { email, verificationCode: code } = await request.json();

    const queryParams = {
      verificationCode: code,
    };

    const result = verificationQuery.safeParse(queryParams);
    if (!result.success) {
      console.log("result", result);
      return Response.json(
        {
          success: false,
          message: "409 Invalid verification code",
        },
        {
          status: 409,
        },
      );
    }
    const { verificationCode } = result.data;
    const user = await UserModel.findOne({
      email,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "404 User not found",
        },
        { status: 404 },
      );
    }
    if (!user?.isVerified) {
      return Response.json(
        {
          success: false,
          message: "403 all ready validated",
        },
        { status: 403 },
      );
    }
    console.log(user.verificationCode);
    if (!(user.verificationCode == verificationCode)) {
      return Response.json(
        {
          success: false,
          message: "400 Invalid verification code",
        },
        { status: 400 },
      );
    }
    user.isVerified = true;
    await user.save();
    return Response.json(
      {
        success: true,
        message: "200 User verification successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error", error);
    return Response.json(
      {
        success: false,
        message: "500 Something went wrong",
      },
      { status: 500 },
    );
  }
}
