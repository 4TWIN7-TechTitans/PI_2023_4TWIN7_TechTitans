const express = require("express");
const router = express.Router();
const OcrController = require("../controllers/OcrController.js");


router.post("/fix", OcrController.fix);


module.exports = router;