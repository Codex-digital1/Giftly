import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ChatApp from '../pages/chatApp/ChatApp';
import { MdMessage } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx';

const Layouts: React.FC = () => {
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

    return (
        <div className="relative">
            <Navbar />
            <div className="min-h-[calc(100vh-510px)]"> {/* Ensures main content occupies min height */}
                <div className="z-30">
                    {isOpenChat && (
                        <div className="fixed bottom-0 left-0 w-full h-[calc(100vh - 100px)] top-[80px]  lg:left-5 lg:max-w-md lg:h-[470px] z-40"> 
                            {/* Full width and height on mobile, fixed on lg */}
                            <ChatApp setIsOpenChat={setIsOpenChat} />
                        </div>
                    )}
                </div>

                {/* Toggle Chat Button */}
                <button
                    className="btn-secondary text-2xl lg:text-3xl p-2 md:p-3 lg:p-4 rounded-full fixed bottom-20 lg:bottom-5 left-5 z-30 lg:z-50 transition-all duration-300 ease-in-out"
                    onClick={() => setIsOpenChat(!isOpenChat)}
                >
                    {isOpenChat ? <RxCross2 /> : <MdMessage />}
                </button>

                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layouts;
