// import React from 'react';
// import UseAxiosPrivet from './UseAxiosPrivet';
// import { useQuery } from '@tanstack/react-query';

// const UseSpecificCustomerById = () => {
//   const axiosPrivet = UseAxiosPrivet();
//   const {
//     data: customerById = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['customerById',],
//     queryFn: async () => {
//       const res = await axiosPrivet.get('/customers/:id');
//       return res.data;
//     },
//   });
//   return [customerById, isLoading, refetch];
// };

// export default UseSpecificCustomerById;
import React from 'react';
import UseAxiosPrivet from './UseAxiosPrivet';
import { useQuery } from '@tanstack/react-query';

const UseSpecificCustomerById = (customerId) => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    data: customerById = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['customerById', customerId], // Add ID to the query key for caching
    queryFn: async () => {
      const res = await axiosPrivet.get(`/customers/${customerId}`); // Use dynamic customer ID
      return res.data;
    },
  });

  return [customerById, isLoading, refetch];
};

export default UseSpecificCustomerById;
