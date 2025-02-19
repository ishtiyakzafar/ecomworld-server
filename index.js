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


app.get('/', (req, res) => {
    res.json({ message: 'ecomworld server is up and running!', status: 'success' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
