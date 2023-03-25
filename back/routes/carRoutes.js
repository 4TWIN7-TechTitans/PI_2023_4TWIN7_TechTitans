const express = require("express");
const router = express.Router();
const carController = require("../controllers/CarController.js");


router.post("/add_car", carController.post_car);




module.exports = router;
