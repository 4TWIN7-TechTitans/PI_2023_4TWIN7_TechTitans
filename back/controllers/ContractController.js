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
