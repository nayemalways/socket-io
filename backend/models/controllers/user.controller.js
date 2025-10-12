import { User } from "../user.model.js";
import jwt from 'jsonwebtoken';


export const baseRoute = async  (req, res) => {
    const users = await User.find({});
    res.json(users);
}

    // Signup
export const createUser =  async (req, res) => {
        console.log(req.body)
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