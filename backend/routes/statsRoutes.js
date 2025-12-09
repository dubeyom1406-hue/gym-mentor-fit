import express from 'express';
const router = express.Router();
import { getStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/', protect, getStats);

export default router;
