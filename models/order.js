const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItem: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true },
  orderDate: { type: Date, default: Date.now, required: true },
  deliveryDate: { type: Date },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  paymentDetails: {
    paymentMethod: { type: String, },
    transactionId: { type: String, },
    paymentId: { type: String },
    paymentStatus: { type: String, default: 'PENDING' }
  },
  totalPrice: { type: Number, required: true },
  totalDiscountedPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  orderStatus: { type: String, default: 'PENDING' },
  totalItem: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
