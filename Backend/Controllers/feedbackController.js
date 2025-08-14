const Feedback = require("../Model/feedbackModel"); // Correct import

// Get all feedback users
const getAllFeedbackUsers = async (req, res) => {
  try {
    const feedbackusers = await Feedback.find();
    if (!feedbackusers.length) {
      return res.status(404).json({ message: "No feedbacks found" });
    }
    return res.status(200).json({ feedbackusers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add new feedback
const addfeedbacktUsers = async (req, res) => {
  try {
    const { feedback, Date } = req.body;

    if (!feedback || !Date) {
      return res.status(400).json({ message: "Feedback and Date are required" });
    }

    const newFeedback = new Feedback({ feedback, Date });
    await newFeedback.save();
    return res.status(201).json({ message: "Feedback added", user: newFeedback });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to add feedback", error: err.message });
  }
};

// Get feedback by ID
const getById = async (req, res) => {
  try {
    const user = await Feedback.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Feedback not found" });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update feedback
const updatefeedbackUser = async (req, res) => {
  try {
    console.log("Update request received. ID:", req.params.id);
    console.log("Update data:", req.body);

    const { feedback, Date } = req.body;

    if (!feedback || !Date) {
      return res.status(400).json({ message: "Feedback and Date are required" });
    }

    const updatedUser = await Feedback.findByIdAndUpdate(
      req.params.id,
      { feedback, Date },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Delete feedback
const deleteFeedbackUser = async (req, res) => {
  try {
    const user = await Feedback.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Feedback not found" });

    return res.status(200).json({ message: "Feedback deleted", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllFeedbackUsers,
  addfeedbacktUsers,
  getById,
  updatefeedbackUser,
  deleteFeedbackUser
};
