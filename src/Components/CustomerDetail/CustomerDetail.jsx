import { useForm } from 'react-hook-form';
import { FaMoneyBillWave, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';

const CustomerDetail = ({ data, onRefresh }) => {
  const axiosPrivet = UseAxiosPrivet();

  if (!data) return null;

  const {
    name,
    title,
    mobile,
    address,
    advanceAmount = 0,
    dueAmount = 0,
    status,
    _id,
    transactions = [],
  } = data;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
      paymentType: 'cash',
      paymentMode: 'payment',
    },
  });

  const paymentMode = watch('paymentMode');

  const onSubmit = async (formData) => {
    const payload = {
      amount: Number(formData.amount),
      paymentMode: formData.paymentMode,
      paymentType: formData.paymentType,
      note: formData.note || '',
      date: formData.date,
    };

    try {
      await axiosPrivet.post(`/customers/payment/${_id}`, payload);
      reset();
      onRefresh(); // 🔄 parent থেকে আবার data আনবে
    } catch (err) {
      alert('Payment failed');
    }
  };

  return (
    // <div className='p-6 bg-white rounded-xl shadow-lg border'>
    //   <h2 className='text-2xl font-semibold text-blue-700 mb-2'>
    //     Customer Overview
    //   </h2>

    //   <p className='text-sm text-gray-500 mb-2'>
    //     Name: {name} ({title})
    //   </p>

    //   <div className='grid grid-cols-2 gap-4 my-4'>
    //     <div className='bg-gray-100 p-4 rounded'>
    //       <p>Advance</p>
    //       <p className='font-bold text-green-600'>{advanceAmount} TK</p>
    //     </div>
    //     <div className='bg-gray-100 p-4 rounded'>
    //       <p>Due</p>
    //       <p className='font-bold text-red-600'>{dueAmount} TK</p>
    //     </div>
    //   </div>

    //   {/* PAYMENT FORM */}
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className='bg-blue-50 p-4 rounded mb-6'>
    //     <select
    //       {...register('paymentMode')}
    //       className='w-full mb-2'>
    //       <option value='payment'>Payment</option>
    //       <option value='remaining'>Baki</option>
    //     </select>

    //     <input
    //       type='number'
    //       {...register('amount', { required: true })}
    //       placeholder='Amount'
    //       className='w-full mb-2'
    //     />

    //     {paymentMode === 'payment' && (
    //       <select
    //         {...register('paymentType')}
    //         className='w-full mb-2'>
    //         <option value='cash'>Cash</option>
    //         <option value='bikash'>Bikash</option>
    //       </select>
    //     )}

    //     <input
    //       type='date'
    //       {...register('date')}
    //       className='w-full mb-2'
    //     />
    //     <input
    //       {...register('note')}
    //       placeholder='Note'
    //       className='w-full mb-2'
    //     />

    //     <button className='w-full bg-blue-600 text-white py-2 rounded'>
    //       Submit
    //     </button>
    //   </form>

    //   {/* TRANSACTIONS */}

    // </div>
    <div className='bg-slate-50 p-6 rounded-2xl border border-slate-200'>
      {/* HEADER */}
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h2 className='text-xl font-semibold text-slate-800'>
            Customer Account
          </h2>
          <p className='text-sm text-slate-500'>{title}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'Active'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-100 text-rose-700'
          }`}>
          {status}
        </span>
      </div>

      {/* CUSTOMER INFO + FORM */}
      <div className='grid grid-cols-3 gap-6 mb-8'>
        {/* CUSTOMER DETAILS */}
        <div className='col-span-2 bg-white border rounded-xl p-5 space-y-3'>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>
            Customer Information
          </h3>

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <p className='text-slate-500'>Name</p>
              <p className='font-medium'>{name}</p>
            </div>

            <div>
              <p className='text-slate-500'>Mobile</p>
              <p className='font-medium'>{mobile}</p>
            </div>

            <div className='col-span-2'>
              <p className='text-slate-500'>Address</p>
              <p className='font-medium'>{address}</p>
            </div>
          </div>
        </div>

        {/* COMPACT PAYMENT FORM */}
        <div className='bg-white border rounded-xl p-4'>
          <h3 className='text-sm font-semibold text-slate-700 mb-3'>
            Quick Transaction
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-2 text-sm'>
            <select
              {...register('paymentMode')}
              className='w-full rounded-md border px-2 py-1.5'>
              <option value='pay'>Payment</option>
              <option value='due'>Add Due</option>
            </select>

            <input
              type='number'
              {...register('amount', { required: true })}
              placeholder='Amount'
              className='w-full rounded-md border px-2 py-1.5'
            />

            {paymentMode === 'payment' && (
              <select
                {...register('paymentType')}
                className='w-full rounded-md border px-2 py-1.5'>
                <option value='cash'>Cash</option>
                <option value='bikash'>Bkash</option>
              </select>
            )}

            <input
              type='date'
              {...register('date')}
              className='w-full rounded-md border px-2 py-1.5'
            />

            <button className='w-full rounded-md bg-slate-800 text-white py-1.5 font-medium'>
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* BALANCES */}
      <div className='grid grid-cols-2 gap-4 mb-8'>
        {/* ADVANCE */}
        <div className='bg-white border rounded-xl p-4 flex items-center justify-between'>
          <div>
            <p className='text-xs text-slate-500'>Advance Balance</p>
            <p className='text-2xl font-semibold text-emerald-600'>
              {advanceAmount} TK
            </p>
          </div>

          <div className='text-emerald-600 text-3xl'>↑</div>
        </div>

        {/* DUE */}
        <div className='bg-white border rounded-xl p-4 flex items-center justify-between'>
          <div>
            <p className='text-xs text-slate-500'>Outstanding Due</p>
            <p className='text-2xl font-semibold text-rose-600'>
              {dueAmount} TK
            </p>
          </div>

          <div className='text-rose-600 text-3xl'>↓</div>
        </div>
      </div>

      {/* TRANSACTION HISTORY */}
      <div className='bg-white border rounded-xl overflow-hidden'>
        <div className='px-4 py-3 border-b flex justify-between'>
          <h3 className='text-sm font-semibold text-slate-700'>
            Transaction History : {transactions.length}
          </h3>
          <div>
            <button className='btn btn-sm bg-blue-600 text-white'>
              Print
            </button>{' '}
          </div>
        </div>

        <table className='w-full text-sm'>
          <thead className='bg-slate-100 text-slate-600'>
            <tr>
              <th className='px-4 py-2 text-left'>#</th>
              <th className='px-4 py-2 text-left'>Date</th>
              <th className='px-4 py-2 text-right'>Amount</th>
              <th className='px-4 py-2 text-left'>Type</th>
              <th className='px-4 py-2 text-left'>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* {[...transactions].reverse().map((t, i) => ( */}
            {[...transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((t, i) => (
                <tr
                  key={i + 1}
                  className='border-t hover:bg-slate-50'>
                  <td className='px-4 py-2'>{i + 1}</td>
                  <td className='px-4 py-2'>
                    {new Date(t.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className='px-4 py-2 text-right font-medium'>
                    {t.amount} TK
                  </td>
                  <td className='px-4 py-2 capitalize text-slate-600'>
                    {t.type}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetail;
