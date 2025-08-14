// Model/MonitoringModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonitoringSchema = new Schema({
    Project_ID: {
        type: String,
        required: [true, "Project ID is required"],
        trim: true,
        unique: true
    },
    Project_Name: {
        type: String,
        required: [true, "Project Name is required"],
        trim: true
    },
    Location: {
        type: String,
        required: [true, "Location is required"],
        trim: true
    },
    Monitoring_Date: {
        type: Date,
        required: [true, "Monitoring Date is required"],
        default: Date.now
    },
    
    Issues_Found: {
        type: String,
        required: false,
        trim: true
    },

    Weather_Conditions: {
        type: String,
        required: [true, "Weather Conditions are required"],
        enum: ["sunny", "cloudy", "rainy", "stormy", "windy"],
        trim: true
    },
    
    Workers_Present: {
        type: Number,
        required: [true, "Number of workers present is required"],
        min: [0, "Workers present cannot be negative"]
    },
    
    
}, { 
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            ret.Monitoring_ID = ret._id;
            delete ret.id;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// Index for better query performance
MonitoringSchema.index({ Project_ID: 1 });
MonitoringSchema.index({ Monitoring_Date: 1 });
MonitoringSchema.index({ Site_Supervisor_ID: 1 });

module.exports = mongoose.model("Monitoring", MonitoringSchema);