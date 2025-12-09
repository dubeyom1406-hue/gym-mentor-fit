import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import fs from 'fs';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({})
        .populate('user', 'name')
        .sort({ createdAt: -1 });
    res.json(posts);
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const { content } = req.body;

    let image = null;
    if (req.file) {
        image = req.file.path;
    }

    const post = await Post.create({
        user: req.user._id,
        content,
        image,
    });

    const populatedPost = await Post.findById(post._id).populate('user', 'name');

    res.status(201).json(populatedPost);
});

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        if (post.likes.includes(req.user._id)) {
            // Unlike
            post.likes = post.likes.filter(
                (id) => id.toString() !== req.user._id.toString()
            );
        } else {
            // Like
            post.likes.push(req.user._id);
        }
        await post.save();
        res.json(post.likes);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Check user
        if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(401);
            throw new Error('User not authorized');
        }

        if (post.image) {
            try {
                fs.unlinkSync(post.image);
            } catch (err) {
                console.error('Error deleting image:', err);
            }
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

export { getPosts, createPost, likePost, deletePost };
