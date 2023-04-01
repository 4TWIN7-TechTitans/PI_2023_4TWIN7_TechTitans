const express = require("express");
const router = express.Router();


const offrecontroller = require("../controllers/OffreController.js");

router.post("/addoffre", offrecontroller.add_offre);

router.get("/scrap", offrecontroller.scrap);

module.exports = router;