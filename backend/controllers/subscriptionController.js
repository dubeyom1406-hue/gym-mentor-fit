import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Upgrade user to premium
// @route   POST /api/subscription/upgrade
// @access  Private
const upgradeUser = asyncHandler(async (req, res) => {
    const { plan } = req.body; // Expect 'Basic' or 'Premium'

    if (!plan || !['Basic', 'Premium'].includes(plan)) {
        res.status(400);
        throw new Error('Invalid plan selected');
    }

    const user = await User.findById(req.user._id);

    if (user) {
        user.subscription = plan;
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            subscription: updatedUser.subscription,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { upgradeUser };
