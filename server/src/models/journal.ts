
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
const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
