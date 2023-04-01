const express = require("express");
const router = express.Router();


const offrecontroller = require("../controllers/OffreController.js");

router.post("/addoffre", offrecontroller.add_offre);


module.exports = router;