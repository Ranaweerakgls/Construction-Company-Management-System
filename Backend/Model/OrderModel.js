const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    Itemname: {
        type: String,
        required: true,
        enum: [
            "Cement",
            "Bricks",
            "Steel Rods",
            "Sand",
            "Gravel",
            "Wood Planks",
            "Glass Sheets",
            "Electrical Wiring",
            "Pipes",
            "Paint",
            "Tiles",
            "Concrete Blocks",
            "PVC Pipes",
            "Nails",
            "Screws",
            "Hinges",
            "Door Locks",
            "Windows",
            "Roof Sheets",
            "Adhesives",
            "Sealants",
            "Insulation Foam",
            "Reinforcement Bars",
            "Marble Slabs",
            "Granite Slabs",
            "PVC Panels",
            "Aluminum Sheets",
            "Bolts",
            "Washers",
            "Drills",
            "Plasterboard",
            "Wooden Beams",
            "Flooring",
            "Cables",
            "Lamps",
            "Bulbs",
            "Bathroom Fixtures",
            "Kitchen Fixtures",
            "Guttering",
            "Scaffolding",
            "Hand Tools",
            "Power Tools",
            "Sandpaper",
            "Safety Gear",
            "Ladders",
            "Masonry Tools",
            "Measuring Tape",
            "Brushes",
            "Rollers",
            "Construction Glue",
            "Epoxy Resin",
          ],
    },
    Quantity: {
        type: String,
        required: true,
    },
    Otype: {
        type: String,
        required: true,
        enum: ["Emergency", "Non-emergency"],
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
});

module.exports = mongoose.model("Order", OrderSchema);