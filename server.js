import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './backend/config/db.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enhanced CORS configuration for Vercel deployment
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5000',
            'https://mentorphysical.site',
            'https://gym-mentor-fit.vercel.app',
            // Allow any vercel.app subdomain for preview deployments
            'vercel.app'
        ];
        
        // Check if origin is in allowed list or ends with vercel.app
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.includes('mentorphysical')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization']
}));

app.use(express.json());

console.log('Server initialized');

// Routes
import authRoutes from './backend/routes/authRoutes.js';
import workoutRoutes from './backend/routes/workoutRoutes.js';
import dietRoutes from './backend/routes/dietRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import subscriptionRoutes from './backend/routes/subscriptionRoutes.js';
import statsRoutes from './backend/routes/statsRoutes.js';
import documentRoutes from './backend/routes/documentRoutes.js';
import postRoutes from './backend/routes/postRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Create a Router
const apiRouter = express.Router();

// Mount routes on the router
apiRouter.use('/auth', authRoutes);
apiRouter.use('/workouts', workoutRoutes);
apiRouter.use('/diets', dietRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/subscription', subscriptionRoutes);
apiRouter.use('/stats', statsRoutes);
apiRouter.use('/documents', documentRoutes);
apiRouter.use('/posts', postRoutes);

apiRouter.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mongoConfigured: !!process.env.MONGO_URI,
        env: process.env.NODE_ENV
    });
});

app.use('/api', apiRouter);
app.use('/', apiRouter);

// Make uploads folder static (handled by app, not router)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// For Vercel deployment, we need to export a handler function
// This is for the serverless function entry point
export default app;

// Only listen locally when not in Vercel environment
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}