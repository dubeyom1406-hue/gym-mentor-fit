import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    uploadDocument,
    getMyDocuments,
    getUserDocuments,
    deleteDocument,
} from '../controllers/documentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('PDFs only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/:userId', protect, admin, upload.single('pdf'), uploadDocument);
router.get('/my', protect, getMyDocuments);
router.get('/user/:userId', protect, admin, getUserDocuments);
router.delete('/:id', protect, admin, deleteDocument);

export default router;
