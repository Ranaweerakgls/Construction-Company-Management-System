const express = require("express");
const routerRequiment = express.Router();
const requimentController = require("../Controllers/requimentController"); // Import controller
const RequimentUser=require("../Model/requimentModel");//import model

// Routes
routerRequiment.get("/", requimentController.getAllRequimentUsers);
routerRequiment.post("/", requimentController.addRequimentUsers);
routerRequiment.get("/:id", requimentController.getById);
routerRequiment.put("/:id", requimentController.updateRequimentUser);
routerRequiment.delete("/:id", requimentController.deleteRequimentUser);

// Export router
module.exports = routerRequiment;
