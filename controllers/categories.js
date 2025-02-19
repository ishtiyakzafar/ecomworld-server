const Categories = require("../models/categories");

exports.getAllCategories = async (req, res) => {
  try {
    const result = await Categories.find({}).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.createTopLevelCategory = async (req, res) => {
  try {
    const categoryExist = await Categories.findOne({ topLevelCategory: req.body.topLevelCategory });
    if (categoryExist) return res.status(400).json({ message: `${req.body.topLevelCategory} category already exists` });

    const category = new Categories(req.body);
    await category.save();
    res.status(200).json({ message: `${req.body.topLevelCategory} category added successfully`, category });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.updateTopLevelCategory = async (req, res) => {
  const { topCategoryId, topCategory } = req.body;

  try {
    const result = await Categories.findByIdAndUpdate(
      topCategoryId,
      { topLevelCategory: topCategory },
      { new: true }
    );

    if (!result) return res.status(400).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.deleteTopLevelCategory = async (req, res) => {
  try {
    const result = await Categories.findByIdAndDelete(req.body.topCategoryId);
    if (!result) return res.status(400).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.createSecondLevelCategory = async (req, res) => {
  const { categoryId, secondLevelCategory } = req.body;

  try {
    const categories = await Categories.findOneAndUpdate(
      {
        _id: categoryId,
        "secondLevelCategories.secondLevelCategory": { $ne: secondLevelCategory }
      },
      { $push: { secondLevelCategories: { secondLevelCategory } } },
      { new: true }
    );

    if (!categories) return res.status(404).json({ message: `${secondLevelCategory} category already exists` });

    res.status(200).json({ message: `${secondLevelCategory} category added successfully`, categories });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.updateSecondLevelCategory = async (req, res) => {
  const { topCategoryId, secondCategoryId, secondCategory } = req.body;

  try {
    const result = await Categories.findOneAndUpdate(
      { _id: topCategoryId, "secondLevelCategories._id": secondCategoryId },
      {
        $set: { "secondLevelCategories.$.secondLevelCategory": secondCategory }
      },
      { new: true }
    );

    if (!result) return res.status(400).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.deleteSecondLevelCategory = async (req, res) => {
  const { topCategoryId, secondCategoryId } = req.body;

  try {
    const result = await Categories.findOneAndUpdate(
      { _id: topCategoryId },
      { $pull: { secondLevelCategories: { _id: secondCategoryId } } },
      { new: true }
    );

    if (!result) return res.status(400).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.createThirdLevelCategory = async (req, res) => {
  const { categoryId, secondLevelCategoryId, thirdLevelCategory } = req.body;
  let categories;
  try {
    const data = await Categories.findById(categoryId);
    if (!data) return res.status(400).json({ message: 'Category not found!' });

    const result = data.secondLevelCategories.find((item) => item._id == secondLevelCategoryId);
    if (!result) return res.status(400).json({ message: 'Category not found!' });

    if (result.thirdLevelCategories.length === 0) {
      categories = await Categories.findOneAndUpdate(
        {
          _id: categoryId,
          "secondLevelCategories._id": secondLevelCategoryId,
        },
        {
          $push: {
            "secondLevelCategories.$.thirdLevelCategories": { thirdLevelCategory }
          }
        },
        { new: true }
      );
    } else {
      const isExist = result.thirdLevelCategories.some((item) => item.thirdLevelCategory === thirdLevelCategory);
      if (!isExist) {
        categories = await Categories.findOneAndUpdate(
          {
            _id: categoryId,
            "secondLevelCategories._id": secondLevelCategoryId,
          },
          {
            $push: {
              "secondLevelCategories.$.thirdLevelCategories": { thirdLevelCategory }
            }
          },
          { new: true }
        );
      }
    }

    if (!categories)
      return res.status(400).json({ message: `${thirdLevelCategory} category already exists` });

    res.status(200).json({ message: `${thirdLevelCategory} category added successfully`, categories });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error.message });
  }
};

exports.updateThirdLevelCategory = async (req, res) => {
  const { topCategoryId, secondCategoryId, thirdCategoryId, thirdCategory } = req.body;

  try {
    const result = await Categories.findOneAndUpdate(
      {
        _id: topCategoryId,
        "secondLevelCategories._id": secondCategoryId,
        "secondLevelCategories.thirdLevelCategories._id": thirdCategoryId
      },
      {
        $set: { "secondLevelCategories.$[].thirdLevelCategories.$[elem].thirdLevelCategory": thirdCategory }
      },
      {
        new: true,
        arrayFilters: [{ "elem._id": thirdCategoryId }] // Filters the correct third-level category
      }
    );

    if (!result) return res.status(400).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error.message });
  }
};

exports.deleteThirdLevelCategory = async (req, res) => {
  const { topCategoryId, secondCategoryId, thirdCategoryId } = req.body;

  try {
    const result = await Categories.findOneAndUpdate(
      { _id: topCategoryId, "secondLevelCategories._id": secondCategoryId },
      {
        $pull: { "secondLevelCategories.$.thirdLevelCategories": { _id: thirdCategoryId } }
      },
      { new: true }
    );

    if (!result) return res.status(400).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};