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
import useAxiosPublic from "../../Hooks/useAxiosPublic";

type Suggestion = {
  _id: string;
  giftName: string;
};

import TranslateComponent from "./TranslateComponent";



const Navbar: React.FC = () => {
  const axiosPublic=useAxiosPublic()
  const {user,logOut,handleSearchChange,setUser}=useAuth()?? {};



  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    { name: <TranslateComponent />,path:"/", title: 'Language'},
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

    // Fetch suggestions from the backend
    const fetchSuggestions = async (searchQuery: string) => {
        try {
            setIsLoading(true);
            const response = await axiosPublic.get(
                `/api/gifts/suggestions?query=${searchQuery}`
            );
            console.log(response);
            setSuggestions(response.data.data); // Update suggestions list
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce function to limit the API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query) fetchSuggestions(query);
        }, 300); // Delay of 300ms

        return () => clearTimeout(timeoutId); // Cleanup on component unmount
    }, [query]);
    const currentPath = window.location.pathname;

// console.log(suggestions);
const handleSearch=(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  // const form = e.target as HTMLFormElement;
  // const searchValue = (form.elements.namedItem('search') as HTMLInputElement)?.value || '';
  // if(searchValue==='')return
  handleSearchChange?.(query)
  // setQuery(searchValue)
  // setShowSuggestions(true);
  if (currentPath !== '/allGift') {
    navigate('/allGift');
  }  
}
const [showSuggestions, setShowSuggestions] = useState(false);
const [showSuggestionsMinScreen, setShowSuggestionsMinScreen] = useState(false);

const searchRef = useRef<HTMLUListElement | null>(null); // Create a ref for the search component
const searchRefMinScreen = useRef<HTMLUListElement | null>(null); // Create a ref for the search component

  // Function to handle outside click
  const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSuggestions(false); // Hide suggestions if clicked outside
    }
  };
  // Function to handle outside click
  const handleClickOutsideMinScreen = (event: MouseEvent) => {
    if (searchRefMinScreen.current && !searchRefMinScreen.current.contains(event.target as Node)) {
      setShowSuggestionsMinScreen(false); // Hide suggestions if clicked outside
  }
};

  // Set up event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideMinScreen);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideMinScreen);
    };
  }, []);
  const handleSuggestionClick=(giftName:string)=>{
    console.log(giftName,'132');
    setQuery(giftName)
    handleSearchChange?.(giftName)
    setTimeout(() =>{ 
      setShowSuggestions(false)
      setShowSuggestionsMinScreen(false)
    }, 100);
  }
  console.log(query);
  console.log(suggestions);

  return (
    <div className="fixed w-full bg-secondary pb-2  z-50 top-0 shadow-2xl">
      <div className=" container mx-auto bg-secondary md:h-20 flex justify-between items-center  px-2 ">
        {/* Logo */}
        <div className="flex justify-center items-center cursor-pointer text-primary">
          <IoMdGift className="md:text-4xl text-base font-bold" />
          <Link to="/" className="md:text-2xl text-base font-bold">
            Giftly
          </Link>
        </div>

      
        {/* Input */}
        <div className="relative hidden md:w-1/3 md:flex justify-center items-center">
        <form  onSubmit={handleSearch} className="w-full">
          <label className="relative group flex justify-center items-center">
            <input
              type="text"
              name="search"
              value={query}
              onChange={(e)=>{
                setQuery(e.target.value)
                setShowSuggestions(true);
              }}
              className="border border-primary border-opacity-45 md:w-full rounded-lg  md:p-3 p-2  text-black   focus:outline-none focus:border-primary hover:border-primary"

              placeholder="find your Gift..."
            />
            <button type="submit" className="absolute right-2 md:right-6  mt-0 ">
              <IoSearch type="" className="group-hover:text-primary text-xl  cursor-pointer" />
            </button>
          </label>
        </form>
        {isLoading && <p className="absolute top-14 text-sm">Loading...</p>}
        {showSuggestions && suggestions?.length > 0 && (
                <ul ref={searchRef} className=" flex flex-col absolute top-12  w-3/4  border bg-white shadow-lg">
                    {suggestions?.map((item) => (
                        <button
                        type="button"
                            key={item?._id}
                            className="p-2 text-left hover:bg-gray-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Button clicked:', item?.giftName);
                              handleSuggestionClick(item?.giftName);
                            }}
                            
                        >
                            {item?.giftName}
                        </button>
                    ))}
                </ul>
            )}
        </div>
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
              to={menu?.path}
            >
              {menu.name}
            </NavLink>
          ))}
        </nav>
        
        {/* mega menu Icons rightSide */}
        <div className=" flex md:gap-5 gap-4">
          <div className="flex justify-center items-center gap-x-3">
            <Notifications/>
            {megaMenu?.slice(4, 7).map((menu) => (
              <NavLink
                data-tip={menu?.title}
                key={menu.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold text-xl md:text-3xl  relative "
                    : "font-semibold text-black text-xl md:text-3xl tooltip relative "
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
              <div ref={modalRef} className="absolute z-10 rounded-xl shadow-md w-[40vw] md:w-[25vw]  lg:w-[250px] bg-white overflow-hidden -right-2  top-12 text-sm">
                <div className="flex flex-col cursor-pointer ">
                  <div className="lg:hidden">
                    {
                      // navLink for menu
                      megaMenu?.slice(0, 3)?.map((menu) => (
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
      <div className="relative md:hidden md:w-1/3 flex justify-center items-center">
        <form onSubmit={handleSearch} className="w-full">
          <label className="relative group flex justify-center items-center">
            <input
              type="text"
              name="search"
              value={query}
              onChange={(e)=>{
                setQuery(e.target.value)
                setShowSuggestionsMinScreen(true);
              }}
              // onChange={handleSearch}
              className="border border-primary border-opacity-45 w-3/4 rounded-lg  md:p-3 p-2  text-black   focus:outline-none focus:border-primary hover:border-primary"

              placeholder="find your Gift..."
            />
            <button type="submit" className="absolute  right-16  mt-0 ">
            <IoSearch type="" className="group-hover:text-primary text-xl  cursor-pointer" />
            </button>
          </label>
        </form>
        {isLoading && <p className="absolute top-10 text-sm">Loading...</p>}
            {showSuggestionsMinScreen && suggestions.length > 0 && (
                <ul ref={searchRefMinScreen} className="absolute top-10  w-3/4  border bg-white shadow-lg">
                    {suggestions?.map((item) => (
                        <li
                            key={item?._id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={()=>handleSuggestionClick(item?.giftName)}
                        >
                            {item?.giftName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
  );
};

export default Navbar;


