import asyncHandler from 'express-async-handler';
import Workout from '../models/Workout.js';
import Diet from '../models/Diet.js';

// @desc    Get user stats
// @route   GET /api/stats
// @access  Private
const getStats = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id });
    const diets = await Diet.find({ user: req.user._id });

    // Calculate total workouts
    const totalWorkouts = workouts.length;

    // Calculate total calories (sum of all meals in all diet plans)
    // Note: This is a simplification. Ideally we'd track daily intake. 
    // For now, we sum up the potential calories of all created plans.
    let totalCalories = 0;
    diets.forEach(diet => {
        diet.meals.forEach(meal => {
            totalCalories += Number(meal.calories);
        });
    });

    // Mock data for charts (since we don't have historical tracking yet)
    // In a real app, we would query workouts by date
    const activityData = [
        { name: 'Mon', workouts: 0 },
        { name: 'Tue', workouts: 0 },
        { name: 'Wed', workouts: 0 },
        { name: 'Thu', workouts: 0 },
        { name: 'Fri', workouts: 0 },
        { name: 'Sat', workouts: 0 },
        { name: 'Sun', workouts: 0 },
    ];

    // Simple logic to populate mock activity based on real workout count
    // Distribute total workouts across the week for visualization
    let remainingWorkouts = totalWorkouts;
    let dayIndex = 0;
    while (remainingWorkouts > 0) {
        activityData[dayIndex].workouts += 1;
        remainingWorkouts--;
        dayIndex = (dayIndex + 1) % 7;
    }

    res.json({
        totalWorkouts,
        totalCalories,
        activityData,
        weight: req.user.weight || 0,
        height: req.user.height || 0,
    });
});

export { getStats };
