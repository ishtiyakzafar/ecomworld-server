const express = require('express');
const router = express.Router();
const { requireLogin, adminAndSupplierMiddleware } = require('../middleware');
const productController = require('../controllers/product');

router.get('/by-product-type', productController.getProductsByType);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', requireLogin, adminAndSupplierMiddleware, productController.updateProduct);
router.delete('/:id', requireLogin, adminAndSupplierMiddleware, productController.deleteProduct);




module.exports = router;
