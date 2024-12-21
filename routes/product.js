const express = require('express');
const router = express.Router();
const product = require('../controllers/product');
const { requireLogin, adminAndSupplierMiddleware } = require('../middleware');

router.post('/', product.createProduct);
router.get('/', product.getAllProducts);
router.get('/:id', product.getProductById);
router.put('/:id', requireLogin, adminAndSupplierMiddleware, product.updateProduct);
router.delete('/:id', requireLogin, adminAndSupplierMiddleware, product.deleteProduct);

module.exports = router;
