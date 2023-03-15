const mongoose = require("mongoose");
const moment = require("moment");

const statementSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  id_contract_a: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
  id_contract_b: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return moment(value).isValid();
      },
      message: "Invalid date format",
    },
  },
  location: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9\s,'-]*$/,
      "Location should only contain letters, numbers, spaces, commas, apostrophes and hyphens",
    ],
  },
  injured: {
    type: String,
    required: true,
  },
  material_damage: {
    type: String,
    required: true,
  },
  driver_a: {
    type: String,
    required: true,
  },
  driver_b: {
    type: String,
    required: true,
  },
  notes_a: {
    type: String,
    required: true,
  },
  notes_b: {
    type: String,
    required: true,
  },
  circumstances_a: {
    type: String,
    required: true,
  },
  circumstances_b: {
    type: String,
    required: true,
  },
  signature_a: {
    type: String,
    required: true,
  },
  signature_b: {
    type: String,
    required: true,
  },
  image_pdf: {
    type: String,
    required: true,
  },
});

const Statement = mongoose.model("Statement", statementSchema);
module.exports = Statement;
