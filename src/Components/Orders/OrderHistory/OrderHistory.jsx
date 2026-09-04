import React, { useState, useEffect } from 'react';
import VoucherModal from '../../VoucherTemplate/VoucherModalPrint'; // নতুন মডাল
import UseGetOrder from '../../../Hooks/UseGetOrder';
import { FaShoppingCart, FaBoxes, FaDollarSign } from 'react-icons/fa';
import { convertToBangla } from '../../VoucherTemplate/VoucherTemplate';

const OrderHistory = () => {
  const [orders, isLoading] = UseGetOrder();
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    let filtered = orders || [];

    if (search.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.voucherNumber?.toLowerCase().includes(search.toLowerCase()) ||
          order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
          order.customerPhone?.includes(search)
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((order) => new Date(order.date) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((order) => new Date(order.date) <= end);
    }

    setFilteredOrders(filtered);
  }, [search, startDate, endDate, orders]);

  const totalOrders = filteredOrders.length;
  const totalProducts = filteredOrders.reduce(
    (acc, order) => acc + (order.items?.length || 0),
    0
  );
  const totalSales = filteredOrders.reduce(
    (acc, order) => acc + (order.total || 0),
    0
  );

  return (
    <div className='p-4'>
      <div className=' p-1  text-white flex  flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-700'>ORDER HISTORY</h1>
        </div>
        <div className='font-bold bg-blue-600 text-white p-2 rounded-md'>
          <h3>SK ENTER PRISE</h3>
        </div>
      </div>
      {/* Summary Cards */}
      <div className='flex flex-wrap gap-2 mb-4 text-sm'>
        <div className='bg-blue-500 text-white font-bold p-2 rounded-xl shadow-md flex-1 min-w-[120px] lg:min-w-[220px] lg:p-6 lg:text-lg flex items-center justify-between'>
          <div>
            <div>অর্ডার</div>
            <div className='text-lg lg:text-2xl font-bold'>
              {convertToBangla(totalOrders)}
            </div>
          </div>
          <FaShoppingCart size={28} />
        </div>
        <div className='bg-green-500 text-white font-bold p-2 rounded-xl shadow-md flex-1 min-w-[120px] lg:min-w-[220px] lg:p-6 lg:text-lg flex items-center justify-between'>
          <div>
            <div>পণ্য</div>
            <div className='text-lg lg:text-2xl font-bold'>
              {convertToBangla(totalProducts)}
            </div>
          </div>
          <FaBoxes size={28} />
        </div>
        <div className='bg-purple-500 text-white font-bold p-2 rounded-xl shadow-md flex-1 min-w-[120px] lg:min-w-[220px] lg:p-6 lg:text-lg flex items-center justify-between'>
          <div>
            <div>মোট সেল</div>
            <div className='text-lg lg:text-2xl font-bold'>
              ৳ {convertToBangla(totalSales)}
            </div>
          </div>
          <FaDollarSign size={28} />
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-col md:flex-row md:items-end md:gap-2 mb-4 text-sm'>
        <div className='flex-1'>
          <label className='block mb-1'>Search</label>
          <input
            type='text'
            placeholder='Invoice No, নাম, ফোন'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border p-1 rounded w-full text-sm'
          />
        </div>
        <div>
          <label className='block mb-1'>Start Date</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border p-1 rounded text-sm'
          />
        </div>
        <div>
          <label className='block mb-1'>End Date</label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border p-1 rounded text-sm'
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border text-sm'>
          <thead className='bg-sky-600 text-white text-left text-xs'>
            <tr>
              <th className='p-1 border'>#</th>
              <th className='p-1 border'>নাম</th>
              <th className='p-1 border'>ফোন</th>
              <th className='p-1 border'>Date</th>
              <th className='p-1 border'>Invoice No</th>
              <th className='p-1 border'>Total Amount</th>
              <th className='p-1 border text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan='8'
                  className='text-center p-2'>
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan='8'
                  className='text-center p-2'>
                  কোন অর্ডার পাওয়া যায়নি
                </td>
              </tr>
            )}
            {!isLoading &&
              filteredOrders
                .slice() // নতুন array copy
                .reverse() // ক্রম উল্টানো
                .map((order, i) => (
                  <tr
                    key={i}
                    className='hover:bg-gray-100 text-sm font-semibold'>
                    <td className='p-1 border'>{i + 1}</td>
                    <td className='p-1 border'>{order.customerName}</td>
                    <td className='p-1 border'>{order.customerPhone}</td>
                    <td className='p-1 border'>{order.date}</td>
                    <td className='p-1 border'>{order.voucherNumber}</td>
                    <td className='p-1 border'>
                      ৳ {convertToBangla(order.total || 0)}
                    </td>
                    <td className='p-1 border text-center space-x-2'>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className='bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs'>
                        ভাউচার দেখুন
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Voucher Modal */}
      {selectedOrder && (
        <VoucherModal
          data={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
