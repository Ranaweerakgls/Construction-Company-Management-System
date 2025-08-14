const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("FeedbackUser", feedbackSchema);
