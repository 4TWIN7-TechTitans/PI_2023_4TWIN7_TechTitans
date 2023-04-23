const mongoose = require("mongoose");
const moment = require("moment");


const NotifSchema = new mongoose.Schema({

    titre: {
        type: String,
        required: true,      
      },
      id_user: {
        type: String,
        required: true,      
      },
      date_notif: {
        type: Date,
        required: true,      
      },
      descrip: {
        type: String,
          
      },
      seen: {
        type: Boolean,
        default:false
          
      },

});

const Notif = mongoose.model("Notification", NotifSchema );
module.exports = Notif;
