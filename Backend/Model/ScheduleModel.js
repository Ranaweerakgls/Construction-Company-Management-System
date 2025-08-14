//ScheduleModel
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    Project_ID: {
        type: String,
        required: [true, "Project ID is required"],
        trim: true
    },
    Project_Name:{
        type:String, //dataType,what data u want to ur form
        required:true, //validate
    },
    Project_Location:{
        type:String, //dataType,what data u want to ur form
        required:true, //validate
    },
    Client_Details:{
        type:String, //dataType,what data u want to ur form
        required:true, //validate
    },
    Supervisor_Details:{
        type:String, 
        required:true,
    },
    Start_Date:{
        type:Date, 
        required:true,
    },
    End_Date:{
        type:Date, 
        required:true,
    },

    
});

//export our data to database table(include these things)

module.exports = mongoose.model(
    "ScheduleModel", //file name-model name
    ScheduleSchema //function name
    //created model class


)