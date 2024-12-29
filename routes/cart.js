const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { requireLogin, userMiddleware } = require('../middleware');

router.get('/', requireLogin, userMiddleware, cartController.getCart);
router.post('/add', requireLogin, userMiddleware, cartController.addToCart);
router.post('/remove', requireLogin, userMiddleware, cartController.removeFromCart);
router.post('/delete', requireLogin, userMiddleware, cartController.deleteCart);

// router.put('/:id', requireLogin, adminMiddleware, supplier.updateSupplier);
// router.delete('/:id', requireLogin, adminMiddleware, supplier.deleteSupplier);

module.exports = router;