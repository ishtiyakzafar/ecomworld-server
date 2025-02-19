const express = require('express');
const router = express.Router();
const wishlist = require('../controllers/wishlist');
const { requireLogin, userMiddleware } = require('../middleware');

router.post('/', requireLogin, userMiddleware, wishlist.addProductToWishlist);
router.get('/', requireLogin, userMiddleware, wishlist.getWishlist);
router.delete('/:id', requireLogin, userMiddleware, wishlist.deleteProductFromWishlist);
router.get('/count', requireLogin, userMiddleware, wishlist.getWishlistCount);

module.exports = router;