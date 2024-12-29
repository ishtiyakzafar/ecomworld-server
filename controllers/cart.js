const Cart = require("../models/cart");
const Product = require("../models/product");


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "cartItems.productId",
      "brand title price discountedPrice imageUrl quantity discountPercent"
    );

    let totalPrice = 0;
    let totalDiscountedPrice = 0;

    cart.cartItems.forEach((item) => {
      totalPrice += item.productId.price * item.quantity;
      totalDiscountedPrice += item.productId.discountedPrice * item.quantity;
    })

    res.status(200).json({
      _id: cart._id,
      user: cart.userId,
      cartItems: cart.cartItems,
      totalPrice,
      totalDiscountedPrice,
      totalDiscount: (((totalPrice - totalDiscountedPrice) / totalPrice) * 100).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const isCartExist = await Cart.findOne({ userId: req.user.id });
    if (!isCartExist) return res.status(400).json({ message: 'Cart not found' });

    const product = await Product.findById(req.body.productId);
    if (product.quantity === 0) return res.status(200).json({ message: `You have reach the order limit.` });

    const isProductExist = isCartExist.cartItems.find((item) => item.productId == req.body.productId);
    let cartDetail;

    if (isProductExist) {
      cartDetail = await Cart.findOneAndUpdate(
        { userId: req.user.id, 'cartItems.productId': req.body.productId },
        { $set: { 'cartItems.$.quantity': isProductExist.quantity + 1 } },
        { new: true }
      );
    } else {
      cartDetail = await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $push: { cartItems: { productId: req.body.productId, quantity: 1 } } },
        { new: true }
      );
    }

    await Product.findByIdAndUpdate(req.body.productId, { quantity: product.quantity - 1 }, { new: true });
    res.status(200).json(cartDetail);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const cartProduct = cart.cartItems.find((item) => item.productId == req.body.productId);
    if (!cartProduct) return res.status(400).json({ message: 'Cart item not found' });

    let cartDetail;

    if (cartProduct.quantity === 1) {
      cartDetail = await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $pull: { cartItems: { productId: req.body.productId } } },
        { new: true }
      );
    } else {
      cartDetail = await Cart.findOneAndUpdate(
        { _id: cart._id, 'cartItems.productId': req.body.productId },
        { $set: { 'cartItems.$.quantity': cartProduct.quantity - 1 } },
        { new: true }
      );
    }

    const product = await Product.findById(req.body.productId);
    await Product.findByIdAndUpdate(req.body.productId, { quantity: product.quantity + 1 }, { new: true });

    res.status(200).json(cartDetail);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};