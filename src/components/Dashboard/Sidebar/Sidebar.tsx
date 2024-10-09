import { useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp, BsStars } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdGift } from "react-icons/io";
import { ImUsers } from "react-icons/im";
 import useAuth from "../../../Provider/useAuth";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaHistory } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";

interface UserRole {
  role: string; // Define role structure
}
const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | undefined>(undefined);
 
  const { logOut, user } = useAuth() ?? {};
  const axiosPublic = useAxiosPublic();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogOut = () => {
    logOut?.();
    navigate('/')
  };

  //  Check if user exists before making the API call
  useEffect(() => {
    // Check if user is not null or undefined and email exists
    if (user && user.email) {
      axiosPublic
        .get(`/getAUser/${user.email}`)
        .then((response) => {
          setRole(response.data.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.log("User email is not available or user is null");
    }
  }, [user, axiosPublic]);

  console.log(role);
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden z-[50] relative">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <div className="flex justify-center bg-white items-center cursor-pointer text-primary">
              <IoMdGift className="md:text-4xl text-base font-bold" />
              <Link to="/" className="md:text-2xl text-base font-bold">
                Giftly
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-primary focus:text-white"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-[270px] space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 rounded-lg justify-center items-center  mx-auto">
              <div className="flex justify-center  items-center cursor-pointer text-primary">
                <IoMdGift className="md:text-4xl text-base font-bold" />
                <Link to="/" className="md:text-2xl text-base font-bold">
                  Giftly
                </Link>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}

            <nav>
              {/* Statistics */}

              {role?.role === "admin" ? (
                <div>
                  <NavLink
                    to="statistics"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsGraphUp className="w-5 h-5" />

                    <span className="mx-4 font-medium">Statistics</span>
                  </NavLink>
                  {/* Manage Gift */}
                  <NavLink
                    to="manage-gift"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <IoMdGift className="w-5 h-5" />
                    <span className="mx-4 font-medium">
                      Gift Upload & Manage
                    </span>
                  </NavLink>
                  {/* Manage Users */}
                  <NavLink
                    to="manage-users"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <ImUsers className="w-5 h-5" />
                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>
                  {/* Manage Users */}
                  <NavLink
                    to="order-history"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <FaHistory />

                    <span className="mx-4 font-medium">Order History</span>
                  </NavLink>
                  {/* Manage Orders */}
                  <NavLink
                    to="manage-orders"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineShoppingCartCheckout className="w-5 h-5" />
                    <span className="mx-4 font-medium">Manage Orders</span>
                  </NavLink>
                </div>
              ) : (
                <div>
                  {/* user dashboard */}
                  {/* my order */}
                  <NavLink
                    to="my-orders"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineShoppingCartCheckout className="w-5 h-5" />
                    <span className="mx-4 font-medium">My Order</span>
                  </NavLink>
                  {/* Order History */}
                  <NavLink
                    to="user/order-history"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <FaHistory />
                    <span className="mx-4 font-medium">Order History</span>
                  </NavLink>
                  {/* my wishlist */}
                  <NavLink
                    to="my-wishlist"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <GiSelfLove />

                    <span className="mx-4 font-medium">My Wishlist</span>
                  </NavLink>
                  {/* my rating */}
                  <NavLink
                    to="my-rating"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                        isActive ? "bg-primary  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsStars />

                    <span className="mx-4 font-medium">My rating</span>
                  </NavLink>
                </div>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* shared */}
          {/* Profile Menu */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-white ${
                isActive ? "bg-primary  text-white" : "text-gray-600"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-primary   hover:text-white transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
