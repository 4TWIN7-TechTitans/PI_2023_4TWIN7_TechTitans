const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
//router.post('/verify-email/:token', userController.verify_email_post);
router.get("/verify-email/:token", userController.verify_email_get);
/*
//signup route
router.post('/signup', userController.signup_post);

//login route
router.post('/login', userController.login_post);

//logout route
router.get('/logout', userController.logout_get);

//email verification route
router.get('/confirmation', userController.confirmation_get);*/
module.exports = router;