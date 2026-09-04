import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';

const Login = () => {
  const { loginUser } = UseAuth();
  const navigate = useNavigate();
  // const axiosPublic = UseAxiosPublic();
  const [loginError, setLoginError] = useState(''); // ✅ error state

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // const onSubmit = async (data) => {
  //   setLoginError('');

  //   try {
  //     const userCredential = await loginUser(data.email, data.password);
  //     console.log('Firebase logged in:', userCredential.user);

  //     // backend token request
  //     const user = { email: data.email };
  //     const res = await axiosPublic.post('/jwt', user);

  //     console.log('JWT Response:', res.data);

  //     // ✅ redirect only after token is set
  //     navigate('/');
  //   } catch (error) {
  //     console.error('লগইন ত্রুটি:', error);
  //     if (error.code) {
  //       switch (error.code) {
  //         case 'auth/user-not-found':
  //           setLoginError('এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি');
  //           break;
  //         case 'auth/wrong-password':
  //           setLoginError('পাসওয়ার্ড সঠিক নয়');
  //           break;
  //         case 'auth/invalid-email':
  //           setLoginError('ইমেইলটি সঠিক নয়');
  //           break;
  //         default:
  //           setLoginError(error.message);
  //       }
  //     } else if (error.response?.data?.message) {
  //       setLoginError(error.response.data.message);
  //     } else {
  //       setLoginError('অজানা ত্রুটি ঘটেছে, আবার চেষ্টা করুন।');
  //     }
  //   }
  // };
  const onSubmit = async (data) => {
    setLoginError('');

    try {
      const userCredential = await loginUser(data.email, data.password);
      console.log('✅ Firebase logged in:', userCredential.user);

      // 🔹 সরাসরি redirect করো (JWT ছাড়াই)
      navigate('/');
    } catch (error) {
      console.error('লগইন ত্রুটি:', error);
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            setLoginError('এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি');
            break;
          case 'auth/wrong-password':
            setLoginError('পাসওয়ার্ড সঠিক নয়');
            break;
          case 'auth/invalid-email':
            setLoginError('ইমেইলটি সঠিক নয়');
            break;
          default:
            setLoginError(error.message);
        }
      } else {
        setLoginError('অজানা ত্রুটি ঘটেছে, আবার চেষ্টা করুন।');
      }
    }
  };
  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          ইনভেন্টরি ম্যানেজমেন্ট লগইন
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-5'>
          {/* ইমেইল */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              ইমেইল ঠিকানা
            </label>
            <input
              type='email'
              {...register('email', {
                required: 'ইমেইল দিতে হবে',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'সঠিক ইমেইল লিখুন',
                },
              })}
              className='w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='আপনার ইমেইল লিখুন'
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              পাসওয়ার্ড
            </label>
            <input
              type='password'
              {...register('password', {
                required: 'পাসওয়ার্ড দিতে হবে',
                minLength: {
                  value: 6,
                  message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
                },
              })}
              className='w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='আপনার পাসওয়ার্ড লিখুন'
            />
            {errors.password && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* সাবমিট */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'>
            {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>

        {/* ✅ error message নিচে */}
        {loginError && (
          <p className='mt-3 text-center text-sm text-red-500'>{loginError}</p>
        )}

        <p className='text-sm text-center text-gray-600'>
          আপনার কোনো অ্যাকাউন্ট নেই?{' '}
          <a
            href='/signup'
            className='text-blue-600 hover:underline'>
            সাইন আপ করুন
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
