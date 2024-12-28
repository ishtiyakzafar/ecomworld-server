const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', CartItemSchema);