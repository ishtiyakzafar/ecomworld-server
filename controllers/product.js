const Product = require("../models/product");
const { men_jeans } = require("../productData/Men/men_jeans");

const data = [
  {
    "brand": "Nike",
    "title": "Men's Sports T-Shirt",
    "description": "Breathable and moisture-wicking sports t-shirt.",
    "color": "Black",
    "price": 40,
    "discountedPrice": 30,
    "discountPercent": 25,
    "size": [
      { "name": "S", "quantity": 10 },
      { "name": "M", "quantity": 15 },
      { "name": "L", "quantity": 12 }
    ],
    "imageUrl": ["https://example.com/nike-tshirt.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "t-shirts",
    "numRatings": 120,
    "tags": ["BEST_SELLER"]
  },
  {
    "brand": "Adidas",
    "title": "Women's Yoga Leggings",
    "description": "Stretchable and comfortable leggings for yoga and workouts.",
    "color": "Grey",
    "price": 60,
    "discountedPrice": 50,
    "discountPercent": 16,
    "size": [
      { "name": "S", "quantity": 12 },
      { "name": "M", "quantity": 10 },
      { "name": "L", "quantity": 8 }
    ],
    "imageUrl": ["https://example.com/adidas-leggings.jpg"],
    "topLevelCategory": "women",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "leggings",
    "numRatings": 95,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Puma",
    "title": "Men's Training Shorts",
    "description": "Lightweight training shorts for gym and sports activities.",
    "color": "Navy Blue",
    "price": 35,
    "discountedPrice": 28,
    "discountPercent": 20,
    "size": [
      { "name": "S", "quantity": 15 },
      { "name": "M", "quantity": 18 },
      { "name": "L", "quantity": 14 }
    ],
    "imageUrl": ["https://example.com/puma-shorts.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "shorts",
    "numRatings": 110,
    "tags": ["ON_SALE"]
  },
  {
    "brand": "H&M",
    "title": "Women's Cotton Hoodie",
    "description": "Soft and warm cotton hoodie for everyday wear.",
    "color": "Pink",
    "price": 70,
    "discountedPrice": 55,
    "discountPercent": 21,
    "size": [
      { "name": "S", "quantity": 8 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 10 }
    ],
    "imageUrl": ["https://example.com/hm-hoodie.jpg"],
    "topLevelCategory": "women",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "hoodies",
    "numRatings": 85,
    "tags": ["BEST_SELLER"]
  },
  {
    "brand": "Levi's",
    "title": "Men's Denim Jacket",
    "description": "Classic denim jacket with a stylish fit.",
    "color": "Blue",
    "price": 100,
    "discountedPrice": 85,
    "discountPercent": 15,
    "size": [
      { "name": "S", "quantity": 10 },
      { "name": "M", "quantity": 10 },
      { "name": "L", "quantity": 5 }
    ],
    "imageUrl": ["https://example.com/levis-jacket.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "jackets",
    "numRatings": 150,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Zara",
    "title": "Women's Summer Dress",
    "description": "Floral print summer dress with a lightweight fabric.",
    "color": "Yellow",
    "price": 90,
    "discountedPrice": 75,
    "discountPercent": 17,
    "size": [
      { "name": "S", "quantity": 8 },
      { "name": "M", "quantity": 15 },
      { "name": "L", "quantity": 10 }
    ],
    "imageUrl": ["https://example.com/zara-dress.jpg"],
    "topLevelCategory": "women",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "dresses",
    "numRatings": 95,
    "tags": ["ON_SALE"]
  },
  {
    "brand": "Reebok",
    "title": "Men's Compression Shirt",
    "description": "Compression fit shirt for enhanced performance.",
    "color": "White",
    "price": 50,
    "discountedPrice": 40,
    "discountPercent": 20,
    "size": [
      { "name": "S", "quantity": 12 },
      { "name": "M", "quantity": 18 },
      { "name": "L", "quantity": 8 }
    ],
    "imageUrl": ["https://example.com/reebok-shirt.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "sportswear",
    "numRatings": 130,
    "tags": ["BEST_SELLER"]
  },
  {
    "brand": "Forever 21",
    "title": "Women's Crop Top",
    "description": "Trendy crop top with a comfortable fit.",
    "color": "Red",
    "price": 30,
    "discountedPrice": 25,
    "discountPercent": 16,
    "size": [
      { "name": "S", "quantity": 15 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 10 }
    ],
    "imageUrl": ["https://example.com/forever21-crop-top.jpg"],
    "topLevelCategory": "women",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "tops",
    "numRatings": 70,
    "tags": ["NEW_ARRIVAL"]
  },
  {
    "brand": "Under Armour",
    "title": "Men's Training Joggers",
    "description": "Comfortable and stretchable joggers for daily workouts.",
    "color": "Black",
    "price": 65,
    "discountedPrice": 55,
    "discountPercent": 15,
    "size": [
      { "name": "S", "quantity": 14 },
      { "name": "M", "quantity": 10 },
      { "name": "L", "quantity": 8 }
    ],
    "imageUrl": ["https://example.com/ua-joggers.jpg"],
    "topLevelCategory": "men",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "joggers",
    "numRatings": 105,
    "tags": ["BEST_SELLER"]
  },
  {
    "brand": "Hollister",
    "title": "Women's Casual Sweatshirt",
    "description": "Soft and cozy sweatshirt for casual outings.",
    "color": "Grey",
    "price": 80,
    "discountedPrice": 65,
    "discountPercent": 18,
    "size": [
      { "name": "S", "quantity": 10 },
      { "name": "M", "quantity": 12 },
      { "name": "L", "quantity": 15 }
    ],
    "imageUrl": ["https://example.com/hollister-sweatshirt.jpg"],
    "topLevelCategory": "women",
    "secondLevelCategory": "clothing",
    "thirdLevelCategory": "sweatshirts",
    "numRatings": 125,
    "tags": ["ON_SALE"]
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
    const { level = "", category, color, price, size, brand, discount, search } = req.query;

    const [topLevel, secondLevel, thirdLevel] = level.split(",");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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
        { thirdLevelCategory: { $regex: searchTerm } },
        { title: { $regex: searchTerm } },
        { description: { $regex: searchTerm } }
      ];
    }

    const products = await Product.find(query).skip(skip).limit(limit);
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
