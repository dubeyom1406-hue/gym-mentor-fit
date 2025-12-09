import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
// Updated to handle Vercel deployment correctly
const getApiUrl = () => {
    if (isDevelopment) {
        return import.meta.env.VITE_API_URL || 'http://localhost:5000';
    }
    // For production/Vercel, we need to determine the correct API endpoint
    // If we're on the same domain as the deployed app, API is at /api
    // Otherwise, use the environment variable if set
    if (typeof window !== 'undefined') {
        // Client-side
        const isSameDomain = window.location.hostname.includes('vercel.app') || 
                             window.location.hostname.includes('mentorphysical.site');
        if (isSameDomain) {
            return '/api'; // Relative path for same-domain API calls
        }
    }
    // Fallback to environment variable or default
    return import.meta.env.VITE_API_URL || 'https://gym-mentor-fit.vercel.app/api';
};

export const API_URL = getApiUrl();

const api = axios.create({
    baseURL: API_URL,
    // Add timeout to prevent hanging requests
    timeout: 15000, // Increased to 15 seconds for production
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle network errors specifically
        if (!error.response) {
            // Network error (no response received)
            console.error('Network error:', error.message);
            return Promise.reject(new Error('Network error: Unable to connect to server. Please check your internet connection.'));
        }
        
        // Handle other HTTP errors
        console.error('API Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export default api;