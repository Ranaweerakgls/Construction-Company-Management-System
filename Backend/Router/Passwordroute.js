const express = require("express");
const routerPassword = express.Router();

// Insert model
const Passwords = require("../Model/PasswordModel");

// Insert Password Controller
const Passwordcontroller = require("../Controllers/Passwordcontrol");

// Routes
routerPassword.get("/", Passwordcontroller.getAllDetails);
routerPassword.post("/", Passwordcontroller.adddetails);
routerPassword.get("/:id", Passwordcontroller.getById);
routerPassword.put("/:id", Passwordcontroller.Updatepassword);
routerPassword.delete("/:id", Passwordcontroller.Deletepassword);
routerPassword.post("/send-email/:id", Passwordcontroller.sendEmail); // New route for sending email
routerPassword.post("/verify-email", Passwordcontroller.sendVerificationEmail); // New route for email verification
routerPassword.post("/reset-password", Passwordcontroller.resetPassword); // New route for resetpassword

// Export
module.exports = routerPassword;
