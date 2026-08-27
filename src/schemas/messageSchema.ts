import { z } from "zod";
export const messageSchema = z.object({
  content: z.string().max(100, "Message must not exceed 100 char"),
  createdAt: z.date(),
});
