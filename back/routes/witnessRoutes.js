const express = require("express");
const router = express.Router();
const witnessController = require("../controllers/WitnessController.js");


router.post("/addwitness", witnessController.add_witness);
//check if witness existes via Contact
router.get("/checkwitness/:contact", witnessController.check_witness);

//remove witness
router.delete("/remove/:contact", witnessController.remove_witness);






module.exports = router;
