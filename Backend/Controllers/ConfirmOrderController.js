const ConfirmOrder = require("../Model/ConfirmOrderModel");

// Get all orders
const getAllRecords = async (req, res, next) => {
    let records;
    try {
        records = await ConfirmOrder.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!records) {
        return res.status(404).json({ message: "Records not found" });
    }

    return res.status(200).json({ records });
};

// Add new material
const addNewRecord = async (req, res, next) => {
    const { OrderID, ODetails, Date, OStatus } = req.body;

    let newRecord;

    try {
        newRecord = new ConfirmOrder({ OrderID, ODetails, Date, OStatus });
        await newRecord.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!newRecord) {
        return res.status(400).json({ message: "Unable to add new record" });
    }

    return res.status(200).json({ newRecord });
};

// Get by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let record;

    try {
        record = await ConfirmOrder.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!record) {
        return res.status(400).json({ message: "Unable to get order details" });
    }

    return res.status(200).json({ record });
};

// Update details
const updateRecord = async (req, res, next) => {
    const id = req.params.id;
    const { OrderID, ODetails, Date, OStatus } = req.body;

    let updatedRecord;

    try {
        updatedRecord = await ConfirmOrder.findByIdAndUpdate(id, { OrderID, ODetails, Date, OStatus }, { new: true });
    } catch (err) {
        console.log(err);
    }

    if (!updatedRecord) {
        return res.status(400).json({ message: "Unable to find order and update" });
    }

    return res.status(200).json({ updatedRecord });
};

// Delete
const deleteRecord = async (req, res, next) => {
    const id = req.params.id;

    let deletedRecord;

    try {
        deletedRecord = await ConfirmOrder.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!deletedRecord) {
        return res.status(400).json({ message: "Unable to find order and delete" });
    }

    return res.status(200).json({ deletedRecord });
};

exports.getAllRecords = getAllRecords;
exports.addNewRecord = addNewRecord;
exports.getById = getById;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;
