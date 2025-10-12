import { io } from "socket.io-client";

const token = localStorage.getItem("token");


export const socket = io("http://localhost:3000", {
    auth: {
        token
    },
    autoConnect: false // connect after login
});
