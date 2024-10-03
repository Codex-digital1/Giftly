import React, { useContext, useEffect, useState } from "react";
import adminLogo from "/admin.gif";
import bg from "/wallpaper.jpeg";
import { RxCross2 } from "react-icons/rx";
import socketIOClient from "socket.io-client";
import ChatLists from './ChatList';
import './style.css';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

interface User {
    _id: string;
    email: string;
    name: string;
    profileImage: string;
    role: string;
    chat: { sender: string; receiver: string };
}

interface Chat {
    message: string;
    receiverUsername: string;
    senderUsername: string;
    profileImage: string | undefined; // Allowing undefined here
    image?: string | null; // This already handles null or undefined
}
// Singleton socket instance
const socket = socketIOClient("http://localhost:3000", { autoConnect: false });

const ChatContainer: React.FC = () => {
    const { user, allUser, getData, setLoading, loading } = useContext(AuthContext);

    const [currentUser, setCurrentUsers] = useState<User | null>(null);
    const [sender, setSender] = useState<string | null>(null);
    const [receiver, setReceiver] = useState<string | null>(null);
    const [receiverInfo, setReceiverInfo] = useState<User | null>(null)


    const [text, setText] = useState<string>('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const [selectedImage, setSelectedImage] = useState<string | null>(null); // Base64 image

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

    // Fetch current user data
    const getSingleData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/user/getUser/${user?.email}`, { method: 'GET' });
            if (response.ok) {
                const currentGetUser = await response.json();
                setCurrentUsers(currentGetUser);
                setSender(currentGetUser?.chat?.sender || "");
                setReceiver(currentGetUser?.chat?.receiver || "");
                setLoading(false);
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

    // fetch all user data
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

    // Function to update the current user's receiver
    const updateReceiverName = async (receiverName: string) => {
        try {
            const response = await fetch(`http://localhost:3000/user/updateReceiver/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ receiver: receiverName }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log(updatedUser)
                setCurrentUsers(updatedUser); // Update the current user with the new receiver
                setSender(updatedUser?.chat.sender)
                setReceiver(updatedUser?.chat.receiver)
            } else {
                console.log('Failed to update receiver');
            }
        } catch (error) {
            console.error('Error updating receiver:', error);
        }
    };

    // Function to update the current user's receiver
    const getReceiverData = async (receiverName: string) => {
        try {

            const res = await fetch(`http://localhost:3000/user/getReceiver/${receiverName}`, { method: 'GET', });


            if (res.ok) {
                const getCurrentReceiver = await res.json();
                setReceiverInfo(getCurrentReceiver);
            } else {
                console.log('Failed to get current receiver');
            }
        } catch (error) {
            console.error('Error updating receiver:', error);
        }
    };


    // Initialize Socket and Chat
    useEffect(() => {
        socket.connect();
        if (sender && receiver) {
            socket.emit("joinRoom", { sender, receiver });
        }

        socket.on("chat", (fetchedChats) => {
            setChats(fetchedChats);
        });

        socket.on("message", (msg) => {
            setChats((prevChats) => [...prevChats, msg]);
        });

        socket.on("notification", (notification) => {
            if (notification.receiver === sender) {
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
    }, [sender, receiver]);


    // Refetch chats when receiver changes
    useEffect(() => {
        if (sender && receiver) {
            fetchPreviousChats(sender, receiver);
        }
    }, [receiver]);


    const addMessage = (text: string) => {
        if (!receiver || !sender) {
            console.error("Receiver or sender is not defined");
            return;
        }

        const newChat: Chat = {
            senderUsername: sender,
            receiverUsername: receiver,
            message: text,
            profileImage: currentUser?.profileImage,
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
        navigate(from);
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
                        src={receiverInfo?.profileImage || adminLogo}
                        alt="Giftly" className="relative w-10 h-10 rounded-full" />
                    <span className="text-xl">{receiverInfo?.name || "Giftly"}</span>
                    <span className="top-[24px] left-[31px] z-30 h-[15px] w-[15px] bg-green-500 rounded-full absolute"></span>
                    {/* <h4>Sender: {sender}</h4>
                    <h4>Receiver: {receiver}</h4> */}
                </div>
                <button className="bg-white hover:text-white hover:bg-black text-primary text-2xl p-2 rounded-full z-30 transition-all duration-300 ease-in-out cursor-pointer"
                    onClick={() => {
                        setIsOpenChat(!isOpenChat);
                        Logout();
                    }}>
                    <RxCross2 />
                </button>
            </div>

            <div className="flex h-full overflow-y-scroll scrollbar-none">
                {currentUser?.role === "admin" ? (
                    <div className="sidebar w-[150px] lg:w-[250px] h-full border-r-2 border-gray-300 scrollbar-none overflow-y-scroll bg-white p-4">
                        {
                            allUser
                                ?.filter((presentUser: any) => presentUser?.name !== currentUser?.name)
                                .map((presentUser: any, index: number) => {
                                    return (
                                        <div
                                            className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg"
                                            key={index}
                                            onClick={() => {
                                                updateReceiverName(presentUser?.name);
                                                getReceiverData(presentUser?.name)
                                                // Update receiver through PUT route
                                            }}
                                        >
                                            <img src={presentUser?.profileImage} alt={presentUser?.name} className="w-10 h-10 rounded-full object-cover" />
                                            <p className="font-medium text-gray-700">{presentUser?.name}</p>
                                        </div>
                                    );
                                })
                        }
                    </div>
                ) : (
                    <div className="sidebar w-[150px] lg:w-[250px] h-full border-r-2 border-gray-300 scrollbar-none overflow-y-scroll bg-white p-4">
                        {
                            allUser
                                ?.filter((presentUser: any) => presentUser?.role === 'admin')
                                .map((presentUser: any, index: number) => {
                                    return (
                                        <div
                                            className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg"
                                            key={index}
                                            onClick={() => {
                                                updateReceiverName(presentUser?.name);
                                                getReceiverData(presentUser?.name)
                                                // Update receiver through PUT route
                                            }}
                                        >
                                            <img src={presentUser?.profileImage} alt={presentUser?.name} className="w-10 h-10 rounded-full object-cover" />
                                            <p className="font-medium text-gray-700">{presentUser?.name}</p>
                                        </div>
                                    );
                                })
                        }
                    </div>
                )
                }

                {/* Chat list section */}
                <div className="flex-1 h-full">
                    <ChatLists chats={chats} sender={sender}/>
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
