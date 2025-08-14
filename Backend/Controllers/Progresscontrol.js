//display part
const userModel=require("../Model/Progress");//improting model



const getAllProgressUsers=async(req,res,next)=>{

    let Progressusers;

    //return the database details

    //get all users
    try{
        Progressusers=await userModel.find();
    }catch(err){
        console.log(err);
    }
    //user not found
    if(!Progressusers){
        return res.status(404).json({message:"user not found"})
    }
    //display all users
    return res.status(200).json({Progressusers});
}


//data insert part
const addProgressUsers = async (req, res, next) => {
    const { Project_ID, Project_Name, Description, Duration, Date, Status,Completion_Percentage,Image: image} = req.body;
   
    let Progressusers;

    try {
        Progressusers = new userModel({ Project_ID, Project_Name, Description, Duration, Date, Status,Completion_Percentage, // New field
            Image: image, });
        await Progressusers.save();
    } catch (err) {
        console.error("Error during data insertion:", err); // Detailed error log
        return res.status(500).json({ message: "Failed to add progress record", error: err.message }); // Sending error message back to client
    }

    if (!Progressusers) {
        return res.status(404).json({ message: "Unable to add progress record" });
    }
    return res.status(200).json({ Progressusers });
};

//no users
//get by ID
const getById = async(req,res,next)=>{
    const id =req.params.id;

    let user;
    try{
        user=await userModel.findById(id);
    }catch(err){
        console.log(err);
    }
    //not avaialable user
    if(!user){
        return res.status(404).json({message:" user not found"});
    }
    return res.status(200).json({user});
};
//update user details
const updateProgressUser = async(req,res,next)=>{
    const id =req.params.id;
    const {Project_ID, Project_Name, Description,Duration,Date,Status,}=req.body;

    let Progressusers;

    try{
        Progressusers=await userModel.findByIdAndUpdate(id,
            {Project_ID:Project_ID, Project_Name:Project_Name, Description:Description,Duration:Duration,Date:Date,Status:Status});
            Progressusers=await UserActivation.save();


    }catch(err){
        console.log(err);

    }

    if(!Progressusers){
        return res.status(404).json({message:"unable to update user details"});
    }
    return res.status(200).json({Progressusers});
    
};
//no users
//delete user details
const deleteProgressUser = async(req,res,next)=>{
    const id =req.params.id;
    let user;
    
    try{
        user= await userModel.findByIdAndDelete(id)

    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"unable to delete user details"});
    }
    return res.status(200).json({user});
    


    
};

exports.getAllProgressUsers=getAllProgressUsers;
exports.addProgressUsers=addProgressUsers;
exports.getById=getById;
exports.updateProgressUser=updateProgressUser;
exports.deleteProgressUser=deleteProgressUser;