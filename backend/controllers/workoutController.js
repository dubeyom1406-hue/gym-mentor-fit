import asyncHandler from 'express-async-handler';
import Workout from '../models/Workout.js';

// @desc    Get user workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(workouts);
});

// @desc    Create a workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req, res) => {
    const { name, exercises } = req.body;

    if (!name || !exercises || exercises.length === 0) {
        res.status(400);
        throw new Error('Please add a workout name and at least one exercise');
    }

    const workout = await Workout.create({
        user: req.user._id,
        name,
        exercises,
    });

    res.status(201).json(workout);
});

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
        if (workout.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        await workout.deleteOne();
        res.json({ message: 'Workout removed' });
    } else {
        res.status(404);
        throw new Error('Workout not found');
    }
});

export { getWorkouts, createWorkout, deleteWorkout };
