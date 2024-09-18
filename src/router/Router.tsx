import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import App from "../App";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path: "/c",
            element:<App></App>
        },
      ]
    },
  ]);

  export default router;