const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountPercent: { type: Number, required: true },
  size: { type: String, required: true },
  imageUrl: [{ type: String }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  topLevelCategory: { type: String, required: true },
  secondLevelCategory: { type: String, required: true },
  thirdLevelCategory: { type: String, required: true },
  numRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
