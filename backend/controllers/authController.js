import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // Add other fields as needed
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        // Update profile fields
        user.age = req.body.age || user.age;
        user.gender = req.body.gender || user.gender;
        user.height = req.body.height || user.height;
        user.weight = req.body.weight || user.weight;
        user.goal = req.body.goal || user.goal;
        user.activityLevel = req.body.activityLevel || user.activityLevel;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
            age: updatedUser.age,
            gender: updatedUser.gender,
            height: updatedUser.height,
            weight: updatedUser.weight,
            goal: updatedUser.goal,
            activityLevel: updatedUser.activityLevel,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Auth user with Google
// @route   POST /api/auth/google
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
    try {
        const { email, name, googleId } = req.body;

        // Validate required fields
        if (!email || !name || !googleId) {
            res.status(400);
            throw new Error('Missing required fields for Google authentication');
        }

        const user = await User.findOne({ email });

        if (user) {
            // User exists, login
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                subscription: user.subscription // Ensure subscription is returned if it exists
            });
        } else {
            // User doesn't exist, register
            // Create a random password for Google users (they won't use it, but schema might require it)
            // Or better, handle password as optional in model if not already, but usually setting a random one is safer if validation requires it.
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const newUser = await User.create({
                name,
                email,
                password: randomPassword,
            });

            if (newUser) {
                res.status(201).json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    token: generateToken(newUser._id),
                    subscription: newUser.subscription
                });
            } else {
                res.status(400);
                throw new Error('Invalid user data');
            }
        }
    } catch (error) {
        console.error('Google Auth Error:', error);
        // If it's already an express async handler error, rethrow it
        if (error.name === 'ValidationError') {
            res.status(400);
            throw new Error(Object.values(error.errors)[0].message);
        }
        // For all other errors, let the async handler deal with it
        throw error;
    }
});

// @desc    Health check endpoint
// @route   GET /api/auth/health
// @access  Public
const healthCheck = asyncHandler(async (req, res) => {
    res.json({
        status: 'OK',
        message: 'Authentication service is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown'
    });
});

export { registerUser, authUser, getUserProfile, updateUserProfile, googleAuth, healthCheck };
