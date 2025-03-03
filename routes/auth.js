const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { requireLogin, userMiddleware } = require('../middleware');

router.post('/signup', authController.adminSignup);
router.post('/signin', authController.adminLogin);
router.post('/sendotp', authController.sendOtp);
router.post('/verifyotp', authController.verifyOtp);
router.get('/access-token', requireLogin, userMiddleware, authController.getAccessToken);

module.exports = router;
