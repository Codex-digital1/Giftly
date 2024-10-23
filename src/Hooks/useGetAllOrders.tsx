import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useGetAllOrders = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/all-orders`
      );
      return res.data;
    },
  });
  return [data, isLoading, refetch];
};

export default useGetAllOrders;
