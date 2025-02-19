const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization required' });
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "CUSTOMER") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

exports.verifyAccessToken = (req, res, next) => {
  try {
    const user = jwt.verify(req.body.token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization required' });
  }
};

