import dbConnection from "@/lib/dbConnection";
import { UserModel } from "@/models/user.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnection();
  try {
    const { username, email, password } = await request.json();
    // username existence check
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Error username is already taken",
        },
        {
          status: 400,
        },
      );
    }

    const verificationCode = Math.floor(100000+(Math.random()*900000));
    // email existence and verification check

    const existedUserByEmail = await UserModel.findOne({
      email,
    });

    // checking email is already existed or not

    if (existedUserByEmail) {
      // if email is verified return the response that email is already verified

      if (existedUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Error email is already verified",
          },
          {
            status: 400,
          },
        );
      } else {
        await existedUserByEmail.save();
      }
    } else {
      const newUser = new UserModel({
        username,
        email,
        password,
        verificationCode,
        isAcceptingMessage: true,
      });
      await newUser.save();
    }
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User creation failed",
        },
        {
          status: 500,
        },
      );
    }
    // sending verification mail

    const emailResponse = await sendVerificationEmail(
      user.username,
      user.email,
      user.verificationCode,
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: "User register successful please verify your email",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Error registering user ", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user ",
      },
      {
        status: 500,
      },
    );
  }
}
