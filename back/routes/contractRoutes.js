const express = require("express");
const router = express.Router();
const contractController = require("../controllers/ContractController.js");


router.post("/add_contract", contractController.add_contract);
router.get("/contarcts", contractController.contarcts);
router.get("/contarctsunique/:id", contractController.contarctsunique);






module.exports = router;
