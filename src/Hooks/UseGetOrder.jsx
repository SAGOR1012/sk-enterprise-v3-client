import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseGetOrder = () => {
    const axiosPublic = UseAxiosPublic();

    const {
        data: orders = [], // Default empty array if no data
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["orders"], // Unique key for caching
        queryFn: async () => {
            const res = await axiosPublic.get("/orders");
            return res.data;
        },
        staleTime: 59 * 60 * 1000, // Cache valid for 
        refetchOnWindowFocus: false, // Prevent auto refetch on tab switch
    });

    return [orders, isLoading, refetch];
};

export default UseGetOrder;