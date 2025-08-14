const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  P_ID: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate P_IDs
    trim: true,
  },
  P_Name: {
    type: String,
    required: true,
    trim: true,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now, // Auto-set to current date if not provided
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Inventory', inventorySchema);