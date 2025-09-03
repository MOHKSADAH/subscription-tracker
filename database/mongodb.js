import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error('DB_URI is not defined inside .env<development/production>.local');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to DATABASE (${NODE_ENV} mode)`);
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
        process.exit(1);
    }
};

export default connectToDatabase;
