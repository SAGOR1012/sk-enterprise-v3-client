import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import UseMonthlySellData from '../../Hooks/UseMonthlySellData'; // Monthly Sell ডেটা
import UseMonthlyTarget from '../../Hooks/UseMonthlyTarget';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';

const MonthlyTargetProgress = () => {
  const axiosPublic = UseAxiosPublic();

  // Current month format "YYYY-M" যাতে MongoDB সাথে match করে
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;

  // Target data
  const [targetData, isLoadingTarget, refetchTarget] =
    UseMonthlyTarget(currentMonth);

  // Monthly sell data
  const [monthlySellData, isLoadingSell, refetchSell] = UseMonthlySellData();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(targetData?.value || 10000);

  const target = targetData?.value || 10000;

  // Current month এর total sell খুঁজে বের করা
  const currentMonthSell = monthlySellData.find(
    (item) => item.month === currentMonth
  );
  const totalSell = currentMonthSell ? currentMonthSell.totalSell : 0;

  // Progress percentage
  const percentage = target > 0 ? Math.min((totalSell / target) * 100, 100) : 0;

  const getColor = () => {
    if (percentage < 40) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const handleSave = async () => {
    const newValue = Number(inputValue);
    if (!isNaN(newValue) && newValue > 0) {
      try {
        await axiosPublic.post('/monthly-target', {
          month: currentMonth,
          value: newValue,
        });
        refetchTarget();
      } catch (error) {
        console.log('Target update ব্যর্থ হয়েছে', error);
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  // if (isLoadingTarget || isLoadingSell) {
  //   return (
  //     <div className='w-full max-w-md bg-gradient-to-r from-[#41295a] to-[#2F0743] text-white p-6 rounded-2xl shadow-xl flex items-center justify-center'>
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className='relative w-full max-w-full   bg-gradient-to-r from-[#3c488d] to-[#0c0935]  text-white p-16 mx-2 my-2 rounded-md shadow-xl overflow-hidden'>
      {/* Edit Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className='absolute top-4 right-4 p-2 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition shadow-md'
        title='Edit Target'>
        <FiEdit size={18} />
      </button>

      {/* হেডার */}
      <h2 className='text-lg font-semibold mb-4'>মান্থলী টার্গেট</h2>

      {/* প্রগ্রেস বার */}
      <div className='w-full  h-5 bg-white/40 rounded-full overflow-hidden shadow-inner'>
        <div
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}></div>
      </div>
      <p className='mt-2 text-center font-bold text-lg'>
        {Math.round(percentage)}%
      </p>

      {/* Target + Sales Info */}
      <div className='mt-4 flex gap-3 justify-between text-sm font-medium'>
        <span>টার্গেট : {target} /-</span>
        <span>সেল : {totalSell} /-</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
          <div className='bg-white rounded-xl p-6 w-80 shadow-lg relative text-black'>
            <h2 className='text-lg font-semibold mb-4 text-gray-800 text-center'>
              Set Monthly Target
            </h2>
            <input
              type='number'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-400 outline-none'
              placeholder='Enter target value'
            />
            <div className='flex justify-end gap-3 mt-4'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 rounded-lg bg-[#ff6a00] hover:bg-orange-600 transition text-white'>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyTargetProgress;
