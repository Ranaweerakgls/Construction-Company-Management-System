const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    P_ID: {
        type: String,
        required: true,
        trim: true,
        unique:true 
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
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
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})
module.exports = mongoose.model(
    "BudgetModel",
    BudgetSchema
)