import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Provider/useAuth";
const useGetSpecificOrders = () => {
  const { user } = useAuth() ?? {};
  const { data, isLoading } = useQuery({
    queryKey: ["specificOrders", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user-orders/${user?.email}`
      );
      return res.data;
    },
  });
  return [data, isLoading];
};

export default useGetSpecificOrders;
