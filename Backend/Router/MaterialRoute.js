const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Middleware for JSON parsing
router.use(express.json());

// Insert Material model
const Material = require("../Model/MaterialModel");
// Insert Material controller
const MaterialController = require("../Controllers/MaterialController");

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'materialuploads/'); // make sure this folder exists
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const uploads = multer({ storage: storage });

// Create route path
router.get("/", MaterialController.getAllMaterial);

// POST /Materials
router.post('/', uploads.single('pdfFile'), async (req, res) => {
    try {
      const {
        Mname,
        MID,
        Qty,
        Remarks,
        Date,
        Supplier
      } = req.body;
  
      const pdfFilePath = req.file ? req.file.filename : null;
  
      const material = new Material({
        Mname,
        MID,
        Qty,
        Remarks,
        Date,
        Supplier,
        pdfFile: pdfFilePath
      });
  
      await material.save();
      res.status(201).json({ message: 'Material added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

router.get("/:id", MaterialController.getById);
router.put("/:id", MaterialController.updateMaterial);
router.delete("/:id", MaterialController.deleteMaterial);
// Export
module.exports = router;
