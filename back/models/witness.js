const mongoose = require("mongoose");

const witnessSchema = new mongoose.Schema({
  id_witness: {
    type: Number,
    required: true,
    unique: true,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: [50, "Last name should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "Last name should only contain letters"],
  },
  first_name: {
    type: String,
    required: true,
    maxlength: [50, "First name should not exceed 50 characters"],
    match: [/^[A-Za-z]+$/, "First name should only contain letters"],
  },
  address: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9\s,'-]*$/, "Address should only contain letters, numbers, spaces, commas, apostrophes and hyphens"],
  },
  contact: {
    type: String,
    required: true,
  },
});

const Witness = mongoose.model("Witness", witnessSchema);
module.exports = Witness;
