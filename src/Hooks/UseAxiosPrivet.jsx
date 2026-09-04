import axios from 'axios';

const UseAxiosPrivet = () => {
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
  });

  return axiosSecure;
};

export default UseAxiosPrivet;
