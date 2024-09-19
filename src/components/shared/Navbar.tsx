import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram, IoMdGift } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { SlBasket } from "react-icons/sl";

import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const NavItem = ["Home", "All gift","About us"];
const Navbar: React.FC = () => {
  return (
    <div className="container mx-auto mt-2">
      <div className="flex  md:flex justify-around  items-center   md:mt-0 mt-2">
        {/* Logo */} 
        <div className="flex justify-center items-center cursor-pointer text-primary">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10]  shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allGift">All Gift</NavLink>
              </li>
              <li>
                <NavLink to="/addTouristsSpot">About Us</NavLink>
              </li>
              
            </ul>
          </div>

          <IoMdGift className="md:text-4xl text-xl font-bold" />
          <h1 className="md:text-2xl font-bold">Giftly</h1>
        </div>
        {/* mega menu */}
        <nav className="space-x-4 md:flex hidden">
        <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-2xl text-primary  "
            : "font-semibold text-2xl  "
        }
        to="/"
      >
        Home
      </NavLink>
        <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-2xl text-primary  "
            : "font-semibold text-2xl  "
        }
        to="/allGift"
      >
        All Gift
      </NavLink>
        <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-2xl text-primary  "
            : "font-semibold text-2xl  text-black"
        }
        to="/aboutUs"
      >
        About Us
      </NavLink>
        </nav>
        {/* input */}
        <label className="relative  md:flex hidden justify-center items-center">
          <input
            type="text"
            className="  md:w-[400px]  w-[300px]  rounded-full border border-primary    md:px-6 px-2 md:p-1 text-secondary"
            placeholder="Search here for find you Gift..."
          />

          <IoSearch className="text-primary absolute right-6 mt-0    hover:text-textYellow cursor-pointer" />
        </label>

        {/* icon */}
        <div
          className="flex justify-center items-center
         gap-x-6"
        >
          <h1 className="md:text-3xl font-bold  flex justify-center items-center gap-x-1 text-primary cursor-pointer">
            {" "}
            <MdOutlineManageAccounts />{" "}
            <span className="md:text-xl font-semibold">Account</span>
          </h1>
          <h1 className="md:text-3xl text-xl flex cursor-pointer justify-center items-center gap-x-1 text-primary">
            {" "}
            <GiSelfLove />
            <span className="md:text-xl font-semibold">wish List</span>
          </h1>
          <h1 className="text-primary cursor-pointer md:text-3xl text-xl font-bold flex justify-center items-center gap-x-1">
            {" "}
            <SlBasket></SlBasket>{" "}
            <span className="md:text-xl font-semibold">Cart</span>
          </h1>
        </div>
      </div>
      {/* Center nav */}

      {/* for sm input */}
      <label className="relative md:hidden flex  justify-center items-center   mt-2 ">
        <input
          type="text"
          className="text-black w-[200px]    rounded-full border border-primary    px-2 md:p-1"
          placeholder="Search for Gold .."
        />

        <IoSearch className="text-primary absolute right-40 mt-0    hover:text-textYellow cursor-pointer" />
      </label>

      {/* Bottom nav */}
    </div>
  );
};

export default Navbar;
