const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Security Headers
app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(express.json());

// Connect to the database
connectDB().catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
});

// Import & Use Routes
const routes = [
    // { path: '/api/auth', module: './routes/auth' },
    // { path: '/api/users', module: './routes/user' },
    { path: '/api/products', module: './routes/product' },
    // { path: '/api/cart', module: './routes/cart' },
    // { path: '/api/address', module: './routes/address' },
    // { path: '/api/orders', module: './routes/order' },
    // { path: '/api/wishlist', module: './routes/wishlist' },
    // { path: '/api/categories', module: './routes/categories' },
];

routes.forEach(route => app.use(route.path, require(route.module)));

app.get('/', (req, res) => {
    res.json({ message: 'ecomworld server is up and running!', status: 'success' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
