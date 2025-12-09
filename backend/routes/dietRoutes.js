import express from 'express';
const router = express.Router();
import { getDiets, createDiet, deleteDiet } from '../controllers/dietController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getDiets).post(protect, createDiet);
router.route('/:id').delete(protect, deleteDiet);

export default router;
