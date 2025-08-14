const express = require("express");
const routerfeedback = express.Router();
const feedbackController = require("../Controllers/feedbackController");
const feedback =require("../Model/feedbackModel");
// Routes
routerfeedback.get("/", feedbackController.getAllFeedbackUsers);
routerfeedback.post("/", feedbackController.addfeedbacktUsers);
routerfeedback.get("/:id", feedbackController.getById);  // Fetch feedback by ID
routerfeedback.put("/:id", feedbackController.updatefeedbackUser); 
routerfeedback.delete("/:id", feedbackController.deleteFeedbackUser);

module.exports = routerfeedback;



