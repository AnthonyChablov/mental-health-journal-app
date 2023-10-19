import mongoose from "mongoose";
// Define the schema
const journalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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
    type: [String],
  },
});

// Create a model based on the schema
export const JournalModel = mongoose.model("Journal", journalSchema);
