import React, { useContext, useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import logo from "/logo.png";
// import { user } from "./Join";
import socketIo from "socket.io-client";
import { AuthContext } from '../../Provider/AuthProvider';

let socket;

const ENDPOINT = "http://localhost:3000/";

const ChatApp: React.FC = () => {
  const { user, loading } = useContext(AuthContext)

  console.log(user)
  const [userInfo, setUserInfo] = useState(user);
  const [id, setId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const send = () => {
    const message = (document.getElementById('chatInput') as HTMLInputElement).value;
    console.log("Sending message:", message);
    if (message.trim()) {
      socket.emit('message', { message, id });
      (document.getElementById('chatInput') as HTMLInputElement).value = "";
    }
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log("Connected with ID:", socket.id);
      setId(socket.id);
    });

    socket.emit('joined', { userInfo });
    console.log("User joined:", userInfo);

    socket.on('welcome', (data) => {
      console.log("Welcome message:", data.message);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('userJoined', (data) => {
      console.log("User joined:", data.message);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('leave', (data) => {
      console.log("User left:", data.message);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('sendMessage', (data) => {
      console.log("Received message:", data.message);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off(); // Clean up socket connection
      console.log("Socket disconnected");
    };
  }, [userInfo, user]);

  return (
    <div className="flex flex-col justify-between max-w-lg bg-gray-100 container mx-auto border-2 mt-[100px] border-red-500 h-[600px] z-50">
      {/* Chat Header */}
      <div className="bg-red-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button className="text-xl">←</button>
          <img src={logo} alt="Seller Avatar" className="w-10 h-10 rounded-full" />
          <span className="text-xl">{user?.name || "Seller Name"}</span>
          <span className="ml-2 h-2 w-2 bg-green-500 rounded-full"></span>
        </div>
      </div>

      {/* Chat Body */}
      <ScrollToBottom className="flex-1 p-4 overflow-auto">
        <h1>{userInfo}</h1>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.userInfo === user ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${msg.userInfo === user ? "bg-red-500 text-white" : "bg-gray-300 text-black"} p-3 rounded-lg max-w-xs`}
              >
                <p>{msg.message}</p>
                <span className="text-xs text-gray-500">{msg.userInfo}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollToBottom>

      {/* Chat Input */}
      <div className="bg-white p-4 flex space-x-4 border-t border-gray-300">
        <button className="text-red-500 text-2xl">📷</button>
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
            className="bg-red-500 text-white px-4 ml-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
