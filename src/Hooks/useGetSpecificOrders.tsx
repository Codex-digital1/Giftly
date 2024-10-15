import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Provider/useAuth";
const useGetSpecificOrders = () => {
  const { user } = useAuth() ?? {};
<<<<<<< HEAD
  const { data, isLoading } = useQuery({
=======
  const { data, isLoading, refetch } = useQuery({
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8
    queryKey: ["specificOrders", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user-orders/${user?.email}`
      );
      return res.data;
    },
  });
<<<<<<< HEAD
  return [data, isLoading];
=======
  return [data, isLoading, refetch];
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8
};

export default useGetSpecificOrders;
