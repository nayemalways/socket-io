/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../socket/socket';
import API from '../utils/api';


export const Chatpage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);
   const [receiverId, setReceiverId] = useState("");
   const [activeUsers, setActiveUsers] = useState([]);

  

  useEffect(() => {
    socket.auth.token = localStorage.getItem("token");
    socket.connect();


    socket.emit("user_join", currentUser._id);

    socket.on("receive_message", (msg) => {
        setMessages(prev => [...prev, msg]);
    } )
    return () => {
        socket.disconnect();
    }
  }, []);


 useEffect(() => {
  const fetchActiveUsers = async () => {
    try {
      const res = await API.get("/active_users");
      setActiveUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch active users:", err);
    }
  };

  fetchActiveUsers();
}, []);


  console.log(activeUsers);
  

  const sendMessage = () => {
    socket.emit("send_message", {
        senderId: currentUser._id,
        receiverId,
        message
    })
    setMessage("");
  }
  return (
    <>
      <div className="p-6">
          <h2 className="text-xl mb-2">Welcome, {currentUser?.name} 👋</h2>

          <input
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="border p-1 mb-2"
          />

          <div className="border p-3 h-60 overflow-y-scroll mb-3">
            {messages.map((m, i) => (
              <p key={i}>{m.message}</p>
            ))}
          </div>

          <input
            className="border p-1 mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write message"
          />
          <button className="bg-blue-500 px-3 py-1 text-white" onClick={sendMessage}>
            Send
          </button>
        </div> 
    </>
  );
};

