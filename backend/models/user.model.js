
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    socketId: {type: String, default: null},
    isOnline: {type: Boolean, default: false},
}, {
    timestamps: true,
    versionKey: false
})


export const User = mongoose.model("User", userSchema);