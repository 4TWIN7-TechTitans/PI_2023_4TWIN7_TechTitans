const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/TicketController.js");


router.post("/", TicketController.add_ticket);
router.get("/", TicketController.get_tickets);
router.get("/one", TicketController.get_ticket);
router.get("/client", TicketController.get_ticketsbyclient);
router.get("/agence", TicketController.get_ticketsbyagence);


module.exports = router;
