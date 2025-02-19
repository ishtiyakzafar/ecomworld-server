const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { requireLogin, userMiddleware } = require('../middleware');

router.post('/', requireLogin, userMiddleware, cartController.addToCart);
router.get('/', requireLogin, userMiddleware, cartController.getCart);
router.delete('/:id', requireLogin, userMiddleware, cartController.deleteCartProduct);
router.put('/:id/quantity/increase', requireLogin, userMiddleware, cartController.incCartProductQty);
router.put('/:id/quantity/decrease', requireLogin, userMiddleware, cartController.decCartProductQty);
router.get('/count', requireLogin, userMiddleware, cartController.getCartProductCount);

module.exports = router;