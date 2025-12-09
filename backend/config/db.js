import mongoose from 'mongoose';
import { MONGO_URI } from './credentials.js';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI || MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Do not exit process in serverless env
        // process.exit(1); 
    }
};

export default connectDB;
