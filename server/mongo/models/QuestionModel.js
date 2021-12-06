const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      answer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

module.exports = model("Question", questionSchema);
