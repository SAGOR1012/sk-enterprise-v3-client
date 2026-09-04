import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  DollarSign,
  Calendar,
  Phone,
  MapPin,
  Users,
  CreditCard,
  Wallet,
  History,
} from 'lucide-react';
import UseStaff from '../../Hooks/UseStaff';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';

const StaffPage = () => {
  const [staffList, isLoading, refetch] = UseStaff();
  const axiosPrivet = UseAxiosPrivet();
  const [isOpen, setIsOpen] = useState(false);
  const [isSalaryFormOpen, setIsSalaryFormOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit new staff
  const onSubmit = async (data) => {
    try {
      await axiosPrivet.post('/staff', data);
      refetch();
      reset();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to add staff');
    }
  };

  // Submit salary payment
  const onSalarySubmit = async (data) => {
    try {
      // Your salary payment logic here
      console.log('Salary payment:', data);
      setIsSalaryFormOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to process salary payment');
    }
  };

  // Filter staff based on search
  const filteredStaff = staffList?.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone?.includes(searchTerm) ||
      staff.address?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>
              Staff Management
            </h1>
            <p className='text-gray-600'>
              Manage your staff members and their details
            </p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={() => setIsSalaryFormOpen(true)}
              className='bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition duration-200'>
              <Wallet size={20} />
              Process Salary
            </button>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition duration-200'>
              <History size={20} />
              View History
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition duration-200'>
              <UserPlus size={20} />
              Add Staff
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Total Staff</p>
                <p className='text-3xl font-bold text-gray-800 mt-2'>
                  {staffList?.length || 0}
                </p>
                <p className='text-xs text-gray-400 mt-1'>Active members</p>
              </div>
              <div className='p-3 bg-blue-50 rounded-xl'>
                <Users
                  className='text-blue-600'
                  size={28}
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>
                  Total Salary
                </p>
                <p className='text-3xl font-bold text-gray-800 mt-2'>
                  $
                  {staffList
                    ?.reduce(
                      (sum, staff) =>
                        sum + (parseFloat(staff.basicSalary) || 0),
                      0,
                    )
                    .toLocaleString()}
                </p>
                <p className='text-xs text-gray-400 mt-1'>Monthly payroll</p>
              </div>
              <div className='p-3 bg-green-50 rounded-xl'>
                <DollarSign
                  className='text-green-600'
                  size={28}
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>
                  Total Advance
                </p>
                <p className='text-3xl font-bold text-gray-800 mt-2'>
                  $
                  {staffList
                    ?.reduce(
                      (sum, staff) => sum + (parseFloat(staff.advance) || 0),
                      0,
                    )
                    .toLocaleString()}
                </p>
                <p className='text-xs text-gray-400 mt-1'>Pending clearance</p>
              </div>
              <div className='p-3 bg-yellow-50 rounded-xl'>
                <CreditCard
                  className='text-yellow-600'
                  size={28}
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>
                  Average Salary
                </p>
                <p className='text-3xl font-bold text-gray-800 mt-2'>
                  $
                  {staffList?.length
                    ? (
                        staffList.reduce(
                          (sum, staff) =>
                            sum + (parseFloat(staff.basicSalary) || 0),
                          0,
                        ) / staffList.length
                      ).toFixed(0)
                    : '0'}
                </p>
                <p className='text-xs text-gray-400 mt-1'>Per staff member</p>
              </div>
              <div className='p-3 bg-purple-50 rounded-xl'>
                <DollarSign
                  className='text-purple-600'
                  size={28}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Staff Table */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
        {/* Table Header with Search */}
        <div className='p-6 border-b border-gray-200'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <h2 className='text-xl font-semibold text-gray-800'>
                Staff Members
              </h2>
              <p className='text-gray-500 text-sm mt-1'>
                Manage all staff members and their details
              </p>
            </div>
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='relative'>
                <Search
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
                <input
                  type='text'
                  placeholder='Search by name, phone, or address...'
                  className='w-full md:w-64 pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className='px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2 text-gray-700 font-medium'>
                <Filter size={18} />
                Filter
              </button>
              <button className='px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2 text-gray-700 font-medium'>
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider'>
                  Staff Member
                </th>
                <th className='text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider'>
                  Contact Info
                </th>
                <th className='text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider'>
                  Salary Details
                </th>
                <th className='text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider'>
                  Status
                </th>
                <th className='text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredStaff?.map((staff) => (
                <tr
                  key={staff._id}
                  className='hover:bg-gray-50 transition duration-150'>
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center'>
                        <span className='font-bold text-blue-700 text-lg'>
                          {staff.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900'>
                          {staff.name}
                        </p>
                        <div className='flex items-center gap-1 mt-1'>
                          <Calendar
                            size={14}
                            className='text-gray-400'
                          />
                          <span className='text-xs text-gray-500'>
                            Joined{' '}
                            {new Date(staff.month).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 text-gray-700'>
                        <Phone
                          size={16}
                          className='text-gray-400'
                        />
                        <span className='text-sm'>{staff.phone || 'N/A'}</span>
                      </div>
                      <div className='flex items-start gap-2 text-gray-700'>
                        <MapPin
                          size={16}
                          className='text-gray-400 mt-0.5'
                        />
                        <span className='text-sm max-w-xs truncate'>
                          {staff.address || 'No address'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='space-y-2'>
                      <div className='flex items-baseline gap-1'>
                        <span className='font-bold text-gray-900 text-lg'>
                          ${parseFloat(staff.basicSalary).toLocaleString()}
                        </span>
                        <span className='text-xs text-gray-500'>/month</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs font-medium text-gray-500'>
                          Advance:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            parseFloat(staff.advance) > 0
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                          ${parseFloat(staff.advance || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                      Active
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => {
                          setSelectedStaff(staff);
                          setIsSalaryFormOpen(true);
                        }}
                        className='p-2 hover:bg-green-50 rounded-lg transition text-green-600'
                        title='Pay Salary'>
                        <Wallet size={18} />
                      </button>
                      <button
                        className='p-2 hover:bg-blue-50 rounded-lg transition text-blue-600'
                        title='View Details'>
                        <Eye size={18} />
                      </button>
                      <button
                        className='p-2 hover:bg-yellow-50 rounded-lg transition text-yellow-600'
                        title='Edit'>
                        <Edit size={18} />
                      </button>
                      <button
                        className='p-2 hover:bg-red-50 rounded-lg transition text-red-600'
                        title='Delete'>
                        <Trash2 size={18} />
                      </button>
                      <button
                        className='p-2 hover:bg-gray-100 rounded-lg transition text-gray-600'
                        title='More options'>
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className='p-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-gray-600'>
            Showing{' '}
            <span className='font-semibold text-gray-800'>
              {filteredStaff?.length}
            </span>{' '}
            of{' '}
            <span className='font-semibold text-gray-800'>
              {staffList?.length}
            </span>{' '}
            staff members
          </p>
          <div className='flex items-center gap-2'>
            <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'>
              Previous
            </button>
            <span className='px-3 py-1 bg-blue-600 text-white rounded-lg font-medium'>
              1
            </span>
            <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              2
            </button>
            <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              3
            </button>
            <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Add New Staff */}
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Add New Staff Member
                  </h3>
                  <p className='text-gray-600 mt-1'>
                    Enter the details of the new staff member
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 hover:bg-gray-100 rounded-lg transition'>
                  <span className='text-2xl text-gray-500'>×</span>
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: true })}
                      placeholder='John Doe'
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    />
                    {errors.name && (
                      <p className='mt-2 text-sm text-red-600'>
                        Name is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      placeholder='+1 (555) 123-4567'
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Address
                  </label>
                  <input
                    {...register('address')}
                    placeholder='123 Main St, City, State, ZIP Code'
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Basic Salary *
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
                        $
                      </span>
                      <input
                        {...register('basicSalary', { required: true })}
                        type='number'
                        placeholder='0.00'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                      />
                    </div>
                    {errors.basicSalary && (
                      <p className='mt-2 text-sm text-red-600'>
                        Basic salary is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Advance Amount
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
                        $
                      </span>
                      <input
                        {...register('advance')}
                        type='number'
                        placeholder='0.00'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Joining Date *
                  </label>
                  <input
                    {...register('month', { required: true })}
                    type='date'
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                  />
                  {errors.month && (
                    <p className='mt-2 text-sm text-red-600'>
                      Joining date is required
                    </p>
                  )}
                </div>

                <div className='pt-6 border-t border-gray-200 flex justify-end gap-3'>
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    className='px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium'>
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium'>
                    Add Staff Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Salary Payment Form */}
      {isSalaryFormOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Process Salary Payment
                  </h3>
                  <p className='text-gray-600 mt-1'>
                    Enter salary payment details for{' '}
                    {selectedStaff ? selectedStaff.name : 'staff member'}
                  </p>
                </div>
                <button
                  onClick={() => setIsSalaryFormOpen(false)}
                  className='p-2 hover:bg-gray-100 rounded-lg transition'>
                  <span className='text-2xl text-gray-500'>×</span>
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSalarySubmit)}
                className='space-y-6'>
                {/* Salary Form Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Staff Member
                    </label>
                    <select className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition'>
                      <option value=''>Select staff member</option>
                      {staffList?.map((staff) => (
                        <option
                          key={staff._id}
                          value={staff._id}>
                          {staff.name} - ${staff.basicSalary}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Payment Month
                    </label>
                    <input
                      type='month'
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Basic Salary
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
                        $
                      </span>
                      <input
                        type='number'
                        placeholder='0.00'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Advance Deduction
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
                        $
                      </span>
                      <input
                        type='number'
                        placeholder='0.00'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition'
                      />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Bonuses
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
                        $
                      </span>
                      <input
                        type='number'
                        placeholder='0.00'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Deductions
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
                        $
                      </span>
                      <input
                        type='number'
                        placeholder='0.00'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition'
                      />
                    </div>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-xl p-6'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-sm text-gray-600'>
                        Net Salary Payable
                      </p>
                      <p className='text-3xl font-bold text-green-600 mt-2'>
                        $3,850.00
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-gray-600'>Payment Date</p>
                      <p className='font-medium text-gray-900 mt-2'>
                        {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='pt-6 border-t border-gray-200 flex justify-end gap-3'>
                  <button
                    type='button'
                    onClick={() => setIsSalaryFormOpen(false)}
                    className='px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium'>
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium'>
                    Process Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Salary History */}
      {isHistoryOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto'>
            <div className='p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Salary Payment History
                  </h3>
                  <p className='text-gray-600 mt-1'>
                    View all salary payments and transaction history
                  </p>
                </div>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className='p-2 hover:bg-gray-100 rounded-lg transition'>
                  <span className='text-2xl text-gray-500'>×</span>
                </button>
              </div>

              {/* Salary History Content */}
              <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <p className='text-sm text-gray-500'>Total Paid</p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      $45,200.00
                    </p>
                  </div>
                  <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <p className='text-sm text-gray-500'>This Month</p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      $12,500.00
                    </p>
                  </div>
                  <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <p className='text-sm text-gray-500'>Pending</p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      $3,850.00
                    </p>
                  </div>
                  <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <p className='text-sm text-gray-500'>Avg. Payment</p>
                    <p className='text-2xl font-bold text-gray-800 mt-1'>
                      $2,150.00
                    </p>
                  </div>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-50'>
                      <th className='text-left p-4 font-semibold text-gray-700'>
                        Staff Member
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-700'>
                        Payment Date
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-700'>
                        Period
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-700'>
                        Amount
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-700'>
                        Status
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-700'>
                        Reference
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {/* Sample History Data */}
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr
                        key={item}
                        className='hover:bg-gray-50'>
                        <td className='p-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                              <span className='font-semibold text-purple-600'>
                                JD
                              </span>
                            </div>
                            <span className='font-medium'>John Doe</span>
                          </div>
                        </td>
                        <td className='p-4'>
                          {new Date().toLocaleDateString()}
                        </td>
                        <td className='p-4'>March 2024</td>
                        <td className='p-4 font-semibold text-gray-900'>
                          $3,500.00
                        </td>
                        <td className='p-4'>
                          <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
                            Paid
                          </span>
                        </td>
                        <td className='p-4 text-blue-600 font-medium'>
                          INV-2024-{item}00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='pt-6 border-t border-gray-200 flex justify-end'>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className='px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition font-medium'>
                  Close History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
