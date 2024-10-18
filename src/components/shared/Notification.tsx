import { useEffect, useRef, useState } from "react";
import { RiNotification2Fill, RiNotification3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import io from "socket.io-client";

// Define the type for a notification
interface Notification {
  id?: string;
  giftId?: string;
  orderId?: string;
  title: string;
  message: string;
  read?: boolean;
}


// URL of your backend server
const socket = io(import.meta.env.VITE_SERVER_URL);

const Notifications = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const getNotifi = localStorage.getItem("notifications");
    return getNotifi ? JSON.parse(getNotifi) : [];
  });
  const [newNotification, setNewNotification] = useState<Notification[]>([]);
  const modalRef = useRef<HTMLDivElement>(null); // Create a ref for the modal

  useEffect(() => {
    // Listen for initial notifications when the client connects
    socket.on("initialNotifications", (data: Notification[]) => {
      setNotifications(() => {
        const updatedNotifi = [...data];
        localStorage.setItem("notifications", JSON.stringify(updatedNotifi));
        return updatedNotifi;
      });
    });

    // Listen for real-time new notifications
    socket.on("newNotification", (notification: Notification) => {
      setNewNotification([notification]);
      setNotifications((prevCart) => {
        const updatedNotifi = [...prevCart,notification];
        localStorage.setItem("notifications", JSON.stringify(updatedNotifi));
        return updatedNotifi;
      });
    });
    socket.on("receiveNotification", (notification: Notification) => {
      // console.log(notification);
      setNewNotification([notification]);
      setNotifications((prevCart) => {
        const updatedNotifi = [...prevCart,notification];
        localStorage.setItem("notifications", JSON.stringify(updatedNotifi));
        return updatedNotifi;
      });
    });

    // Clean up on unmount
    return () => {
      socket.off("initialNotifications");
      socket.off("newNotification");
      socket.off("receiveNotification");
    };
  }, []);
  console.log(notifications);

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unread = notifications.filter((notify) => !notify.read);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 cursor-pointer tooltip"
        data-tip="Notifications"
      >
        {unread?.length !== 0 && (
          <div className="absolute text-white top-0 right-0 rounded-full h-[14px] w-[14px] text-xs bg-red-500">
            {unread?.length}
          </div>
        )}
        {isOpen ? (
          <RiNotification2Fill className="text-2xl transition" />
        ) : (
          <RiNotification3Line className="text-2xl" />
        )}
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute z-10 h-[400px] overflow-auto transition-all rounded-md shadow-md w-[40vw] md:w-[25vw] lg:w-[30vw] bg-white -right-2 top-12 text-sm"
        >
          <div className="flex flex-col">
            <div className="px-4 py-3 border-b-2 font-bold text-lg">
              Notifications
            </div>
          </div>

          {newNotification.length !== 0 &&
            newNotification.map((note, index) => (
              <div key={index} className="flex flex-col">
                <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  <p>{note.title}</p>
                  <p className="relative">
                    {note?.message}
                    {note?.giftId && (
                      <Link
                        to={`/productDetails/${note?.giftId}`}
                        className="absolute right-0"
                      >
                        more
                      </Link>
                    )}
                    {note?.orderId && (
                      <Link
                        to={`/dashboard/my-orders/order-status/${note?.orderId}`}
                        className="absolute right-0"
                      >
                        more
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            ))}

          {notifications.map((note, index) => (
            <div key={index} className="flex flex-col">
              <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                <p>{note.title}</p>
                <p className="relative">
                  {note.message}
                  {note.giftId && (
                    <Link
                      to={`/productDetails/${note.giftId}`}
                      className="absolute right-0"
                    >
                      more
                    </Link>
                  )}
                  {note?.orderId && (
                    <Link
                      to={`/dashboard/my-orders/order-status/${note?.orderId}`}
                      className="absolute right-0"
                    >
                      more
                    </Link>
                  )}
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
