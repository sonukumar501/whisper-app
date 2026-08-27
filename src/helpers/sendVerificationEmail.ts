import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import type { ApiResponse } from "@/types/ApiResponse.type";

export async function sendVerificationEmail(
  username: string,
  email: string,
  validationCode: string,
): Promise<ApiResponse> {
  console.log({ email });
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `My NextJS Verification Email to ${username}`,
      react: VerificationEmail({ username, validationCode }),
    });
    return {
      success: true,
      statuscode: 200,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    console.log("Error 500 Sending verification email", emailError);
    return {
      success: false,
      statuscode: 500,
      message: "Something went wrong while sending verification email",
    };
  }
}
