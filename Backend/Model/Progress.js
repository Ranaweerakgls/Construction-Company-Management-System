const mongoose=require("mongoose");
const schema = mongoose.Schema;

const progressSchema= new mongoose.Schema({
    Project_ID:{
        type:String,//data type 
        required:true,//vallidate

    },
    Project_Name:{
        type:String,//data type 
        required:true,//vallidate

    },
    Description:{
        type:String,//data type 
        required:true,//vallidate

    },
    Duration:{
        type:String,//data type 
        required:true,//vallidate

    },
    Date:{
        type:String,//data type 
        required:true,//vallidate

    },
    Status:{
        type:String,//data type 
        required:true,//vallidate
        
    },
    Completion_Percentage: { type: Number, 
                            required: true, 
                            min: 0, max: 100 },
                            
    Image: { type: String ,
        required:false
    } 

});
module.exports = mongoose.model(
    "progressModel",
    progressSchema
)