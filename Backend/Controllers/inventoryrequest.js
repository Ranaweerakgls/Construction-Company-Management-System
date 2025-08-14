const Inventory = require('../Model/inventoryrequest'); // Adjust path as needed

class InventoryController {
  // Get all inventory items
  static async getAllInventory(req, res) {
    try {
      const inventoryItems = await Inventory.find();
      if (!inventoryItems.length) {
        return res.status(404).json({ message: 'No inventory items found' });
      }
      res.status(200).json(inventoryItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching inventory items', error: error.message });
    }
  }

  // Add a new inventory item
  static async addInventory(req, res) {
    const { P_ID, P_Name, Description, Date } = req.body;

    // Validation
    if (!P_ID || !P_Name || !Description || !Date) {
      return res.status(400).json({ message: 'All fields (P_ID, P_Name, Description, Date) are required' });
    }

    try {
      // Check for duplicate P_ID
      const existingItem = await Inventory.findOne({ P_ID });
      if (existingItem) {
        return res.status(400).json({ message: 'P_ID already exists' });
      }

      const newItem = new Inventory({
        P_ID,
        P_Name,
        Description,
        Date,
      });

      const savedItem = await newItem.save();
      res.status(201).json({ message: 'Inventory item added successfully', data: savedItem });
    } catch (error) {
      res.status(500).json({ message: 'Error adding inventory item', error: error.message });
    }
  }

  // Update an inventory item by _id
  static async updateInventory(req, res) {
    const { _id } = req.params; // Use MongoDB's default _id from the URL
    const { P_Name, Description, Date } = req.body;

    try {
      const item = await Inventory.findById(_id); // Find by _id
      if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }

      // Update fields if provided
      if (P_Name) item.P_Name = P_Name;
      if (Description) item.Description = Description;
      if (Date) item.Date = Date;

      const updatedItem = await item.save();
      res.status(200).json({ message: 'Inventory item updated successfully', data: updatedItem });
    } catch (error) {
      res.status(500).json({ message: 'Error updating inventory item', error: error.message });
    }
  }

  // Delete an inventory item by _id
  static async deleteInventory(req, res) {
    const { _id } = req.params; // Use MongoDB's default _id from the URL

    try {
      const item = await Inventory.findByIdAndDelete(_id); // Delete by _id
      if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting inventory item', error: error.message });
    }
  }

  // Get a single inventory item by _id (New Method)
  static async getInventoryById(req, res) {
    const { _id } = req.params; // Use MongoDB's default _id from the URL

    try {
      const item = await Inventory.findById(_id); // Find by _id
      if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.status(200).json({ message: 'Inventory item retrieved successfully', data: item });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching inventory item', error: error.message });
    }
  }
}

module.exports = InventoryController;