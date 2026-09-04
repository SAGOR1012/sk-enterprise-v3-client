import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { TbCoinTakaFilled } from 'react-icons/tb';
import { FaBoxOpen } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';
import UseGetBookedList from '../../Hooks/UseGetBookedList';
import Loader from '../../Components/Loader/Loader';

const BookProducts = () => {
  const [bookedProducts, isLoading, refetch] = UseGetBookedList();
  const axiosPrivet = UseAxiosPrivet();
  const [selectedDate, setSelectedDate] = useState('');
  const [updatingId, setUpdatingId] = useState(null); // Track which item is being updated

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      paymentMethod: 'cash',
      status: 'Hold',
      advance: 0,
    },
  });

  const totalPrice = Number(watch('totalPrice') || 0);
  const advance = Number(watch('advance') || 0);
  const dueAmount = Math.max(totalPrice - advance, 0);

  // const totalAmount =
  //   bookedProducts?.reduce((sum, p) => sum + p.totalPrice, 0) || 0;
  const totalAmount =
    bookedProducts
      ?.filter((p) => p.status === 'Hold')
      .reduce((sum, p) => sum + Number(p.totalPrice || 0), 0) || 0;

  const totalWeight =
    bookedProducts?.reduce((sum, p) => sum + Number(p.weight || 0), 0) || 0;

  /* Booking products length */
  const totalBookings =
    bookedProducts?.filter((p) => p.status === 'Hold').length || 0;

  // POST method using react-hook-form
  const addBooking = async (data) => {
    if (data.status === 'Delivered') {
      const confirmed = window.confirm('Are you sure to book this items?');
      if (!confirmed) return;
    }

    const booking = {
      customerName: data.customerName,
      productName: data.productName,
      quantity: Number(data.qty),
      weight: Number(data.weight),
      totalPrice: Number(data.totalPrice),
      advance: Number(data.advance),
      due: Number(data.totalPrice) - Number(data.advance),
      paymentMethod: data.paymentMethod,
      deliveryDate: data.deliveryDate,
      note: data.note,
      bookingDate: new Date(),
      status: data.status,
    };

    try {
      const res = await axiosPrivet.post('/bookingproducts', booking);

      if (res.status === 201) {
        reset();
        refetch();
      }
    } catch (err) {
      console.error('Booking failed', err);
    }
  };

  // Function to update status to Delivered
  const updateToDelivered = async (bookingId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to mark this booking as Delivered?\n\nThis action cannot be undone.',
    );

    if (!confirmed) return;

    setUpdatingId(bookingId); // Show loading state

    try {
      const res = await axiosPrivet.patch(`/bookingproducts/${bookingId}`, {
        status: 'Delivered',
        deliveredDate: new Date(),
      });

      if (res.status === 200) {
        refetch(); // Refresh the data
      }
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProducts = selectedDate
    ? bookedProducts.filter((item) => {
        const d = new Date(item.bookingDate).toISOString().split('T')[0];
        return d === selectedDate;
      })
    : bookedProducts;

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className='min-h-screen bg-gray-50 p-8 font-sans'>
      <div className='max-w-8xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            পণ্য বুকিং ড্যাশবোর্ড
          </h1>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-xl border'>
            <div className='flex items-center'>
              <div className='p-3 bg-green-100 rounded-xl'>
                <TbCoinTakaFilled className='w-6 h-6 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-600'>মোট মূল্য (TK)</p>
                <p className='text-2xl font-bold'>{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl border'>
            <div className='flex items-center'>
              <div className='p-3 bg-yellow-100 rounded-xl'>
                <GiWeight className='w-6 h-6 text-yellow-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-600'>মোট ওজন (KG)</p>
                <p className='text-2xl font-bold'>{totalWeight.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl border'>
            <p className='text-sm text-gray-600'>বুকিং Item</p>
            <p className='text-2xl font-bold'>{totalBookings}</p>
          </div>
        </div>

        {/* Form + Table */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8'>
          {/* Form */}
          <div className='bg-white p-8 rounded-xl border'>
            <h2 className='text-xl font-semibold mb-6'>
              <FaBoxOpen className='inline mr-2 text-blue-600' />
              নতুন বুকিং
            </h2>

            <form
              onSubmit={handleSubmit(addBooking)}
              className='space-y-4'>
              {/* Customer */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  কাস্টমারের নাম
                </label>
                <input
                  {...register('customerName', { required: true })}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              {/* Product */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  পণ্যের নাম
                </label>
                <input
                  {...register('productName', { required: true })}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              {/* Qty / Weight / Price */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    পরিমাণ
                  </label>
                  <input
                    type='number'
                    min={1}
                    {...register('qty', { required: true })}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    ওজন (KG)
                  </label>
                  <input
                    type='number'
                    min={0}
                    {...register('weight')}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    মোট মূল্য
                  </label>
                  <input
                    type='number'
                    min={0}
                    {...register('totalPrice', { required: true })}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Advance / Due / Payment */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    অ্যাডভান্স
                  </label>
                  <input
                    type='number'
                    min={0}
                    {...register('advance')}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    বাকি টাকা
                  </label>
                  <input
                    value={dueAmount}
                    readOnly
                    className='w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    পেমেন্ট মেথড
                  </label>
                  <select
                    {...register('paymentMethod')}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'>
                    <option value='cash'>Cash</option>
                    <option value='bkash'>Bkash</option>
                    <option value='bank'>Bank</option>
                  </select>
                </div>
              </div>

              {/* Status and Delivery Date in same row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    স্ট্যাটাস
                  </label>
                  <select
                    {...register('status')}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'>
                    <option value='Hold'>Hold</option>
                    {/* <option value='Delivered'>Delivered</option> */}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    তারিখ
                  </label>
                  <input
                    type='date'
                    {...register('deliveryDate')}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  নোট / ফোন নম্বর
                </label>
                <textarea
                  {...register('note')}
                  rows='3'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium'>
                + বুকিং যোগ করুন
              </button>
            </form>
          </div>

          {/* Table */}
          <div className='bg-white rounded-xl border overflow-hidden'>
            <div className='px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center'>
              <h3 className='font-semibold text-slate-700'>
                Booking History : {bookedProducts.length}
              </h3>
              <input
                type='date'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='text-sm bg-white px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-200 border-b rounded-t-md border-slate-200'>
                    <th className='px-6 py-1 text-xs font-semibold text-slate-500 uppercase'>
                      #
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase'>
                      কাস্টমার
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase'>
                      পণ্য
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-center'>
                      পরিমাণ
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-center'>
                      ওজন (KG)
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right'>
                      মোট (TK)
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right'>
                      অ্যাডভান্স
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right'>
                      বাকি টাকা
                    </th>
                    {/* <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-center'>
                      পেমেন্ট মেথড
                    </th> */}
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-center'>
                      স্ট্যাটাস
                    </th>
                    <th className='px-6 py-3 text-xs font-semibold text-slate-500 uppercase'>
                      তারিখ
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-slate-100'>
                  {filteredProducts.length > 0 ? (
                    [...filteredProducts].reverse().map((b, i) => (
                      <tr
                        key={b._id}
                        className='hover:bg-blue-200 transition-colors group'>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-slate-600 bg-slate-100 px-2 py-1 rounded text-sm'>
                            {i + 1}
                          </span>
                        </td>
                        <td className='px-6 py-1.5'>
                          <span className='text-slate-600 font-medium'>
                            {b.customerName}
                            <span className='text-sm text-slate-600 font-extralight'>
                              {b.note ? ` ${b.note}` : ''}
                            </span>
                          </span>
                        </td>
                        <td className='px-6 py-1.5'>
                          <span className='text-slate-600'>
                            {b.productName}
                          </span>
                        </td>
                        <td className='px-6 py-1.5 text-center'>
                          <span className='text-slate-600 px-2 py-1 rounded text-sm'>
                            {b.quantity}
                          </span>
                        </td>
                        <td className='px-6 py-1.5 text-center'>
                          <span className='text-slate-500 text-sm italic'>
                            {b.weight > 0 ? `${b.weight} kg` : '-'}
                          </span>
                        </td>
                        <td className='px-6 py-1.5 text-right'>
                          <span className='underline text-xs px-3 py-1.5 rounded-full font-medium italic'>
                            {b.totalPrice?.toFixed(2) || '0.00'}
                          </span>
                        </td>
                        <td className='px-6 py-1.5 text-right'>
                          <span className='text-green-900 bg-green-100 text-xs px-3 py-1.5 rounded-full font-medium italic'>
                            {b.advance?.toFixed(2) || '0.00'}
                          </span>
                        </td>
                        <td className='px-6 py-1.5 text-right'>
                          <span className='text-red-900 bg-red-100 text-xs px-3 py-1.5 rounded-full font-medium italic'>
                            {b.due?.toFixed(2) || '0.00'}
                          </span>
                        </td>
                        {/* <td className='px-6 py-1.5 text-center'>
                          <span className='text-sm text-slate-600 font-medium capitalize'>
                            {b.paymentMethod === 'bkash'
                              ? 'Bkash'
                              : b.paymentMethod === 'bank'
                                ? 'Bank'
                                : b.paymentMethod === 'cash'
                                  ? 'Cash'
                                  : b.paymentMethod}
                          </span>
                        </td> */}
                        <td className='px-6 py-1.5 text-center'>
                          {b.status === 'Hold' ? (
                            <button
                              onClick={() => updateToDelivered(b._id)}
                              disabled={updatingId === b._id}
                              className={`text-xs px-3 py-1.5 rounded-full font-medium cursor-pointer transition-all ${
                                updatingId === b._id
                                  ? 'bg-gray-100 text-gray-700 border border-gray-200 cursor-not-allowed'
                                  : 'bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-200 hover:text-yellow-800'
                              }`}>
                              {updatingId === b._id ? 'Updating...' : 'Hold'}
                            </button>
                          ) : (
                            <span className='text-xs px-3 py-1.5 rounded-full font-medium bg-green-100 text-green-700 border border-green-200 cursor-default'>
                              Delivered
                            </span>
                          )}
                        </td>
                        <td className='px-6 py-1.5 text-sm text-slate-500 whitespace-nowrap'>
                          {b.bookingDate
                            ? new Date(b.bookingDate).toLocaleDateString(
                                undefined,
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                },
                              )
                            : '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={11}
                        className='px-6 py-16 text-center'>
                        <div className='flex flex-col items-center justify-center space-y-3'>
                          <div className='bg-slate-100 p-4 rounded-full'>
                            <i className='fa-solid fa-folder-open text-4xl text-slate-300'></i>
                          </div>
                          <p className='text-slate-400 font-medium'>
                            No booking records found.
                          </p>
                          <p className='text-slate-300 text-sm'>
                            Start by adding a booking in the entry form.
                          </p>
                        </div>
                        {bookedProducts.length > 0 && (
                          <div className='px-6 py-3 bg-slate-50 border-t border-slate-200 mt-4'>
                            <p className='text-xs text-slate-400 italic'>
                              Showing recent records. Scroll horizontally for
                              details on mobile.
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookProducts;
