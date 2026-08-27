import { Document } from "mongoose";
export interface message extends Document {
  content: string;
  createdAt: Date;
}
