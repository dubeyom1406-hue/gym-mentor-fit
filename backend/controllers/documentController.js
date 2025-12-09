import asyncHandler from 'express-async-handler';
import Document from '../models/Document.js';
import fs from 'fs';
import path from 'path';

// @desc    Upload a document for a user
// @route   POST /api/documents/:userId
// @access  Private/Admin
const uploadDocument = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const { title } = req.body;
    const userId = req.params.userId;

    const document = await Document.create({
        user: userId,
        title: title || req.file.originalname,
        filePath: req.file.path,
        originalName: req.file.originalname,
    });

    res.status(201).json(document);
});

// @desc    Get logged in user's documents
// @route   GET /api/documents/my
// @access  Private
const getMyDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find({ user: req.user._id });
    res.json(documents);
});

// @desc    Get documents for a specific user
// @route   GET /api/documents/user/:userId
// @access  Private/Admin
const getUserDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find({ user: req.params.userId });
    res.json(documents);
});

// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private/Admin
const deleteDocument = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (document) {
        // Delete file from filesystem
        // We need to resolve the path relative to the root of the project or where the script is running
        // Assuming filePath is relative to project root like 'uploads/filename.pdf'
        try {
            fs.unlinkSync(document.filePath);
        } catch (err) {
            console.error('Error deleting file:', err);
            // Continue to delete from DB even if file delete fails (e.g. file already gone)
        }

        await document.deleteOne();
        res.json({ message: 'Document removed' });
    } else {
        res.status(404);
        throw new Error('Document not found');
    }
});

export { uploadDocument, getMyDocuments, getUserDocuments, deleteDocument };
