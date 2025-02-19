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

// Import & Use Routes
const routes = [
    { path: '/api/auth', module: './routes/auth' },
    { path: '/api/users', module: './routes/user' },
    { path: '/api/products', module: './routes/product' },
    { path: '/api/cart', module: './routes/cart' },
    { path: '/api/address', module: './routes/address' },
    { path: '/api/orders', module: './routes/order' },
    { path: '/api/wishlist', module: './routes/wishlist' },
    { path: '/api/categories', module: './routes/categories' },
];

routes.forEach(route => app.use(route.path, require(route.module)));

app.get('/', (req, res) => {
    res.json({ message: 'ecomworld server is up and running!', status: 'success' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
