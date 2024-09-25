import React, { useContext, useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import adminLogo from "/admin.gif";
import socketIo from "socket.io-client";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

let socket;

const ENDPOINT = "http://localhost:3000/";

const ChatApp: React.FC = ({ setIsOpenChat }) => {
  const { user, loading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("Guest");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // Set the user info when available
  useEffect(() => {
    if (user?.displayName) {
      setUserInfo(user.displayName);
    }
  }, [user]);

  // Send a message with timestamp to avoid duplication
  const send = () => {
    const messageInput = (document.getElementById('chatInput') as HTMLInputElement);
    const message = messageInput.value;

    if (message.trim()) {
      const timestamp = new Date().toISOString(); // Unique timestamp
      axios.post('http://localhost:3000/messages', { userInfo, message, timestamp })
        .then(() => {
          socket.emit('message', { message, id, userInfo, timestamp });
          messageInput.value = "";
        })
        .catch(err => console.error("Error sending message:", err));
    }
  };

  // Fetch messages from the database
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages');
      setMessages((prevMessages) => {
        const uniqueMessages = response.data.filter((msg: any) => {
          return !prevMessages.some((existingMsg) => existingMsg.timestamp === msg.timestamp);
        });
        return [...prevMessages, ...uniqueMessages];
      });
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      setId(socket.id);
    });

    // Emit the user joining the chat
    socket.emit('joined', { userInfo });

    // Fetch initial messages once
    fetchMessages();

    // Listen for new messages from the server
    socket.on('sendMessage', (data) => {
      // Add the message if it doesn't exist based on timestamp
      setMessages((prevMessages) => {
        const exists = prevMessages.some((msg) => msg.timestamp === data.timestamp);
        if (!exists) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });
    });

    return () => {
      socket.off(); // Clean up the socket on unmount
    };
  }, [userInfo]);

  return (
    <div className="overflow-hidden flex flex-col justify-between w-full h-full lg:max-w-lg lg:h-[450px] bg-gray-100 shadow-xl lg:container lg:mx-auto border-2 lg:mb-[100px] border-primary z-50 rounded-lg">
      {/* Chat Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <div className="relative flex items-center space-x-4">
          <button className="text-2xl font-bold cursor-pointer">←</button>
          <img src={adminLogo} alt="Giftly" className="w-10 h-10 rounded-full " />
          <span className="text-xl">{"Giftly"}</span>
          <span className="top-[26px] left-[48px] z-50 h-3 w-3 bg-green-500 rounded-full absolute"></span>
        </div>

        <div className='font-bold text-2xl cursor-pointer' onClick={() => setIsOpenChat(prev => !prev)}>
          <RxCross2 />
        </div>
      </div>

      {/* Chat Body */}
      <ScrollToBottom className="flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {loading ? <LoadingSpinner smallHeight={true} /> : <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.userInfo === userInfo ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`${msg.userInfo === userInfo ? "bg-primary text-white" : "bg-gray-300 text-black"} p-3 rounded-lg max-w-xs`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-500">{msg.userInfo}</span>
                </div>
              </div>
            ))}
          </>}
        </div>
      </ScrollToBottom>

      {/* Chat Input */}
      <div className="bg-white p-4 flex space-x-4 border-t border-gray-300">
        <button className="text-primary text-2xl">📷</button>
        <form className="flex flex-1">
          <input
            id="chatInput"
            onKeyPress={(event) => event.key === 'Enter' ? send() : null}
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={send}
            type="button"
            className="bg-primary text-white px-4 ml-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
