const StatementModel = require("../models/statement");
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