const ReviewModel = require("../models/review");

module.exports.addReview = async (req, res) => {
  try {
    const newReview = await ReviewModel.create({
      id_expert: req.body.id_expert,
      review: req.body.review,
    });
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

module.exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({});
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};
