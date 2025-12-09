import express from 'express';
const router = express.Router();
import { getWorkouts, createWorkout, deleteWorkout } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getWorkouts).post(protect, createWorkout);
router.route('/:id').delete(protect, deleteWorkout);

export default router;
