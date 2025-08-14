// Routes/MonitoringRoutes.js
const express = require("express");
const router = express.Router();
const MonitoringController = require("../Controllers/MonitoringControllers");

router.get("/", MonitoringController.getAllMonitoringRecords);
router.post("/", MonitoringController.addMonitoringRecord);
router.get("/:id", MonitoringController.getMonitoringRecordById);
router.put("/:id", MonitoringController.updateMonitoringRecord);
router.delete("/:id", MonitoringController.deleteMonitoringRecord);
router.get("/dashboard/counts", MonitoringController.getDashboardCounts);
// Add this new route

module.exports = router;