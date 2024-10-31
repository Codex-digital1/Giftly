import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllReview = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:3000/testimonials/feedback`
            );
            
            return res?.data?.data;
        },
    });
    return [data, isLoading, refetch];
};

export default useGetAllReview;