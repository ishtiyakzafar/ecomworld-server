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
connectDB();

// Import routes
const productRoutes = require('./routes/product');
const supplierRoutes = require('./routes/supplier');
const userRoutes = require('./routes/user');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('ecomworld server is up and running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
