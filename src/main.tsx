
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(

  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster />
  </QueryClientProvider>

);
