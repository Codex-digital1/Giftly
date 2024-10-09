import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import io from "socket.io-client";

// Define the type for a notification
interface Notification {
  id?: string;
  giftId?: string;
  title: string;
  message: string;
  read?: boolean;
}

// Define the type for the component props
interface NotificationsProps {
  email: string;
}

// URL of your backend server
const socket = io("http://localhost:3000");

const Notifications: React.FC<NotificationsProps> = ({ email }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState<Notification[]>([]);

  useEffect(() => {
    // Listen for initial notifications when the client connects
    socket.on("initialNotifications", (data: Notification[]) => {
      setNotifications(data);
    });

    // Listen for real-time new notifications
    socket.on("newNotification", (notification: Notification) => {
      setNewNotification([notification]);
      setNotifications((prev) => [...prev, notification]);
    });

    // Clean up on unmount
    return () => {
      socket.off("initialNotifications");
      socket.off("newNotification");
    };
  }, []);

  const unread = notifications.filter((notify) => notify?.read !== true);

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 cursor-pointer tooltip"
        data-tip="Notifications"
      >
        <div className="absolute text-white top-0 right-0 rounded-full h-[14px] w-[14px] text-xs bg-red-500">
          {unread?.length !== 0 && unread?.length}
        </div>
        <IoNotifications className="text-2xl " />
      </button>

      {isOpen && (
        <div className="absolute z-10 transition-all rounded shadow-md w-[40vw] md:w-[25vw] lg:w-[30vw] bg-white overflow-hidden -right-2 top-12 text-sm">
          <div className="flex flex-col ">
            <div className="px-4 py-3 border-b-2 font-bold text-lg">
              Notifications
            </div>
          </div>

          {newNotification?.length !== 0 &&
            newNotification?.map((note, index) => (
              <div key={index} className="flex flex-col ">
                <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  <p>{note?.title}</p>
                  <p>{note?.message}</p>
                  <a href="#">more</a>
                </div>
              </div>
            ))}

          {notifications?.map((note, index) => (
            <div key={index} className="flex flex-col ">
              <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                <p>{note?.title}</p>
                <p className="relative">
                  {note?.message}
                  <Link to={`/productDetails/${note?.giftId}`} className="absolute right-0">
                    more
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
