const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const OtpStore = require("../models/otpStore");


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

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).json({ message: "Email already exists." });

    const user = new User(req.body);
    await user.save();


  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credential" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credential" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

    res.status(200).json({
      message: "login success",
      userDetails: {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    await OtpStore.findOneAndDelete({ email });

    const otp = crypto.randomInt(100000, 999999).toString();
    const createdAt = Date.now() + 2 * 60 * 1000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'zaferistak@gmail.com',
        pass: 'zwitfbjcfwyuivwp'
      }
    });

    const mailOptions = {
      from: '"EcomWorld" <no-reply@ecomworld.com>',
      to: email,
      subject: "Email Verification - EcomWorld",
      html: `
        <p>Hi ${email},</p>
        <p>Thank you for signing up with EcomWorld! To verify your email, please use the One-Time Password (OTP) below:</p>
        <p>Your OTP Code: ${otp}</p>
        <p>This OTP is valid for 10 minutes. Please do not share this code with anyone for security reasons.</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
        <p>Happy shopping!</p>
        <p>Welcome to EcomWorld.</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);

      const newOtp = new OtpStore({ email, otp, createdAt });
      await newOtp.save();

      res.status(200).json({ message: "OTP sent successfully. Please check your email." });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong eeeeeee " + error });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp, cartItems } = req.body;

    const result = await OtpStore.findOne({ email });

    if (!result) return res.status(400).json({ message: "OTP has expired." });
    if (result.otp !== otp) return res.status(400).json({ message: "Invalid OTP." });

    await OtpStore.findOneAndDelete({ email });

    let user;
    user = await User.findOne({ email });

    if (!user) {
      const newUser = new User(req.body);
      user = await newUser.save();
    }

    if (cartItems) await addMultipleCartItems(user._id, cartItems);
    const cartCount = await Cart.countDocuments({ userId: user._id });
    const wishlistCount = await Wishlist.countDocuments({ userId: user._id });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

    res.status(200).json({
      message: "OTP verified successfully. User registered.",
      userDetails: {
        email: user.email,
        role: user.role,
        token,
        cartCount,
        wishlistCount,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

exports.getAccessToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.status(200).json({ token: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};