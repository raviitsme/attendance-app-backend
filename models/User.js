import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "uni_admin", "super_admin"],
        default: "student"
    },
    university : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "University",
    },
    department : String,
    year : Number
}, { timestamps : true });

const User = mongoose.model("User", userSchema);

export default User;