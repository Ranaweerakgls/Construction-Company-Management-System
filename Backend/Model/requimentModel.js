const mongoose = require("mongoose");

const requimentSchema = new mongoose.Schema({
    Client_Name: {
        type: String,
        required: true // ✅ Added required
    },
    Project_Name: {
        type: String,
        required: true
    },
    Contact_Number: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Requirements_Type: {
        type: String,
        required: true,
    },
    Date: {
        type: Date, // ✅ Corrected type
        required: true,
    }
});

// Export model
module.exports = mongoose.model("RequirementUser", requimentSchema);
