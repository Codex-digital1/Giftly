import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import Allgift from "../pages/allGift/Allgift";
import AboutUs from "../pages/aboutUs/AboutUs";
import Account from "../pages/acount/Account";
import WishList from "../pages/wishList/WishList";
import Cart from "../pages/cart/Cart";

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
        element:<Allgift></Allgift>
      },
      {
        path: "aboutUs",
        element:<AboutUs></AboutUs>
      },
      {
        path:'/account',
        element:<Account></Account>
      },
      {
        path:'/wishlist',
        element:<WishList></WishList>
      },
      {
        path:'/cart',
        element:<Cart></Cart>
      }
    ],
  },
]);

export default router;
