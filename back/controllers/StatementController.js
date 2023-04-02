const StatementModel = require("../models/statement");
const UserModel = require("../models/user");
require("dotenv").config();

module.exports.check_statement = async (req, res) => {
    try {
      const statement = await StatementModel.findOne({ image_pdf: req.params.image_pdf });
      if (statement) {
        res.status(200).json({ message: "statement exists" });
      } else {
        res.status(404).json({ message: "statement does not exist" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };

  module.exports.add_statement_post = async (req, res) => {
    try {
      const statement = await StatementModel.create({
        ...req.body,
      });
      res.status(201).json({ message: "statement created successfully", statement });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Duplicate key error" });
      } else {
        res.status(400).json({ message: "Error creating statement", error });
      }
    }
  };

  module.exports.assign_statement_post = async (req, res) => {
    try {
      // Find expert by email
      const expert = await UserModel.findOne({ email: req.body.email });
      if (!expert) {
        return res.status(404).json({ message: "Expert not found" });
      }
  
      // Assign statement to expert
      const statement = await StatementModel.findOneAndUpdate(
        { _id: req.params.id },
        { assign_to_expert: expert._id },
        { new: true }
      );
      res.status(200).json({ message: "Statement updated successfully", statement });
    } catch (error) {
      res.status(400).json({ message: "Error updating statement", error });
    }
  };  
  

  module.exports.get_all_statements = async (req, res) => {
    try {
      const statements = await StatementModel.find();
      if (statements.length === 0) {
        res.status(404).json({ message: "No statements found" });
      } else {
        res.status(200).json({ statements });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving statements", error });
    }
  };

  module.exports.create_or_update_statement_post = async (req, res) => {
    try {
      const statement = await StatementModel.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { upsert: true, new: true }
      );
      res.status(201).json({ message: "Statement created or updated successfully", statement });
    } catch (error) {
      res.status(400).json({ message: "Failed to create or update statement", error });
    }
  };

  module.exports.getStatementByExpertEmail = async function(req, res) {
    try {
      const expert = await UserModel.findOne({ email: req.params.email });
      if (!expert) {
        return res.status(404).json({ message: "Expert not found" });
      }
  
      const statements = await StatementModel.find({ assign_to_expert: expert._id });
      res.status(200).json({ message: "Statements retrieved successfully", statements });
    } catch (error) {
      console.error(`Error getting statement: ${error}`);
      res.status(500).json({ message: `Error getting statement: ${error.message}` });
    }
  };