const mongoose = require("mongoose");

const User2Schema = new mongoose.Schema(
    {


    id : String,
    token:String,
    email:String,
    name:String
 
});




module.exports = mongoose.model("User2", User2Schema);
