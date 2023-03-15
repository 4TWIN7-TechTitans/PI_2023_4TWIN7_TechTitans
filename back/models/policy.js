const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  premium_amount: {
    type: Number,
    required: true,
  },
  deductible_amount: {
    type: Number,
    required: true,
  },
  id_contrat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Contract",
  },
});

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
