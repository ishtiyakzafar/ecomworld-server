const Product = require("../models/product");
const { men_jeans } = require("../productData/Men/men_jeans");

const data = [
  {
    "brand": "Nike",
    "title": "Men's Cotton T-Shirt",
    "description": "Soft and breathable cotton t-shirt.",
    "color": "blue",
    "price": 4000,
    "discountedPrice": 2000,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 10 },
      { "name": "M", "quantity": 15 },
      { "name": "L", "quantity": 12 }
    ],
    "imageUrl": ["https://example.com/nike-tshirt-blue.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "t-shirts",
    "numRatings": 110,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Nike",
    "title": "Men's Performance Shorts",
    "description": "Lightweight and flexible sports shorts.",
    "color": "black",
    "price": 3500,
    "discountedPrice": 1750,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 8 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 10 }
    ],
    "imageUrl": ["https://example.com/nike-shorts-black.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "shorts",
    "numRatings": 95,
    "tags": ["BEST_SELLER"]
  },
  {
    "brand": "Nike",
    "title": "Men's Winter Jacket",
    "description": "Insulated and stylish winter jacket.",
    "color": "red",
    "price": 10000,
    "discountedPrice": 5000,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 6 },
      { "name": "M", "quantity": 10 },
      { "name": "L", "quantity": 8 }
    ],
    "imageUrl": ["https://example.com/nike-jacket-red.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "jackets",
    "numRatings": 120,
    "tags": ["ON_SALE"]
  },
  {
    "brand": "Nike",
    "title": "Men's Training Sportswear",
    "description": "High-performance training sportswear.",
    "color": "gray",
    "price": 7000,
    "discountedPrice": 3500,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 7 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 10 }
    ],
    "imageUrl": ["https://example.com/nike-sportswear-gray.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "sportswear",
    "numRatings": 130,
    "tags": ["ON_SALE"]
  },
  {
    "brand": "Nike",
    "title": "Men's Classic Joggers",
    "description": "Comfortable and stylish joggers for everyday wear.",
    "color": "navy blue",
    "price": 5500,
    "discountedPrice": 2750,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 9 },
      { "name": "M", "quantity": 14 },
      { "name": "L", "quantity": 11 }
    ],
    "imageUrl": ["https://example.com/nike-joggers-navyblue.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "joggers",
    "numRatings": 115,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Nike",
    "title": "Men's Graphic T-Shirt",
    "description": "Trendy graphic printed t-shirt for casual wear.",
    "color": "yellow",
    "price": 4200,
    "discountedPrice": 2100,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 8 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 9 }
    ],
    "imageUrl": ["https://example.com/nike-tshirt-yellow.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "t-shirts",
    "numRatings": 100,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Nike",
    "title": "Men's Breathable Shorts",
    "description": "Designed for optimal airflow and comfort.",
    "color": "olive green",
    "price": 3800,
    "discountedPrice": 1900,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 7 },
      { "name": "M", "quantity": 13 },
      { "name": "L", "quantity": 11 }
    ],
    "imageUrl": ["https://example.com/nike-shorts-olivegreen.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "shorts",
    "numRatings": 85,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Nike",
    "title": "Men's Lightweight Jacket",
    "description": "All-season lightweight and water-resistant jacket.",
    "color": "black",
    "price": 11000,
    "discountedPrice": 5500,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 6 },
      { "name": "M", "quantity": 9 },
      { "name": "L", "quantity": 7 }
    ],
    "imageUrl": ["https://example.com/nike-jacket-black.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "jackets",
    "numRatings": 125,
    "tags": ["ON_SALE"]
  },
  {
    "brand": "Nike",
    "title": "Men's Performance Joggers",
    "description": "Stretchable and lightweight joggers for workouts.",
    "color": "dark gray",
    "price": 6000,
    "discountedPrice": 3000,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 10 },
      { "name": "M", "quantity": 14 },
      { "name": "L", "quantity": 10 }
    ],
    "imageUrl": ["https://example.com/nike-joggers-darkgray.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "joggers",
    "numRatings": 140,
    "tags": ["BEST_SELLER"]
  },
  {
    "brand": "Nike",
    "title": "Men's Active Sportswear Set",
    "description": "Complete sportswear set for training sessions.",
    "color": "royal blue",
    "price": 9000,
    "discountedPrice": 4500,
    "discountPercent": 50,
    "size": [
      { "name": "S", "quantity": 7 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 8 }
    ],
    "imageUrl": ["https://example.com/nike-sportswear-royalblue.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "sportswear",
    "numRatings": 135,
    "tags": ["NEW_ARRIVAL"]
  }
]


exports.createProduct = async (req, res) => {
  try {
    const product = await Product.insertMany(data);

    // const newProduct = new Product(req.body);
    // const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
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
                {}
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