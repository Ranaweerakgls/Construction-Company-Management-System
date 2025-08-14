const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userrole: {
    type: String,
    required: true,
    enum: [
      "admin",
      "projectManager",
      "client",
      "supplier",
      "quantitysurveyor",
      "sitesupervisor",
      "inventorymanager",
      "financeofficer",
    ],
    default: "client",
  },
  password: {
    type: String,
    required: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("UserModel", UserSchema);