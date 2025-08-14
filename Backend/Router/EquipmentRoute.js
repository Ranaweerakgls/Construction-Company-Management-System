const express = require("express");
const equipmentrouter = express.Router();

// Middleware for JSON parsing
equipmentrouter.use(express.json());

// Insert  model
const Equipment = require("../Model/EquipmentModel");
// Insert controller
const EquipmentController= require("../Controllers/EquipmentController");

// Create route path
equipmentrouter.get("/", EquipmentController.getAllEquipments);
equipmentrouter.post("/", EquipmentController.addEquipment);
equipmentrouter.get("/:id", EquipmentController.getById);
equipmentrouter.put("/:id", EquipmentController.updateEquipment);
equipmentrouter.delete("/:id", EquipmentController.deleteEquipment);
// Export
module.exports =equipmentrouter;
