import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Message } from './models/message.model.js';
import { router } from './routes/auth.route.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}))


const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: 'http://localhost:5173'
});


// Mongodb connected
mongoose.connect("mongodb+srv://nayemalways:nayem12000@dbcluster.rbuauot.mongodb.net/chatDB")
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e))

    const onlineUsers = new Map();


    app.use(router);


// Socket
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

     // When user joing
     socket.on("user_join", async (userId) => {
        onlineUsers.set(userId, socket.id);

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

        const receiverSocketId = onlineUsers.get(receiverId);
        if(receiverSocketId) {
            // Save to DB + Send in real time
            io.to(receiverSocketId).emit("receive_message", newMessage);
        }
     });

     socket.on("disconnect", async () => {
        const userId = [...onlineUsers.entries()].find(([id, sid]) => sid === socket.id)?.[0];

        if(userId) {
            onlineUsers.delete(userId);
            await User.findByIdAndUpdate(userId, { isOnline: false });
            io.emit("user_status", { userId,  isOnline: false});
        }
        console.log("User disconnected:", socket.id);
     })
   
})




app.use((req, res, next) => {
    res.json({
        message: "No route founds"
    })
})

httpServer.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})