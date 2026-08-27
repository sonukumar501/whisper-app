import type { message } from "@/models.types/message.type";
export interface ApiResponse {
  success: boolean;
  statuscode?: number;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<message>;
}
