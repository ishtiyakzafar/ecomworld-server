const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
// const { verifyAccessToken, requireLogin, userMiddleware } = require('../middleware');

// router.get('/profile', userController.getUserProfile);
router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUserByAdmin);
// router.delete('/:id', userController.deleteUser);
// router.post('/reset-password', requireLogin, verifyAccessToken, userMiddleware, userController.resetPassword);
// router.post('/update', requireLogin, userMiddleware, userController.updateDetailByCustomer);

module.exports = router;
