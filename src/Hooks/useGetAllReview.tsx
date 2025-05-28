import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Hook to get all reviews
export const UseGetAllReview = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["get-all-reviews"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/reviews/get-all-reviews`);
            return res?.data;
        },
    });
    return [data, isLoading, refetch] as const;
};
