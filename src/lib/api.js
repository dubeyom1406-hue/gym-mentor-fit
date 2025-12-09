import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
// Force production URL to avoid "Mixed Content" or incorrectly set Env Vars
export const API_URL = isDevelopment
    ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
    : 'https://gym-mentor-fit.vercel.app';

const api = axios.create({
    baseURL: API_URL,
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

export default api;
