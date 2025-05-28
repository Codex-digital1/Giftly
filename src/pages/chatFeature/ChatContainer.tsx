/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import adminLogo from "/admin.gif";
import socketIOClient from "socket.io-client";
import ChatLists from "./ChatList";
import "./style.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { CgMenuGridR } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { VscSend } from "react-icons/vsc";
import notificationSound from "/Notification.mp3";

interface Chat {
  message: string;
  receiverUsername: string;
  senderUsername: string;
  profileImage: string | undefined;
  image?: string | null;
  createdAt?: Date;
}

const socket = socketIOClient(import.meta.env.VITE_SERVER_URL, {
  autoConnect: false,
});

const ChatContainer: React.FC = () => {
  const {
    user,
    allUser,
    getData,
    setLoading,
    sender,
    receiver,
    currentUser,
    updateReceiverName,
    receiverInfo,
    getReceiverData,
    setSender,
    setReceiver,
    setCurrentUser,
  } = useContext(AuthContext) ?? {};

  const [text, setText] = useState<string>("");
  const [audio] = useState(() => new Audio(notificationSound));

  const [chats, setChats] = useState<Chat[]>([]);
  const [isActive, setActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<Record<string, boolean>>(
    {}
  );
  const [isChatLoading, setChatLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getSingleData = async () => {
    try {
      setLoading?.(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/getUser/${user?.email}`
      );
      if (response.ok) {
        const currentGetUser = await response.json();
        if (setCurrentUser && setSender && setReceiver) {
          setCurrentUser(currentGetUser);
          setSender(currentGetUser?.chat?.sender || "");
          setReceiver(currentGetUser?.chat?.receiver || "");
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading?.(false);
    }
  };

  const fetchPreviousChats = async (sender: string, receiver: string) => {
    try {
      setChatLoading(true);
      setChats([]); // Clear previous chats immediately
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/chat/getChats?sender=${sender}&receiver=${receiver}`
      );
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      }
    } catch (error) {
      console.error("Error fetching previous chats:", error);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) getSingleData();
  }, [user?.email]);

  useEffect(() => {
    getData?.();
  }, []);

  useEffect(() => {
    const handleSocketConnection = async () => {
      socket.disconnect();
      await new Promise((resolve) => setTimeout(resolve, 100));

      socket.connect();
      if (sender && receiver) {
        socket.emit("joinRoom", { sender, receiver });
        fetchPreviousChats(sender, receiver);
      }
    };

    handleSocketConnection();

    socket.on("message", (msg: Chat) => {
      setChats((prev) => [...prev, msg]);

      // Play sound only if message is from another user
      if (msg.senderUsername !== sender) {
        audio.currentTime = 0; // Reset audio to start
        audio.play().catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
      if (
        currentUser?.role === "admin" &&
        msg.receiverUsername === currentUser.name &&
        receiver !== msg.senderUsername
      ) {
        setUnreadMessages((prev) => ({
          ...prev,
          [msg.senderUsername]: true,
        }));
      }
    });

    socket.on("notification", (notification) => {
      if (notification.receiver === sender) {
        toast.success(notification.message, {
          duration: 6000,
          position: "top-center",
        });
      }
    });

    return () => {
      socket.off("message");
      socket.off("notification");
      socket.disconnect();
    };
  }, [sender, receiver,currentUser,audio]);

  const playSound = () => {
    const audio = new Audio("/sendmsg.mp3");
    audio.volume = 0.9;
    audio.play();
  };

  const handleSend = () => {
    if (text.trim() || selectedImage) {
      const newChat: Chat = {
        senderUsername: sender!,
        receiverUsername: receiver!,
        message: text,
        profileImage: currentUser?.profileImage,
        image: selectedImage,
      };
      socket.emit("newMessage", newChat);
      playSound();
      setText("");
      setSelectedImage(null);
    }
  };

  const handleUserClick = async (username: string) => {
    try {
      setChats([]); // Clear current chats
      await updateReceiverName?.(username);
      await getReceiverData?.(username as string);
      setReceiver?.(username);
      setUnreadMessages((prev) => ({ ...prev, [username]: false }));

      if (sender && username) {
        await fetchPreviousChats(sender, username);
      }
    } catch (error) {
      console.error("Error changing receiver:", error);
      toast.error("Failed to switch conversation");
    }
  };

  const renderSidebarSection = (
    title: string,
    filterRole: string,
    showUnread = false
  ) => (
    <div className="h-full overflow-y-scroll bg-white p-4 border-r">
      <h2 className="sticky -top-5 p-2 bg-secondary flex items-center justify-center w-full rounded-lg shadow-md mb-3 font-bold text-primary z-40">
        {title}
      </h2>
      {!currentUser ? (
        <div className="text-center p-4 text-gray-500">
          Please log in to view chats
        </div>
      ) : (
        allUser
          ?.filter(
            (user: any) =>
              user.name !== currentUser?.name &&
              user.role === filterRole &&
              (showUnread ? unreadMessages[user.name] || true : true)
          )
          .map((user: any) => (
            <div
              key={user._id}
              className="cursor-pointer hover:bg-secondary flex items-center space-x-4 p-2 rounded-lg relative"
              onClick={() => handleUserClick(user.name)}
            >
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-medium text-gray-700">{user.name}</p>
              {showUnread && unreadMessages[user.name] && (
                <span className="absolute right-2 top-2 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </div>
          ))
      )}
    </div>
  );

  useEffect(() => {
    const initialReceiver = async () => {
      const receiverName = user?.chat?.receiver as string;
      await getReceiverData?.(receiverName);
    };
    initialReceiver();
  }, [user?.chat?.receiver]);

  return (
    <div className="mt-[100px] mb-[50px] md:my-[150px] flex flex-col justify-between w-full bg-white shadow-xl container mx-auto rounded-lg h-[600px] md:h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-t from-primary to-[#E4003A] p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {receiverInfo && (
            <img
              src={receiverInfo?.profileImage || adminLogo}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <span className="text-xl">{receiverInfo?.name || "Giftly"}</span>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => setActive(!isActive)}
            className="md:hidden text-white text-2xl p-3 rounded-full"
          >
            {isActive ? <CgMenuGridR /> : <RxCross1 />}
          </button>
          <button
            onClick={() => navigate(location.state || "/")}
            className="text-white text-2xl p-3 rounded-full"
          >
            <ImExit />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full overflow-y-scroll scrollbar-none relative">
        <div
          className={`z-30 sidebar w-[300px] lg:w-[250px] absolute md:relative transform ${
            isActive ? "-translate-x-full" : "translate-x-0"
          } md:translate-x-0 transition duration-200 ease-in-out`}
        >
          {currentUser ? (
            currentUser.role === "user" ? (
              renderSidebarSection("Chat with Admin", "admin")
            ) : (
              renderSidebarSection("Active Chats", "user", true)
            )
          ) : (
            <div className="flex justify-center items-center border-r min-h-full">
              Please login to access chats
            </div>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 h-full">
          {isChatLoading ? (
            <div className="flex-1 grid place-items-center">
              <div className="loading loading-dots loading-lg text-primary"></div>
            </div>
          ) : (
            <ChatLists chats={chats} sender={sender} />
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-300">
        <div className="flex space-x-4 max-w-3xl mx-auto">
          <div className="grid place-content-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="cursor-pointer text-primary text-2xl"
            >
              📷
            </label>
          </div>
          <div className="flex flex-1 gap-5">
            <input
              type="text"
              className="w-full p-2 rounded-lg border border-primary focus:outline-primary"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white rounded-lg px-4 hover:bg-[#BF2718] transition-all duration-300 text-2xl"
            >
              <VscSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
