const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  note: {
    type: String,
    required: false,
  },
  id_expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
