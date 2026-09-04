import React from 'react';
import {
  FaUsers,
  FaWarehouse,
  FaShoppingCart,
  FaTags,
  FaBoxes,
  FaExclamationCircle,
  FaChartLine,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCreditCard,
} from 'react-icons/fa';
import {
  FaBangladeshiTakaSign,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from 'react-icons/fa6';
import { TbCoinTakaFilled } from 'react-icons/tb';
import { MdInventory, MdAttachMoney, MdOutlineInventory } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import TitleCardDashboard from '../../Components/Cards/TitleCardDashboard';
import DeveloperAdds from '../../Components/DeveloperAds/DeveloperAdds';
import DailySellChart from '../../Components/Charts/DailySellChart/DailySellChart';
import MonthlySalesChart from '../../Components/Charts/MonthlySellChart/MonthlySellChart';
import MonthlyTargetProgress from '../../Components/Progress/MonthlyTargetProgress';
import InvestmentProgress from '../../Components/Progress/InvestmentProgress';
// import './dashboard.css';
import InventoryTable from '../../Components/InventoryTable/InventoryTable';
import { GrOrderedList } from 'react-icons/gr';
import OrderHistory from '../../Components/Orders/OrderHistory/OrderHistory';
import UseGetOrder from '../../Hooks/UseGetOrder';
import UseDailySell from '../../Hooks/UseDailySell';
import UseMonthlySellData from '../../Hooks/UseMonthlySellData';
import UseProductLIst from '../../Hooks/UseProductLIst';
import ShortProductTable from '../../Components/ShortProductTable/ShortProductTable';
import { NavLink } from 'react-router-dom';
import './style.css';
const DemoDashboard = () => {
  const [orders] = UseGetOrder();
  const [products] = UseProductLIst();
  const [dailySell] = UseDailySell();
  const [monthlySell] = UseMonthlySellData();

  const today = new Date().toISOString().slice(0, 10);
  const dayName = new Date().toLocaleDateString('bn-BD', { weekday: 'long' });
  const currentMonth =
    new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
  const monthName = new Date().toLocaleString('bn-BD', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Calculate daily sell
  const todaySell =
    dailySell?.find((record) => record.date === today)?.totalSell || 0;
  const yesterdaySell =
    dailySell?.find((record) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return record.date === yesterday.toISOString().slice(0, 10);
    })?.totalSell || 0;

  const dailyChange = yesterdaySell
    ? (((todaySell - yesterdaySell) / yesterdaySell) * 100).toFixed(1)
    : 0;
  const isDailyUp = dailyChange >= 0;

  // Calculate monthly sell
  const currentMonthSell =
    monthlySell?.find((record) => record.month === currentMonth)?.totalSell ||
    0;
  const previousMonth =
    new Date().getMonth() === 0
      ? new Date().getFullYear() - 1 + '-12'
      : new Date().getFullYear() + '-' + new Date().getMonth();
  const previousMonthSell =
    monthlySell?.find((record) => record.month === previousMonth)?.totalSell ||
    0;

  const monthlyChange = previousMonthSell
    ? (
        ((currentMonthSell - previousMonthSell) / previousMonthSell) *
        100
      ).toFixed(1)
    : 0;
  const isMonthlyUp = monthlyChange >= 0;

  // Calculate yearly sell
  const totalYearSell = monthlySell
    ? monthlySell
        .filter((record) => record.month.startsWith(currentYear.toString()))
        .reduce((sum, record) => sum + record.totalSell, 0)
    : 0;

  const previousYearSell = monthlySell
    ? monthlySell
        .filter((record) =>
          record.month.startsWith((currentYear - 1).toString()),
        )
        .reduce((sum, record) => sum + record.totalSell, 0)
    : 0;

  const yearlyChange = previousYearSell
    ? (((totalYearSell - previousYearSell) / previousYearSell) * 100).toFixed(1)
    : 0;
  const isYearlyUp = yearlyChange >= 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
              Dashboard Overview
            </h1>
            <p className='text-gray-600 mt-2'>
              Welcome back! Here's what's happening with your inventory today.
            </p>
          </div>
          <div className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg'>
            <div className='flex items-center gap-3'>
              <MdOutlineInventory className='text-2xl' />
              <div>
                <h3 className='font-bold text-lg'>SK ENTERPRISE</h3>
                <p className='text-blue-100 text-sm'>
                  Inventory Management System
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Daily Sales Card */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>Daily Sales</p>
                <h3 className='text-2xl font-bold text-gray-800 mt-2'>
                  ৳{todaySell.toLocaleString()}
                </h3>
                <div className='flex items-center gap-2 mt-2'>
                  <span
                    className={`flex items-center gap-1 text-sm ${isDailyUp ? 'text-green-600' : 'text-red-600'}`}>
                    {isDailyUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                    {Math.abs(dailyChange)}%
                  </span>
                  <span className='text-gray-500 text-sm'>from yesterday</span>
                </div>
              </div>
              <div className='bg-green-100 p-3 rounded-xl'>
                <FaCalendarAlt className='text-2xl text-green-600' />
              </div>
            </div>
            <p className='text-gray-600 text-sm mt-4'>{dayName}</p>
          </div>

          {/* Monthly Sales Card */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Monthly Sales
                </p>
                <h3 className='text-2xl font-bold text-gray-800 mt-2'>
                  ৳{currentMonthSell.toLocaleString()}
                </h3>
                <div className='flex items-center gap-2 mt-2'>
                  <span
                    className={`flex items-center gap-1 text-sm ${isMonthlyUp ? 'text-green-600' : 'text-red-600'}`}>
                    {isMonthlyUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                    {Math.abs(monthlyChange)}%
                  </span>
                  <span className='text-gray-500 text-sm'>from last month</span>
                </div>
              </div>
              <div className='bg-blue-100 p-3 rounded-xl'>
                <FaChartLine className='text-2xl text-blue-600' />
              </div>
            </div>
            <p className='text-gray-600 text-sm mt-4'>{monthName}</p>
          </div>

          {/* Total Products Card */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Total Products
                </p>
                <h3 className='text-2xl font-bold text-gray-800 mt-2'>
                  {products ? products.length.toLocaleString() : '0'}
                </h3>
                <div className='mt-2'>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-orange-500 h-2 rounded-full'
                      style={{
                        width: `${Math.min(((products?.length || 0) / 1000) * 100, 100)}%`,
                      }}></div>
                  </div>
                </div>
              </div>
              <div className='bg-orange-100 p-3 rounded-xl'>
                <FaBoxes className='text-2xl text-orange-600' />
              </div>
            </div>
            <p className='text-gray-600 text-sm mt-4'>Active in inventory</p>
          </div>

          {/* Total Orders Card */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Total Orders
                </p>
                <h3 className='text-2xl font-bold text-gray-800 mt-2'>
                  {orders ? orders.length.toLocaleString() : '0'}
                </h3>
                <div className='mt-2'>
                  <span className='px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium'>
                    Active
                  </span>
                </div>
              </div>
              <div className='bg-purple-100 p-3 rounded-xl'>
                <FaShoppingCart className='text-2xl text-purple-600' />
              </div>
            </div>
            <p className='text-gray-600 text-sm mt-4'>Processed orders</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Daily Sales Chart */}
        <div className='bg-white rounded-2xl shadow-lg p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h3 className='text-xl font-bold text-gray-800'>
                Daily Sales Trend
              </h3>
              <p className='text-gray-600'>Last 7 days performance</p>
            </div>
            <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
              Real-time
            </div>
          </div>
          <div className='h-64'>
            <DailySellChart />
          </div>
        </div>

        {/* Monthly Sales Chart */}
        <div className='bg-white rounded-2xl shadow-lg p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h3 className='text-xl font-bold text-gray-800'>
                Monthly Sales Overview
              </h3>
              <p className='text-gray-600'>Year {currentYear} performance</p>
            </div>
            <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
              {monthName}
            </div>
          </div>
          <div className='h-64'>
            <MonthlySalesChart />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Progress Section */}
        <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Monthly Target */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl'>
                <MdAttachMoney className='text-2xl text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-800'>
                  Monthly Target
                </h3>
                <p className='text-gray-600'>Progress towards goal</p>
              </div>
            </div>
            <MonthlyTargetProgress />
          </div>

          {/* Investment Progress */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl'>
                <RiMoneyDollarCircleLine className='text-2xl text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-800'>
                  Investment Status
                </h3>
                <p className='text-gray-600'>Current investment overview</p>
              </div>
            </div>
            <InvestmentProgress />
          </div>

          {/* Yearly Summary Card */}
          <div className='md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-xl font-bold mb-2'>Yearly Sales Summary</h3>
                <p className='text-indigo-100 mb-4'>
                  {currentYear} Performance
                </p>
                <h2 className='text-3xl font-bold mb-2'>
                  ৳{totalYearSell.toLocaleString()}
                </h2>
                <div className='flex items-center gap-2'>
                  <span
                    className={`flex items-center gap-1 ${isYearlyUp ? 'text-green-300' : 'text-red-300'}`}>
                    {isYearlyUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                    {Math.abs(yearlyChange)}%
                  </span>
                  <span className='text-indigo-200'>from last year</span>
                </div>
              </div>
              <div className='bg-white/20 p-4 rounded-xl backdrop-blur-sm'>
                <FaMoneyBillWave className='text-3xl' />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Inventory & Actions */}
        <div className='space-y-6'>
          {/* Quick Inventory */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-bold text-gray-800'>
                Quick Inventory
              </h3>
              <NavLink
                to='/products'
                className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                View All
              </NavLink>
            </div>
            <ShortProductTable />
          </div>

          {/* Quick Actions */}
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100'>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Quick Actions
            </h3>
            <div className='space-y-3'>
              <NavLink to='/invoiceform'>
                <button className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2'>
                  <FaShoppingCart />
                  New Order
                </button>
              </NavLink>
              <div className='grid grid-cols-2 gap-3'>
                <NavLink to='/products'>
                  <button className='w-full bg-white text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 flex items-center justify-center gap-2'>
                    <MdInventory />
                    Manage Stock
                  </button>
                </NavLink>
                <NavLink to='/orders'>
                  <button className='w-full bg-white text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 flex items-center justify-center gap-2'>
                    <GrOrderedList />
                    View Orders
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className='fixed bottom-8 right-8 z-50'>
        <NavLink to='/invoiceform'>
          <button className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2'>
            <FaShoppingCart className='text-xl' />
            <span className='font-bold'>+ New Order</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default DemoDashboard;
