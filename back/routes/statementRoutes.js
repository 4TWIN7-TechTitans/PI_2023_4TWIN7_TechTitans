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
router.get('/statementbyexpertemail/:email', statementController.getStatementByExpertEmail);
router.get('/get_specificstatement/:id', statementController.get_statement_by_id);
router.post('/setdecision/', statementController.post_decision);

router.post('/statements_status/:id/status', statementController.update_statement_status);
router.get("/getstatements/:case_state", statementController.filtre_statements);

router.post("/comment/:id", statementController.add_comment_to_statement);
router.put("/remove_comment/:id", statementController.remove_comment_from_statement);
router.get("/get_comments_for_statement/:id", statementController.get_comments_for_statement);

//Generate Statement : 
router.post("/gen_statement", statementController.gen_statement_post);
router.post("/genpdf", statementController.genPDFfromStatementId);


router.get('/getstatementlocation/:location', statementController.get_statement_by_location);
router.get('/dlconstat', statementController.dlPDF);

//ai
//train offer
router.post("/train_offer", statementController.train_offer);
router.get("/get_train_offer", statementController.get_train_offer);

//decision prediction
router.post("/decision_prediction", statementController.predictDecision);
router.get("/trainmodel", statementController.generateTrainData);
router.post("/predict", statementController.predict);
router.get("/accidentogene", statementController.get_most_accident_prone_locations);
router.post("/claim", statementController.claim);


router.get("/fraud_detection/:id", statementController.fraud_detection_algorithme);
router.post("/predictstatement", statementController.predict_statement);




module.exports = router;