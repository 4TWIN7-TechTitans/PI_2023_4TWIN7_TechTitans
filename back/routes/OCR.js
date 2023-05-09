const express = require("express");
const router = express.Router();
const OcrController = require("../controllers/OcrController.js");
const path = require('path');
const axios = require('axios');
const fs = require('fs');


router.post("/fix", OcrController.fixthis);
router.get('/fix2', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/index.html'));
  });

module.exports = router;