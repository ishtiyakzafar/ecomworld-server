const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  try {
    const isCartExist = await Cart.findOne({ userId: req.user.id });
    let cartItem;

    if (!isCartExist) {
      cartItem = new Cart({ userId: req.user.id, quantity: 1, ...req.body });
      await cartItem.save();
      res.status(200).json({ message: 'Product added to your cart', cartItem });
    } else {
      const isProductExist = await Cart.findOne({ userId: req.user.id, productId: req.body.productId, size: req.body.size }).populate('productId', 'size');

      if (!isProductExist) {
        cartItem = new Cart({ userId: req.user.id, quantity: 1, ...req.body });
        await cartItem.save();
        res.status(200).json({ message: 'Product added to your cart', cartItem });
      } else {
        if (isProductExist.productId.size.find((item) => item.name === req.body.size).quantity > isProductExist.quantity) {
          cartItem = await Cart.findOneAndUpdate(
            { _id: isProductExist._id },
            { $inc: { 'quantity': 1 } },
            { new: true }
          );
          res.status(200).json({ message: 'Product qunatity increased by 1 in your cart', cartItem });
        } else {
          res.status(400).json({ message: "You have already added the maximum quantity of this product to cart" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.id }).populate(
      "productId",
      "brand size title color price discountedPrice imageUrl quantity discountPercent"
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.deleteCartProduct = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (cartItem) {
      res.status(200).json({ message: 'Product remove from your cart', cartItem });
    } else {
      res.status(400).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.incCartProductQty = async (req, res) => {
  try {
    const cartProduct = await Cart.findById(req.params.id).populate('productId', 'size');

    if (cartProduct.productId.size.find((item) => item.name === cartProduct.size).quantity > cartProduct.quantity) {
      const cartItem = await Cart.findByIdAndUpdate(req.params.id, { $inc: { 'quantity': 1 } }, { new: true });
      res.status(200).json({ message: 'Product quantity increased by 1', cartItem });
    } else {
      res.status(400).json({ message: "You have the maximum quantity of this product to cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.decCartProductQty = async (req, res) => {
  try {
    const cartProduct = await Cart.findById(req.params.id).populate('productId', 'size');

    if (cartProduct.quantity > 1) {
      const cartItem = await Cart.findByIdAndUpdate(req.params.id, { $inc: { 'quantity': -1 } }, { new: true });
      res.status(200).json({ message: 'Product quantity decreased by 1', cartItem });
    } else {
      res.status(400).json({ message: "You have the least quantity of this product to cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}

exports.getCartProductCount = async (req, res) => {
  try {
    const cartCount = await Cart.countDocuments({ userId: req.user.id });
    res.status(200).json({ cartCount });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
}
