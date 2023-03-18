import { uuid } from "uuidv4";
import mongoose from "mongoose";
export interface UserBody {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends UserBody {
  uuid: string;
}
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  uuid: { type: String, required: true, default: uuid() },
});

userSchema.index({ uuid: 1, email: 1 }, { unique: true });
export const UserModel = mongoose.model("user", userSchema);
