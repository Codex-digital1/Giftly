import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import io from 'socket.io-client';

// URL of your backend server
const socket = io('http://localhost:3000');
console.log(socket);

const Notifications = ({ email }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState(null);


    useEffect(() => {
        // Listen for initial notifications when the client connects
        socket.on('initialNotifications', (data) => {
            console.log(data);
            setNotifications(data);
        });
        
        // Listen for real-time new notifications
        socket.on('newNotification', (notification) => {
            console.log(notification);
            setNewNotification(notification);
            setNotifications(prev => [...prev, notification]);
        });

        // Clean up on unmount
        return () => {
            socket.off('initialNotifications');
            socket.off('newNotification');
        };
    }, []);
  const handle= async()=>{
    
    try {
        const {data}= await axios.post('http://localhost:3000/api/notify',{
            email,
            message:'hi hello',
          })
          console.log(data);
    } catch (error) {
        console.log(error);
    }
  }
console.log(newNotification);
  return (
    <div className='relative '>
      <button 
      onClick={()=>setIsOpen(!isOpen)}
      className='p-1 cursor-pointer'>
      <IoNotifications className='text-2xl '  />
      </button>
      {isOpen && (
              <div className="absolute z-10 transition-all rounded shadow-md w-[40vw] md:w-[25vw]  lg:w-[20vw] h10 bg-white overflow-hidden -right-2  top-12 text-sm">
                {notifications?.map((note, index) => (
           <div key={index} className="flex flex-col  ">
           <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold ">
                     {note?.message}
                   </div>
           </div>
        ))}
               
              </div>
            )}
    </div>
  );
};

export default Notifications;
