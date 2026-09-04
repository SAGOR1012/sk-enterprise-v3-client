import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { createUser } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    createUser(data.email, data.password)
      .then((userCredential) => {
        const userData = {
          name: data.username,
          email: data.email,
          password: data.password,
          photoURL:
            userCredential.user.photoURL || 'https://i.ibb.co/4f1x5z3/user.png',
          role: 'user',
          verify: false,
          phone: data.phone || '',
          firebaseId: userCredential.user.uid,
        };
        // console.log('user info ', userData);
        navigate('/');
        return axiosPublic.post('/users', userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Signup error:', error.code, error.message);

        // ..
      });

    console.log('সাইন আপ ডাটা:', data);
    // এখানে তোমার API কল করতে পারো
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          ইনভেন্টরি সাইন আপ
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-5'>
          {/* ইউজার নাম */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              ইউজার নাম
            </label>
            <input
              type='text'
              {...register('username', { required: 'ইউজার নাম দিতে হবে' })}
              className='w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='আপনার নাম লিখুন'
            />
            {errors.username && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.username.message}
              </p>
            )}
          </div>

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

          {/* ফোন নাম্বার */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              ফোন নাম্বার
            </label>
            <input
              type='tel'
              {...register('phone', {
                required: 'ফোন নাম্বার দিতে হবে',
                pattern: {
                  value: /^[0-9]{10,15}$/, // 10-15 ডিজিট
                  message: 'সঠিক ফোন নাম্বার লিখুন',
                },
              })}
              className='w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='আপনার ফোন নাম্বার লিখুন'
            />
            {errors.phone && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* পাসওয়ার্ড */}
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

          {/* কনফার্ম পাসওয়ার্ড */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type='password'
              {...register('confirmPassword', {
                required: 'পাসওয়ার্ড পুনরায় লিখুন',
                validate: (value) =>
                  value === watch('password') || 'পাসওয়ার্ড মিলছে না',
              })}
              className='w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='পুনরায় পাসওয়ার্ড লিখুন'
            />
            {errors.confirmPassword && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* সাবমিট */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'>
            {isSubmitting ? 'রেজিস্ট্রেশন হচ্ছে...' : 'সাইন আপ'}
          </button>
        </form>

        <p className='text-sm text-center text-gray-600'>
          ইতিমধ্যেই অ্যাকাউন্ট আছে?{' '}
          <a
            href='/login'
            className='text-blue-600 hover:underline'>
            লগইন করুন
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
