const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      name: user.name,
      id: user._id,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
      paymentInformation: user.paymentInformation,
      ratings: user.ratings,
      reviews: user.reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
