const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true },
    sizes: [{
        name: { type: String },
        quantity: { type: String }
    }],
    imageUrl: [{ type: String }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    productType: { type: String, enum: ['ONSALE', 'NEWARRIVAL', 'BESTSELLER'] },
    numRatings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
