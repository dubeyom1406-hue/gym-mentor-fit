import express from 'express';
const router = express.Router();
import { upgradeUser } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/upgrade', protect, upgradeUser);

export default router;
