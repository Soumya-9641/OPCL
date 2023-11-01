const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateResponseSchema = new Schema({
  candidate: { type: String,required:true },
  test: { type: String, required:true},
  responses: [
    {
      question: { type: Schema.Types.ObjectId, ref: 'Test' },
      answer: String,
    },
  ],
  score: Number,
});

module.exports = mongoose.model('CandidateResponse', CandidateResponseSchema);