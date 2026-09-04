import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatInTimeZone } from 'date-fns-tz';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';
import Swal from 'sweetalert2';

const AddCustomerForm = () => {
  const axiosPrivet = UseAxiosPrivet();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      dueAmount: 0,
      advanceAmount: 0,
      status: 'Active',
      date: new Date(),
    },
  });

  // Helper: Format date to 12-hour BD time string using timezone-aware approach
  const formatToBanglaDateTime = (dateObj) => {
    if (!dateObj) return '';

    // Use formatInTimeZone to get the correctly formatted Dhaka datetime string
    // Pattern: d/M/yyyy, h:mm a (e.g., "25/1/2026, 3:45 PM")
    const formattedDate = formatInTimeZone(
      dateObj,
      'Asia/Dhaka',
      'd/M/yyyy, h:mm a',
    );

    return formattedDate;
  };

  const onSubmit = async (data) => {
    try {
      // Format date to 12-hour BD time before sending
      const formattedDate = formatToBanglaDateTime(data.date);
      await axiosPrivet.post('/customers', { ...data, date: formattedDate });
      Swal.fire({
        icon: 'success',
        title: 'কাস্টমার যোগ করা হয়েছে!',
        text: 'কাস্টমার সফলভাবে যোগ করা হয়েছে।',
        timer: 2000,
        position: 'top-end',
        showConfirmButton: false,
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'কাস্টমার যোগ করতে ব্যর্থ।',
      });
    }
  };

  return (
    <div className='flex justify-center items-center  bg-gray-100'>
      <div className='w-full max-w-xl bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold text-center mb-6'>
          নতুন কাস্টমার যোগ করুন
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'>
                নাম *
              </label>
              <input
                type='text'
                id='name'
                {...register('name', { required: 'নাম প্রদান করা আবশ্যক' })}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.name && (
                <span className='text-sm text-red-500'>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'>
                টাইটেল *
              </label>
              <input
                type='text'
                id='title'
                {...register('title', {
                  required: 'শিরোনাম প্রদান করা আবশ্যক',
                })}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.title && (
                <span className='text-sm text-red-500'>
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='mobile'
                className='block text-sm font-medium text-gray-700'>
                মোবাইল *
              </label>
              <input
                type='tel'
                id='mobile'
                {...register('mobile', {
                  required: 'মোবাইল নম্বর প্রদান করা আবশ্যক',
                })}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.mobile && (
                <span className='text-sm text-red-500'>
                  {errors.mobile.message}
                </span>
              )}
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'>
                ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                type='text'
                id='address'
                {...register('address')}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <label
                htmlFor='date'
                className='block text-sm font-medium text-gray-700'>
                তারিখ *
              </label>
              <DatePicker
                selected={new Date()}
                onChange={(date) => setValue('date', date)}
                dateFormat='yyyy/MM/dd'
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='space-y-1'>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-700'>
                স্ট্যাটাস *
              </label>
              <select
                id='status'
                {...register('status')}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='Active'>সক্রিয়</option>
                <option value='Inactive'>নিষ্ক্রিয়</option>
              </select>
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='dueAmount'
                className='block text-sm font-medium text-gray-700'>
                পাওনা টাকা
              </label>
              <input
                type='number'
                id='dueAmount'
                {...register('dueAmount')}
                disabled
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='space-y-1'>
              <label
                htmlFor='advanceAmount'
                className='block text-sm font-medium text-gray-700'>
                অগ্রিম টাকা
              </label>
              <input
                type='number'
                id='advanceAmount'
                {...register('advanceAmount')}
                disabled
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='text-center'>
            <button
              type='submit'
              className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              কাস্টমার যোগ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerForm;
