const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { requireLogin, userMiddleware, adminMiddleware } = require('../middleware');

// user route
router.post('/', requireLogin, userMiddleware, orderController.createOrder);
router.get('/', requireLogin, userMiddleware, orderController.getOrderByUserId);
router.post('/cancel', requireLogin, userMiddleware, orderController.cancelOrder);
router.post('/return', requireLogin, userMiddleware, orderController.returnOrder);
router.post('/cancel-return', requireLogin, userMiddleware, orderController.cancelReturn);


// admin route
router.get('/all', requireLogin, adminMiddleware, orderController.getAllOrder);
router.get('/:id', requireLogin, adminMiddleware, orderController.getOrderById);
router.delete('/:id', requireLogin, adminMiddleware, orderController.deleteOrder);
router.post('/order-status', requireLogin, adminMiddleware, orderController.updateOrderStatus);
router.post('/payment-status', requireLogin, adminMiddleware, orderController.updatePaymentStatus);
router.post('/reset-status', requireLogin, adminMiddleware, orderController.resetOrderStatus);


module.exports = router;