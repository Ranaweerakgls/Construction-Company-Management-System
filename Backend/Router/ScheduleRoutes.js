//ScheduleRoutes
const express = require("express");   //inserting details
const router = express.Router();

//Insert Model
const Schedule = require("../Model/ScheduleModel");

//insert User Controller
const ScheduleController = require("../Controllers/ScheduleControllers");

router.get("/:id",ScheduleController.getById);
router.get("/",ScheduleController.getAllProjectSchedules);
router.post("/",ScheduleController.addProjectSchedules);
router.put("/:id",ScheduleController.updateProjectSchedules);
router.get("/pr/:id",ScheduleController.getBypId);
router.delete("/:id", ScheduleController.deleteProjectSchedules);
router.get("/project/:Project_ID", ScheduleController.getByProjectId); 



//export
module.exports = router;