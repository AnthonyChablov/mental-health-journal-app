import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  hash: string;
  salt: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: String,
  hash: String,
  salt: String,
});

export const UserModel = model<IUser>("User", userSchema);
