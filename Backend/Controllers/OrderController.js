const Order = require("../Model/OrderModel");

// Get all orders
const getAllOrders = async (req, res, next) => {
    let orders;

    try {
        orders = await Order.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!orders) {
        return res.status(404).json({ message: "orders not found" });
    }

    return res.status(200).json({ orders });
};

// Add new material
const addNewOrder = async (req, res, next) => {
    const { Itemname, Quantity, Otype, Remarks, Date, Supplier } = req.body;

    let newOrder;

    try {
        newOrder = new Order({ Itemname, Quantity, Otype, Remarks, Date, Supplier });
        await newOrder.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!newOrder) {
        return res.status(400).json({ message: "Unable to add new order" });
    }

    return res.status(200).json({ newOrder });
};

//Get by ID
const getById=async(req,res,next)=>{
    const id=req.params.id;

    let order;

    try{
        order= await Order.findById(id);
    }catch(err){
        console.log(err);
    }

    //if not found
    if (!order) {
        return res.status(400).json({ message: "Unable to get order details" });
    }

    return res.status(200).json({ order });
}

//update details
const updateOrder=async(req,res,next)=>{
    const id=req.params.id;
    const { Itemname, Quantity, Otype, Remarks, Date, Supplier }= req.body;

    let updateorder;

    try{
        updateorder=await Order.findByIdAndUpdate(id,{ Itemname:Itemname, Quantity:Quantity, Otype:Otype, Remarks:Remarks, Date:Date, Supplier:Supplier });
        updateorder=await updateorder.save();//save updated details

    }catch(err){
        console.log(err);
    }

    if (!updateorder) {
        return res.status(400).json({ message: "Unable to find order and update " });
    }

    return res.status(200).json({ updateorder });
}

//delete 
const deleteOrder=async(req,res,next)=>{
    const id=req.params.id;

    let deleteorder;

    try{
        deleteorder=await Order.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    if (!deleteorder) {
        return res.status(400).json({ message: "Unable to find order and delete " });
    }

    return res.status(200).json({ deleteorder });
}

exports.getAllOrders=getAllOrders;
exports.addNewOrder=addNewOrder;
exports.getById=getById;
exports.updateOrder=updateOrder;
exports.deleteOrder=deleteOrder;

