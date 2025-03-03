const express = require('express');
const router = express.Router();
const { requireLogin, adminMiddleware } = require('../middleware');
const productController = require('../controllers/product');


router.post('/', requireLogin, adminMiddleware, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/tags', productController.getProductsWithTags);
router.get('/brands', productController.getBrands);
router.get('/colors', productController.getColors);
router.get('/similar/:category', productController.getSimilarProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', requireLogin, adminMiddleware, productController.updateProduct);
router.delete('/:id', requireLogin, adminMiddleware, productController.deleteProduct);

module.exports = router;
