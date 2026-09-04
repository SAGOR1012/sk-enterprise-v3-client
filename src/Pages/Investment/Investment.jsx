import { useForm } from 'react-hook-form';
import UseInvestment from '../../Hooks/UseInvestment';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';
import { useState, useEffect } from 'react';

const Investment = () => {
  const axiosPrivate = UseAxiosPrivet();
  const [animateProgress, setAnimateProgress] = useState(false);

  // React Hook Form for main form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      amount: '',
      details: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  // Filters
  const { register: registerFilter, watch } = useForm({
    defaultValues: {
      filterName: '',
      filterDate: '',
      filterMonth: '',
    },
  });

  const filterName = watch('filterName');
  const filterDate = watch('filterDate');
  const filterMonth = watch('filterMonth');

  // UseInvestment hook
  const [investments, isLoading, refetch] = UseInvestment();

  // Trigger animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Add investment
  const onSubmit = async (data) => {
    try {
      await axiosPrivate.post('/investments', data);
      reset({
        name: '',
        amount: '',
        details: '',
        date: new Date().toISOString().split('T')[0],
      });
      refetch();
    } catch (error) {
      console.error('Error adding investment:', error);
    }
  };

  // Filtered investments
  const filteredInvestments = investments.filter((inv) => {
    return (
      (!filterName || inv.name === filterName) &&
      (!filterDate || inv.date === filterDate) &&
      (!filterMonth || inv.date.startsWith(filterMonth))
    );
  });

  // Calculations
  const totalInvestment = filteredInvestments.reduce(
    (sum, inv) => sum + Number(inv.amount),
    0,
  );

  // Get top 2 investors for radial progress
  const individualTotals = filteredInvestments.reduce((acc, inv) => {
    if (!acc[inv.name]) acc[inv.name] = 0;
    acc[inv.name] += Number(inv.amount);
    return acc;
  }, {});

  const investorData = Object.entries(individualTotals)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: totalInvestment > 0 ? (amount / totalInvestment) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Get top 2 investors
  const topInvestors = investorData.slice(0, 2);

  // Colors for radial progress
  const radialColors = [
    { progress: 'text-blue-600', bg: 'text-blue-100' },
    { progress: 'text-green-600', bg: 'text-green-100' },
  ];

  // Recent investments
  const recentInvestments = [...filteredInvestments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Investment Dashboard
          </h1>
          <p className='text-gray-600 mt-1'>
            Track investment contributions and progress
          </p>
        </div>
        <div className='mt-4 md:mt-0 flex items-center space-x-3'>
          <div className='bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200'>
            <p className='text-sm font-medium text-gray-600'>
              Total Investment
            </p>
            <p className='text-xl font-bold text-blue-600'>
              {totalInvestment.toLocaleString()} BDT
            </p>
          </div>
          <div className='bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200'>
            <p className='text-sm font-medium text-gray-600'>Total Records</p>
            <p className='text-xl font-bold text-gray-800'>
              {filteredInvestments.length}
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6  '>
        {/* Left Column - Radial Progress & Stats */}
        <div className='lg:col-span-2'>
          {/* Radial Progress Section */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='text-xl font-bold text-gray-800'>
                  Investment Progress
                </h2>
                <p className='text-gray-600 text-sm mt-1'>
                  Top investor contributions
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center'>
                  <div className='w-3 h-3 rounded-full bg-blue-500 mr-2'></div>
                  <span className='text-sm text-gray-600'>Top 1</span>
                </div>
                <div className='flex items-center'>
                  <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                  <span className='text-sm text-gray-600'>Top 2</span>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg border py-2 border-green-200 w-full'>
              {topInvestors.map((investor, index) => (
                <div
                  key={investor.name}
                  className='relative '>
                  {/* Radial Progress */}
                  <div className='flex flex-col items-center'>
                    <div className='relative w-48 h-48'>
                      {/* Background Circle */}
                      <svg className='w-full h-full transform -rotate-90'>
                        <circle
                          cx='96'
                          cy='96'
                          r='84'
                          stroke='currentColor'
                          strokeWidth='8'
                          fill='transparent'
                          className={radialColors[index].bg}
                        />
                        {/* Progress Circle with animation */}
                        <circle
                          cx='96'
                          cy='96'
                          r='84'
                          stroke='currentColor'
                          strokeWidth='8'
                          fill='transparent'
                          strokeLinecap='round'
                          className={radialColors[index].progress}
                          strokeDasharray='528'
                          strokeDashoffset={
                            animateProgress
                              ? 528 - (528 * investor.percentage) / 100
                              : 528
                          }
                          style={{
                            transition: 'stroke-dashoffset 1.5s ease-out',
                            transitionDelay: `${index * 0.3}s`,
                          }}
                        />
                      </svg>

                      {/* Center Content */}
                      <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <p className='text-3xl font-bold text-gray-800'>
                          {animateProgress
                            ? investor.percentage.toFixed(1)
                            : '0'}
                          %
                        </p>
                        <p className='text-sm text-gray-600 mt-1'>Share</p>
                      </div>
                    </div>

                    {/* Investor Info */}
                    <div className='text-center mt-4'>
                      <h3 className='text-lg font-bold text-gray-800'>
                        {investor.name}
                      </h3>
                      <p className='text-gray-600 mt-1'>Investment Amount</p>
                      <p className='text-2xl font-bold text-gray-800 mt-1'>
                        {investor.amount.toLocaleString()} BDT
                      </p>
                      <div className='flex items-center justify-center mt-2'>
                        <div
                          className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-green-500'} mr-2`}></div>
                        <span className='text-sm text-gray-500'>
                          Rank #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Stats */}
            <div className='mt-8 pt-6 border-t border-gray-200'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='bg-blue-50 rounded-lg p-4'>
                  <p className='text-sm text-gray-600'>Total Investors</p>
                  <p className='text-xl font-bold text-gray-800'>
                    {investorData.length}
                  </p>
                </div>
                <div className='bg-green-50 rounded-lg p-4'>
                  <p className='text-sm text-gray-600'>Avg Investment</p>
                  <p className='text-xl font-bold text-gray-800'>
                    {investorData.length > 0
                      ? (totalInvestment / investorData.length).toLocaleString(
                          'en-US',
                          {
                            maximumFractionDigits: 0,
                          },
                        )
                      : 0}{' '}
                    BDT
                  </p>
                </div>
                <div className='bg-purple-50 rounded-lg p-4'>
                  <p className='text-sm text-gray-600'>Max Investment</p>
                  <p className='text-xl font-bold text-gray-800'>
                    {investorData[0]?.amount?.toLocaleString() || 0} BDT
                  </p>
                </div>
                <div className='bg-orange-50 rounded-lg p-4'>
                  <p className='text-sm text-gray-600'>Min Investment</p>
                  <p className='text-xl font-bold text-gray-800'>
                    {investorData[
                      investorData.length - 1
                    ]?.amount?.toLocaleString() || 0}{' '}
                    BDT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment History */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
              <h2 className='text-xl font-bold text-gray-800'>
                Recent Transactions
              </h2>
              <div className='flex flex-wrap gap-2 mt-3 md:mt-0'>
                <select
                  {...registerFilter('filterName')}
                  className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none bg-white'>
                  <option value=''>All Investors</option>
                  <option value='SAMSUL ISLAM'>SAMSUL ISLAM</option>
                  <option value='KARIMUL MRIDHA'>KARIMUL MRIDHA</option>
                </select>

                <input
                  type='date'
                  {...registerFilter('filterDate')}
                  className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none bg-white'
                />
              </div>
            </div>

            <div className='space-y-3'>
              {isLoading ? (
                <div className='flex justify-center py-8'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                </div>
              ) : recentInvestments.length === 0 ? (
                <div className='text-center py-8'>
                  <div className='w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3'>
                    <svg
                      className='w-8 h-8 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      />
                    </svg>
                  </div>
                  <p className='text-gray-500'>No transactions found</p>
                </div>
              ) : (
                recentInvestments.map((inv, index) => (
                  <div
                    key={inv._id}
                    className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1'
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'slideInUp 0.5s ease-out',
                    }}>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index % 2 === 0
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className='font-bold text-gray-800'>
                            {inv.name}
                          </h3>
                          <p className='text-sm text-gray-500'>
                            {inv.details || 'No details provided'}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-lg font-bold text-gray-800'>
                          {inv.amount.toLocaleString()} BDT
                        </p>
                        <p className='text-sm text-gray-500'>{inv.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!isLoading && recentInvestments.length > 0 && (
              <div className='mt-6 pt-6 border-t border-gray-200'>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-600'>
                    Showing {Math.min(recentInvestments.length, 4)} of{' '}
                    {filteredInvestments.length} transactions
                  </p>
                  <button className='text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center'>
                    View All
                    <svg
                      className='w-4 h-4 ml-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Compact Form */}
        <div className='space-y-6'>
          {/* Compact Investment Form */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <div className='mb-6'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='text-xl font-bold text-gray-800'>
                  Add Investment
                </h2>
                <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </div>
              </div>
              <p className='text-gray-600 text-sm'>
                Quickly add new investment records
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Investor
                </label>
                <select
                  {...register('name', { required: 'Select investor' })}
                  className={`w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-colors`}>
                  <option value=''>Choose investor</option>
                  <option value='SAMSUL ISLAM'>SAMSUL ISLAM</option>
                  <option value='KARIMUL MRIDHA'>KARIMUL MRIDHA</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Amount
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                    ৳
                  </span>
                  <input
                    type='number'
                    {...register('amount', {
                      required: 'Enter amount',
                      min: { value: 1, message: 'Minimum 1 BDT' },
                    })}
                    placeholder='Enter amount'
                    className={`w-full border ${errors.amount ? 'border-red-300' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Notes (Optional)
                </label>
                <textarea
                  {...register('details')}
                  placeholder='Brief description'
                  rows='2'
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-colors resize-none'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Date
                </label>
                <input
                  type='date'
                  {...register('date', { required: 'Select date' })}
                  className={`w-full border ${errors.date ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-colors`}
                />
              </div>

              <button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4'>
                Add Investment
              </button>
            </form>

            {/* Form Stats */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='grid grid-cols-2 gap-3'>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <p className='text-xs text-gray-600'>Today's Date</p>
                  <p className='text-sm font-medium text-gray-800'>
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <p className='text-xs text-gray-600'>Investors</p>
                  <p className='text-sm font-medium text-gray-800'>
                    {investorData.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <h3 className='font-bold text-gray-800 mb-4'>Investment Summary</h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
                <span className='text-gray-600'>Total Value</span>
                <span className='font-bold text-gray-800'>
                  {totalInvestment.toLocaleString()} BDT
                </span>
              </div>
              <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
                <span className='text-gray-600'>Total Investors</span>
                <span className='font-bold text-gray-800'>
                  {investorData.length}
                </span>
              </div>
              <div className='flex justify-between items-center pb-2 border-b border-gray-100'>
                <span className='text-gray-600'>Avg per Investor</span>
                <span className='font-bold text-gray-800'>
                  {investorData.length > 0
                    ? (totalInvestment / investorData.length).toLocaleString(
                        'en-US',
                        {
                          maximumFractionDigits: 0,
                        },
                      )
                    : 0}{' '}
                  BDT
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Records</span>
                <span className='font-bold text-gray-800'>
                  {filteredInvestments.length}
                </span>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Last Updated</span>
                <span className='text-sm font-medium text-gray-800'>
                  {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Investment;
