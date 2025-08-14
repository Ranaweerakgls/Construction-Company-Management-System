const express = require("express");
const router=express.Router();
const userController=require("../Controllers/Progresscontrol");
const multer = require("multer");
const path = require("path");
const userModel = require("../Model/Progress");
const progressController = require("../Controllers/Progresscontrol");

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'progressuploads/');  // Directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1685054324234.png
  }
});

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Only PNG, JPG, JPEG files are allowed.'));
    }
    cb(null, true);
  }
});

// Define routes
router.get("/", progressController.getAllProgressUsers);
router.post("/", progressController.addProgressUsers);
router.get("/:id", progressController.getById);
/*router.put("/:id", userController.updateProgressUser);*/
router.delete("/:id", progressController.deleteProgressUser);


router.put("/:id", upload.single("Image"), async (req, res) => {
  const { id } = req.params;

  const { Project_ID, Project_Name, Description, Duration, Date, Status,Completion_Percentage } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    existingUser.Project_ID = Project_ID;
    existingUser.Project_Name = Project_Name;
    existingUser.Description = Description;
    existingUser.Duration = Duration;
    existingUser.Date = Date;
    existingUser.Status = Status;
    existingUser.Completion_Percentage=Completion_Percentage;

    // Only update image if a new one is uploaded
    if (image) {
      existingUser.Image = image;
    }

    await existingUser.save();

    res.status(200).json({ message: "User updated", user: existingUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// This is the correct POST route for handling the file upload
router.post("/users", upload.single("Image"), async (req, res) => {
  const { Project_ID, Project_Name, Description, Duration, Date, Status ,Completion_Percentage } = req.body;
  const image = req.file ? req.file.filename : null; // Extract the image filename

  const newUser = new userModel({
    Project_ID,
    Project_Name,
    Description,
    Duration,
    Date,
    Status,
    Completion_Percentage,
    Image: image,  // Save the image filename in the database
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router
module.exports = router;
