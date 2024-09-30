import React from "react";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoMdGift } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
   <div className="w-full bg-secondary">
     <footer className="container mx-auto  px-4  sm:px-6  ">
      <div className="flex justify-between flex-col py-14 gap-14 lg:gap-20 min-[1124px]:flex-row">
        <div className="block  xl:max-w-lg">
          <Link to={"/"} className="flex items-center text-primary">
            <IoMdGift className="md:text-4xl text-xl font-bold" />
            <h1 className="md:text-2xl font-bold">Giftly</h1>
          </Link>
          <p className="text-lg text-gray-500 mb-5 text-center min-[1124px]:text-left mt-5">
            Trusted in more than 100 countries & 5 million customers.{" "}
          </p>
          <div className="relative  flex-row gap-3  flex items-center justify-between max-[1124px]:max-w-2xl max-[1124px]:mx-auto ">
            <span className="absolute  left-5 top-4 lg:top-5">
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25201 4L7.15881 7.89529C9.26862 9.16117 10.3235 9.79412 11.4825 9.76654C12.6416 9.73896 13.6652 9.05656 15.7124 7.69175L20.748 4M9 17H13C16.7712 17 18.6569 17 19.8284 15.8284C21 14.6569 21 12.7712 21 9C21 5.22876 21 3.34315 19.8284 2.17157C18.6569 1 16.7712 1 13 1H9C5.22876 1 3.34315 1 2.17157 2.17157C1 3.34315 1 5.22876 1 9C1 12.7712 1 14.6569 2.17157 15.8284C3.34315 17 5.22876 17 9 17Z"
                  stroke="#ff4d6d"
                />
              </svg>
            </span>
            <input
              type="text"
              name="email"
              className="py-3 px-5 h-14 pl-14 border border-gray-300 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none flex-1 w-full "
              placeholder="Contact"
            />
            <button
              type="submit"
              className="h-14 py-3.5 px-7 bg-primary transition-all duration-500 shadow-md rounded-full text-white font-semibold"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start min-[530px]:flex-row max-[1124px]:w-full max-[1124px]:justify-between gap-12 xl:gap-24 max-[1124px]:max-w-2xl max-[1124px]:mx-auto">
          <div className="block">
            <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">
              Pagedone
            </h4>
            <ul className="grid gap-6 text-center lg:text-left">
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <Link
                  to={"/allGift"}
                  className="text-gray-600 hover:text-gray-900"
                >
                  All Gift
                </Link>
              </li>
              <li>
                <Link
                  to={"/aboutUs"}
                  className="text-gray-600 hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="block">
            <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">
              Products
            </h4>
            <ul className="grid gap-6 text-center lg:text-left">
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Figma UI System
                </a>
              </li>
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Icons Assets
                </a>
              </li>
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Responsive Blocks
                </a>
              </li>
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Components Library
                </a>
              </li>
            </ul>
          </div>
          <div className="block">
            <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">
              Support
            </h4>
            <ul className="grid gap-6 text-center lg:text-left">
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  License
                </a>
              </li>
              <li>
                <a href="" className="text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-9 border-t border-gray-200">
        <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 sm:flex-row sm:justify-between">
          <span className="text-sm text-gray-500 ">
            ©<a href="https://pagedone.io/">pagedone</a>2024, All rights
            reserved.
          </span>
          <div className="flex  space-x-6 sm:justify-center ">
            <a href="" className="group flex justify-center items-center ">
            <FaXTwitter />

            </a>
            <a href="" className="group flex justify-center items-center ">
              <svg
                className="w-[1.25rem] h-[1.125rem] text-gray-700 group-hover:text-indigo-600"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
         <FaInstagram />

              </svg>
            </a>
            <a href="" className="group flex justify-center items-center ">
              <svg
                className="w-[1rem] h-[1rem] text-gray-700 group-hover:text-indigo-600"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
             <FaLinkedinIn />

              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
   </div>
  );
};

export default Footer;
