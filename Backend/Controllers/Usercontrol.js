const User = require("../Model/UserModel");
const bcrypt = require("bcrypt"); // For password hashing

// Data display
const getAllUsers = async (req, res, next) => {
  let users;
  // Get all Users
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  // Not found
  if (!users) {
    return res.status(404).json({ message: "user not found" });
  }
  // Display all users
  return res.status(200).json({ users });
};

// Data insert
const addusers = async (req, res, next) => {
  const { userid, name, email, age, address, userrole, password } = req.body;
  let users;
  try {
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users = new User({
      userid,
      name,
      email,
      age,
      address,
      userrole,
      password: hashedPassword, // Store hashed password
    });
    await users.save();
  } catch (err) {
    console.log(err);
  }
  // Not insert users
  if (!users) {
    return res.status(404).json({ message: "unable to add users" });
  }
  return res.status(200).json({ users });
};

// Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let users;
  try {
    users = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  // Not available users
  if (!users) {
    return res.status(404).json({ message: "unable to find users" });
  }
  return res.status(200).json({ users });
};

// Update user details
const Updateuser = async (req, res, next) => {
  const id = req.params.id;
  const { userid, name, email, age, address, userrole, password } = req.body;
  let users;
  try {
    const updateData = { userid, name, email, age, address, userrole };
    // Hash the password if provided
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }
    users = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!users) {
      return res.status(404).json({ message: "unable to update users" });
    }
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "unable to update users" });
  }
  return res.status(200).json({ users });
};

// Delete User details
const DeleteUser = async (req, res, next) => {
  const id = req.params.id;
  let users;
  try {
    users = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error while deleting user" });
  }
  if (!users) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  return res.status(200).json({ success: true, message: "User deleted successfully", users });
};

exports.getAllUsers = getAllUsers;
exports.addusers = addusers;
exports.getById = getById;
exports.Updateuser = Updateuser;
exports.DeleteUser = DeleteUser;