const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected...');
    } catch (err) {
        console.error('❌ Could not connect to MongoDB...', err);
        process.exit(1);
    }
};

// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;
