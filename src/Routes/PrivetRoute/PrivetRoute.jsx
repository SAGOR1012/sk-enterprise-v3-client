import Loader from '../../Components/Loader/Loader';
import UseAuth from '../../Hooks/UseAuth';
import Login from '../../Pages/Login/Login';
import { useEffect, useState } from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth(); // firebase user
  const axiosPublic = UseAxiosPublic();
  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  // যখন firebase user আছে, তখন database user data আনব
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/user/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setDbLoading(false);
        })
        .catch(() => setDbLoading(false));
    } else {
      setDbLoading(false);
    }
  }, [user, axiosPublic]);

  if (loading || dbLoading) {
    return <Loader />;
  }

  // যদি ইউজার লগইন না করে থাকে
  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-blue-800'>
        <Login />
      </div>
    );
  }

  // database user আছে কিন্তু verify false হলে
  if (dbUser?.verify === false) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
        <p className='text-yellow-600 font-bold text-xl mb-2'>
          ⚠ You are not a verified user
        </p>
        <p className='text-gray-600'>To verify contact : 01639136200.</p>
      </div>
    );
  }

  // verified user হলে children দেখাবে
  return children;
};

export default PrivateRoute;
