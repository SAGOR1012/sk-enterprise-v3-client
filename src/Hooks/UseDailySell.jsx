import React from 'react';
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UseDailySell = () => {
  const axiosPublic = UseAxiosPublic();
  const {
    data: dailySell = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dailySell'],
    queryFn: async () => {
      const res = await axiosPublic.get('/daily-sell');
      return res.data;
    },
    staleTime: 59 * 60 * 1000, // 59 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
  return [dailySell, isLoading, refetch];
};

export default UseDailySell;
