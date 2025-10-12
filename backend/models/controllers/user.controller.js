import { User } from "../user.model.js";
import jwt from 'jsonwebtoken';


export const baseRoute = async  (req, res) => {
    const users = await User.find({});
    res.json(users);
}


export const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await User.find({ isOnline: true });
        res.json({
            success: true,
            data: activeUsers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch active users"
        });
    }
};


    // Signup
export const createUser =  async (req, res) => {
        const user = await User.create(req.body);
        res.status(201).json(user);
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const token = jwt.sign({ id: user._id }, "secrfdfds4effet");
    res.json({ token, user });
}