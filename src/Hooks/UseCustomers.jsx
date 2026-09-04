import { useQuery } from '@tanstack/react-query';
import UseAxiosPrivet from './UseAxiosPrivet';

const UseCustomers = () => {
  const axiosPrivet = UseAxiosPrivet();
  const {
    data: customers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const res = await axiosPrivet.get('/customers');
      return res.data;
    },
  });
  return [customers, isLoading, refetch];
};

export default UseCustomers;
