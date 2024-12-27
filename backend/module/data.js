const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Task:String,
  Desc:String,
  time:String
});

userModel = mongoose.model("data", userSchema);
module.exports = userModel;
