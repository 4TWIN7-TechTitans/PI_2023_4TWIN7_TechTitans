const mongoose = require("mongoose");

const offreSchema = new mongoose.Schema({
  societe: {
    type: String,
    required: true,
  },
  addresse: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Offre = mongoose.model("Offre", offreSchema);
module.exports = Offre;
