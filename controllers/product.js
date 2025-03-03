const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { level = "", category, color, price, size, brand, discount, search, sort } = req.query;

    const [topLevel, secondLevel, thirdLevel] = level.split(",");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const query = {};

    if (topLevel) query.topLevelCategory = topLevel;
    if (secondLevel) query.secondLevelCategory = secondLevel;
    if (thirdLevel) query.thirdLevelCategory = thirdLevel;


    if (category && topLevel && !secondLevel && !thirdLevel) {
      query.secondLevelCategory = { $in: category.split(',') };
    }

    if (category && topLevel && secondLevel && !thirdLevel) {
      query.thirdLevelCategory = { $in: category.split(',') };
    }

    if (brand) {
      query.brand = { $in: brand.split(',') };
    }

    if (color) {
      query.color = { $in: color.split(',') };
    }

    if (price) {
      const priceRanges = price.split(',').map(range => {
        const [min, max] = range.split('-').map(Number);
        return { discountedPrice: { $gte: min, $lte: max } };
      });

      query.$or = priceRanges;
    }

    if (size) {
      const sizeMapping = { small: "S", medium: "M", large: "L" };
      const convertedSizes = size.split(',').map(size => sizeMapping[size]).filter(Boolean);

      query.size = { $elemMatch: { name: { $in: convertedSizes }, quantity: { $gt: 0 } } };
    }

    if (discount) {
      query.discountPercent = { $gte: discount };
    }

    if (search) {
      const searchTerm = new RegExp(search, "i");

      query.$or = [
        { brand: { $regex: searchTerm } },
        { color: { $regex: searchTerm } },
        { topLevelCategory: { $regex: searchTerm } },
        { secondLevelCategory: { $regex: searchTerm } },
        { thirdLevelCategory: { $regex: searchTerm } },
        { title: { $regex: searchTerm } },
        { description: { $regex: searchTerm } },
      ];
    }

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(
        sort === "asc" ? { brand: 1 } :
          sort === "desc" ? { brand: -1 } :
            sort === "price_low" ? { discountedPrice: 1 } :
              sort === "price_high" ? { discountedPrice: -1 } :
                { createdAt: -1 }
      );

    const totalProduct = await Product.countDocuments(query);

    res.status(200).json({
      products,
      pagination: {
        totalProduct,
        totalPage: Math.ceil(totalProduct / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getProductsWithTags = async (req, res) => {
  try {
    const products = await Product.find({ tags: { $exists: true, $not: { $size: 0 } } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Product.aggregate([
      { $group: { _id: "$brand", brandId: { $first: "$_id" } } },
      { $project: { id: "$brandId", brand: "$_id", _id: 0 } },
      { $sort: { brand: 1 } }
    ]);
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getColors = async (req, res) => {
  try {
    const colors = await Product.aggregate([
      { $group: { _id: "$color", colorId: { $first: "$_id" } } },
      { $project: { id: "$colorId", color: "$_id", _id: 0 } },
      { $sort: { color: 1 } }
    ]);

    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getSimilarProduct = async (req, res) => {
  try {
    const products = await Product.find({ thirdLevelCategory: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};