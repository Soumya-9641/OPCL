const express= require('express');
const router= express.Router();
const Test= require("../models/Test")
const User= require("../models/Admin")
const isAdmin= require("../middlewares/adminAuthorization")
const isuser= require("../middlewares/userAuthorization")
router.post('/create',isAdmin, async (req, res) => {
    try {
      const { title, timeLimit, questions, organizer } = req.body;
  
      // Check if the organizer exists
      const organizerExists = await User.findOne({email:organizer});
      if (!organizerExists) {
        return res.status(404).json({ message: "Organizer not found." });
      }
  
      // Create a new test
      const newTest = new Test({
        title,
        timeLimit,
        questions,
        organizer,
      });
  
      await newTest.save();
      return res.status(201).json(newTest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Test creation failed." });
    }
  });

  router.get('/getOne/:testId', isuser, async (req, res) => {
    try {
      const { testId } = req.params;
      // Verify the testId is valid, and it exists in your database
      const test = await Test.findById(testId);
  
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
  
      // If the test exists, return its details
      res.status(200).json(test);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting test details' });
    }
  });

  router.get("/alltest",async(req,res)=>{
    try{

      const tests= await Test.find();
      res.status(201).send({status:1,data:tests})
    }catch(err){
      console.error(err);
      return res.status(500).json({ message: "Test creation failed." });
    }
  })


  router.put('/edit/:testId',isAdmin, async (req, res) => {
    try {
      const { title, timeLimit, questions } = req.body;
      const testId = req.params.testId;
  
      const updatedTest = await Test.findByIdAndUpdate(
        testId,
        { title, timeLimit, questions },
        { new: true }
      );
  
      if (!updatedTest) {
        return res.status(404).json({ message: "Test not found." });
      }
  
      return res.json(updatedTest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Test update failed." });
    }
  });

  router.delete('/delete/:testId',isAdmin, async (req, res) => {
    try {
      const testId = req.params.testId;
  
      const deletedTest = await Test.findByIdAndDelete(testId);
  
      if (!deletedTest) {
        return res.status(404).json({ message: "Test not found." });
      }
  
      // Optionally, you can also delete the test from the organizer's list of tests
  
      return res.json({ message: "Test deleted successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Test deletion failed." });
    }
  });

module.exports=router;