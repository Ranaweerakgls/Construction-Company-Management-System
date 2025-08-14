const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const NotificationSchema=new Schema({

    notificationid:{
        type:String,//datatype
        required:true//validate
    },
    type:{
        type:String,//datatype
        required:true,//validate
        enum: ["Annoucement", "Alert", "Update"], 
    },
    Date: {
        type: Date, // Changed from String to Date
        required: true,
        default: Date.now, // Default to the current date
    },
    message:{
        type:String,//datatype
        required:true,//validate
        
    },
    Priority_Level:{
        type:String,//datatype
        required:true,//validate
        enum: ["Low", "Medium", "High","Critical"], 
        
    },
    Target_Audience:{
        type:String,//datatype
        required:true,//validate
        enum: ["allusers", "admin", "projectmanager", "client","sitesupervisor","quantitysurveyor","inventorymanager"], 
        default: "allusers",
        
    },
   
});

module.exports=mongoose.model(
    "NotificationModel",//file name
    NotificationSchema //function name

)