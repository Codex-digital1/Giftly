import React from "react";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoMdGift } from "react-icons/io";
import { Link } from "react-router-dom";
import useAuth from "../../Provider/useAuth";

const Footer: React.FC = () => {
  const { user} = useAuth() ?? {};
  const dashboardRouteDefine = user?.role === 'admin'
  ? '/dashboard/manage-gift'
  : '/dashboard/my-orders';

  return (
    <div className="w-full bg-secondary">
      <footer className="container mx-auto px-4 sm:px-6">
        <div className="md:flex space-y-5 md:space-y-0 justify-between py-14 gap-14 lg:gap-20 ">

          <div className="block">
            <Link to={"/"} className="flex items-center text-primary">
              <IoMdGift className="md:text-4xl text-xl font-bold" />
              <h1 className="md:text-2xl font-bold">Giftly</h1>
            </Link>
            <p className="font-bold ">Customer Care</p>
            <div className="">
              <p className="text-gray-500">Contact us at: <Link to={"/chatInbox"} className="font-medium hover:text-primary">Live Chat</Link></p>
              <p className="text-gray-500">
                Send us an email:
                <Link
                  to={'/aboutUs'}
                  className="font-medium hover:text-primary"
                >
                  admin@gmail.com
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start min-[530px]:flex-row max-[1124px]:w-full max-[1124px]:justify-between gap-12 xl:gap-24 max-[1124px]:max-w-2xl max-[1124px]:mx-auto">
            <div className="block">
              <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">
                <Link to={"/"}>Home</Link>
              </h4>
              <ul className="grid gap-6 text-center lg:text-left">
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
                    to={dashboardRouteDefine}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
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
                  <Link
                    to={"/cart"}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cart List
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/my-rating"}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div className="block">
              <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">
                Get to know us
              </h4>
              <ul className="grid gap-6 text-center lg:text-left">
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
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex space-x-5 my-3">
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/dd7d3db1-047c-4e65-b89e-d710eb539976_BD-139-84.png"
                alt="cod"
                style={{ height: 28, width: "100%" }}
                data-spm-anchor-id="a2a0e.tm80335411.0.i2.530179e0vi5kH4"
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/27fcee2a-7768-48b2-b369-faf91829bf76_BD-140-84.png"
                alt="visa"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/e369d9f9-eb41-428c-b0c2-07bd60ffdc6e_BD-63-48.png"
                alt="master-card"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/29d575f6-594f-4f9f-82f3-dbbe78a4ae0e_BD-145-84.png"
                alt="american-express"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/9fcd39bd-e3e2-49f0-ad52-bfe54080562d_BD-144-84.png"
                alt="easy-monthly-installments"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/dbfdbbea-19ca-4be1-9b8f-ecb1fabdc6f7_BD-145-86.png"
                alt="bKash"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/395e474e-f67e-4a29-9521-5bc693ca53df_BD-144-84.png"
                alt="nagad"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/7eff036e-acff-4560-890c-fde8e1bb053e_BD-144-84.png"
                alt="rainbow"
                style={{ height: 28, width: "100%" }}
              />
            </span>
            <span className="lzd-icon-payment lzd-icon-payment-daraz">
              <img
                loading="lazy"
                src="https://img.lazcdn.com/us/domino/71587ea9-6e32-4728-b251-4513236a8ba5_BD-144-84.png"
                alt="rocket"
                style={{ height: 28, width: "100%" }}
              />
            </span>
          </div>
        </div>
        <div className="py-9 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 sm:flex-row sm:justify-between">
            <span className="text-sm text-gray-500 ">
            © Giftly {new Date().getFullYear()} All rights reserved. 
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
