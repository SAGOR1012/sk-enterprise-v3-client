import { useQuery } from '@tanstack/react-query';
import UseAxiosPrivet from './UseAxiosPrivet';

const UseGetBookedList = () => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    data: bookedProducts = [], // Default empty array if no data
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['bookedProducts'], // Unique key for caching
    queryFn: async () => {
      const res = await axiosPrivet.get('/bookingproducts');
      return res.data;
    },
    staleTime: 59 * 60 * 1000, // Cache valid for
    refetchOnWindowFocus: false, // Prevent auto refetch on tab switch
  });

  return [bookedProducts, isLoading, refetch];
};

export default UseGetBookedList;
