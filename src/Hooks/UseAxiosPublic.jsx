import axios from 'axios';

const UseAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true, // Always send credentials (cookies, etc.)
  });
  return axiosPublic;
};

export default UseAxiosPublic;
