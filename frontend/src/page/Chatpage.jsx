/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../socket/socket';


const Chatpage = ({ currentUser }) => {
   const [message, setMessage] = useState("")
   const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.emit("user_join", currentUser._id);

    socket.on("receive_message", (msg) => {
        setMessages(prev => [...prev, msg]);
    } )
    return () => {
        socket.disconnect();
    }
  }, []);
  

  const sendMessage = () => {
    socket.emit("send_message", {
        senderId: currentUser._id,
        receiverId: "1234demo",
        message,
        receiverSocketId: "socket-id-of-receiver"
    })
    setMessage("");
  }
  return (
    <>
      <div>
          <div>
              {
               messages.map((m, i) => (
                <p key={i}>{m.message}</p>
               )) 
              }
          </div> 
          <input 
            className='mt-22 ml-22 border-1 border-teal-300 px-3 py-1'
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            type="text" 
            placeholder='write message'
          />  
          <button className='bg-green-500 py-2 px-3' onClick={sendMessage}>Send</button> 
      </div> 
    </>
  );
};

export default Chatpage;