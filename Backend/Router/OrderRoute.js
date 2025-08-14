const express = require("express");
const orderrouter = express.Router();

 //Middleware for JSON parsing
orderrouter.use(express.json());

 //Insert Order model
const Order = require("../Model/OrderModel");
 //Insert Order controller
const OrderController = require("../Controllers/OrderController");

 //Create route path
orderrouter.get("/", OrderController.getAllOrders);
orderrouter.post("/", OrderController.addNewOrder);
orderrouter.get("/:id",OrderController.getById);
orderrouter.put("/:id",OrderController.updateOrder);
orderrouter.delete("/:id", OrderController.deleteOrder);
 //Export
module.exports = orderrouter;

