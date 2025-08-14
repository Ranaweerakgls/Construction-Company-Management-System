const Notifications = require("../Model/NotificationModel");

//data display 
const getAllNotification = async (req, res, next) => {
    let notification;
    try {
        notification = await Notifications.find();
    } catch (err) {
        console.error("Error fetching notifications:", err); // Log errors only
        return res.status(500).json({ message: "Server error while fetching notifications" });
    }

    if (!notification || notification.length === 0) {
        return res.status(404).json({ message: "No notifications found" });
    }

    return res.status(200).json({ notification });
};

//data insert
const addnotification= async(req,res,next)=>{
    const{notificationid,type,Date,message,Priority_Level,Target_Audience}=req.body;
   

    let notification;

    try{
        notification=new Notifications({notificationid,type,Date,message,Priority_Level,Target_Audience});
        await notification.save();
    }catch(err){
        console.log(err);
    }
    //not insert notification
    if(!notification){
        return res.status(404).json({message:"unable to notification"});
    }return res.status(200).json({notification});
};

//get by Id 
const getById=async(req,res,next)=>{
    const id=req.params.id;

    let notification;

    try{
        notification= await Notifications.findById(id);
    }catch(err){
        console.log(err);
    }
     //not available users
     if(!notification){
        return res.status(404).json({message:"unable to find notification"});
    }return res.status(200).json({notification});

}
//update details
const Updatenotification=async(req,res,next)=>{
    const id=req.params.id;
    const{notificationid,type,Date,message,Priority_Level,Target_Audience}=req.body;

    let notification;
    
    try{
        notification=await Notifications.findByIdAndUpdate(id,
            {notificationid:notificationid,type:type,Date:Date,message:message,Priority_Level:Priority_Level,Target_Audience:Target_Audience});
            notification=await notification.save();
    }catch(err){
        console.log(err);
    }
    if(!notification){
        return res.status(404).json({message:"unable to update notifications"});
    }return res.status(200).json({notification});
};

//delete details
const Deletenotification = async (req, res, next) => {
    const id = req.params.id;

    try {
        const notification = await Notifications.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ success: false, message: "notifications not found" });
        }
        return res.status(200).json({ 
            success: true, 
            message: "Notification deleted successfully",
            deletedNotifications: notification 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false, 
            message: "Server error while deleting Notification" 
        });
    }
};



exports.getAllNotification=getAllNotification;
exports.addnotification=addnotification;
exports.getById=getById;
exports.Updatenotification=Updatenotification;
exports.Deletenotification=Deletenotification;



