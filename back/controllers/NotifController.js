const NotifModel = require("../models/notifs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();


module.exports.add_notif = async (req, res) => {
   
   try {
      
     const notif = await NotifModel.create({...req.body,});
     res.status(201).json({ message: "Notif added  successfully", notif });
   } catch (error) {
     res.status(500).json({ message: "Internal server error", error });
   }
 };




 module.exports.get_notifs = async (req, res) => {
    try {
      const notifs = await NotifModel.find({});
      res.status(200).json({
        notifs,
        message: "All Notification retrieved successfully",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to retrieve Notifications",
        status: "error",
      });
    }
  };
 

  module.exports.update_notif = async (req, res) => {
    const notif=req.body;
  
   try {
       
    const updatenotif = await NotifModel.findByIdAndUpdate(
      notif._id,
      { seen: true },
      res.status(200).json({  message: notif._id }) // Returns the updated document
    );
    
    
      
    } catch (err) {
     
      const errorp=err.message;
      res.status(400).json({ errorp, status: "error" });
    }

   
  };
 

  module.exports.getuser_notif = async (req, res) => {
    const field = req.body; // get the field parameter from the query string
  
    try {
      const data = await NotifModel.find({ id_user: field._id }).sort({ _id: -1 }).exec(); // find data by the specified field
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }