const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: String,
  password : String,
  last_name : String,
  first_name : String
});



const User = mongoose.model("User", userSchema);
module.exports = User;