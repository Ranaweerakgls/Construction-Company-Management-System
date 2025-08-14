const Equipment = require("../Model/EquipmentModel");

// Get all equipments
const getAllEquipments = async (req, res, next) => {
    let equipments;

    try {
        equipments = await Equipment.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!equipments) {
        return res.status(404).json({ message: "Equipments not found" });
    }

    return res.status(200).json({ equipments });
};

// Add new equipment
const addEquipment = async (req, res, next) => {
    const { Ename,EType,Qty,Remarks,Date,Supplier} = req.body;

    let newEquipment;

    try {
        newEquipment = new Equipment({ Ename,EType,Qty,Remarks,Date,Supplier});
        await newEquipment.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!newEquipment) {
        return res.status(400).json({ message: "Unable to add equipment" });
    }

    return res.status(201).json({ newEquipment });
};

//Get by ID
const getById=async(req,res,next)=>{
    const id=req.params.id;

    let equipment;

    try{
        equipment= await Equipment.findById(id);
    }catch(err){
        console.log(err);
    }

    //if not found
    if (!equipment) {
        return res.status(400).json({ message: "Unable to add equipment" });
    }

    return res.status(200).json({equipment});
}

//update  details
const updateEquipment=async(req,res,next)=>{
    const id=req.params.id;
    const { Ename,EType,Qty,Remarks,Date,Supplier} = req.body;

    let updateequipment;

    try{
        updateequipment=await Equipment.findByIdAndUpdate(id,{ Ename:Ename,EType:EType,Qty:Qty,Remarks:Remarks,Date:Date,Supplier:Supplier});
        updateequipment=await updateequipment.save();//save updated details

    }catch(err){
        console.log(err);
    }

    if (!updateequipment) {
        return res.status(400).json({ message: "Unable to find equipment and update " });
    }

    return res.status(200).json({ updateequipment });
}

//delete 
const deleteEquipment=async(req,res,next)=>{
    const id=req.params.id;

    let deleteequipment;

    try{
        deleteequipment=await Equipment.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    if (!deleteequipment) {
        return res.status(400).json({ message: "Unable to find equipment and delete " });
    }

    return res.status(200).json({ deleteequipment });
}

exports.getAllEquipments = getAllEquipments;
exports.addEquipment = addEquipment;
exports.getById=getById;
exports.updateEquipment=updateEquipment;
exports.deleteEquipment=deleteEquipment;

