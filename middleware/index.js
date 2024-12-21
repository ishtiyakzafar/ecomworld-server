const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Authorization required' });
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

exports.adminAndSupplierMiddleware = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "supplier") {
    next();
  }else{
    return res.status(400).json({ message: `${req.user.role} access denied` });
  }
};
