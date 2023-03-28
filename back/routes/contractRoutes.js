const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController.js");


router.post("/add_contract", contractController.add_contract);
router.get("/contarcts", contractController.contarcts);





module.exports = router;
