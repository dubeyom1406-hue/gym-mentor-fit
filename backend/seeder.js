import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Check if admin already exists
        const userExists = await User.findOne({ email: 'admin@example.com' });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123', // The model will hash this
            isAdmin: true,
        });

        console.log('Admin User Created!');
        console.log('Email: admin@example.com');
        console.log('Password: password123');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
