const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new mongoose.Schema({
    text: { type: String, required: true }, // The text of the question.
    options: [{ type: String, required: true }], // An array of answer options.
    correctAnswerIndex: { type: Number, required: true }, // The text of the question
  // Add more fields for options, validation, etc. depending on question type
});

const questionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  organizer: { type:String,required:true }, // Array of questions
  timeLimit: { type: Number, required: true },
});

const Questionnaire = mongoose.model('Test', questionnaireSchema);

module.exports = Questionnaire;