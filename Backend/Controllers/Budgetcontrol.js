const { get } = require("mongoose");
const Budget = require("../Model/BudgetModel");

const getAllbudget = async (req, res, next) => {

    let Budgets;
    try{
        Budgets = await Budget.find();   
    }catch (err){
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching budgets" });
    }

    if(!Budgets){
        return res.status(404).json({message:"Budget not fount "})
    }

    return res.status(200).json({Budgets});

};

const addBudget = async(req, res, next) =>{

    const {P_ID,name,location,amount,createdDate,status,description} = req.body;
    let Budgets;
    try{
        const existingBudget = await Budget.findOne({ P_ID });

        if (existingBudget) {
            return res.status(400).json({ message: "P_ID already exists. Please use a unique ID." });
        }

        Budgets = new Budget({P_ID,name,location,amount,createdDate,status,description});
        await Budgets.save();
    }catch(err){
        console.log(err);
    }

    if(!Budgets){
        return res.status(404).json({message:"unable to find"})
    }

    return res.status(200).json({Budgets});
};

const getById = async(req,res,next) =>{

    const id = req.params.id;
    let Budgets;
    try{
        Budgets = await Budget.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!Budgets){
        return res.status(404).json({message:"not found"})
    }

    return res.status(200).json({Budgets});

};

//update
const UpdateBudget = async(req,res,next)=>{
    const id = req.params.id;
    const {P_ID,name,location,amount,createdDate,status,description} = req.body;
    let Budgets;
    try{
        Budgets = await Budget.findByIdAndUpdate(id,
            {P_ID,name,location,amount,createdDate,status,description});
            await Budgets.save(); 
    }catch(err){
        console.log(err);
    }

    if(!Budgets){
        return res.status(404).json({message:"cannot update budget detatils"})
    }

    return res.status(200).json({Budgets});

};

//delete users

const DeleteBudget = async(req,res,next)=>{
    const id = req.params.id;
    let Budgets;
    try{
        Budgets = await Budget.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!Budgets){
        return res.status(404).json({message:"cannot delete budget detatils"})
    }

    return res.status(200).json({Budgets});
}

const getBudgetByP_ID = async (req, res, next) => {
    const P_ID = req.params.P_ID;  // Extract P_ID from URL parameters
    let Budgets;
    try {
        Budgets = await Budget.findOne({ P_ID });  // Query by P_ID
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching budget by P_ID" });
    }

    if (!Budgets) {
        return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({ Budgets });
};

exports.getAllbudget=getAllbudget;
exports.addBudget=addBudget;
exports.getById=getById;
exports.UpdateBudget=UpdateBudget;
exports.DeleteBudget=DeleteBudget;
exports.getBudgetByP_ID=getBudgetByP_ID;