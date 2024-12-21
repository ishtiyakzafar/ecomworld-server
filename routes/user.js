const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.post('/register', user.createUser);
router.post('/login', user.loginUser);
router.get('/', user.getAllUsers);
router.get('/:id', user.getUserById);
router.put('/:id', user.updateUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
