import React from 'react';
import {
  FaUsers,
  FaWarehouse,
  FaShoppingCart,
  FaTags,
  FaBoxes,
  FaExclamationCircle,
} from 'react-icons/fa';
import TitleCardDashboard from '../../Components/Cards/TitleCardDashboard';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { TbCoinTakaFilled } from 'react-icons/tb';
import DeveloperAdds from '../../Components/DeveloperAds/DeveloperAdds';
import DailySellChart from '../../Components/Charts/DailySellChart/DailySellChart';
import MonthlySalesChart from '../../Components/Charts/MonthlySellChart/MonthlySellChart';
import MonthlyTargetProgress from '../../Components/Progress/MonthlyTargetProgress';
import InvestmentProgress from '../../Components/Progress/InvestmentProgress';
import './dashboard.css';
import InventoryTable from '../../Components/InventoryTable/InventoryTable';
import { GrOrderedList } from 'react-icons/gr';
import OrderHistory from '../../Components/Orders/OrderHistory/OrderHistory';
import UseGetOrder from '../../Hooks/UseGetOrder';
import UseDailySell from '../../Hooks/UseDailySell';
import UseMonthlySellData from '../../Hooks/UseMonthlySellData';
// import bgimg from '../.././assets/bgimg.jpg';

import UseProductLIst from '../../Hooks/UseProductLIst';
import ShortProductTable from '../../Components/ShortProductTable/ShortProductTable';
import { NavLink } from 'react-router-dom';
//

// const Dashboard = () => {
const Dashboard = () => {
  /* Order Hook */
  const [orders] = UseGetOrder();
  const [products] = UseProductLIst();
  /* DailySell hook */
  const [dailySell] = UseDailySell();
  const today = new Date().toISOString().slice(0, 10); // আজকের তারিখ YYYY-MM-DD
  const dayName = new Date().toLocaleDateString('bn-BD', { weekday: 'long' });
  const [monthlySell] = UseMonthlySellData();

  const currentMonth =
    new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
  const monthName = new Date().toLocaleString('bn-BD', { month: 'long' }); // যেমন "জানুয়ারী"
  const currentYear = new Date().getFullYear(); // যেমন 2025
  const yearname = currentYear;
  const totalYearSell = monthlySell
    ? monthlySell
        .filter((record) => record.month.startsWith(currentYear.toString()))
        .reduce((sum, record) => sum + record.totalSell, 0)
    : 'N/A';

  return (
    <div className='relative min-h-screen px-3 py-4 mx-2 md:mx-5  xl:mx-8 '>
      {/* Background Layer */}
      {/* <div
        className='absolute inset-0 bg-cover bg-center filter blur-sm rounded-lg bg-white/80 shadow-lg'
        style={{ backgroundImage: `url(${bgimg})` }}></div> */}
      {/* heading */}
      <div className=' p-1   flex  flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        {/* Header - Fixed Height */}

        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-4 mb-2  text-white flex justify-between items-center w-full'>
          <div className='flex items-start mb-2 md:mb-0 flex-col '>
            <h1 className='text-xl md:text-2xl font-bold mb-2'>DASHBOARD</h1>
            <p className='text-blue-100 text-sm text-center '>
              Manage all the activities form here
            </p>
          </div>
          <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hidden md:flex flex-col'>
            <h3 className='text-lg font-bold'>SK Enterprise</h3>
            <p className='text-xs text-blue-100'>Inventory Management</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}

      {/* card Content Layer */}
      <div className='  relative z-10 flex flex-col gap-5  '>
        {/* Cards Section */}
        <div className=' grid_card '>
          <TitleCardDashboard
            icon={FaBangladeshiTakaSign}
            title='দৈনিক সেল'
            value={
              dailySell
                ? dailySell.find((record) => record.date === today)
                    ?.totalSell || '00'
                : 'N/A'
            }
            countWith='/-'
            subTitle={dayName}
            bColor='border-green-600'
            bgIconColor='bg-green-100'
            iconColor='text-green-700'
            bgColor='bg-green-500'
          />
          <TitleCardDashboard
            icon={FaBangladeshiTakaSign}
            title='মাসিক সেল'
            value={
              monthlySell
                ? monthlySell.find((record) => record.month === currentMonth)
                    ?.totalSell || 'N/A'
                : 'N/A'
            }
            countWith='/-'
            subTitle={monthName}
            bColor='border-blue-500'
            bgIconColor='bg-blue-100'
            iconColor='text-blue-700'
          />
          <NavLink to='/restAmount'>
            <TitleCardDashboard
              icon={FaBangladeshiTakaSign}
              title='বাকি হিসাব'
              value='00'
              countWith='/-'
              subTitle={'টোটাল'}
              bColor='border-red-500'
              bgIconColor='bg-red-100'
              iconColor='text-red-600'
            />
          </NavLink>

          <TitleCardDashboard
            icon={FaTags}
            title='অর্ডার'
            value={orders ? orders.length : 'N/A'}
            countWith=''
            subTitle={'টোটাল'}
            bColor='border-[#3B9797]'
            bgIconColor='bg-[#cef5f5]'
            iconColor='text-[#3B9797]'
          />
          <TitleCardDashboard
            icon={FaBoxes}
            title='পণ্যসমূহ'
            value={products ? products.length : 'N/A'}
            countWith=''
            subTitle={'টোটাল'}
            bColor='border-orange-500'
            bgIconColor='bg-orange-100'
            iconColor='text-orange-500'
          />
          <TitleCardDashboard
            icon={FaBangladeshiTakaSign}
            title='বার্ষিক সেল'
            value={totalYearSell || 'N/A'}
            countWith='/-'
            subTitle={yearname}
            bColor='border-purple-500'
            bgIconColor='bg-purple-100'
            iconColor='text-purple-700'
          />
          <TitleCardDashboard
            icon={TbCoinTakaFilled}
            title='ঋণ'
            value='00'
            countWith='/-'
            bColor='border-[#BF092F]'
            iconColor='text-red-600'
          />
        </div>
        <div className='mt-5 border-t border-gray-300'></div>
        {/* Charts & Short Product Table Section */}
        <div className='flex flex-col xl:flex-row gap-1 w-full  '>
          {/* Left Column */}
          <div className='flex flex-col gap-4 flex-1 '>
            {/* Daily & Monthly Charts */}
            <div className='flex flex-col  md:flex-row gap-4 justify-center md:justify-around w-full '>
              <div className='p-2 bg-white rounded-lg shadow-md w-full '>
                <DailySellChart />
              </div>
              <div className=' p-2 bg-white rounded-lg  w-auto shadow-md'>
                <MonthlySalesChart />
              </div>
            </div>

            {/* Investment & Target Progress */}
            <div className='flex flex-col md:flex-row justify-center md:justify-around gap-4 w-full '>
              <div className=' p-2 bg-white rounded-lg shadow '>
                <InvestmentProgress></InvestmentProgress>
              </div>
              <div className='   bg-white flex justify-center items-center w-full   rounded-lg shadow'>
                <MonthlyTargetProgress />
              </div>
            </div>
          </div>

          {/* Right Column Placeholder (optional for lists, etc.) */}
          <div className=' xl:flex flex-col gap-4 '>
            {/* <DeveloperAdds /> */}
            <ShortProductTable></ShortProductTable>
          </div>
        </div>
      </div>
      <div className=' fixed bottom-10 right-10 z-50  hover:scale-105 hover:transition'>
        <NavLink to='/invoiceform'>
          <button className='btn bg-blue-600 text-white  '>New Order + </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
