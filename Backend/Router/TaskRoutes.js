//route
const express = require("express");
const router = express.Router();
const TaskController = require("../Controllers/TaskControllers");

router.get("/:id", TaskController.getTaskById);
router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.addTask);
router.put("/:id", TaskController.updateTask);
router.put("/update_status/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);
router.get("/worker/:workerId", TaskController.getTasksByWorkerId);

router.get("/worker/:workerId", TaskController.getTasksByWorkerId);

module.exports = router;