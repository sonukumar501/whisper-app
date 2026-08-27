import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.email("invalid email"),
  password: z.string().min(8, "invalid password"),
});
