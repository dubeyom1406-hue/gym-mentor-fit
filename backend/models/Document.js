import mongoose from 'mongoose';

const documentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
