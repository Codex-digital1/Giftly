import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Provider/useAuth";

export const axiosSecure: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const useAxiosSecure = (): AxiosInstance => {
  const { logOut } = useAuth()??{};
  const navigate = useNavigate();


  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        console.error("Error tracked in the interceptor", error.response);

        if (error.response?.status === 401 || error.response?.status === 403) {
            if (logOut) {
                await logOut();
                navigate("/login");
              } else {
                console.log("logOut function is undefined");
              }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
