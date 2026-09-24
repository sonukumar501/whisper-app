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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid email is required"],
    },
    password: {
      type: String,
      required: false,
      default:null
    },
    verificationCode: {
      type: String,
      required: false,
      default:null
    },
    verificationCodeExpiry: {
      type: Date,
      required: false,
      default:null
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
    authProvider:{
      type:String,
      enum:["credentials", "google"],
      default:"credentials"
    }
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")||!this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.pre("validate", function () {
  if (!this.verificationCode) {
    this.verificationCodeExpiry = null;
    return;
  }

  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);

  this.verificationCodeExpiry = expiryDate;
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<user>) ||
  mongoose.model<user>("User", UserSchema);
