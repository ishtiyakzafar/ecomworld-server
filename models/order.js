const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  orderItem: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      size: { type: String, required: true },
      estimatedDeliveryDate: {
        type: Date,
        default: () => {
          const date = new Date();
          return date.setDate(date.getDate() + 7)
        }
      },

      orderPlacedDate: { type: Date, default: Date.now },
      orderConfirmedDate: { type: Date, default: null },
      orderOutForDeliveryDate: { type: Date, default: null },
      orderDeliveredDate: { type: Date, default: null },

      orderCancelled: {
        date: { type: Date, default: null },
        status: { type: Boolean, default: false }
      },

      orderReturned: {
        date: { type: Date, default: null },
        status: { type: Boolean, default: false }
      },

      orderRefund: {
        date: { type: Date, default: null },
        status: { type: Boolean, default: false }
      },

      orderStatus: {
        type: String,
        enum: ["INPROGRESS", "CONFIRMED", "OFD", "DELIVERED"],
        default: 'INPROGRESS'
      },
      paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "CANCELLED", "REFUNDED"],
        default: 'PENDING'
      }
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
    index: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  paymentDetails: {
    paymentMethod: { type: String, default: "COD" },
  },
  totalRetailPrice: {
    type: Number,
    required: true,
    min: 0 // Prevents negative prices
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  totalItem: {
    type: Number,
    required: true,
    min: 1 // Ensures at least 1 item in an order
  }
});

module.exports = mongoose.model('Order', OrderSchema);
