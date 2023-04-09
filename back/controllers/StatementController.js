const StatementModel = require("../models/statement");
const UserModel = require("../models/user");
require("dotenv").config();
const cloudinary = require('cloudinary').v2;


// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folder:process.env.FOLDER,
  folder:process.env.FOLDER1,
  format:process.env.FORMAT,
  Upload_presets: process.env.UPLOAD_PRESTE_croquis,
  Upload_presets: process.env.UPLOAD_PRESTE_signatures_a,
  Upload_presets: process.env.UPLOAD_PRESTE_signatures_b,
});


module.exports.add_statement_post = async (req, res) => {
  try {
    // const {accident_croquis} = req.body;

    // // upload image to cloudinary
    // const result = await cloudinary.uploader.upload(accident_croquis);

 



    // save st  atement to database
    const statement = await StatementModel.create({
      ...req.body,

    });

    res.status(201).json({
      message: "Statement created successfully",
      statement,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      res.status(400).json({ message: "Error creating statement", error });
    }
  }
};


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



  module.exports.assign_statement_post = async (req, res) => {
    try {
      // Find expert by email
      const expert = await UserModel.findOne({ email: req.body.email });
      if (!expert) {
        return res.status(404).json({ message: "Expert not found" });
      }
      if(!expert.statements_number){
        expert.statements_number = 0;
      }
      expert.statements_number += 1;
      await UserModel.findByIdAndUpdate(expert._id, expert);
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

  module.exports.get_specific_statement = async (req, res) => {
    const statementId = req.params.id;
    try {
      const statement = await StatementModel.findById(statementId);
      if (!statement) {
        return res.status(404).json({ message: "Statement not found" });
      }
      res.status(200).json({ statement });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving statement", error });
    }
  };

