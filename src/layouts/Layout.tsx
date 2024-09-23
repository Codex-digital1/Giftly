import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const Layouts: React.FC = () => {
    return (
        <div> 
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-510px)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layouts;