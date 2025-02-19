const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// Connect to the database
connectDB().catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const wishlistRoutes = require("./routes/wishlist");
const categoriesRoutes = require("./routes/categories");

app.get('/', (req, res) => {
    res.json({ message: 'ecomworld server is up and running!', status: 'success' });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/categories", categoriesRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
