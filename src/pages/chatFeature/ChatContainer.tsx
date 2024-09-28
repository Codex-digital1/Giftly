import React, { useContext, useEffect, useState } from "react";
import adminLogo from "/admin.gif";
import { RxCross2 } from "react-icons/rx";
import socketIOClient from "socket.io-client";
import ChatLists from './ChatList';
import './style.css';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

// Singleton socket instance
const socket = socketIOClient("http://localhost:3000", { autoConnect: false });
const ChatContainer: React.FC = () => {
    const { user } = useContext(AuthContext);
    // State initialization
    const [text, setText] = useState('');
    const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem("userInfo")));
    const [receiver, setReceiver] = useState(() => localStorage.getItem("receiver"));
    const [normalUsers, setNormalUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    const [currentUser, setCurrentUsers] = useState({});
    const [loading, setIsLoading] = useState<boolean>(false)

    // Fetch current user data
    const getSingleData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:3000/user/getUser/${user?.email}`, { method: 'GET' });
            if (response.ok) {
                const currentUser = await response.json();
                setCurrentUsers(currentUser);
                setIsLoading(false); // Data has loaded
            } else {
                console.log('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            getSingleData();
        }
    }, [user?.email]);
    console.log(currentUser)

    // Fetch all users
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/getUsers', { method: 'GET' });
            if (response.ok) {
                const users = await response.json();
                setNormalUsers(users);
            } else {
                console.log('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Fetch previous chats for the current chat room
    const fetchPreviousChats = async (sender, receiver) => {
        try {
            const response = await fetch(`http://localhost:3000/chat/getChats?sender=${sender}&receiver=${receiver}`, {
                method: 'GET',
            });
            if (response.ok) {
                const previousChats = await response.json();
                setChats(previousChats);
            } else {
                console.log('Failed to fetch previous chats');
            }
        } catch (error) {
            console.error('Error fetching previous chats:', error);
        }
    };

    // Initialize Socket and Chat
    useEffect(() => {
        socket.connect(); // Connect socket

        const storedReceiver = localStorage.getItem("receiver");
        if (userInfo && storedReceiver) {
            socket.emit("joinRoom", { sender: userInfo.userName, receiver: storedReceiver });
        }

        // Receive messages from server
        socket.on("chat", (fetchedChats) => {
            setChats(fetchedChats);
        });

        socket.on("message", (msg) => {
            setChats((prevChats) => [...prevChats, msg]);
        });

        // Listen for notifications
        socket.on("notification", (notification) => {
            if (notification.receiver === userInfo.userName) {
                // Display toast notification for a longer duration (e.g., 5 seconds)
                toast.success(notification.message, {
                    duration: 6000,
                    position: 'top-center',
                });
            }
        });

        return () => {
            socket.off("chat");
            socket.off("message");
            socket.disconnect(); // Clean up socket connection
        };
    }, [userInfo, receiver]); // Add `receiver` as dependency

    // Refetch chats when receiver changes
    useEffect(() => {
        if (userInfo && receiver) {
            fetchPreviousChats(userInfo.userName, receiver);
        }
    }, [receiver]);

    const addMessage = (text) => {
        if (!receiver || !userInfo) {
            console.error("Receiver or sender is not defined");
            return;
        }

        const newChat = {
            senderUsername: userInfo.userName,
            receiverUsername: receiver,
            message: text,
            profileImage: userInfo.profileImage,
        };

        socket.emit("newMessage", newChat); // Emit the new message to the server
    };


    // Handle sending a new message
    const handleSend = () => {
        if (text.trim()) {
            addMessage(text);
            setText('');
        }
    };

    // Handle logout
    const Logout = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("receiver");
        setUserInfo(null);
        setReceiver(null);
        navigate(from)
    };
    console.log(currentUser?.role)
    return (
        <div className="my-[100px] flex flex-col justify-between w-full bg-gray-100 shadow-xl lg:container lg:mx-auto border-2 border-primary z-50 rounded-lg h-[500px]">

            {/* Chat Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
                <div className="relative flex items-center space-x-4">
                    {/* <button className="text-2xl font-bold cursor-pointer">←</button> */}
                    <img src={adminLogo} alt="Giftly" className="w-10 h-10 rounded-full" />
                    <span className="text-xl">{"Admin"}</span>
                    <span className="top-[26px] left-[15px] z-50 h-3 w-3 bg-green-500 rounded-full absolute"></span>
                    <h4>Sender: {userInfo?.userName}</h4>
                    <h4>Receiver: {receiver}</h4>
                </div>
                <div className="space-x-3 flex gap-2">
                    <div className="font-bold text-2xl cursor-pointer">
                        {/* <RxCross2 /> */}
                        {/* <p className="chats_logout" onClick={Logout}>
                            <strong>Logout</strong>
                        </p>
                         */}
                        <button className="bg-white text-primary text-2xl  p-2 rounded-full z-50 transition-all duration-300 ease-in-out"
                            onClick={() => {
                                setIsOpenChat(!isOpenChat)
                                Logout()
                            }}>
                            <RxCross2 />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-full overflow-hidden scrollbar-none">
                {/* Conditionally render sidebar content based on currentUser role */}
                <div className="sidebar w-[150px] lg:w-[250px] h-full border-r-2 border-gray-300 scrollbar-none overflow-y-scroll bg-white p-4">
                    {
                        currentUser?.role === 'admin'
                            ? normalUsers.map((presentUser, index) => (
                                <div
                                    className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg"
                                    key={index}
                                    onClick={() => {
                                        setReceiver(presentUser?.userName);
                                        localStorage.setItem("receiver", presentUser?.userName);
                                    }}
                                >
                                    <img src={presentUser.profileImage} alt={presentUser?.userName} className="w-10 h-10 rounded-full object-cover" />
                                    <p className="font-medium text-gray-700">{presentUser?.userName}</p>
                                </div>
                            ))
                            : <p>For user</p>
                    }
                </div>

                {/* Chat list section */}
                <div className="flex-1 h-full">
                    <ChatLists chats={chats} />
                </div>
            </div>



            {/* Chat Input */}
            <div className="bg-white p-4 flex space-x-4 border-t border-gray-300">
                <button className="text-primary text-2xl">📷</button>
                <form className="flex flex-1">
                    <input
                        id="chatInput"
                        type="text"
                        className="w-full p-2 border rounded-lg focus:outline-none"
                        placeholder="Type your message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        className="bg-primary text-white px-4 ml-2 rounded-lg"
                        disabled={text.trim() === ''}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>

    );
};

export default ChatContainer;
