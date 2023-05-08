const ReviewModel = require("../models/review");


module.exports.addReview = function (req, res) {
    const newReview = new ReviewModel({
        id_expert: req.body.id_expert,
        review: req.body.review,
    });

    newReview.save(function (err, review) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to add review" });
        } else {
            res.status(201).json({ message: "Review added successfully", review });
        }
    });
};

module.exports.getAllReviews = function (req, res) {
    ReviewModel.find({}, function (err, reviews) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve reviews" });
        } else {
            res.status(200).json({ reviews });
        }
    });
};