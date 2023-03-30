const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/TicketController.js");


router.post("/addticket", TicketController.add_ticket);
router.get("/", TicketController.get_tickets);



module.exports = router;
