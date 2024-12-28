const Product = require("../models/product");


exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchPattern = new RegExp(searchTerm, "i");
    const skip = (page - 1) * limit;

    const products = await Product.find({
      $or: [
        { name: { $regex: searchPattern } },
        { description: { $regex: searchPattern } },
      ],
    })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments({
      $or: [
        { name: { $regex: searchPattern } },
        { description: { $regex: searchPattern } },
      ],
    });

    res.json({
      products,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getProductsByType = async (req, res) => {
  try {
    const products = await Product.find({ productType: { $in: ["onsale", "newarrival", "bestseller"] } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
