import UseAxiosPrivet from './UseAxiosPrivet';
import { useQuery } from '@tanstack/react-query';

const UseSalary = () => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    data: salary = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['salary'],
    queryFn: async () => {
      const res = await axiosPrivet.get('/salary');
      return res.data;
    },
    staleTime: 5 * 60 * 60 * 1000, // 59 minutes
    refetchOnWindowFocus: false, // Prevent refetching on
  });

  return [salary, isLoading, refetch];
};

export default UseSalary;
