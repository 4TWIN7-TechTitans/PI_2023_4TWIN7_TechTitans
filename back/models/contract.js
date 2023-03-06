const mongoose = require("mongoose");
const moment = require("moment");

const contractSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
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
  id_insurance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Insurance",
    required: true,
  },
  id_car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
});

const Contract = mongoose.model("Contract", contractSchema);
module.exports = Contract;
