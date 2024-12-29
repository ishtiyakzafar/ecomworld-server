const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { requireLogin, userMiddleware } = require('../middleware');

router.post('/', requireLogin, userMiddleware, orderController.createOrder);
// router.get('/', requireLogin, userMiddleware, orderController.getOrder);
// router.delete('/:id', requireLogin, userMiddleware, orderController.deleteOrder);
// router.put('/:id', requireLogin, userMiddleware, orderController.updateOrder);

module.exports = router;