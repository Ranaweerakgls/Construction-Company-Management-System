const RequirementUser = require("../Model/requimentModel"); // Importing model


// Get all users
const getAllRequimentUsers = async (req, res, next) => {

    let Requirementusers;

    try {
        const Requirementusers = await RequirementUser.find();
        if (!Requirementusers.length) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ Requirementusers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a new requirement user
const addRequimentUsers = async (req, res, next) => {
    console.log("Received Data:", req.body);  // ✅ Log incoming request
    try {
        const newUser = new RequirementUser(req.body);
        await newUser.save();
        return res.status(201).json({ message: "User added", newUser });
    } catch (err) {
        console.error("Error inserting user:", err);  // ✅ Log errors
        return res.status(500).json({ message: "Failed to add user", error: err.message });
    }
};


// Get user by ID
const getById = async (req, res, next) => {

    let user;

    try {
        const user = await RequirementUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update user details
const updateRequimentUser = async (req, res, next) => {

    let updatedUser;

    try {
        const updatedUser = await RequirementUser.findByIdAndUpdate(
            req.params.id,
            {
                Client_Name: req.body.Client_Name,
                Project_Name: req.body.Project_Name,
                Contact_Number: req.body.Contact_Number,
                Email: req.body.Email,
                Requirements_Type: req.body.Requirements_Type, // ✅ Corrected field name
                Date: req.body.Date
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Unable to update user details" });
        }
        return res.status(200).json({ updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete user details
const deleteRequimentUser = async (req, res, next) => {

    let user;

    try {
        const user = await RequirementUser.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Unable to delete user" });
        }
        return res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Export functions
exports.getAllRequimentUsers = getAllRequimentUsers;
exports.addRequimentUsers = addRequimentUsers;
exports.getById = getById;
exports.updateRequimentUser = updateRequimentUser;
exports.deleteRequimentUser = deleteRequimentUser;
