const express = require('express');
const router = express.Router();
const { requireLogin, adminMiddleware } = require('../middleware');
const productController = require('../controllers/product');


router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/tags', productController.getProductsWithTags);
// router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;
