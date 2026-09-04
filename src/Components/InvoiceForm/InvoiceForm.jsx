import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import UseProductLIst from '../../Hooks/UseProductLIst';
import VoucherTemplate from '../VoucherTemplate/VoucherTemplate';
import Swal from 'sweetalert2';

const InvoiceForm = () => {
  // const [products, isLoading] = UseProductLIst();
  const [products] = UseProductLIst();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //     items: [{ name: "", quantity: 1, price: 0 }],
    //     discount: 0,
    //     customerName: "",
    //     customerPhone: "",
    //     customerAddress: "",
    //     exchangeDescription: "",
    //     exchangeQuantity: 0,
    //     exchangeWeight: 0,
    //     exchangeValue: 0,
    // },
    defaultValues: {
      items: [{ name: '', quantity: 1, price: 0, productId: '' }],
      discount: 0,
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      exchangeDescription: '',
      exchangeQuantity: 0,
      exchangeWeight: 0,
      exchangeValue: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const watchItems = watch('items');
  const watchDiscount = watch('discount');
  const watchExchangeValue = watch('exchangeValue');

  const [activeIndex, setActiveIndex] = useState(null); // কোন ইনপুটে ফোকাস আছে
  const [voucherData, setVoucherData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // কোনটি ক্লিক করা হয়েছে

  // ক্যাটাগরি অনুযায়ী গ্রুপিং
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleFocus = (index) => {
    setActiveIndex(index);
    setSelectedCategory(null); // নতুন করে ইনপুটে ফোকাস করলে আগের সিলেকশন রিসেট হবে
  };

  const handleSelectProduct = (index, product) => {
    setValue(`items.${index}.name`, product.name);
    setValue(`items.${index}.price`, product.sellPrice);
    setValue(`items.${index}._id`, product._id); // <-- গুরুত্বপূর্ণ
    setActiveIndex(null);
    setSelectedCategory(null);
  };

  const subtotal = watchItems.reduce(
    (sum, item) => sum + (item.quantity * item.price || 0),
    0,
  );
  const total = subtotal - (watchDiscount || 0) - (watchExchangeValue || 0);

  const onSubmit = (data) => {
    // স্টক চেক
    const outOfStockItem = data.items.find((item) => {
      const product = products.find((p) => p._id === item._id);
      return !product || product.stock < item.quantity;
    });

    if (outOfStockItem) {
      Swal.fire({
        icon: 'warning',
        title: 'স্টক নেই!',
        text: `দুঃখিত! '${outOfStockItem.name}' প্রোডাক্টের পর্যাপ্ত স্টক নেই।`,
      });
      return;
    }

    // টোটাল নেগেটিভ চেক
    if (total < 0) {
      Swal.fire({
        icon: 'error',
        title: 'অবৈধ টোটাল',
        text: 'সর্বমোট নেগেটিভ হতে পারবে না। ডিসকাউন্ট বা এক্সচেঞ্জ ভ্যালু কমান।',
      });
      return;
    }

    // সব ঠিক থাকলে ইনভয়েস প্রসেস হবে
    setVoucherData({ ...data, subtotal, total });
  };
  if (voucherData) {
    return (
      <VoucherTemplate
        data={voucherData}
        onBack={() => setVoucherData(null)}
      />
    );
  }

  // if (isLoading) return <p className="p-4">Loading products...</p>;

  return (
    <div className=' bg-white flex flex-col border border-blue-200 rounded-md items-center justify-center mx-auto p-3 md:p-8 md:mt-10 max-w-[900px]'>
      <div className=' p-1 w-full  text-white flex  flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        {/* Header - Fixed Height */}

        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-4 mb-2  text-white flex justify-between items-center w-full'>
          <div className='flex items-start mb-2 md:mb-0 flex-col '>
            <h1 className='text-xl md:text-2xl font-bold '>INVOICE FORM</h1>
            <p className='text-blue-100 text-sm text-center '>
              Create and manage sales invoices
            </p>
          </div>
          <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hidden md:flex flex-col'>
            <h3 className='text-lg font-bold'>SK ENTERPRISE</h3>
            <p className='text-xs text-blue-100'>Inventory Management</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='  rounded-lg shadow-lg space-y-6 w-full p-1 md:p-4'>
        {/* Items Table Header */}
        <div className='grid grid-cols-12 gap-4 items-center mb-5 bg-sky-600 text-white p-2 text-sm font-semibold'>
          <div className='col-span-5'>পণ্যের নাম</div>
          <div className='col-span-2 text-center'>পরিমাণ</div>
          <div className='col-span-2 text-center'>দাম</div>
          <div className='col-span-2 text-center'>মোট</div>
          <div className='col-span-1 text-center'>একশন</div>
        </div>

        {/* Items List */}
        {fields.map((item, index) => (
          <div
            key={item.id}
            className='grid grid-cols-12 gap-4 items-center mb-4 relative'>
            {/* Product Name Input */}
            <div className='col-span-5 relative'>
              <input
                {...register(`items.${index}.name`)}
                value={watchItems[index]?.name || ''}
                placeholder='প্রোডাক্ট সিলেক্ট করুন'
                onFocus={() => handleFocus(index)}
                autoComplete='off'
                className='border p-2 w-full rounded'
              />

              {/* Dropdown */}
              {activeIndex === index && (
                <div className='absolute z-20 bg-white border rounded shadow-lg mt-1 flex w-auto'>
                  {/* ক্যাটাগরি লিস্ট */}
                  <div className='w-40 border-r'>
                    {Object.entries(categories).map(([category]) => (
                      <div
                        key={category}
                        className={`px-2 py-2 font-semibold text-sm cursor-pointer
                        ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(category)}>
                        {category}
                      </div>
                    ))}
                  </div>

                  {/* ডান পাশে প্রোডাক্ট লিস্ট */}
                  {selectedCategory && (
                    <div className='w-60 border-l bg-white max-h-64 overflow-y-auto'>
                      {categories[selectedCategory].map((product) => (
                        <div
                          key={product._id}
                          onClick={() => handleSelectProduct(index, product)}
                          className='px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-blue-50'>
                          <span>{product.name}</span>
                          <span
                            className={`text-xs font-semibold ${
                              product.stock > 10
                                ? 'text-green-600'
                                : product.stock > 0
                                  ? 'text-orange-500'
                                  : 'text-red-600'
                            }`}>
                            স্টক: {product.stock || 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className='col-span-2'>
              <input
                type='number'
                {...register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                })}
                min={1}
                className='border p-2 w-full rounded text-center'
              />
            </div>

            {/* Price */}
            <div className='col-span-2'>
              <input
                type='number'
                {...register(`items.${index}.price`, { valueAsNumber: true })}
                readOnly
                className='border p-2 w-full rounded text-right bg-gray-100 cursor-not-allowed'
              />
            </div>

            {/* Total */}
            <div className='col-span-2 text-right font-medium'>
              ৳
              {(
                watchItems[index].quantity * watchItems[index].price || 0
              ).toFixed(2)}
            </div>

            {/* Remove Button */}
            <div className='col-span-1 text-center'>
              <button
                type='button'
                onClick={() => remove(index)}
                className='text-red-500 font-bold'>
                ×
              </button>
            </div>
          </div>
        ))}

        {/* Add Item Button */}
        <button
          type='button'
          onClick={() => append({ name: '', quantity: 1, price: 0 })}
          className='bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded'>
          + নতুন পণ্য যোগ করুন
        </button>

        {/* Exchange Section */}
        <div className='mt-8 p-4 border rounded-lg bg-gray-50'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            এক্সচেঞ্জ মালামাল
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                মালের বিবরণ
              </label>
              <input
                type='text'
                {...register('exchangeDescription')}
                placeholder='বিবরণ দিন'
                className='border p-2 rounded w-full'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                সংখ্যা (পিচ)
              </label>
              <input
                type='number'
                {...register('exchangeQuantity', { valueAsNumber: true })}
                placeholder='সংখ্যা'
                className='border p-2 rounded w-full'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                ওজন (কেজি)
              </label>
              <input
                type='number'
                step='0.1'
                {...register('exchangeWeight', { valueAsNumber: true })}
                placeholder='ওজন'
                className='border p-2 rounded w-full'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                এক্সচেঞ্জ টাকার পরিমান
              </label>
              <input
                type='number'
                {...register('exchangeValue', { valueAsNumber: true })}
                placeholder='টাকা'
                className='border p-2 rounded w-full'
              />
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className='mt-8 max-w-xs ml-auto'>
          <div className='flex justify-between mb-2'>
            <span>টোটাল</span>
            <span>= {subtotal.toFixed(2)} /-</span>
          </div>

          {watchExchangeValue > 0 && (
            <div className='flex justify-between mb-2 text-red-500 font-medium'>
              <span>এক্সচেঞ্জ বাদ</span>
              <span>= {(watchExchangeValue || 0).toFixed(2)}</span>
            </div>
          )}

          <div className='flex justify-between mb-2'>
            <label>ডিসকাউন্ট</label>
            <input
              type='number'
              {...register('discount', { valueAsNumber: true })}
              className='border p-1 w-24 text-right rounded'
            />
          </div>

          <div className='border-t my-2'></div>
          <div className='flex justify-between font-bold text-xl'>
            <span>সর্বমোট = </span>
            <span>{total.toFixed(2)} /-</span>
          </div>
        </div>

        {/* Customer Details */}
        <div className='mt-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-end'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto'>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                কাস্টমারের নাম *
              </label>
              <input
                type='text'
                {...register('customerName', { required: true })}
                placeholder='নাম লিখুন'
                className={`border p-2 rounded w-full ${
                  errors.customerName ? 'border-red-500' : ''
                }`}
              />
              {errors.customerName && (
                <p className='text-red-500 text-xs mt-1'>নাম প্রয়োজন</p>
              )}
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                মোবাইল নাম্বার *
              </label>
              <input
                type='text'
                {...register('customerPhone', { required: true })}
                placeholder='মোবাইল নাম্বার'
                className={`border p-2 rounded w-full ${
                  errors.customerPhone ? 'border-red-500' : ''
                }`}
              />
              {errors.customerPhone && (
                <p className='text-red-500 text-xs mt-1'>
                  মোবাইল নাম্বার প্রয়োজন
                </p>
              )}
            </div>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                ঠিকানা
              </label>
              <input
                type='text'
                {...register('customerAddress')}
                placeholder='ঠিকানা'
                className='border p-2 rounded w-full'
              />
            </div>
          </div>

          <button
            type='submit'
            className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded h-fit md:mt-5'>
            পরবর্তী ধাপ
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
