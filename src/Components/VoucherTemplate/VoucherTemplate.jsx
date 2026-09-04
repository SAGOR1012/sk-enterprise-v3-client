import Swal from 'sweetalert2';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import './vaucherTemplate.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
export const convertToBangla = (number) => {
  const banglaDigits = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯',
  };
  return String(number).replace(/[0-9]/g, (digit) => banglaDigits[digit]);
};

// তারিখ ও সময় ফরম্যাট
const formatDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString('bn-BD');
  const time = now.toLocaleTimeString('bn-BD', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return convertToBangla(`${date}, ${time}`);
};

// ভাউচার নাম্বার জেনারেট
const generateVoucherNumber = () => {
  const number = 'VCH-' + Math.floor(100000 + Math.random() * 900000);
  return convertToBangla(number);
};

const VoucherTemplate = ({ data, onBack }) => {
  if (!data) return null;
  const navigate = useNavigate(); // add this

  const axiosPublic = UseAxiosPublic();
  const [loading, setLoading] = useState(false);

  const {
    items,
    discount,
    customerName,
    customerPhone,
    customerAddress,
    exchangeDescription,
    exchangeQuantity,
    exchangeWeight,
    exchangeValue,
  } = data;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.quantity * item.price || 0),
    0
  );
  const total = subtotal - (discount || 0) - (exchangeValue || 0);
  const voucherNumber = generateVoucherNumber();
  const dateTime = formatDateTime();

  // const handlePrintAndPost = async () => {
  //   setLoading(true);

  //   try {
  //     const bdDateTime = new Date(
  //       new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
  //     );

  //     const formattedDateTime = bdDateTime
  //       .toLocaleString('en-US', {
  //         hour12: true,
  //         year: 'numeric',
  //         month: '2-digit',
  //         day: '2-digit',
  //         hour: '2-digit',
  //         minute: '2-digit',
  //       })
  //       .replace(',', ''); // Optional: comma সরানোর জন্য

  //     const orderPayload = {
  //       ...data,
  //       voucherNumber,
  //       date: formattedDateTime, // 12-hour BD local time (hh:mm AM/PM)
  //     };

  //     await axiosPublic.post('/orders', orderPayload);

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'অর্ডার সফলভাবে কনফার্ম হয়েছে!',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     setTimeout(() => navigate('/ordersHistory'), 1600);
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'অর্ডার ব্যর্থ',
  //       text: 'আবার চেষ্টা করুন।',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePrintAndPost = async () => {
    setLoading(true);

    try {
      // Get the current date and time in the user's local timezone
      const now = new Date();

      // Convert to Bangladesh Standard Time (BST)
      const bdDateTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
      );

      // Format the date and time for display and storage
      const formattedDateTime = bdDateTime
        .toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // This ensures AM/PM format
        })
        .replace(',', ''); // Optional: remove comma from date part if present

      const orderPayload = {
        ...data,
        voucherNumber,
        date: formattedDateTime, // This will now include the correct 12-hour BD local time
      };

      await axiosPublic.post('/orders', orderPayload);

      Swal.fire({
        icon: 'success',
        title: 'অর্ডার সফলভাবে কনফার্ম হয়েছে!',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => navigate('/ordersHistory'), 1600);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'অর্ডার ব্যর্থ',
        text: 'আবার চেষ্টা করুন।',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='voucher-container'>
      <div
        id='voucher-print-area'
        className='max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg border text-gray-900'>
        {/* হেডার */}
        <div className='text-center mb-6 space-y-2'>
          <h1 className='text-3xl font-bold text-gray-800'>সিরাজ ব্যাটারী</h1>
          <p className='text-gray-600'>
            হাজারীবাগ কামরাঙ্গি চর, মাহতাব সিএনজি গ্যাস পাম্পের উল্টা দিকে
          </p>
        </div>

        {/* গ্রাহক এবং ভাউচার ইনফো */}
        <div className='flex justify-between items-start mb-6 text-sm'>
          <div>
            <p>
              <span className='font-semibold'>গ্রাহকের নাম:</span>{' '}
              {customerName || '--'}
            </p>
            <p>
              <span className='font-semibold'>মোবাইল:</span>{' '}
              {convertToBangla(customerPhone) || '--'}
            </p>
            <p>
              <span className='font-semibold'>ঠিকানা:</span>{' '}
              {customerAddress || '--'}
            </p>
          </div>
          <div className='text-right'>
            <p>
              <span className='font-semibold'>ভাউচার নং:</span> {voucherNumber}
            </p>
            <p>
              <span className='font-semibold'>তারিখ ও সময়:</span> {dateTime}
            </p>
          </div>
        </div>

        {/* পণ্য তালিকা */}
        <h3 className='font-bold text-md mb-2'>বিক্রিত পণ্যের তালিকা:</h3>
        <table className='w-full border-collapse border border-gray-300 mb-4 text-sm'>
          <thead>
            <tr className='bg-blue-100'>
              <th className='border border-gray-300 p-2 text-left'>
                পণ্যের নাম
              </th>
              <th className='border border-gray-300 p-2 text-center'>পরিমাণ</th>
              <th className='border border-gray-300 p-2 text-right'>দাম</th>
              <th className='border border-gray-300 p-2 text-right'>মোট</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className='border border-gray-300 p-2'>{item.name}</td>
                <td className='border border-gray-300 p-2 text-center'>
                  {convertToBangla(item.quantity)}
                </td>
                <td className='border border-gray-300 p-2 text-right'>
                  {convertToBangla(item.price.toFixed(2))}/-
                </td>
                <td className='border border-gray-300 p-2 text-right'>
                  {convertToBangla((item.quantity * item.price).toFixed(2))}/-
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {exchangeValue > 0 && (
          <div className='mb-4'>
            <h3 className='font-bold text-md mb-2'>এক্সচেঞ্জকৃত মালামাল:</h3>
            <table className='w-full border-collapse border border-gray-300 text-sm'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-300 p-2 text-left'>
                    মালের বিবরণ
                  </th>
                  <th className='border border-gray-300 p-2 text-center'>
                    সংখ্যা
                  </th>
                  <th className='border border-gray-300 p-2 text-center'>
                    ওজন (কেজি)
                  </th>
                  <th className='border border-gray-300 p-2 text-right'>
                    বিবেচিত মূল্য
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-gray-300 p-2'>
                    {exchangeDescription || 'N/A'}
                  </td>
                  <td className='border border-gray-300 p-2 text-center'>
                    {convertToBangla(exchangeQuantity) || 'N/A'}
                  </td>
                  <td className='border border-gray-300 p-2 text-center'>
                    {convertToBangla(exchangeWeight) || 'N/A'}
                  </td>
                  <td className='border border-gray-300 p-2 text-right text-red-500 font-medium'>
                    = {convertToBangla(exchangeValue.toFixed(2))}/-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* টোটাল */}
        <div className='flex justify-end'>
          <div className='w-64 space-y-1 text-sm'>
            <div className='flex justify-between'>
              <span>সাবটোটাল:</span>
              <span>{convertToBangla(subtotal.toFixed(2))}/-</span>
            </div>
            {exchangeValue > 0 && (
              <div className='flex justify-between text-red-500 font-medium'>
                <span>এক্সচেঞ্জ বাদ:</span>
                <span>= {convertToBangla(exchangeValue.toFixed(2))}/-</span>
              </div>
            )}
            <div className='flex justify-between'>
              <span>ডিসকাউন্ট:</span>
              <span>= {convertToBangla((discount || 0).toFixed(2))}/-</span>
            </div>
            <div className='border-t border-gray-400 my-1'></div>
            <div className='flex justify-between font-bold text-lg'>
              <span>সর্বমোট:</span>
              <span>= {convertToBangla(total.toFixed(2))}/-</span>
            </div>
          </div>
        </div>

        <div className='mt-12 text-xs text-white bg-blue-800 py-2'>
          <p className='text-center'>ধন্যবাদ! আমাদের সাথে থাকার জন্য dfdf।</p>
        </div>
      </div>

      {/* বাটন */}
      <div className='text-center mt-6 no-print'>
        <button
          onClick={onBack}
          className='bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600'>
          ফিরে যান
        </button>
        <button
          onClick={handlePrintAndPost}
          disabled={loading}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          {loading ? 'প্রসেসিং...' : 'কনফার্ম অর্ডার'}
        </button>
      </div>
    </div>
  );
};

export default VoucherTemplate;
