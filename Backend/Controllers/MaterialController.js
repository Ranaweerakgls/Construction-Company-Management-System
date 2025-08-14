const Material = require("../Model/MaterialModel");

// Get all materials
const getAllMaterial = async (req, res, next) => {
    let Materials;

    try {
        Materials = await Material.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!Materials || Materials.length === 0) {
        return res.status(404).json({ message: "Materials not found" });
    }

    return res.status(200).json({ Materials });
};

// Add new material
const addMaterial = async (req, res, next) => {
    const { Mname, MID, Qty, Remarks, Date, Supplier } = req.body;

    let newMaterial;

    try {
        newMaterial = new Material({ Mname, MID, Qty, Remarks, Date, Supplier });
        await newMaterial.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!newMaterial) {
        return res.status(400).json({ message: "Unable to add material" });
    }

    return res.status(201).json({ newMaterial });
};

//Get by ID
const getById=async(req,res,next)=>{
    const id=req.params.id;

    let material;

    try{
        material= await Material.findById(id);
    }catch(err){
        console.log(err);
    }

    //if not found
    if (!material) {
        return res.status(400).json({ message: "Unable to add material" });
    }

    return res.status(200).json({ material: material });//changed{material} to material
}

//update material details
const updateMaterial=async(req,res,next)=>{
    const id=req.params.id;
    const { Mname, MID, Qty, Remarks, Date, Supplier } = req.body;

    let updatematerial;

    try{
        updatematerial=await Material.findByIdAndUpdate(id,{Mname:Mname, MID:MID, Qty:Qty, Remarks:Remarks, Date:Date, Supplier:Supplier});
        updatematerial=await updatematerial.save();//save updated details

    }catch(err){
        console.log(err);
    }

    if (!updatematerial) {
        return res.status(400).json({ message: "Unable to find material and update " });
    }

    return res.status(200).json({ updatematerial });
}

//delete material
const deleteMaterial=async(req,res,next)=>{
    const id=req.params.id;

    let deletematerial;

    try{
        deletematerial=await Material.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    if (!deletematerial) {
        return res.status(400).json({ message: "Unable to find material and delete " });
    }

    return res.status(200).json({ deletematerial });
}

exports.getAllMaterial = getAllMaterial;
exports.addMaterial = addMaterial;
exports.getById=getById;
exports.updateMaterial=updateMaterial;
exports.deleteMaterial=deleteMaterial;

