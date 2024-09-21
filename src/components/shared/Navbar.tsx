import React from "react";
import { IoMdGift } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { SlBasket } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const megaMenu = [
  { name: "Home", path: "/" },
  { name: "All Gift", path: "/allGift" },
  { name: "About Us", path: "/aboutUs" },
  { name: <MdOutlineManageAccounts />, path: "/account" },
  { name: <GiSelfLove />, path: "/wishList" },
  { name: <SlBasket />, path: "/cart" },
];

const Navbar: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto mt-2 h-20 flex justify-between items-center px-2">
      {/* Logo */}
      <div className="flex justify-center items-center cursor-pointer text-primary">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
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
              <NavLink to="/aboutUs">About Us</NavLink>
            </li>
          </ul>
        </div>

        <IoMdGift className="md:text-4xl text-base font-bold" />
        <Link to="/" className="md:text-2xl text-base font-bold">
          Giftly
        </Link>
      </div>
      {/* Mega menu leftSide */}
      <nav className="space-x-4 md:flex hidden">
        {megaMenu?.slice(0, 3).map((menu) => (
          <NavLink
            key={menu.path}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-lg md:text-xl lg:text-2xl text-primary  "
                : "font-semibold text-lg md:text-xl lg:text-2xl"
            }
            to={menu.path}
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
      {/* Input */}
      <label className="relative group md:flex hidden justify-center items-center">
        <input
          type="text"
          className="md:w-[300px]  w-[200px] rounded-full  border border-black md:px-6 px-2 md:p-1 text-black   focus:outline-none focus:border-primary hover:border-primary"
          placeholder="Search here for find you Gift..."
        />
        <IoSearch className="group-hover:text-primary absolute right-6 mt-0 hover:text-textYellow cursor-pointer" />
      </label>
      {/* input for sm */}
      <label className="relative group md:hidden flex justify-center items-center ">
        <input
          type="text"
          className="text-black w-[150px] rounded-full border border-black px-2 md:p-1 focus:outline-none focus:border-primary hover:border-primary"
          placeholder="Search.."
        />
        <IoSearch className="group-hover:text-primary absolute right-3 mt-0 hover:text-textYellow cursor-pointer" />
      </label>
      {/* mega menu Icons rightSide */}
      <div className="flex justify-center items-center gap-x-4 md:gap-x-6">
        {megaMenu?.slice(3, 6).map((menu) => (
          <NavLink
            key={menu.path}
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold text-lg md:text-3xl   "
                : "font-semibold text-black text-lg md:text-3xl "
            }
            to={menu.path}
          >
            {menu.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
