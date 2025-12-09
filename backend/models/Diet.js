import mongoose from 'mongoose';

const dietSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        meals: [
            {
                name: { type: String, required: true },
                calories: { type: Number, required: true },
                protein: { type: Number, required: true },
                carbs: { type: Number, required: true },
                fats: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Diet = mongoose.model('Diet', dietSchema);

export default Diet;
