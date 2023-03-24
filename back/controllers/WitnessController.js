const witnessModel = require("../models/witness");
require("dotenv").config();

module.exports.check_witness = async (req, res) => {
  try {
    const witness = await witnessModel.findOne({ contact: req.params.contact });
    if (witness) {
      res.status(200).json({ message: "Witness exists" });
    } else {
      res.status(404).json({ message: "Witness does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports.add_witness = async (req, res) => {
  /*  #swagger.parameters['parameter_name'] = {
        in: 'body',
        schema: {
          "last_name": "Ilyes",
          "first_name": "Khmiri",
          "address": "Bardo Rue Salema",
          "contact": 24741259,
        }
      }
    } */
  try {
    const witness = await witnessModel.create({
      ...req.body,
    });
    res.status(201).json({ message: "Witness created successfully", witness });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.remove_witness = async (req, res) => {
  try {
    const witness = await witnessModel.findOneAndUpdate(
      { contact: req.params.contact, removed: false },
      { removed: true },
      { new: true }
    );
    if (witness) {
      res
        .status(200)
        .json({ message: "Witness removed successfully", witness });
    } else {
      res.status(404).json({ message: "Witness not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

