import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    console.log('Testing MongoDB Connection...');
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error('❌ Error: MONGO_URI is missing in .env file');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log('✅ Success: Sandbox Connected!');
        console.log('Your connection string is correct and your IP is allowed.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
        console.log('\nPotential causes:');
        console.log('1. Password is wrong.');
        console.log('2. Network Access in MongoDB Atlas is not set to 0.0.0.0/0 (Allow Anywhere).');
        console.log('3. Firewall is blocking the connection.');
        process.exit(1);
    }
};

testConnection();
