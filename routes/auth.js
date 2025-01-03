const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.createUser);
router.post('/signin', authController.loginUser);

module.exports = router;
