import React from 'react';
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

// Custom hook to fetch monthly sell data
const UseMonthlySellData = () => {
  const axiosPublic = UseAxiosPublic();

  // Fetch monthly sell data using react-query
  const {
    data: monthlySell = [],
    isLoading, // fixed typo: was isloading
    refetch,
  } = useQuery({
    queryKey: ['monthlySell'],
    queryFn: async () => {
      const res = await axiosPublic.get('/monthly-sell');
      return res.data;
    },
    staleTime: 59 * 60 * 1000, // 59 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  // Return data, loading state, and refetch function
  return [monthlySell, isLoading, refetch];
};

export default UseMonthlySellData;
