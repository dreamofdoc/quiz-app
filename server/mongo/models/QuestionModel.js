const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      answer: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
      },
    },
  ],
});

mongoose.set('runValidators', true)

questionSchema.path('options').validate(function (options) {
  return options.some(option => {
    return option.isCorrect === true
  })
}, 'Fill in all the answers and at least one right option');

module.exports = model("Question", questionSchema);
