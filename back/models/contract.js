const mongoose = require("mongoose");
const moment = require("moment");

const contractSchema = new mongoose.Schema({
  contract_name: {
    type: String,
    required: true,
    maxlength: [50, "Contract name should not exceed 50 characters"],
    match: [/^[A-Za-z\s'À-ÖØ-öø-ÿ]+$/, "First name should only contain letters, spaces, quotes, and French characters"],
  },
  start_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return moment(value).isValid();
      },
      message: "Invalid date format",
    },
  },
  end_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return moment(value).isValid();
      },
      message: "Invalid date format",
    },
  },
  id_client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  id_agence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agence",
    required: true,
  }
});
// Add a unique compound index on id_client and id_agence fields
contractSchema.index({ id_client: 1, id_agence: 1 }, { unique: true });

const Contract = mongoose.model("Contract", contractSchema);
module.exports = Contract;
