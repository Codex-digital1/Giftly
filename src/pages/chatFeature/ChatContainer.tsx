import React, { useContext, useEffect, useRef, useState } from "react";
import adminLogo from "/admin.gif";
import bg from "/bg.jpeg";
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
    const [text, setText] = useState<string>('');
    const [userInfo, setUserInfo] = useState<object>(() => JSON.parse(localStorage.getItem("userInfo") || '{}'));
    const [receiver, setReceiver] = useState<string | null>(() => localStorage.getItem("receiver"));
    const [normalUsers, setNormalUsers] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    const [currentUser, setCurrentUsers] = useState<object>({});
    const [loading, setIsLoading] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // Base64 image
    const endOfMessages = useRef<HTMLDivElement | null>(null);

    // Handle image selection
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setSelectedImage(base64Image); // Set base64 image
            };
            reader.readAsDataURL(file);
        }
    };
    console.log("image", selectedImage)
    // Scroll to bottom when chats update
    useEffect(() => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    // Fetch current user data
    const getSingleData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/user/getUser/${user?.email}`, { method: 'GET' });
            if (response.ok) {
                const currentGetUser = await response.json();
                setCurrentUsers(currentGetUser);
                setIsLoading(false);
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
    const fetchPreviousChats = async (sender: string, receiver: string) => {
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
        socket.connect();
        const storedReceiver = localStorage.getItem("receiver");
        if (userInfo && storedReceiver) {
            socket.emit("joinRoom", { sender: userInfo.name, receiver: storedReceiver });
        }

        socket.on("chat", (fetchedChats) => {
            setChats(fetchedChats);
        });

        socket.on("message", (msg) => {
            setChats((prevChats) => [...prevChats, msg]);
        });

        socket.on("notification", (notification) => {
            if (notification.receiver === userInfo.name) {
                toast.success(notification.message, {
                    duration: 6000,
                    position: 'top-center',
                });
            }
        });

        return () => {
            socket.off("chat");
            socket.off("message");
            socket.disconnect();
        };
    }, [userInfo, receiver]);

    // Refetch chats when receiver changes
    useEffect(() => {
        if (userInfo && receiver) {
            fetchPreviousChats(userInfo?.name, receiver);
        }
    }, [receiver]);

    const addMessage = (text: string) => {
        if (!receiver || !userInfo) {
            console.error("Receiver or sender is not defined");
            return;
        }

        const newChat = {
            senderUsername: userInfo?.name,
            receiverUsername: receiver,
            message: text,
            profileImage: userInfo?.profileImage,
            image: selectedImage, // Use base64 image here
        };

        socket.emit("newMessage", newChat);
        setSelectedImage(null); // Reset the image after sending
    };

    const handleSend = () => {
        if (text.trim() || selectedImage) {
            addMessage(text);
            setText('');
        }
    };

    // Handle logout
    const Logout = () => {
        // localStorage.removeItem("userInfo");
        // localStorage.removeItem("receiver");
        setUserInfo(null);
        setReceiver(null);
        navigate(from)
    };

    return (
        <div style={{
            backgroundImage: `url("${bg}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} className="my-[100px] flex flex-col justify-between w-full bg-gray-100 shadow-xl md:container lg:mx-auto border-2 border-primary z-50 rounded-lg md:h-[400px] lg:h-[550px]">

            {/* Chat Header */}
            <div className="bg-primary border-primary border rounded-lg text-white p-4 flex  justify-between items-center">
                <div className="relative flex items-center gap-3">
                    <img
                        src={normalUsers.find(user => user?.name === receiver)?.profileImage || adminLogo}
                        alt="Giftly" className="relative w-10 h-10 rounded-full" />
                    <span className="text-xl">{"Admin"}</span>
                    <span className="top-[24px] left-[31px] z-30 h-[15px] w-[15px] bg-green-500 rounded-full absolute"></span>
                    <h4>Sender: {userInfo?.name}</h4>
                    <h4>Receiver: {receiver}</h4>
                </div>
                <button className="bg-white hover:text-white hover:bg-black text-primary text-2xl p-2 rounded-full z-50 transition-all duration-300 ease-in-out cursor-pointer"
                    onClick={() => {
                        setIsOpenChat(!isOpenChat);
                        Logout();
                    }}>
                    <RxCross2 />
                </button>
            </div>

            <div className="flex h-full overflow-hidden scrollbar-none">
                {currentUser?.role === "admin" && (
                    <div className="sidebar w-[150px] lg:w-[250px] h-full border-r-2 border-gray-300 scrollbar-none overflow-y-scroll bg-white p-4">
                        {
                            normalUsers
                                ?.filter((presentUser) => presentUser?.name !== currentUser?.name)
                                .map((presentUser, index) => {
                                    return (
                                        <div
                                            className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg"
                                            key={index}
                                            onClick={() => {
                                                setReceiver(presentUser?.name);
                                                localStorage.setItem("receiver", presentUser?.name);
                                            }}
                                        >
                                            <img src={presentUser?.profileImage} alt={presentUser?.name} className="w-10 h-10 rounded-full object-cover" />
                                            <p className="font-medium text-gray-700">{presentUser?.name}</p>
                                        </div>
                                    );
                                })
                        }
                    </div>
                )}

                {/* Chat list section */}
                <div className="flex-1 h-full">
                    <ChatLists chats={chats} endOfMessages={endOfMessages} />
                </div>
            </div>

            {/* Chat Input */}
            <div className="bg-white rounded-lg p-4 flex space-x-4 border-t border-gray-300">
                <div className="grid place-content-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageInput"
                    />
                    <label htmlFor="imageInput" className="cursor-pointer text-primary bg-secondary p-2 rounded-full hover:bg-primary transition-all duration-300 text-2xl">📷</label>
                </div>

                <form className="flex flex-1 gap-5">
                    <input
                        id="chatInput"
                        type="text"
                        className="w-full p-2 border rounded-lg 

                        focus:outline outline-offset-2 outline-2 outline-primary
                        "
                        placeholder="Type your message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        className="bg-primary text-white rounded-lg px-4">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatContainer;
