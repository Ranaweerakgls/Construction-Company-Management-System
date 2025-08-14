const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    Ename: {
        type: String,
        required: true,
    },
    EType: {
        type: String,
        required: true,
        enum: ["vehicle", "machine", "other"],
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
        required: true,//validation
        enum: ["Supplier A", "Supplier B", "Supplier C"], // Replace with actual supplier names
    },
});

module.exports = mongoose.model("Equipment", EquipmentSchema);