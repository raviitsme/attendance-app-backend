import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    uniName: {
        type: String,
        required: true,
        index: true
    },
    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    uniCode: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "pending"],
        default: "pending",
        required: true
    }
}, { timestamps: true });

const University = mongoose.model('University', universitySchema);

export default University;