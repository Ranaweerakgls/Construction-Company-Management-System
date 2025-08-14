const Passwords = require("../Model/PasswordModel");
const User = require("../Model/UserModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For secure token generation
const bcrypt = require("bcrypt"); // For password hashing
const dotenv = require("dotenv");

dotenv.config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a random 6-digit verification code for email verification
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
};

// Generate a secure reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex"); // 64-character hex string
};

// Send verification email
const sendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const verificationCode = generateVerificationCode();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      text: `Dear User,\n\nPlease use the following code to verify your email:\n\nVerification Code: ${verificationCode}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    // Store the verification code securely (e.g., hashed) in production
    return res.status(200).json({ message: "Verification email sent successfully", code: verificationCode });
  } catch (err) {
    console.error("Error sending verification email:", err);
    return res.status(500).json({ message: "Failed to send verification email. Please try again." });
  }
};

// Data display
const getAllDetails = async (req, res, next) => {
  let passwords;
  try {
    passwords = await Passwords.find();
    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ message: "No password reset details found" });
    }
    return res.status(200).json({ passwords });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching password reset details" });
  }
};

// Data insert
const adddetails = async (req, res, next) => {
  const { passwordid, email, userid, phoneNumber, question1, question2, reason } = req.body;
  let password;
  try {
    password = new Passwords({ passwordid, email, userid, phoneNumber, question1, question2, reason });
    await password.save();
    return res.status(201).json({ password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add password reset details" });
  }
};

// Get by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let password;
  try {
    password = await Passwords.findById(id);
    if (!password) {
      return res.status(404).json({ message: "Password reset request not found" });
    }
    return res.status(200).json({ password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching password reset request" });
  }
};

// Update details
const Updatepassword = async (req, res, next) => {
  const id = req.params.id;
  const { passwordid, email, userid, phoneNumber, question1, question2, reason } = req.body;
  let password;
  try {
    password = await Passwords.findByIdAndUpdate(
      id,
      { passwordid, email, userid, phoneNumber, question1, question2, reason },
      { new: true, runValidators: true }
    );
    if (!password) {
      return res.status(404).json({ message: "Unable to update password reset details" });
    }
    return res.status(200).json({ password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while updating password reset details" });
  }
};

// Delete details
const Deletepassword = async (req, res, next) => {
  const id = req.params.id;
  try {
    const password = await Passwords.findByIdAndDelete(id);
    if (!password) {
      return res.status(404).json({ success: false, message: "Password reset request not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Password reset request deleted successfully",
      deletedPassword: password,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting password reset request",
    });
  }
};

// Send email with password reset link
const sendEmail = async (req, res, next) => {
  const id = req.params.id;
  try {
    const password = await Passwords.findById(id);
    if (!password) {
      return res.status(404).json({ message: "Password reset request not found" });
    }

    // Find the user by userid to ensure they exist
    const user = await User.findOne({ userid: password.userid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and store reset token
    const resetToken = generateResetToken();
    const tokenExpires = Date.now() + 3600000; // 1 hour expiration
    await Passwords.findByIdAndUpdate(id, {
      resetToken,
      resetTokenExpires: tokenExpires,
    });

    const userEmail = password.email;
    const resetLink = `http://localhost:3000/reset-password/${password.userid}/${resetToken}`; // Adjust for production
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Password Reset Request",
      text: `Dear User,\n\nYou have requested to reset your password.\n\nPlease click the following link to reset your password:\n${resetLink}\n\nThis link will expire in 1 hour. If you did not request this, please contact support.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ message: "Failed to send email. Please try again." });
  }
};

// Reset password endpoint
const resetPassword = async (req, res, next) => {
  const { userId, token, password } = req.body;
  const saltRounds = 10;

  try {
    // Find the password reset request with matching token and user ID
    const passwordRequest = await Passwords.findOne({
      userid: userId,
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Ensure token hasn't expired
    });

    if (!passwordRequest) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Find and update the user's password
    const user = await User.findOne({ userid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    await user.save();

    // Invalidate the reset token
    await Passwords.findByIdAndUpdate(passwordRequest._id, {
      resetToken: null,
      resetTokenExpires: null,
    });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};

exports.getAllDetails = getAllDetails;
exports.adddetails = adddetails;
exports.getById = getById;
exports.Updatepassword = Updatepassword;
exports.Deletepassword = Deletepassword;
exports.sendEmail = sendEmail;
exports.sendVerificationEmail = sendVerificationEmail;
exports.resetPassword = resetPassword;