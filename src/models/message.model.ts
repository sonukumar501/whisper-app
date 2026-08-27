import mongoose, { Schema } from "mongoose";
import type { message } from "@/models.types/message.type";

export const MessageSchema: Schema<message> = new Schema({
  content: {
    type: String,
    required: [true, "message is required"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const MessageModels =
  (mongoose.models.Message as mongoose.Model<message>) ||
  mongoose.model<message>("Message", MessageSchema);
