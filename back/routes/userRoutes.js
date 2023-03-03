const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup_post);
router.get('/signup_get', userController.signup_get);






module.exports = router;