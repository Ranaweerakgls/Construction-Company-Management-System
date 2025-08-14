const express=require("express");
const routerNotification =express.Router();

//Insert model
const Notifications=require("../Model/NotificationModel");

//insert Password Controller
const  Notificationcontroller=require("../Controllers/Notificationcontrol");

routerNotification.get("/",Notificationcontroller.getAllNotification);
routerNotification.post("/",Notificationcontroller.addnotification);
routerNotification.get("/:id",Notificationcontroller.getById);
routerNotification.put("/:id",Notificationcontroller.Updatenotification);
routerNotification.delete("/:id",Notificationcontroller.Deletenotification);


//export
module.exports=routerNotification;