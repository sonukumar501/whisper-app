import dbConnection from "@/lib/dbConnection";
import { UserModel } from "@/models/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuery = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {

  await dbConnection();
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      username: searchParams.get("username"),
    };

    // validate with zod

    const result = usernameQuery.safeParse(queryParams);

    console.log(result); //remove it after log

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors;
      console.log({ usernameErrors });
      return Response.json(
        {
          success: false,
          message: "409 Invalid user name",
        },
        { status: 409 },
      );
    }
    const { username } = result.data;

    const isUserAllReadyExist = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (isUserAllReadyExist) {
      return Response.json(
        {
          success: false,
          message: "409 username dose not exist",
        },
        { status: 409 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "200 User name is unique",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("500 Something went wrong", error);
    return Response.json(
      {
        success: false,
        message: "500 Something went wrong",
      },
      { status: 500 },
    );
  }
}
