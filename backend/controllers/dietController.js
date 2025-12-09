import asyncHandler from 'express-async-handler';
import Diet from '../models/Diet.js';

// @desc    Get user diet plans
// @route   GET /api/diets
// @access  Private
const getDiets = asyncHandler(async (req, res) => {
    const diets = await Diet.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(diets);
});

// @desc    Create a diet plan
// @route   POST /api/diets
// @access  Private
const createDiet = asyncHandler(async (req, res) => {
    const { name, meals } = req.body;

    if (!name || !meals || meals.length === 0) {
        res.status(400);
        throw new Error('Please add a diet plan name and at least one meal');
    }

    const diet = await Diet.create({
        user: req.user._id,
        name,
        meals,
    });

    res.status(201).json(diet);
});

// @desc    Delete a diet plan
// @route   DELETE /api/diets/:id
// @access  Private
const deleteDiet = asyncHandler(async (req, res) => {
    const diet = await Diet.findById(req.params.id);

    if (diet) {
        if (diet.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        await diet.deleteOne();
        res.json({ message: 'Diet plan removed' });
    } else {
        res.status(404);
        throw new Error('Diet plan not found');
    }
});

export { getDiets, createDiet, deleteDiet };
