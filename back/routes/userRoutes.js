const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
 

router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
router.get("/verify-email/:token", userController.verify_email_get);
router.post("/2fa", userController.login2FA);
router.post("/forget-password", userController.forgot_password_post);
router.post("/reset-password", userController.reset_password_post);

module.exports = router;