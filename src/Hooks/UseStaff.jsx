import UseAxiosPrivet from './UseAxiosPrivet';
import { useQuery } from '@tanstack/react-query';

const UseStaff = () => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    data: staffList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const res = await axiosPrivet.get('/staff');
      return res.data;
    },
  });

  return [staffList, isLoading, refetch];
};

export default UseStaff;
