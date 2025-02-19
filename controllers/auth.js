const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");

const addMultipleCartItems = async (userId, cartItemsArr) => {
  try {
    const isUserExist = await Cart.findOne({ userId });
    const cartItems = cartItemsArr.map((item) => ({ ...item, userId }));

    if (!isUserExist) {
      await Cart.insertMany(cartItems);
    } else {
      const userCartItems = await Cart.find({ userId }).populate('productId', 'size');

      cartItems.map(async (product) => {
        const isProductExist = userCartItems.findIndex((item) => item.productId._id == product.productId && item.size === product.size);

        if (isProductExist === -1) {
          const datat = new Cart({ ...product });
          await datat.save();
        } else {
          const totalQty = userCartItems[isProductExist].productId.size.find((item) => item.name === product.size).quantity;
          const cartQty = userCartItems[isProductExist].quantity;

          await Cart.findOneAndUpdate(
            { _id: userCartItems[isProductExist]._id },
            { quantity: totalQty - cartQty >= product.quantity ? cartQty + product.quantity : product.quantity },
            { new: true }
          );
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.createUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).json({ message: "Invalid credential" });
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

    if (req.body.cartItems) await addMultipleCartItems(user._id, req.body.cartItems);

    const cartCount = await Cart.countDocuments({ userId: user._id });
    const wishlistCount = await Wishlist.countDocuments({ userId: user._id });

    res.status(201).json({
      success: true,
      message: "register success",
      userDetails: {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        cartCount,
        wishlistCount,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credential" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credential" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

    if (req.body.cartItems) await addMultipleCartItems(user._id, req.body.cartItems);

    const cartCount = await Cart.countDocuments({ userId: user._id });
    const wishlistCount = await Wishlist.countDocuments({ userId: user._id });

    res.status(200).json({
      success: true,
      message: "login success",
      userDetails: {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        cartCount,
        wishlistCount,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

exports.getAccessToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.status(200).json({ token: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};