const Wishlist = require("../models/wishlist");

exports.addProductToWishlist = async (req, res) => {
  try {
    const isItemExist = await Wishlist.findOne({ userId: req.user.id, productId: req.body.productId });
    if (isItemExist) return res.status(400).json({ message: 'Product already added to wishlist' });

    const newWishlist = new Wishlist({ userId: req.user.id, productId: req.body.productId });
    const wishlist = await newWishlist.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id }).populate(
      "productId",
      "brand size quantity color title price discountedPrice imageUrl discountPercent"
    );

    res.status(200).json(wishlist.map((item) => ({ ...item.productId._doc })));

  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.deleteProductFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({ productId: req.params.id });
    if (wishlist) {
      res.status(200).json({ message: 'Product deleted from wishlist', wishlist });
    } else {
      res.status(200).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.getWishlistCount = async (req, res) => {
  try {
    const wishlistCount = await Wishlist.countDocuments({ userId: req.user.id });
    res.status(200).json({ wishlistCount });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

