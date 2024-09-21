import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";

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
      
    ],
  },
]);

export default router;
