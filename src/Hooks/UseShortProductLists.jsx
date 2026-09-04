import UseAxiosPrivet from './UseAxiosPrivet';
import { useQuery } from '@tanstack/react-query';

const UseShortProductLists = () => {
  const axiosPrivate = UseAxiosPrivet();

  const {
    data: shortProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['shortProducts'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/shortProductList');
      return res.data;
    },
    staleTime: Infinity, // ✅ Data never goes stale until logout/manual refetch
    cacheTime: Infinity, // ✅ Keeps it in cache indefinitely (optional)
    refetchOnWindowFocus: false, // Prevents auto refetch on tab switch
  });

  return [shortProducts, isLoading, refetch];
};

export default UseShortProductLists;
