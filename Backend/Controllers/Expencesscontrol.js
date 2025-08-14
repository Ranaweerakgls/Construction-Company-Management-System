const { get } = require("mongoose");
const Expenses = require("../Model/Expenses.js");

const getAllexpenses = async (req, res, next) => {
    let expenses; 
    try {
        expenses = await Expenses.find(); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error while fetching expenses" });
    }

    if (!expenses) {
        return res.status(404).json({ message: "Expenses not found" });
    }

    return res.status(200).json(expenses); 

}

const addExpenses = async(req, res, next) =>{

    const {P_ID,expencedetails,amount,createdDate} = req.body;
    let expenses;
    try{
        expenses = new Expenses({P_ID,expencedetails,amount,createdDate});
        await expenses.save();
    }catch(err){
        console.log(err);
    }

    if(!expenses){
        return res.status(404).json({message:"unable to find"})
    }

    return res.status(200).json({expenses});
};

const getById = async(req,res,next) =>{

    const id = req.params.id;
    let expenses;
    try{
        expenses = await Expenses.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!expenses){
        return res.status(404).json({message:"not found"})
    }

    return res.status(200).json({expenses});

};

const UpdateExpenses = async(req,res,next)=>{
    const id = req.params.id;
    const {P_ID,expencedetails,amount,createdDate} = req.body;
    let expenses;
    try{
        expenses = await Expenses.findByIdAndUpdate(id,
            {P_ID,expencedetails,amount,createdDate});
            await expenses.save(); 
    }catch(err){
        console.log(err);
    }

    if(!expenses){
        return res.status(404).json({message:"cannot update expenses detatils"})
    }

    return res.status(200).json({expenses});

};

const DeleteExpenses = async(req,res,next)=>{
    const id = req.params.id;
    let expenses;
    try{
        expenses = await Expenses.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!expenses){
        return res.status(404).json({message:"cannot delete expenses detatils"})
    }

    return res.status(200).json({expenses});
}

const findbyPID = async(req,res,next) =>{

    const P_ID = req.params.P_ID;
    let expenses;
    try{
        expenses = await Expenses.findOne({P_ID});
    }catch(err){
        console.log(err);
    }

    if(!expenses){
        return res.status(404).json({message:"not found"})
    }

    return res.status(200).json({expenses});

};

const findbyPIDs = async (req, res, next) => {
    const P_ID = req.params.P_ID;
    let expenses;
    
    try {
      // Use find to fetch all expenses for the given P_ID
      expenses = await Expenses.find({ P_ID });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch expenses" });
    }
  
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }
  
    return res.status(200).json({ expenses });
  };
  



exports.getAllexpenses = getAllexpenses;
exports.addExpenses = addExpenses;
exports.getById = getById;
exports.UpdateExpenses = UpdateExpenses;
exports.DeleteExpenses = DeleteExpenses;
exports.findbyPID = findbyPID;
exports.findbyPIDs = findbyPIDs;