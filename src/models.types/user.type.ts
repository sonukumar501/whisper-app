import type { message } from "@/models.types/message.type";

export interface user extends Document {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
  verificationCodeExpiry: Date|null;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  messages: message[];
  authProvider:string
}
