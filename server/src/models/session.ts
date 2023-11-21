import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  _id: string;
  sessionToken: string;
  userId: mongoose.Schema.Types.ObjectId;
  expires: Date;
}

const sessionSchema = new Schema<ISession>({
  sessionToken: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  expires: { type: Date, required: true },
});

const SessionModel = mongoose.model<ISession>("sessions", sessionSchema);

export default SessionModel;
