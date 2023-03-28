const ContractModel = require("../models/contract");
require("dotenv").config();


module.exports.add_contract = async (req, res) => {
  try {
    const contract = await ContractModel.create({
      ...req.body,
    });
    res.status(201).json({ message: "Contract created successfully", contract });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      res.status(400).json({ message: "Error creating contract", error });
    }
  }
};

// show all users
module.exports.contarcts = async (req, res) => {
  try {
    const contracts = await ContractModel.find({});
    res.status(200).json({
      contracts,
      message: "All contracts retrieved successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve users",
      status: "error",
    });
  }
};
