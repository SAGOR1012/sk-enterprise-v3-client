import { useForm } from 'react-hook-form';
import { TbCoinTakaFilled } from 'react-icons/tb';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';
import UseGetBuyProducts from '../../Hooks/UseGetBuyProducts';
import { useState } from 'react';
import { FaBoxOpen } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';

const BuyProducts = () => {
  // 🔥 Get products + refetch from hook
  const [buyProducts, , refetch] = UseGetBuyProducts();
  const axiosPrivet = UseAxiosPrivet();
  const [selectedDate, setSelectedDate] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalAmount =
    buyProducts?.reduce((sum, p) => sum + p.totalPrice, 0) || 0;

  const totalWeight =
    buyProducts?.reduce((sum, p) => sum + parseFloat(p.weight || 0), 0) || 0;

  const addProduct = async (data) => {
    const newProduct = {
      sellerName: data.sellerName,
      productName: data.productName,
      quantity: Number(data.qty),
      weight: Number(data.weight),
      totalPrice: Number(data.totalPrice),
      description: data.descriptions,
      purchaseDate: new Date(),
    };

    try {
      const res = await axiosPrivet.post('/buyproducts', newProduct);

      if (res.status === 201) {
        reset();
        refetch(); // 🔄 auto refresh table data
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  /* Date filter logic */
  const filteredProducts = selectedDate
    ? buyProducts.filter((item) => {
        const itemDate = new Date(item.purchaseDate)
          .toISOString()
          .split('T')[0];
        return itemDate === selectedDate;
      })
    : buyProducts;

  return (
    <div className='min-h-screen bg-gray-50 p-8 font-sans'>
      <div className='max-w-8xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            ইনভেন্টরি ড্যাশবোর্ড
          </h1>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {/* Total Amount */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-green-100 rounded-xl'>
                <TbCoinTakaFilled className='w-6 h-6 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  মোট পরিমাণ (TK)
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          {/* Total Entries */}

          {/* Total Weight */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-yellow-100 rounded-xl'>
                <GiWeight className='w-6 h-6 text-yellow-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>
                  মোট ওজন (KG)
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {totalWeight.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center'>
              <div className='p-3 bg-blue-100 rounded-xl'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>মোট এন্ট্রি</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {buyProducts.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form + Table */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8'>
          {/* Add Product Form */}
          <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              <FaBoxOpen className='inline mr-2 text-blue-600' /> নতুন পণ্য
              এন্ট্রি করুন
            </h2>

            <form
              onSubmit={handleSubmit(addProduct)}
              className='space-y-4'>
              {/* Seller Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  বিক্রেতার নাম*
                </label>
                <input
                  type='text'
                  {...register('sellerName', { required: true })}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg'
                  placeholder='Enter seller name'
                />
              </div>

              {/* Product Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  পণ্যের নাম*{' '}
                </label>
                <input
                  type='text'
                  {...register('productName', { required: true })}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg'
                  placeholder='Enter product name'
                />
              </div>

              {/* Qty / Weight / Unit Price */}
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    পরিমাণ*
                  </label>
                  <input
                    type='number'
                    min={1}
                    {...register('qty', {
                      required: true,
                      min: {
                        value: 1,
                        message: 'Quantity must be at least 1',
                      },
                    })}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg'
                    placeholder='0'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    ওজন (KG)
                  </label>
                  <input
                    type='number'
                    min={0}
                    step='1'
                    {...register('weight', {
                      required: true,
                      min: {
                        value: 0,
                        message: 'Weight cannot be negative',
                      },
                    })}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg'
                    placeholder='kg'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {/*  */}
                    মোট মূল্য
                  </label>
                  <input
                    type='number'
                    min={0}
                    step='1'
                    {...register('totalPrice', {
                      required: true,
                      min: {
                        value: 0,
                        message: 'Price cannot be negative',
                      },
                    })}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg'
                    placeholder='0.00'
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  বর্ণনা / ফোন নম্বর
                </label>
                <textarea
                  {...register('descriptions')}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg'
                  placeholder='Enter descriptions'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700'>
                + Add Product
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
            <div className='bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center'>
              <h3 className='font-semibold text-slate-800 flex items-center'>
                <i className='fa-solid fa-list-check mr-2  text-slate-500 '></i>
                Purchase History : {buyProducts.length}
              </h3>
              {/*  Date Filter */}
              {/* Date filter  */}
              <span className='text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-full'>
                <input
                  type='date'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className='bg-transparent text-xs outline-none'
                />
              </span>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-50 border-b border-slate-200'>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase'>
                      #
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase'>
                      বিক্রেতা
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase'>
                      পণ্য
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center'>
                      পরিমাণ
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center'>
                      ওজন (KG)
                    </th>

                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right'>
                      মোট (TK)
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase'>
                      তারিখ
                    </th>
                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase'>
                      বর্ণনা / ফোন নম্বর
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-slate-100'>
                  {buyProducts.length > 0 ? (
                    [...filteredProducts].reverse().map((purchase, index) => (
                      <tr
                        key={purchase.id}
                        className='hover:bg-slate-50 transition-colors group'>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-slate-600 bg-slate-100 px-2 py-1 rounded text-sm'>
                            {index + 1}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className=' text-slate-600'>
                            {purchase.sellerName}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className=' text-slate-600'>
                            {purchase.productName}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-slate-600  px-2 py-1 rounded text-sm'>
                            {purchase.quantity}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-slate-500 text-sm italic'>
                            {purchase.weight > 0
                              ? `${purchase.weight} kg`
                              : '-'}
                          </span>
                        </td>

                        <td className='px-6 py-4 text-right'>
                          <span className='font-bold text-slate-900'>
                            {purchase.totalPrice.toFixed(2)}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-sm text-slate-500 whitespace-nowrap'>
                          {new Date(purchase.purchaseDate).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            },
                          )}
                        </td>
                        <td
                          className='px-6 py-4 text-sm text-slate-400 max-w-xs truncate'
                          title={purchase.description}>
                          {purchase.description || (
                            <span className='text-slate-200'>—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className='px-6 py-16 text-center'>
                        <div className='flex flex-col items-center justify-center space-y-3'>
                          <div className='bg-slate-100 p-4 rounded-full'>
                            <i className='fa-solid fa-folder-open text-4xl text-slate-300'></i>
                          </div>
                          <p className='text-slate-400 font-medium'>
                            No purchase records found.
                          </p>
                          <p className='text-slate-300 text-sm'>
                            Start by adding a product in the entry form.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {buyProducts.length > 0 && (
              <div className='px-6 py-3 bg-slate-50 border-t border-slate-200'>
                <p className='text-xs text-slate-400 italic'>
                  Showing recent records. Scroll horizontally for details on
                  mobile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProducts;
