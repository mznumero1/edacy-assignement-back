const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        level: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
        },
        language: {
            type: String,
            required: true,
            trim: true,
        },
        thumbnailUrl: {
            type: String,
            trim: true,
        },
        videoUrl: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

mongoose.model("Course", courseSchema);
