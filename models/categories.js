const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  topLevelCategory: { type: String, required: true, trim: true, unique: true },
  secondLevelCategories: [
    {
      secondLevelCategory: { type: String, trim: true },
      thirdLevelCategories: [{ thirdLevelCategory: { type: String, trim: true } }],
    },
  ],
});

module.exports = mongoose.model("Category", CategorySchema);
