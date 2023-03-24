const mongoose = require("mongoose");

const witnessSchema = new mongoose.Schema({
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
    match: [
      /^[a-zA-Z0-9\s,'-]*$/,
      "Address should only contain letters, numbers, spaces, commas, apostrophes and hyphens",
    ],
  },
  contact: {
    type: String,
    required: false,
    match: [
      /^\d{8}$/,
      "Phone number should start with +216 followed by 8 digits",
    ],
  },
  availability :{
    type: Boolean,
    default:true,
  },
  removed: {
    type: Boolean,
    default: false,
  }
});

const Witness = mongoose.model("Witness", witnessSchema);
module.exports = Witness;
