import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Message } from './models/message.model.js';


const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: 'http://localhost:5173'
});


// Mongodb connected
mongoose.connect("mongodb://localhost:27017/chatDB")
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e))


// Socket
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

     // When user joing
     socket.on("user_join", async (userId) => {
        await User.findByIdAndUpdate(userId, { sockedId: socket.id, isOnline: true});
        io.emit("user_status", {userId, isOnline: true});
     });


     socket.on("send_message", async (data) => {
        const { senderId,  receiverId, message } = data;
        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message
        });

        // Save to DB + Send in real time
        io.to(data.receiverSocketId).emit("receive_message", newMessage);
     });

     socket.on("disconnected", async () => {
        const user = await User.findOneAndUpdate({ socketId: socket.id }, { isOnline: false });

        if(user) io.emit("user_status", { userId: user._id,  isOnline: false});
        console.log("User disconnected:", socket.id);
     })
   
})


app.get('/', (req, res) => {
    res.send("Welcome to the show")
})

httpServer.listen(3000, () => {
    console.log("Server started");
})