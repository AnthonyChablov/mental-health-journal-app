import mongoose from "mongoose";
// Define the schema
const journalSchema = new mongoose.Schema({
  user_id: {
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
  location: {
    type: String,
  },
  tags: {
    type: [String],
  },
  attachments: {
    type: [String],
  },
  privacy: {
    type: String,
    enum: ['Public', 'Private'], // Assuming two privacy options
    default: 'Private', // Default to Private if not specified
  },
});

// Create a model based on the schema
export const JournalModel = mongoose.model('Journal', journalSchema);

