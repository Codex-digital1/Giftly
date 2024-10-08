import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { MdMessage } from "react-icons/md";
import { Link } from 'react-router-dom';

const Layouts: React.FC = () => {

    const location = useLocation()

    const path = location?.pathname;
    return (
        <div className="relative">
            <Navbar />
            <div className="min-h-[calc(100vh-510px)]">
             
                {
                    path === "/chatInbox" || <Link to="/chatInbox">
                        <button
                            className="btn-secondary text-2xl lg:text-3xl p-2 md:p-3 lg:p-4 rounded-full fixed bottom-20 lg:bottom-5 left-3 z-30 lg:z-50 transition-all duration-300 ease-in-out"

                        >
                            <MdMessage />
                        </button>
                    </Link>
                }

                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layouts;
