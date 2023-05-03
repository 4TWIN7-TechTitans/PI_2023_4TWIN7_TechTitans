const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  clientId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contenu:{
    type:String,
    required:true
  },
},{timestamps:true});


const replySchema = new mongoose.Schema({
    contenu:{
        type:String
    },
    forumId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Forum"
    }
},{timestamps:true});


const Forum = mongoose.model("Forum", forumSchema);
const Reply = mongoose.model("Reply",replySchema);

module.exports = {Forum,Reply};
