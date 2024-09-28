import React, { useEffect, useState } from "react";
import adminLogo from "/admin.gif";
import { RxCross2 } from "react-icons/rx";
import socketIOClient from "socket.io-client";
import ChatLists from './ChatList';
import './style.css';
// import { AuthContext } from "../../Provider/AuthProvider";

// Singleton socket instance
const socket = socketIOClient("http://localhost:3000", { autoConnect: false });
const ChatContainer: React.FC = () => {
    // const { user } = useContext(AuthContext);
    // State initialization
    const [text, setText] = useState('');
    const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem("userInfo")));
    const [receiver, setReceiver] = useState(() => localStorage.getItem("receiver"));
    const [normalUsers, setNormalUsers] = useState([]);
    const [chats, setChats] = useState([]);
    // const [currentUserRoll, setCurrentUsers] = useState({});


    // Fetch current user data
    // const getSingleData = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/user/getUser/${user?.email}`, { method: 'GET' });
    //         if (response.ok) {
    //             const currentUser = await response.json();
    //             setCurrentUsers(currentUser);
    //             setIsLoading(false); // Data has loaded
    //         } else {
    //             console.log('Failed to fetch user data');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (user?.email) {
    //         getSingleData();
    //     }
    // }, [user?.email]);

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
    };

    return (
        <div className="my-[100px] flex flex-col justify-between w-full bg-gray-100 shadow-xl lg:container lg:mx-auto border-2 border-primary z-50 rounded-lg h-[500px]">
            {/* Chat Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
                <div className="relative flex items-center space-x-4">
                    <button className="text-2xl font-bold cursor-pointer">←</button>
                    <img src={adminLogo} alt="Giftly" className="w-10 h-10 rounded-full" />
                    <span className="text-xl">{"Giftly"}</span>
                    <span className="top-[26px] left-[48px] z-50 h-3 w-3 bg-green-500 rounded-full absolute"></span>
                    <h4>Sender: {userInfo?.userName}</h4>
                    <h4>Receiver: {receiver}</h4>
                </div>
                <div className='space-x-3 flex gap-2'>
                    <div className='font-bold text-2xl cursor-pointer'>
                        <RxCross2 />
                    </div>
                    <p className="chats_logout" onClick={Logout}>
                        <strong>Logout</strong>
                    </p>
                </div>
            </div>

            {/* Main Chat Container */}
            <div className="flex h-full overflow-hidden">
                {/* Sidebar section */}
                <div className={`sidebar w-[150px] h-full border-4 border-blue-600 overflow-y-scroll`}>
                    {normalUsers.map((user, index) => (
                        <div key={index} onClick={() => {
                            setReceiver(user.userName);
                            localStorage.setItem("receiver", user.userName); // Persist receiver in localStorage
                        }}>
                            <img src={user.profileImage} alt={user.userName} />
                            <p>{user.userName}</p>
                        </div>
                    ))}
                </div>

                {/* Chat list section */}
                <div className="flex-1 h-full border-4 border-blue-600 overflow-y-auto">
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
