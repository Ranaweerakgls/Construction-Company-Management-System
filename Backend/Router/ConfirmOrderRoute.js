const express = require("express");
const confirmrouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Middleware for JSON parsing
confirmrouter.use(express.json());

//Import model
const ConfirmOrder=require("../Model/ConfirmOrderModel");

// Import ConfirmOrderController
const ConfirmOrderController = require("../Controllers/ConfirmOrderController");

const billUploadsPath = path.join(__dirname, "billuploads");
if (!fs.existsSync(billUploadsPath)) {
    fs.mkdirSync(billUploadsPath, { recursive: true });
}

const billStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'billUploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadBill = multer({ storage: billStorage });


// Create route paths
confirmrouter.get("/", ConfirmOrderController.getAllRecords);
// confirmrouter.post("/", ConfirmOrderController.addNewRecord);

confirmrouter.post("/", uploadBill.array("images"), async (req, res) => {
    try {
        const { OrderID, ODetails, Date, OStatus } = req.body;

        const imagePaths = req.files.map(file => `/billuploads/${file.filename}`);


        const newOrder = new ConfirmOrder({
            OrderID,
            ODetails,
            Date,
            imagePaths: imagePaths,
            OStatus,
            
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order added successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});
confirmrouter.get("/:id", ConfirmOrderController.getById);
confirmrouter.put("/:id", ConfirmOrderController.updateRecord);
confirmrouter.delete("/:id", ConfirmOrderController.deleteRecord);

// Export
module.exports = confirmrouter;
