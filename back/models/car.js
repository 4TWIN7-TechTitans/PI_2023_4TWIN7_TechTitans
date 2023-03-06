const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  registration_number: {
    type: String,
    required: true,
  },
  id_contrat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Contract'
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
