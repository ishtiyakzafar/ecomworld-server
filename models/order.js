const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItem: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  }],
  orderDate: { type: Date, default: Date.now, required: true },
  deliveryDate: { type: Date },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  paymentDetails: {
    paymentMethod: { type: String, },
    transactionId: { type: String, },
    paymentId: { type: String },
    paymentStatus: { type: String, enum: ["PENDING", "SUCCESS", "REJECTED"], default: 'PENDING' }
  },
  totalPrice: { type: Number, required: true },
  totalDiscountedPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  orderStatus: { type: String, enum: ["PENDING", "DELIVERED", "CANCLE"], default: 'PENDING' },
  totalItem: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
