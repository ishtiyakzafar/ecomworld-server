const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
const { requireLogin, userMiddleware } = require('../middleware');

router.get('/', requireLogin, userMiddleware, cart.getCart);
router.post('/add', requireLogin, userMiddleware, cart.addToCart);
// router.get('/:id', requireLogin, adminMiddleware, supplier.getSupplierById);
// router.put('/:id', requireLogin, adminMiddleware, supplier.updateSupplier);
// router.delete('/:id', requireLogin, adminMiddleware, supplier.deleteSupplier);

module.exports = router;