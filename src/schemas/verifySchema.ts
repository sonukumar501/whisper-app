import { z } from "zod";

export const verificationSchema = z
  .string()
  .length(6, "code length must be six");
