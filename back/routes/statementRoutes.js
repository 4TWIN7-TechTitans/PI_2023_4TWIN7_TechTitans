const express = require("express");
const router = express.Router();

module.exports = router;

const statementController = require("../controllers/statementController.js");
//const { add_statement_post } = require("../controllers/statementController");

// POST /statements
router.post("/statements", statementController.add_statement_post);
//GET / CHECK
router.get("/checkstatements/:image_pdf", statementController.check_statement);