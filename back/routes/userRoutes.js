const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
router.get("/verify-email/:token", userController.verify_email_get);
router.get("/testgauth", (req, res, next) => {
    res.render("user.twig", { title: req.user });
  });
module.exports = router;