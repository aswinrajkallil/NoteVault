import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        default: "viewer"
    },
    refreshToken: {
        type: String,
        default: null
    }
});

const User = mongoose.model("User", userSchema)

export default User