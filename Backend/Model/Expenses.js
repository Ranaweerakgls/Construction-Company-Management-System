const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    P_ID: {
        type: String,
        required: true,
        trim: true
    },
    expencedetails: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(
    "Expenses",
    ExpenseSchema
)