const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  report: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  id_contrat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Contract'
  },
  a_or_b: {
    type: String,
    required: true,
  },
  decision: {
    type: String,
    required: true,
  },
});

const Claim = mongoose.model("Claim", claimSchema);
module.exports = Claim;
