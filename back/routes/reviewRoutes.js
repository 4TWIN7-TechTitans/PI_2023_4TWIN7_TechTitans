const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/ReviewController.js");

//Added Now
    router.post("/add_review", ReviewController.addReview);
    router.get("/get_all_reviews", ReviewController.getAllReviews);



module.exports = router;