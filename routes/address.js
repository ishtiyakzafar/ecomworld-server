const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');
const { requireLogin, userMiddleware } = require('../middleware');


router.post('/', requireLogin, userMiddleware, addressController.createAddress);
router.get('/', requireLogin, userMiddleware, addressController.getAddresses);
router.get('/:id', requireLogin, userMiddleware, addressController.getAddressById);
router.delete('/:id', requireLogin, userMiddleware, addressController.deleteAddress);
router.put('/:id', requireLogin, userMiddleware, addressController.updateAddress);

module.exports = router;