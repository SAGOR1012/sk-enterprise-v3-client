// // useProducts.js
// import UseAxiosPublic from "./UseAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

// const UseProductLIst = () => {
//     // const axiosPublic = UseAxiosPublic();
//     const axiosPublic = UseAxiosPublic();

//     const {
//         data: products = [],
//         isLoading,
//         refetch,

//     } = useQuery({
//         queryKey: ["products"],
//         queryFn: async () => {
//             const res = await axiosPublic.get("/products");
//             return res.data;
//         },
//     });

//     return [products, isLoading, refetch];
// };

// export default UseProductLIst;

// useProducts.js
// import { useEffect, useState } from "react";
// import UseAxiosPublic from "./UseAxiosPublic";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const client = new QueryClient();

// const UseProductLIst = () => {
//     const axiosPublic = UseAxiosPublic();
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchProducts = async () => {
//         try {
//             setIsLoading(true);
//             const res = await axiosPublic.get("/products");
//             setProducts(res.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return [client, products, isLoading, fetchProducts];
// };

// export default UseProductLIst;
// useProducts.js
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from './UseAxiosPublic';

const UseProductLIst = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    data: products = [], // Default empty array if no data
    isLoading,
    // isError,
    // error,
    refetch,
  } = useQuery({
    queryKey: ['products'], // Unique key for caching
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
    staleTime: 5 * 60 * 60 * 1000, // Cache valid for 5 minutes
    refetchOnWindowFocus: false, // Prevent auto refetch on tab switch
  });

  return [products, isLoading, refetch];
};

export default UseProductLIst;
