const express=require("express");
const router =express.Router();

//Insert model
const user=require("../Model/UserModel");

//insert User Controller
const  UserController=require("../Controllers/Usercontrol");

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addusers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.Updateuser);
router.delete("/:id",UserController.DeleteUser);

//export
module.exports=router;

