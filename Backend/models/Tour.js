import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    numberbook: {
        type: Number,
        required: true,
    },
});

const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        distance: {
            type: Number,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxGroupSize: {
            type: Number,
            required: true,
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
        featured: {
            type: Boolean,
            default: false,
        },
        userInfo: [userInfoSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
