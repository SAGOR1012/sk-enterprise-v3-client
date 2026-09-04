import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from './UseAxiosPublic';

/**

 * @param {string} month - মাসের ফরম্যাট "YYYY-MM" যেমন "2025-09"
 */
const UseMonthlyTarget = (month) => {
  const axiosPublic = UseAxiosPublic(); // Axios instance

  const {
    data: target = {}, // backend থেকে পাওয়া target, ডিফল্ট খালি অবজেক্ট
    isLoading,
    refetch, // manual refetch করার জন্য
  } = useQuery({
    queryKey: ['monthlyTarget', month], // ইউনিক key cache এর জন্য
    queryFn: async () => {
      const res = await axiosPublic.get(`/monthly-target?month=${month}`);
      return res.data; // backend response return
    },
    staleTime: 5 * 60 * 60 * 1000, // cash er moddhe 6 houre  ধরে রাখবে
    refetchOnWindowFocus: false, // tab switch করলে auto fetch হবে না
  });

  return [target, isLoading, refetch];
};

export default UseMonthlyTarget;
