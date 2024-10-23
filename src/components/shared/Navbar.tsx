import React, { useEffect, useRef, useState } from "react";
import { IoMdGift } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { SlBasket } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatarImg from "../../assets/placeholder.jpg";
import { RiMenuUnfold4Line2 } from "react-icons/ri";
import useAuth from "../../Provider/useAuth";
import Notifications from "./Notification";
import TranslateComponent from "./TranslateComponent";


const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { user, logOut, handleFilterChange, setUser } = useAuth() ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // Create a ref for the modal
  // Close the modal if clicked outside
  const cartLength = (() => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart).length : 0;
    } catch (error) {
      // console.error("Error parsing cart:", error);
      return 0;
    }
  })();

  const wishlistLength = (() => {
    try {
      const wishlist = localStorage.getItem('wishlist');
      return wishlist ? JSON.parse(wishlist).length : 0;
    } catch (error) {
      // console.error("Error parsing wishlist:", error);
      return 0;
    }
  })();
  const megaMenu = [
    { name: "Home", path: "/" },
    { name: "All Gift", path: "/allGift" },
    { name: "About Us", path: "/aboutUs" },
    { name: <MdOutlineManageAccounts />, path: "/account", title: 'Account' },
    { name: <GiSelfLove />, path: "/wishList", title: 'Wishlist', count: wishlistLength },
    { name: <SlBasket />, path: "/cart", title: 'Cart', count: cartLength },
    { name: <TranslateComponent />, path: "/", title: 'Language',},
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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


  return (
    <div className="fixed w-full bg-secondary z-50 top-0 shadow-2xl py-[10px]">
      <div className=" container mx-auto bg-secondary h-20 flex justify-between items-center  px-2">
        {/* Logo */}
        <div className="flex justify-center items-center cursor-pointer text-primary">
          <IoMdGift className="md:text-4xl text-base font-bold" />
          <Link to="/" className="md:text-2xl text-base font-bold">
            Giftly
          </Link>
        </div>

        <div className="flex justify-center items-center  z-50">
          <TranslateComponent />
        </div>

        {/* Input */}
        <form className="md:w-1/5">
          <label className="relative group flex justify-center items-center">
            <input
              type="text"
              name="search"
              onChange={(e) => {
                handleFilterChange?.(e)
                navigate('/allGift')
              }}
              className="border border-primary border-opacity-45 md:w-full rounded-lg  md:p-3 p-2  text-black   focus:outline-none focus:border-primary hover:border-primary"

              placeholder="find your Gift..."
            />
            <button type="submit" className="absolute right-2 md:right-6  mt-0 ">
              <IoSearch type="" className="group-hover:text-primary text-xl  cursor-pointer" />
            </button>
          </label>
        </form>
        {/* Mega menu leftSide */}
        <nav className="space-x-4 lg:flex hidden">
          {megaMenu?.slice(0, 3).map((menu) => (
            <NavLink
              key={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "font-bold md:text-lg text-primary  "
                  : "font-bold text-lg  "
              }
              to={menu.path}
            >
              {menu.name}
            </NavLink>
          ))}
        </nav>
        {/* mega menu Icons rightSide */}
        <div className=" flex md:gap-5 gap-1">
          <div id="rightSideMenu" className="flex justify-center items-center gap-x-2 md:gap-x-6">
            <Notifications />
            {megaMenu?.slice(4, 7).map((menu) => (
              <NavLink
                data-tip={menu?.title}
                key={menu.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold text-lg md:text-3xl  relative "
                    : "font-semibold text-black text-lg md:text-3xl tooltip relative "
                }
                to={menu?.path}
              >
                {menu?.name}

                <div className={`${menu?.count ? "block" : 'hidden'} absolute text-white -top-1 -right-2 rounded-full h-[15px] w-[15px] text-center text-xs bg-red-500`}>
                  {menu?.count}
                </div>

              </NavLink>
            ))}
          </div>
          {/* right site icon , Profile & after clicking this show some mega menu like =>  profile, dashboard, logout */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            {/* 3 line icon */}
            {!isOpen ? (
              <div tabIndex={0} className="">
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
              </div>
            ) : (
              <RiMenuUnfold4Line2 className="h-4 text-primary transition w-4 md:h-5 md:w-5" />
            )}
            {/* Avatar */}
            <div className="hidden md:block">
              {!user && <p className="font-semibold">Join Us</p>}
              {user && (
                <img
                  className="rounded-full w-7"
                  referrerPolicy="no-referrer"
                  src={user && user.profileImage ? user.profileImage : avatarImg}
                  alt="profile"
                  height="30"
                  width="30"
                />
              )}
            </div>
            {/* Login Logout functionality */}
            {isOpen && (
              <div ref={modalRef} className="absolute z-10 rounded-xl shadow-md w-[40vw] md:w-[25vw]  lg:w-[20vw] bg-white overflow-hidden -right-2  top-12 text-sm">
                <div className="flex flex-col cursor-pointer ">
                  <div className="lg:hidden">
                    {
                      // navLink for menu
                      megaMenu?.slice(0, 3).map((menu) => (
                        <NavLink
                          key={menu?.path}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary  px-4 py-3 transition font-semibold cursor-pointer   "
                              : `block px-4 py-3 hover:bg-neutral-100 transition font-semibold`
                          }
                          to={menu?.path}
                        >
                          {menu?.name}
                        </NavLink>
                      ))
                    }
                  </div>
                  {user ? (
                    <>
                      <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                        {user?.name}
                      </div>
                      <Link to={"/dashboard"}>
                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                          Dashboard
                        </div>
                      </Link>
                      <div
                        onClick={() => {
                          logOut?.()
                          setUser?.(null)
                        }}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
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
                        to="/signUp"
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


