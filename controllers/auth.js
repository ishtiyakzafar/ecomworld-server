const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart");


// Create a new user
exports.createUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).json({ message: "User with this email already exists" });
    const user = new User(req.body);
    await user.save();

    const newCart = new Cart({ userId: user._id })
    await newCart.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });
    res.status(201).json({ token, message: "register success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

    res.status(200).json({ token, message: "login success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};
