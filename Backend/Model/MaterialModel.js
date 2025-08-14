const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    Mname: {
        type: String,
        required: true,
    },
    MID: {
        type: String,
        required: true,
    },
    Qty: {
        type: String,
        required: true,
    },
    Remarks: {
        type: String,
        required: true,
    },
    Date: {
        type: Date, // Changed from String to Date
        required: true,
        default: Date.now, // Default to the current date
    },
    Supplier: {
        type: String,
        required: true,
        enum: ["Supplier A", "Supplier B", "Supplier C"], // Replace with actual supplier names
    },
    pdfFile: {
        type:String,
        required:false,}
});

module.exports = mongoose.model("Material", MaterialSchema);