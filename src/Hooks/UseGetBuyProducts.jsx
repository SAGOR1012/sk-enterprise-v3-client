import { useQuery } from '@tanstack/react-query';
import UseAxiosPrivet from './UseAxiosPrivet';

const UseGetBuyProducts = () => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    data: buyProducts = [], // Default empty array if no data
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['buyProducts'], // Unique key for caching
    queryFn: async () => {
      const res = await axiosPrivet.get('/buyproducts');
      return res.data;
    },
    staleTime: 59 * 60 * 1000, // Cache valid for
    refetchOnWindowFocus: false, // Prevent auto refetch on tab switch
  });

  return [buyProducts, isLoading, refetch];
};

export default UseGetBuyProducts;
