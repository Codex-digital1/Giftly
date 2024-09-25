import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import Allgift from "../pages/allGift/Allgift";
import AboutUs from "../pages/aboutUs/AboutUs";
import Account from "../pages/acount/Account";
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
        path: "/productDetails",
        element: <ProductDetails></ProductDetails>,
      },
      //  ( Profile ) Nesting route 
      {
        path: "/account",
        element: <Account></Account>,
        children: [
          {
            path: "",
            element: <ProfileInfo />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "my-wishlist",
            element: <MyWishlist />,
          },
          {
            path: "my-rating",
            element: <MyRating />,
          },
        ],
      },
    ],
  },
  {
    path:'/dashboard',
    element: <Dashboard/>,
    children:[
      {
        path:'manage-users',
        element:<Users/>
      },
      {
        path:'manage-gift',
        element:<Gift/>
      },
      {
        path:'order-history',
        element:<OrderHistory/>
      },
      {
        path:'manage-orders',
        element:<ManageOrders/>
      }
    ]
  }
]);

export default router;
