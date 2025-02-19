const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  level: { type: Number, required: true },
});

module.exports = mongoose.model('Category', CategorySchema);
