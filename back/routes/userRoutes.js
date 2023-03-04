const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);





module.exports = router;