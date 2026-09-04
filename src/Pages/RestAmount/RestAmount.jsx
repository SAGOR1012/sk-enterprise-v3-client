import { useState, useEffect } from 'react';
import {
  FaUsers,
  FaDollarSign,
  FaExclamationCircle,
  FaSearch,
  FaFilter,
  FaEdit,
  FaStreetView,
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import AddCustomerForm from '../../Components/AddCustomerForm/AddCustomerForm';
import UseCustomers from '../../Hooks/UseCustomers';
import Loader from '../../Components/Loader/Loader';
import CustomerDetail from '../../Components/CustomerDetail/CustomerDetail';
import UseTrx from '../../Hooks/UseTrx';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';

const RestAmount = () => {
  const [customers, isLoading, refetch] = UseCustomers();
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const axiosPrivate = UseAxiosPrivet();

  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    if (selectedCustomer?._id) {
      axiosPrivate
        .get(`/customers/${selectedCustomer._id}/details`)
        .then((res) => setCustomerDetails(res.data));
    }
  }, [selectedCustomer]);

  // Real-time Search Effect
  useEffect(() => {
    const result = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.title.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.mobile.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredCustomers(result);
  }, [searchText, customers]);

  // Update filteredCustomers when customers data or date filter changes
  useEffect(() => {
    let result = customers;

    if (fromDate) {
      result = result.filter(
        (customer) => new Date(customer.date) >= new Date(fromDate),
      );
    }

    if (toDate) {
      result = result.filter(
        (customer) => new Date(customer.date) <= new Date(toDate),
      );
    }

    setFilteredCustomers(result);
  }, [customers, fromDate, toDate]);

  // const allTrx = UseTrx();

  // Add these calculations before the return statement

  const totalCustomers = customers.length;
  const totalAdvanceAmount = customers.reduce((sum, customer) => {
    return sum + (parseFloat(customer.advanceAmount) || 0);
  }, 0);
  const totalDueAmount = customers.reduce((sum, customer) => {
    return sum + (parseFloat(customer.dueAmount) || 0);
  }, 0);
  const duePaymentsCount = customers.filter((customer) => {
    return (parseFloat(customer.dueAmount) || 0) > 0;
  }).length;
  // console.log(allTrx);
  return (
    <div className='bg-gray-50 min-h-screen md:max-w-[750px] lg:max-w-[775px] xl:max-w-full'>
      {/* Header Section */}

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>
              Customer Debt Dashboard
            </h1>
            <p className='text-gray-600'>
              Track and manage customer outstanding balances
            </p>
          </div>
          <button
            className='btn mt-4 md:mt-0 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center transition duration-200'
            onClick={() => document.getElementById('my_modal_3').showModal()}>
            Add New Customer
          </button>
        </div>
        {/* Stats Cards */}
        {/* Stats Cards - 4 Cards Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-md p-3 lx:p-6 flex items-center justify-between border-l-4 border-blue-600'>
            <div>
              <p className='text-gray-500 font-medium'>Total Customers</p>
              <h2 className='text-2xl font-bold text-blue-700'>
                {totalCustomers}
              </h2>
            </div>
            <div className='bg-blue-100 p-3 rounded-lg'>
              <FaUsers
                className='text-blue-600'
                size={24}
              />
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-md p-3 xl:p-6 flex items-center justify-between border-l-4 border-green-500'>
            <div>
              <p className='text-gray-500 font-medium'>Total Advance</p>
              <h2 className='text-2xl font-bold text-green-700'>
                {parseFloat(totalAdvanceAmount).toLocaleString()} TK
              </h2>
            </div>
            <div className='bg-green-100 p-3 rounded-lg'>
              <FaDollarSign
                className='text-green-500'
                size={24}
              />
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-md p-3 xl:p-6 flex items-center justify-between border-l-4 border-red-500'>
            <div>
              <p className='text-gray-500 font-medium'>Total Due</p>
              <h2 className='text-2xl font-bold text-red-700'>
                {parseFloat(totalDueAmount).toLocaleString()} TK
              </h2>
            </div>
            <div className='bg-red-100 p-3 rounded-lg'>
              <FaDollarSign
                className='text-red-500'
                size={24}
              />
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-md p-3 xl:p-6 flex items-center justify-between border-l-4 border-yellow-500'>
            <div>
              <p className='text-gray-500 font-medium'>Due Payments</p>
              <h2 className='text-2xl font-bold text-yellow-600'>
                {duePaymentsCount}
              </h2>
            </div>
            <div className='bg-yellow-100 p-3 rounded-lg'>
              <FaExclamationCircle
                className='text-yellow-500'
                size={24}
              />
            </div>
          </div>
        </div>
        {/* Filter Section */}
        <div className='bg-white rounded-xl shadow-md p-3 xl:p-6 mb-8 border'>
          <div className='flex flex-wrap md:items-center md:space-x-4 space-y-4 md:space-y-0'>
            <div className='md:flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Search
              </label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name, phone or ID'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary'
                />
                <FaSearch className='absolute left-3 top-3 text-gray-400' />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                From Date
              </label>
              <input
                type='date'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                To Date
              </label>
              <input
                type='date'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary'
              />
            </div>
            <button
              // onClick={handleSearch}
              className='mt-6 md:mt-0 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center transition duration-200'>
              <FaFilter className='mr-2' /> Filter
            </button>
          </div>
        </div>
        {/* Customer Table */}
        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='overflow-x-auto'>
            {isLoading ? (
              <Loader />
            ) : (
              <table className='min-w-full lg:w-1/2 divide-y divide-gray-200'>
                <thead className='bg-blue-100 font-bold text-gray-500'>
                  <tr>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      #
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      কাস্টমার
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      ফোন
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      অগ্রিম জমা
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      পাওনা
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      স্ট্যাটাস
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      অ্যাকশন
                    </th>
                    <th className='px-4 lx:px-6 py-3 text-left text-xs tracking-wider'>
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredCustomers.map((customer, index) => (
                    <tr
                      key={index}
                      className='hover:bg-stone-200 cursor-pointer'>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {index + 1}
                      </td>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm font-medium text-gray-900'>
                              {customer.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {customer.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {customer.mobile}
                      </td>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap  '>
                        <span className=' underline text-xs font-medium py-1.5 px-2 italic rounded-full '>
                          {parseFloat(customer.advanceAmount).toLocaleString()}
                        </span>
                      </td>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap '>
                        <span className='text-red-900 bg-red-100 text-xs font-medium py-1.5 px-2 italic rounded-full '>
                          {parseFloat(customer.dueAmount).toLocaleString()}
                        </span>
                      </td>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.status === 'Active'
                              ? ' text-emerald-700'
                              : ' text-rose-700'
                          }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className='px-2 xl:px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <button
                          className='text-blue-600 hover:text-blue-800 mr-3'
                          onClick={(e) => {
                            e.stopPropagation();
                          }}>
                          <FaEdit size={16} />
                        </button>
                        <button
                          className='text-red-600 hover:text-red-800'
                          onClick={(e) => {
                            e.stopPropagation();
                          }}>
                          <MdDelete size={16} />
                        </button>
                      </td>
                      <td>
                        <button
                          className='btn btn-sm bg-blue-600 text-white'
                          onClick={() => {
                            setSelectedCustomer(customer);
                            document
                              .getElementById('cusotmer_detail_modal')
                              .showModal();
                          }}>
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* add new customer modal  */}
      <dialog
        id='my_modal_3'
        className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <AddCustomerForm />
        </div>
      </dialog>
      {/* customer details modal */}
      <dialog
        id='cusotmer_detail_modal'
        className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          {/* <CustomerDetail
            
              data={selectedCustomer}
              // allTrx={allTrx} // allTrx পাস করা হলো
            ></CustomerDetail> */}
          <CustomerDetail
            data={customerDetails}
            onRefresh={() => {
              axiosPrivate
                .get(`/customers/${selectedCustomer._id}/details`)
                .then((res) => setCustomerDetails(res.data));
            }}
          />
        </div>
      </dialog>
    </div>
  );
};

export default RestAmount;
