import express from 'express';
const router = express.Router();
import { registerUser, authUser, getUserProfile, updateUserProfile, googleAuth, healthCheck } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/google', googleAuth);
router.get('/health', healthCheck); // Add health check endpoint
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;