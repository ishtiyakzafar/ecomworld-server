const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
});

module.exports = mongoose.model('Product', ProductSchema);
