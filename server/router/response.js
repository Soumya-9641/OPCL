const express = require('express');
const router = express.Router();
const CandidateResponse = require('../models/Response');
const Test = require('../models/Test');
const User = require('../models/User');
const isUser= require("../middlewares/userAuthorization")


router.get("/userdashboard",async (req,res)=>{
  try{

      const result= await CandidateResponse.find();
      res.status(201).json(result);

  }catch(err){
    console.error(err);
    return res.status(500).json({ message: "Test-taking failed." });
  }
})

router.post('/taketest', isUser,async (req, res) => {
  try {
    
    const { testId,candidateId, responses } = req.body;
    console.log( testId)
    // Check if the candidate exists
    const candidate = await User.findOne({email:candidateId}); 
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found." });
    }

    // Check if the test exists
    const test = await Test.findOne({title:testId});
    console.log(test)
    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    // Check if the test is still active (consider time limits)

    // Create a new CandidateResponse
    const candidateResponse = new CandidateResponse({
      candidate: candidateId,
      test: test.title,
      responses,
      // Calculate the score based on responses and the correct answers
      score: calculateScore(responses, test.questions),
    });

    await candidateResponse.save();
    console.log(candidateResponse)
    return res.status(201).json(candidateResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Test-taking failed." });
  }
});

// Helper function to calculate the score based on responses
function calculateScore(candidateResponses, correctAnswers) {
    console.log(candidateResponses);
    console.log(correctAnswers)
    if (candidateResponses.length !== correctAnswers.length) {
        // If the number of responses doesn't match the number of correct answers, return 0.
        return 0;
      }
    
      // Initialize a variable to keep track of the number of correct responses.
      let correctCount = 0;
    
      // Loop through the candidate's responses and correct answers and compare them.
      for (let i = 0; i < candidateResponses.length; i++) {
        // Check if the candidate's response matches the correct answer for this question.
        if (candidateResponses[i].answerIndex === correctAnswers[i].correctAnswerIndex) {
          correctCount++;
        }
      }
    
      // Calculate the score based on the number of correct responses.
      const totalQuestions = correctAnswers.length;
      const score = (correctCount / totalQuestions) * 100; // Assuming a percentage-based score.
    
      return score;
}

module.exports = router;