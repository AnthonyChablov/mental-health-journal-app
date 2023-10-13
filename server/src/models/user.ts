import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
});
// Create a model based on the schema
export const UserModel = mongoose.model("User", UserSchema);
