import express from 'express';
const router = express.Router();
import { getUsers, deleteUser, updateUserSubscription } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id/subscription').put(protect, admin, updateUserSubscription);

export default router;
