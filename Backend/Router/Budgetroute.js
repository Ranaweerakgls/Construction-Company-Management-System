const express = require("express");
const router = express.Router();
const budget = require("../Model/BudgetModel");
const budgetControle = require("../Controllers/Budgetcontrol");

router.get("/",budgetControle.getAllbudget);
router.post("/",budgetControle.addBudget);
router.get("/:id",budgetControle.getById);
router.put("/:id",budgetControle.UpdateBudget);
router.delete("/:id",budgetControle.DeleteBudget);
router.get("/P_ID/:P_ID", budgetControle.getBudgetByP_ID);

module.exports = router;