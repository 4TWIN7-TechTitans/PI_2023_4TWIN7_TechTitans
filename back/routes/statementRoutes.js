const express = require("express");
const router = express.Router();

const statementController = require("../controllers/StatementController.js");
//const { add_statement_post } = require("../controllers/statementController");

// POST /statements
router.post("/addstatement", statementController.add_statement_post);
//GET / CHECK
router.get("/checkstatements/:image_pdf", statementController.check_statement);

router.post('/createorupdate',statementController.create_or_update_statement_post);

router.get('/getstatements', statementController.get_all_statements);

router.post('/assign_statements/:id/assign', statementController.assign_statement_post);


module.exports = router;