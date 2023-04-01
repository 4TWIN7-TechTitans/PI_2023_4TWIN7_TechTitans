const mongoose = require("mongoose");

const offreSchema = new mongoose.Schema({
  societe: {
    type: String,
    required: true,
  },
  addresse: {
    type: String,
    required: true,
    match: [
        /^[a-zA-Z0-9\s,'-]*$/,
        "Location should only contain letters, numbers, spaces, commas, apostrophes and hyphens",
      ],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?\d{2}\s?\d{3}\s?\d{3}$/, "Phone number should contain 8 or 9 digits, with optional country code and spaces"],
  },
  site: {
    type: String,
    required: true,
    match: /^www\..+\.com$/,
  },
});

const Offre = mongoose.model("Offre", offreSchema);
module.exports = Offre;
