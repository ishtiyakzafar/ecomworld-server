const Cart = require("../models/cart");
const Product = require("../models/product");


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const isCartExist = await Cart.findOne({ userId: req.user.id });
    const product = await Product.findById(productId);

    if (product.quantity === 0) {
      return res.status(200).json({ message: 'The item is currently out of stock.' });
    } else if (quantity > product.quantity) {
      return res.status(200).json({ message: `Only ${product.quantity} items are left to order.` });
    }

    if (!isCartExist) {
      const newCart = new Cart({ userId: req.user.id, cartItems: [{ productId, quantity }] })
      await newCart.save();

      await Product.findByIdAndUpdate(productId, { quantity: product.quantity - quantity }, { new: true });

      res.status(200).json(newCart);
    } else {
      let cart;

      const isProductExist = isCartExist.cartItems.find((item) => item.productId == productId);

      if (isProductExist) {
        cart = await Cart.findOneAndUpdate(
          { userId: req.user.id, 'cartItems.productId': productId },
          { $set: { 'cartItems.$.quantity': isProductExist.quantity + quantity } },
          { new: true }
        );
      } else {
        cart = await Cart.findOneAndUpdate(
          { userId: req.user.id, 'cartItems.productId': { $ne: productId } },
          { $push: { cartItems: { productId, quantity } } },
          { new: true }
        );
      }

      await Product.findByIdAndUpdate(productId, { quantity: product.quantity - quantity }, { new: true });
      res.status(200).json(cart);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


