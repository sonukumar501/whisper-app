import { z } from "zod";

export const username = z
  .string()
  .min(3, "User name must be at least contains 3 char")
  .max(20, "user name is invalid")
  .regex(/^[A-Za-z0-9]+$/, "User name must not contains special characters");

export const SignUpSchema = z.object({
  username: username,
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must contain at lest 8 characters"),
});
