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
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

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
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <Register></Register>,
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
]);

export default router;
