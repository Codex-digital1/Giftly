import React, { useContext, useEffect, useState } from "react";
import adminLogo from "/admin.gif";
// import bg from "/wallpaper.jpeg";
import socketIOClient from "socket.io-client";
import ChatLists from './ChatList';
import './style.css';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { CgMenuGridR } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { VscSend } from "react-icons/vsc";


interface Chat {
    message: string;
    receiverUsername: string;
    senderUsername: string;
    profileImage: string | undefined;
    image?: string | null;
}
// Singleton socket instance
const socket = socketIOClient(import.meta.env.VITE_SERVER_URL, { autoConnect: false });

const ChatContainer: React.FC = () => {
    const { user, allUser, getData, setLoading,
        sender, receiver, currentUser, updateReceiverName,
        receiverInfo, getReceiverData, setSender,
        setReceiver, setCurrentUser
    } = useContext(AuthContext) ?? {};

    // const [currentUser, setCurrentUsers] = useState<User | null>(null);
    // const [sender, setSender] = useState<string | null>(null);
    // const [receiver, setReceiver] = useState<string | null>(null);
    // const [receiverInfo, setReceiverInfo] = useState<User | null>(null)


    const [text, setText] = useState<string>('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

    const [isActive, setActive] = useState(false);

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
            setLoading?.(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getUser/${user?.email}`, { method: 'GET' });
            if (response.ok) {
                const currentGetUser = await response.json();
                if (setCurrentUser && setSender && setReceiver) {
                    setCurrentUser(currentGetUser);
                    setSender(currentGetUser?.chat?.sender || "");
                    setReceiver(currentGetUser?.chat?.receiver || "");
                }
                setLoading?.(false);
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
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chat/getChats?sender=${sender}&receiver=${receiver}`, {
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
    // const updateReceiverName = async (receiverName: string) => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/updateReceiver/${currentUser?._id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ receiver: receiverName }),
    //         });

    //         if (response.ok) {
    //             const updatedUser = await response.json();
    //             console.log(updatedUser)
    //             setCurrentUsers(updatedUser); // Update the current user with the new receiver
    //             setSender(updatedUser?.chat.sender)
    //             setReceiver(updatedUser?.chat.receiver)
    //         } else {
    //             console.log('Failed to update receiver');
    //         }
    //     } catch (error) {
    //         console.error('Error updating receiver:', error);
    //     }
    // };

    // //chat feature >>>>> Function to get the current  receiver data
    // const getReceiverData = async (receiverName: string) => {
    //     try {

    //         const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getReceiver/${receiverName}`, { method: 'GET', });


    //         if (res?.ok) {
    //             const getCurrentReceiver = await res.json();
    //             setReceiverInfo(getCurrentReceiver);
    //         } else {
    //             console.log('Failed to get current receiver');
    //         }
    //     } catch (error) {
    //         console.error('Error updating receiver:', error);
    //     }
    // };


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
    }, [receiver, sender]);


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

    const playSound = () => {
        const audio = new Audio('/Notification.mp3');
        audio.volume = 0.9;
        audio.play();
    };

    const handleSend = () => {
        if (text.trim() || selectedImage) {
            addMessage(text);
            playSound()
            setText('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSend();
            playSound()
        }
    };

    // Handle logout
    const Logout = () => {
        navigate(from);
    };

    // mobile device responsive 
    const handleToggle = () => {
        setActive(!isActive);
    };

    return (
        <div className="mt-[100px] mb-[50px] md:my-[100px] flex flex-col justify-between w-full bg-white shadow-xl container mx-auto  z-50 rounded-lg h-[600px]  md:h-[600px] ">

            {/* Chat Header */}
            <div className="bg-gradient-to-t from-primary  to-[#E4003A]
             border-primary border rounded-b-none rounded-lg text-white
              p-4 flex  justify-between items-center">
                <div className="relative flex items-center gap-3">
                    <img
                        src={receiverInfo?.profileImage || adminLogo}
                        alt="Giftly" className="relative w-10 h-10 rounded-full" />
                    <span className="text-xl">{receiverInfo?.name || "Giftly"}</span>
                    <span className="top-[24px] left-[31px] z-30 h-[15px] w-[15px] bg-green-500 rounded-full absolute"></span>
                    {/* <h4>Sender: {sender}</h4>
                    <h4>Receiver: {receiver}</h4> */}
                </div>
                <div className="flex gap-6">
                    <button
                        onClick={handleToggle}
                        className="md:hidden hover:text-white hover:bg-black text-white text-2xl p-3 rounded-full z-30 transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        {
                            isActive ? <CgMenuGridR
                                className="h-5 w-5 md:h-8 md:w-8" /> : <RxCross1 className="h-5 w-5 md:h-8 md:w-8" />
                        }
                    </button>

                    {/*  */}
                    <button className=" hover:text-white hover:bg-black text-white text-2xl p-3 rounded-full z-30 transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={() => {
                            setIsOpenChat(!isOpenChat);
                            Logout();
                        }}>
                        <ImExit className="h-5 w-5 md:h-8 md:w-8" />
                    </button>
                </div>
            </div>

            <div className="flex h-full overflow-y-scroll scrollbar-none relative ">
{/* sidebar */}
                <div className={`z-20 sidebar w-[300px] lg:w-[250px]  h-full flex flex-col justify-between overflow-x-hidden absolute md:relative inset-y-0 left-0 transform ${isActive && "-translate-x-full"
                    }  md:translate-x-0  transition duration-200 ease-in-out`}>

                    <div className="h-2/6 overflow-y-scroll  scrollbar-none  bg-white p-4 border-r">

                        <h2 className="sticky -top-5 p-2 bg-secondary flex items-center justify-center w-full rounded-lg shadow-md mb-3 font-bold text-primary">Chat with Admin</h2>
                        {
                            allUser
                                ?.filter((presentUser: any) => (presentUser?.name !== currentUser?.name && presentUser?.role !== 'user'))
                                .map((presentUser: any, index: number) => {
                                    return (
                                        <div
                                            className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg"
                                            key={index}
                                            onClick={() => {
                                                if (updateReceiverName && getReceiverData) {
                                                    updateReceiverName(presentUser?.name);
                                                    getReceiverData(presentUser?.name)
                                                }
                                            }}
                                        >
                                            <img src={presentUser?.profileImage} alt={presentUser?.name} className="w-10 h-10 rounded-full object-cover" />
                                            <p className="font-medium text-gray-700">{presentUser?.name}</p>
                                        </div>
                                    );
                                })
                        }
                    </div>

                    <div className="h-4/6 overflow-y-scroll  scrollbar-none  bg-white p-4  border-r">

                        <h2 className="sticky -top-5 p-2 bg-secondary flex items-center justify-center w-full rounded-lg shadow-md mb-3 font-bold text-primary">Chat with user</h2>
                        {
                            allUser
                                ?.filter((presentUser: any) => (presentUser?.name !== currentUser?.name && presentUser?.role !== 'admin'))
                                .map((presentUser: any, index: number) => {
                                    return (
                                        <div
                                            className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg"
                                            key={index}
                                            onClick={() => {
                                                if (updateReceiverName && getReceiverData) {
                                                    updateReceiverName(presentUser?.name);
                                                    getReceiverData(presentUser?.name)
                                                }
                                            }}
                                        >
                                            <img src={presentUser?.profileImage} alt={presentUser?.name} className="w-10 h-10 rounded-full object-cover" />
                                            <p className="font-medium text-gray-700">{presentUser?.name}</p>
                                        </div>
                                    );
                                })
                        }
                    </div>

                </div>



                <div className="flex-1 h-full">
                    <ChatLists chats={chats} sender={sender} />
                </div>
            </div>
            {/* <div className="flex h-full overflow-y-scroll scrollbar-none">
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

                
                <div className="flex-1 h-full">
                    <ChatLists chats={chats} sender={sender}/>
                </div>
            </div> */}

            {/* Chat Input */}
            <div className=" bg-white rounded-lg p-4  border-t border-gray-300">
                <div className="flex space-x-4 max-w-3xl mx-auto">
                    <div className="grid place-content-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="imageInput"
                        />
                        <label htmlFor="imageInput" className="cursor-pointer text-primary bg-primary p-2 rounded-full hover:bg-[#BF2718] transition-all duration-300 text-2xl">📷</label>
                    </div>

                    <form className="flex flex-1 gap-5">
                        <input
                            id="chatInput"
                            type="text"
                            className="w-full p-2  rounded-lg  border border-primary

                        focus:outline outline-offset-2 outline-2 outline-primary
                        "
                            placeholder="Type your message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={handleKeyPress}
                        // onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            type="button"
                            onClick={handleSend}
                            className="bg-primary text-white rounded-lg px-4 cursor-pointer hover:bg-[#BF2718] transition-all duration-300 text-2xl"><VscSend /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;
