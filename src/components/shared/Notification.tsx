import { useEffect, useRef, useState } from "react";
import { RiNotification2Fill, RiNotification3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { io, Socket } from 'socket.io-client';
import useAuth from "../../Provider/useAuth";

// Type definition for Notification
interface Notification {
  id?: string;
  giftId?: string;
  orderId?: string;
  title: string;
  message: string;
  read?: boolean;
}

let socketCall: Socket;

const getSocket = () => {
  if (!socketCall) {
    socketCall = io(import.meta.env.VITE_SERVER_URL, {
      transports: ['websocket'],
      withCredentials: true,
        reconnectionAttempts: 5,  // Max retries
        reconnectionDelay: 1000,   // Delay between retries

    });
  }
  return socketCall;
};

const Notifications = () => {
  const { user } = useAuth() ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const storedNotifications = localStorage.getItem("notifications");
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });
  const modalRef = useRef<HTMLDivElement>(null);

  // Register user and listen to socket events
  useEffect(() => {
    const socketCall = getSocket();
    console.log(socketCall);
    if (user?._id) {
      // socketCall.connect()
      socketCall.emit('joinRoom', user?._id);
    }
      socketCall.on('connect', () => {
        console.log('Socket connected:', socketCall.id);
      });

      socketCall.on("initialNotifications", (data: Notification[]) => {
        setAndStoreNotifications(data);
      });

      socketCall.on("newNotification", (notification: Notification) => {
        handleNewNotification(notification);
      });
      socketCall.on("receiveNotification", (notification: Notification) => {
        handleNewNotification(notification);
      });
   

    // Clean up socket listeners
    return () => {
      socketCall.off("initialNotifications");
      socketCall.off("newNotification");
      socketCall.off("receiveNotification");
    };
  }, [user]);

  const setAndStoreNotifications = (newNotifications: Notification[]) => {
    const updatedNotifications = [...newNotifications];
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
  };

  const handleNewNotification = (notification: Notification) => {
    setAndStoreNotifications([notification,...notifications]);
  };

  // Handle click outside to close the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Reusable Notification Item Component
  const NotificationItem = ({ note }: { note: Notification }) => (
    <div className="px-4 py-3 hover:bg-neutral-100 transition-all font-semibold border-b">
      <p>{note.title}</p>
      <p className="relative">
        {note.message}
        {note.giftId && (
          <Link to={`/productDetails/${note?.giftId}`} className="text-primary  ml-2">
            View Gift
          </Link>
        )}
        {note.orderId && (
          <Link to={`/dashboard/my-orders/order-status/${note.orderId}`} className="text-blue-500 ml-2">
            Track Order
          </Link>
        )}
      </p>
    </div>
  );

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 cursor-pointer relative"
        aria-label="Notifications"
      >
        {unreadCount > 0 && (
          <div className="absolute text-white top-1 right-1 h-4 w-4 text-xs bg-red-500 rounded-full flex items-center justify-center">
            {unreadCount}
          </div>
        )}
        {isOpen ? (
          <RiNotification2Fill className="text-xl md:text-3xl text-primary transition" />
        ) : (
          <RiNotification3Line className="text-xl md:text-3xl text-gray-600" />
        )}
      </button>

      {/* Notification Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute z-20 mt-2 right-0 w-[300px] md:w-[400px] bg-white shadow-lg rounded-lg overflow-hidden transition-all"
        >
          <div className="px-4 py-3 bg-primary text-white font-bold text-lg">
            Notifications
          </div>

          {notifications.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {notifications?.map((note, index) => (
                <NotificationItem key={index} note={note} />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No notifications available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
