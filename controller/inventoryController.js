const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY (Handles both 'in' and 'out')
const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType, bloodGroup, quantity } = req.body;

        // Validate user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const organisation = new mongoose.Types.ObjectId(req.body.userId);

        // Handle 'IN' operation
        if (inventoryType === 'in') {
            // Check if a record already exists for the same bloodGroup and organisation
            const existingRecord = await inventoryModel.findOne({
                organisations: organisation,
                bloodGroup,
                inventoryType: 'in',
            });

            if (existingRecord) {
                // Update the quantity of the existing record
                const updatedRecord = await inventoryModel.updateOne(
                    { _id: existingRecord._id },
                    { $inc: { quantity: quantity } } // Increment quantity
                );

                return res.status(200).send({
                    success: true,
                    message: `Successfully updated ${bloodGroup.toUpperCase()} inventory by adding ${quantity} ML.`,
                    data: updatedRecord,
                });
            } else {
                // Create a new record if none exists
                req.body.organisations = user._id;
                const inventory = new inventoryModel(req.body);
                await inventory.save();
                return res.status(201).send({
                    success: true,
                    message: 'New inventory record added successfully.',
                });
            }
        }

              // Handle 'OUT' operation
              if (inventoryType === 'out') {
                // Calculate available stock
                const totalIn = await inventoryModel.aggregate([
                    { $match: { organisations: organisation, inventoryType: 'in', bloodGroup } },
                    { $group: { _id: null, total: { $sum: '$quantity' } } },
                ]);
                const totalOut = await inventoryModel.aggregate([
                    { $match: { organisations: organisation, inventoryType: 'out', bloodGroup } },
                    { $group: { _id: null, total: { $sum: '$quantity' } } },
                ]);
    
                const availableQuantity = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
    
                // Validate stock
                if (availableQuantity < quantity) {
                    alert(`Insufficient stock: Only ${availableQuantity} ML of ${bloodGroup.toUpperCase()} is available.`);
                    return res.status(400).send({
                        success: false,
                        message: `Insufficient stock: Only ${availableQuantity} ML of ${bloodGroup.toUpperCase()} is available.`,
                    });
                }
    
                // Deduct blood from the existing 'in' records
                let remainingQuantity = quantity;
                const inRecords = await inventoryModel.find({
                    organisations: organisation,
                    bloodGroup,
                    inventoryType: 'in',
                }).sort({ createdAt: 1 }); // Oldest first
    
                for (let record of inRecords) {
                    if (remainingQuantity <= 0) break;
    
                    if (record.quantity <= remainingQuantity) {
                        // Deduct entire quantity of this record
                        remainingQuantity -= record.quantity;
                        await inventoryModel.deleteOne({ _id: record._id }); // Remove fully used records
                    } else {
                        // Deduct partial quantity and update the record
                        record.quantity -= remainingQuantity;
                        remainingQuantity = 0; // All required quantity is deducted
                        await record.save(); // Update record with new quantity
                    }
                }
    
                // Log the 'out' transaction
                req.body.hospital = user._id; // Set the hospital field
                const inventory = new inventoryModel(req.body);
                await inventory.save(); // Save the 'out' transaction record
    
                return res.status(200).send({
                    success: true,
                    message: `Successfully deducted ${quantity} ML of ${bloodGroup.toUpperCase()}.`,
                });
            }

    } catch (error) {
        console.error("Error in createInventoryController:", error.message);
        return res.status(500).send({
            success: false,
            message: 'Error in Create Inventory API',
            error: error.message,
        });
    }
};

// GET ALL INVENTORY RECORDS
const getInventoryController = async (req, res) => {
    try {
        // Use the userId set in authMiddleware
        const inventory = await inventoryModel.find({
            organisations: req.body.userId,
        })
            .populate('doner')
            .populate('hospital')
            .sort({ createdAt: -1 });

        // Respond with fetched records
        return res.status(200).send({
            success: true,
            message: "Fetched all inventory records successfully",
            data: inventory,
        });
    } catch (error) {
        console.error("Error in getInventoryController:", error.message);
        return res.status(500).send({
            success: false,
            message: "Error in fetching inventory records",
            error: error.message,
        });
    }
};

module.exports = { createInventoryController, getInventoryController };
