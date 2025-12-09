import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './backend/config/db.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

export default app;
