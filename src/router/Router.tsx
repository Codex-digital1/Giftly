import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import App from "../App";
import ProductsDetails from "../pages/ProductsDetails/ProductsDetails";

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
        path: "/c",
        element: <App></App>,
      },
      {
        path: "/products-details",
        element: <ProductsDetails></ProductsDetails>,
      },
    ],
  },
]);

export default router;
