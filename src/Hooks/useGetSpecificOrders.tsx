import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Provider/useAuth";
import { OrderTypes } from "../types/Types";
import { useEffect, useState } from "react";


const useGetSpecificOrders = () => {
  const { user } = useAuth() ?? {};
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const fetchOrders = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user-orders/${user?.email}`, {
        params: { page: pageParam, limit: 12 },
      }
    );
    console.log(res.data); // Should log an array of orders
    return { data: res.data }; // Wrap it in an object if required by useInfiniteQuery
  };
  
  // useInfiniteQuery with correct response format
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["specificOrders", user?.email],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.orders.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  
  
  useEffect(() => {
    if (data) {
      // Flatten all pages into a single array of orders
      const allOrders = data.pages.flatMap((page) => page.data.orders) || [];
      console.log(allOrders); // Should log the flattened array of orders
      setOrders(allOrders);
    }
  }, [data]);
  
console.log(data);
  return {fetchNextPage, hasNextPage, isFetchingNextPage,orders };
};

export default useGetSpecificOrders;
