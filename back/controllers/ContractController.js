const ContractModel = require("../models/contract");
const userModel = require("../models/user");

require("dotenv").config();


module.exports.add_contract = async (req, res) => {
  try {
    const contract = await ContractModel.create({
      ...req.body,
    });
    res.status(201).json({ message: "Contract created successfully", contract });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Contract With this id Exist" });
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


module.exports.contarctsunique = async (req, res) => {
  try {
    const userId = req.params.id; // get the user id from the request parameters
    const contracts = await ContractModel.find({ id_client: userId }); // find contracts belonging to the specified user id
    if (contracts.length === 0) {
      return res.status(404).json({
        message: "No contracts found for the specified user",
        status: "error",
      });
    }
    res.status(200).json({
      contracts,
      message: "Contracts retrieved successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve contracts",
      status: "error",
    });
  }
};
