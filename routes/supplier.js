const express = require('express');
const router = express.Router();
const supplier = require('../controllers/supplier');
const { requireLogin, adminMiddleware } = require('../middleware');

router.post('/', requireLogin, adminMiddleware, supplier.createSupplier);
router.get('/', requireLogin, adminMiddleware, supplier.getAllSuppliers);
router.get('/:id', requireLogin, adminMiddleware, supplier.getSupplierById);
router.put('/:id', requireLogin, adminMiddleware, supplier.updateSupplier);
router.delete('/:id', requireLogin, adminMiddleware, supplier.deleteSupplier);

module.exports = router;