// PasswordModel.js
const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema({
  passwordid: { type: String, required: true },
  email: { type: String, required: true },
  userid: { type: String, required: true },
  phoneNumber: { type: Number },
  question1: { type: String },
  question2: { type: String },
  reason: { type: String, required: true },
  resetToken: { type: String }, // Store reset token
  resetTokenExpires: { type: Date }, // Token expiration
});

module.exports = mongoose.model("Passwords", PasswordSchema);