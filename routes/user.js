const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verifyAccessToken, requireLogin, userMiddleware, adminMiddleware } = require('../middleware');

router.get('/', requireLogin, adminMiddleware, userController.getAllUsers);
router.get('/:id', requireLogin, adminMiddleware, userController.getUserById);
router.delete('/:id', requireLogin, adminMiddleware, userController.deleteUser);
router.post('/reset-password', requireLogin, verifyAccessToken, userMiddleware, userController.resetPassword);
router.post('/update', requireLogin, userMiddleware, userController.updateDetailByCustomer);

module.exports = router;
