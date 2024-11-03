import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OrderInfo } from "../types/Types";

// Hook to get all reviews
export const UseGetAllReview = () => {
    const { data, isLoading, refetch } = useQuery<OrderInfo[]>({
        queryKey: ["allReviews"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/gifts/getReviews`);
            return res?.data;
        },
    });
    return [data, isLoading, refetch] as const;
};
