
// Define the schema
const journalSchema = new mongoose.Schema({
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
});

// Create a model based on the schema
export const JournalModel = mongoose.model('Journal', journalSchema);

