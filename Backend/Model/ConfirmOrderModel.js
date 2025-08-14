const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const ConfirmSchema = new Schema({
    OrderID: {
        type: String,
        required: true,
    },
    
    ODetails: {
        type: String,
        required: true,
    },
    Date: {
        type: Date, // Changed from String to Date
        required: true,
        default: Date.now, // Default to the current date
    },
    imagePaths: [String],
    
    OStatus:{
        type: String,
        required: true,
        enum: ["confirmed", "processing", "shipped","delivered"], // Replace with actual supplier names
    },

    
});

module.exports = mongoose.model("ConfirmOrder", ConfirmSchema);