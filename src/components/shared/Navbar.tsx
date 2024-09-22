import React, { useState } from "react";
import { IoMdGift } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { SlBasket } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import avatarImg from "../../assets/placeholder.jpg";
import { RiMenuUnfold4Line2 } from "react-icons/ri";

const megaMenu = [
  { name: "Home", path: "/" },
  { name: "All Gift", path: "/allGift" },
  { name: "About Us", path: "/aboutUs" },
  { name: <MdOutlineManageAccounts />, path: "/account" },
  { name: <GiSelfLove />, path: "/wishList" },
  { name: <SlBasket />, path: "/cart" },
];


const navLink = (
  <div className="md:flex ">
    <Link
      to="/"
      className="block 
       px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      Home
    </Link>
    <Link
      to="/meals"
      className="block 
       px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      All Gifts
    </Link>
    <Link
      to="/upcomingMeals"
      className="block 
       px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      About Us
    </Link>
    
  </div>
);
const Navbar: React.FC = ({ user }) => {
  user=true
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" fixed w-full bg-white z-50 top-0 ">
      <div className=" container mx-auto bg-white  h-20 flex justify-between items-center px-2">
      {/* Logo */}
      <div className="flex justify-center bg-white items-center cursor-pointer text-primary">
        <IoMdGift className="md:text-4xl text-base font-bold" />
        <Link to="/" className="md:text-2xl text-base font-bold">
          Giftly
        </Link>
      </div>
        {/* Input */}
        <form className="md:w-1/3">
        <label className="relative group flex justify-center items-center  ">
        <input 
        required
          type="text"
          className="w-full rounded-2xl  border border-secondary md:px-6 p-2 md:p-4    focus:outline-none focus:border-primary hover:border-primary"
          placeholder="Search your Gift..."
        />
        <button type="submit" className="flex justify-center items-center"><IoSearch className="text-slate-400 group-hover:text-primary absolute md:right-6 right-3 mt-0 hover:text-textYellow cursor-pointer text-xl md:text-2xl" /></button>
      </label>
      </form>
      {/* Mega menu leftSide */}
      <nav className="space-x-4 md:flex hidden">
        {megaMenu?.slice(0, 3).map((menu) => (
          <NavLink
            key={menu.path}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-lg  text-primary  "
                : "font-semibold text-lg "
            }
            to={menu.path}
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    
      {/* input for sm */}
      {/* <label className="relative group md:hidden flex justify-center items-center ">
        <input
          type="text"
          className="text-black w-[150px] rounded-full border border-black px-2 md:p-1 focus:outline-none focus:border-primary hover:border-primary"
          placeholder="Search.."
        />
        <IoSearch className="group-hover:text-primary absolute right-3 mt-0 hover:text-textYellow cursor-pointer" />
      </label> */}
      {/* mega menu Icons rightSide */}
      <div className=" flex gap-5">

      <div className="flex justify-center items-center gap-x-4 md:gap-x-6">
        {megaMenu?.slice(4, 6).map((menu) => (
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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        {/* menu icon */}
        {!isOpen?  <div tabIndex={0} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 text-primary transition w-4 md:h-5 md:w-5"
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
          </div>:<RiMenuUnfold4Line2               className="h-4 text-primary transition w-4 md:h-5 md:w-5"
 />
        }
       
        <div className="hidden md:block">
          {!user && <p className="font-semibold">Join Us</p>}

          {/* Avatar */}
          {user && (
            <img
              className="rounded-full w-7"
              referrerPolicy="no-referrer"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt="profile"
              height="30"
              width="30"
            />
          )}
        </div>
    

      {isOpen && (
        <div className="absolute z-10 rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden -left-[240%] md:left-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer ">
            <div className="md:hidden">{
            // navLink for menu
            megaMenu?.slice(0,3).map((menu) => (
              <NavLink
                key={menu.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary  px-4 py-3 transition font-semibold cursor-pointer   "
                    : `block px-4 py-3 hover:bg-neutral-100 transition font-semibold`
                }
                to={menu.path}
              >
                {menu.name}
              </NavLink>
            ))
              }</div>
            {user ? (
              <>
                <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                  {user.displayName}
                </div>
                <Link to={"/account"}>
                  <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                    Profile
                  </div>
                </Link>
                <Link to={"/dashboard"}>
                  <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                    Dashboard
                  </div>
                </Link>
                <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
