import UseAxiosPrivet from './UseAxiosPrivet';
import { useQuery } from '@tanstack/react-query';

const UseTrx = () => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    data: transactions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-transactions'],
    queryFn: async () => {
      const res = await axiosPrivet.get('/all-transactions');
      return res.data;
    },
  });

  return [transactions, isLoading, refetch];
};

export default UseTrx;
