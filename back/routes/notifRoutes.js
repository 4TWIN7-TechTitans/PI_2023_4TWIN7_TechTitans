const express = require("express");
const router = express.Router();
const NotifController = require("../controllers/NotifController.js");


router.post("/", NotifController.add_notif);
router.post("/update", NotifController.update_notif);
router.get("/", NotifController.get_notifs);
router.post("/byuser", NotifController.getuser_notif);

module.exports = router;
