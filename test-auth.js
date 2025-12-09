import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    console.log('Testing Authentication...');

    // 1. Signup
    const signupData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
    };

    try {
        console.log(`\n1. Testing Signup with ${signupData.email}...`);
        const signupRes = await axios.post(`${API_URL}/signup`, signupData);
        console.log('Signup Successful!');
        console.log('User ID:', signupRes.data._id);
        console.log('Token:', signupRes.data.token ? 'Received' : 'Missing');
    } catch (error) {
        console.error('Signup Failed:', error.response ? error.response.data : error.message);
    }

    // 2. Login
    const loginData = {
        email: signupData.email,
        password: 'password123'
    };

    try {
        console.log(`\n2. Testing Login with ${loginData.email}...`);
        const loginRes = await axios.post(`${API_URL}/login`, loginData);
        console.log('Login Successful!');
        console.log('User ID:', loginRes.data._id);
        console.log('Token:', loginRes.data.token ? 'Received' : 'Missing');
    } catch (error) {
        console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
}

testAuth();
