
const forumController = require("../controllers/forumController.js");
const express = require("express");
const router = express.Router();


router.post("/add_msg", forumController.add_message);
router.put("/update_msg/:id", forumController.update_message);
router.delete("/del_msg/:id", forumController.delete_message);
router.get("/", forumController.get_message);
router.post("/add_reply", forumController.add_reply);
router.put("/update_reply/:id",forumController.update_reply)
router.delete("/del_reply/:id",forumController.del_reply)
module.exports = router