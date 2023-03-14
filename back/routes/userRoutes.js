const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkEmail } = require('../controllers/userController');

router.get("/check-email/:email", checkEmail);


router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
router.get("/verify-email/:token", (req, res) => {
    const verificationToken = req.params.token;
    res.render('verification.ejs', { verificationToken });
    });
router.get('/resend-verification', userController.resend_verification_post);
router.post("/2fa", userController.login2FA);
router.post("/forget-password", userController.forgot_password_post);
router.post("/reset-password", userController.reset_password_post);
router.get("/all-users", userController.show_users_get);
router.get("/userbyemail/:email", userController.get_user_by_email);
router.get("/users/:email", userController.get_user_by_email);



module.exports = router;