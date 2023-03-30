const ticketModel = require("../models/ticket");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.add_ticket = async (req, res) => {


  try {
    const ticket = await ticketModel.create({
      ...req.body,
    });
    res.status(201).json({ message: "ticket created successfully", ticker });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//get all tickets
module.exports.get_tickets = async (req, res) => {
    try {
      const tickets = await ticketModel.find({});
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
