import mongoose, { Schema } from "mongoose";
import { user } from "@/models.types/user.type";
import { MessageSchema } from "@/models/message.model";
import bcrypt from "bcryptjs";

const UserSchema: Schema<user> = new Schema(
  {
    username: {
      type: String,
      required: [true, "User Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "valid email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verificationCode: {
      type: String,
      required: [true, "Verification code is required"],
    },
    verificationCodeExpiry: {
      type: Date,
      required: [true, "Verification code expiry date is required"],
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },
    messages: [MessageSchema],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.pre("validate", function () {
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);
  this.verificationCodeExpiry = expiryDate;
  return;
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<user>) ||
  mongoose.model<user>("User", UserSchema);
