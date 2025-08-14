const express = require('express');
const router = express.Router();
const InventoryController = require('../Controllers/inventoryrequest'); // Adjust path

// Routes
router.get('/', InventoryController.getAllInventory);          // GET /inventory
router.post('/', InventoryController.addInventory);            // POST /inventory
router.put('/:_id', InventoryController.updateInventory);     // PUT /inventory/:P_ID
router.delete('/:_id', InventoryController.deleteInventory);  // DELETE /inventory/:P_ID
router.get('/:_id', InventoryController.getInventoryById);

module.exports = router;