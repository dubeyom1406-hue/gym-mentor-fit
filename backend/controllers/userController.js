import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Update user subscription (Admin)
// @route   PUT /api/users/:id/subscription
// @access  Private/Admin
const updateUserSubscription = asyncHandler(async (req, res) => {
    const { subscription } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { subscription },
        { new: true, runValidators: true }
    );

    if (updatedUser) {
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            subscription: updatedUser.subscription,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { getUsers, deleteUser, updateUserSubscription };
