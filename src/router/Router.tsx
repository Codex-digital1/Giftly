import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import Allgift from "../pages/allGift/Allgift";
import AboutUs from "../pages/aboutUs/AboutUs";
import WishList from "../pages/wishList/WishList";
import Cart from "../pages/cart/Cart";
import ProductDetails from "../pages/details/ProductDetails";
import ProfileInfo from "../pages/acount/ProfileInfo";
import MyOrders from "../pages/acount/MyOrders";
import MyRating from "../pages/acount/MyRating";
import MyWishlist from "../pages/acount/MyWishlist";
import Dashboard from "../layouts/Dashboard";
import Users from "../pages/Dashboard/Admin/Users/Users";
import Gift from "../pages/Dashboard/User/Gift/Gift";
import OrderHistory from "../pages/Dashboard/Admin/OrderHistory/OrderHistory";
import ManageOrders from "../pages/Dashboard/User/ManageOrders/ManageOrders";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Success from "../pages/success/Success";
import OrderTracking from "../pages/Dashboard/User/OrderTracking/OrderTracking";
import ChatContainer from "../pages/chatFeature/ChatContainer";
import UserOrderHistory from "../pages/Dashboard/User/UserOrderHistory/UserOrderHistory";
import StatisticsPage from "../pages/Dashboard/Admin/Statistics/StatisticsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/payment/success/:tranId",
        element: <Success></Success>,
      },
      {
        path: "/allGift",
        element: <Allgift></Allgift>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
       
      {
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <Register></Register>,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/chatInbox",
        element: <ChatContainer />,
      },
    ],
  },
  // dash board for user and admin
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "manage-users",
        element: <Users />,
      },
      {
        path: "manage-gift",
        element: <Gift />,
      },
      {
        path: "manage-users",
        element: <Users />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      // user
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "user/order-history",
        element: <UserOrderHistory />,
      },
      {
        path: "my-orders/order-status/:id",
        element: <OrderTracking />,
      },

      {
        path: "my-wishlist",
        element: <MyWishlist></MyWishlist>,
      },
      {
        path: "my-rating",
        element: <MyRating></MyRating>,
      },
      // shared
      {
        path: "profile",
        element: <ProfileInfo></ProfileInfo>,
      },
    ],
  },
]);

export default router;
