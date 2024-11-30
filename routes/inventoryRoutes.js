const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createInventoryController, getInventoryController } = require('../controller/inventoryController');

const router = express.Router();

// Routes
// Add inventory
router.post('/create-inventory', authMiddleware, createInventoryController);

//GET ALL RECORDS
router.get('/get-inventory', authMiddleware, getInventoryController)

module.exports = router;
