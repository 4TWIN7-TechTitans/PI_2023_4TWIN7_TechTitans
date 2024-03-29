const ticketModel = require("../models/ticket");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.add_ticket = async (req, res) => {

  
  try {
    const last_ticket = await ticketModel.find().sort( { _id : -1 } ).limit(1);
   if(last_ticket.length>0)
   {
    const ticketnumber=Number(last_ticket[0].number) + 1;
    console.log(ticketnumber);
    req.body.number=ticketnumber;
   }
   else
   req.body.number=1;
   console.log(req.body)
    const ticket = await ticketModel.create({...req.body,
    });


  
    res.status(201).json({ message: "ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//get all tickets
module.exports.get_tickets = async (req, res) => {
    try {
      const tickets = await ticketModel.find({}).sort({ _id: -1 }).exec();
      res.status(200).json({
        tickets,
        message: "All tickets retrieved successfully",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to retrieve tickets",
        status: "error",
      });
    }
  };



  module.exports.get_ticketsbyagence = async (req, res) => {
    const { id } = req.body;
    try {
      const ticket = await ticketModel.find( {id_agence : id}   ).sort({ _id: -1 }).exec();
      if (ticket) 
      res.status(200).json({ ticket: ticket});
      
    } catch (err) {
     
      
      res.status(400).json({ err, status: "error" });
    }
  };



  module.exports.get_ticketsbyclient = async (req, res) => {
    const { id } = req.body;
    try {
      const ticket = await  ticketModel.find( {id_demandeur : id}   ).sort({ _id: -1 }).exec();
      if (ticket) 
      res.status(200).json({ ticket: ticket});
      
    } catch (err) {
     
      
      res.status(400).json({ err, status: "error" });
    }
  };





  module.exports.get_ticket = async (req, res) => {
    const { id } = req.body;
   
    try {
      const ticket = await ticketModel.find( {number : id}   ).sort({ _id: -1 }).exec();
      if (ticket) 
      {
        console.log(ticket)
        res.status(200).json({ ticket: ticket});
      }
    
      
    } catch (err) {
     
      const errorp=err.message;
      res.status(400).json({ errorp, status: "error" });
    }
  };




  module.exports.update_ticket = async (req, res) => {
    const ticket=req.body;
   
   try {
       
    const updateticket = await ticketModel.findByIdAndUpdate(
      ticket._id,
      { log: ticket.log,
      etat:ticket.etat },
      { new: true } // Returns the updated document
    );
    res.status(200).json({ });
    
      
    } catch (err) {
     
      const errorp=err.message;
      res.status(400).json({ errorp, status: "error" });
    }

   
  };
 
  module.exports.get_ticket_by_obj = async (req, res) => {
    const { objet } = req.body;
  
    try {
      const ticket = await ticketModel.findOne({ objet });
      if (ticket) {
        console.log(ticket);
        res.status(200).json({ ticket });
      } else {
        res.status(404).json({ message: "Ticket not found" });
      }
    } catch (err) {
      const errorp = err.message;
      res.status(400).json({ errorp, status: "error" });
    }
  };
  