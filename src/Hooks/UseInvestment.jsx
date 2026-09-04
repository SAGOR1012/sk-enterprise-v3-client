import UseAxiosPrivet from './UseAxiosPrivet';
import { useQuery } from '@tanstack/react-query';

const UseInvestment = () => {
  const axiosPrivate = UseAxiosPrivet();

  const {
    data: investments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/investments');
      return res.data;
    },
    staleTime: Infinity, // ✅ Data never goes stale until logout/manual refetch
    cacheTime: Infinity, // ✅ Keeps it in cache indefinitely (optional)
    refetchOnWindowFocus: false, // Prevents auto refetch on tab switch
  });

  return [investments, isLoading, refetch];
};

export default UseInvestment;
