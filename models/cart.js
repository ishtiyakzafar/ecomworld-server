const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: { type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    totalItem: { type: Number, required: true, default: 0 },
    totalDiscountedPrice: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
