const mongoose = require("mongoose");
const moment = require("moment");
const TicketSchema = new mongoose.Schema({
 
  objet: {
    type: String,
    required: true,
    maxlength: [100, "l'objet du ticket ne doit pas dépasser 100 caractéres"],
  },
  date_demande: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "la description du ticket doit avoit 10 caractéres au min"],
  },
  log: {
    type: String,
    required: false,
  },
  etat: {
    type: String,
    required: true,
    enum: ["a traiter", "en cours de traitement", "traité", "clos"],
    default: "a traiter",
  },
  id_demandeur: {
    type: String,
    required: true,
  },
  id_agence: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema );
module.exports = Ticket;
