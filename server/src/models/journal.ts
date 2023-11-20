import mongoose from "mongoose";

export type Tag = {
  id: string;
  text: string;
};

// Define the schema
const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    required: true,
  },
  tags: {
    type: [{ id: String, text: String }],
  },
});

// Create a model based on the schema
export const JournalModel = mongoose.model("Journal", journalSchema);
