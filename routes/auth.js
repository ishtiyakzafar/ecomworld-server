const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { requireLogin, userMiddleware } = require('../middleware');

router.post('/signup', authController.createUser);
router.post('/signin', authController.loginUser);
router.get('/access-token', requireLogin, userMiddleware, authController.getAccessToken);

module.exports = router;
