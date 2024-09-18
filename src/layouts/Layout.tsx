import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const Layouts: React.FC = () => {
    return (
        <div>
            <Navbar></Navbar>
         <Outlet></Outlet>
         <Footer></Footer>
        </div>
    );
};

export default Layouts;