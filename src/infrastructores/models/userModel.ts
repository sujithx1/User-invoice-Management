import mongoose, { Document, ObjectId } from "mongoose";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "UNIT_MANAGER" | "USER";

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdBy: string;
  groupId?: string;
  userId: string;
  isActive: boolean;
  TimeZone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "UNIT_MANAGER", "USER"],
      required: true,
    },
    createdBy: { type: String, required: true },
    groupId: { type: String },
    isActive: { type: Boolean, default: true },
    TimeZone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
