import React, { useState } from 'react';
import { convertToBangla } from './VoucherTemplate'; // বাংলা সংখ্যা রূপান্তরের ফাংশন
import './vaucherTemplate.css';

const VoucherModalPrint = ({ data, onBack }) => {
  const [loading] = useState(false);

  // ডাটাবেসের date কে বাংলায় রূপান্তর (12-hour format)
  const formatToBanglaDateTime = (dateStr) => {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    const bdDateTime = new Date(
      date.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
    );

    let hours = bdDateTime.getHours();
    const minutes = bdDateTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const day = bdDateTime.getDate();
    const month = bdDateTime.getMonth() + 1;
    const year = bdDateTime.getFullYear();

    return `${convertToBangla(day)}/${convertToBangla(month)}/${convertToBangla(
      year
    )}, ${convertToBangla(hours)}:${convertToBangla(
      minutes.toString().padStart(2, '0')
    )} ${ampm}`;
  };

  const {
    customerName,
    customerPhone,
    customerAddress,
    voucherNumber,
    date,
    items = [],
    exchangeDescription,
    exchangeQuantity,
    exchangeWeight,
    exchangeValue = 0,
    subtotal = 0,
    discount = 0,
    total = 0,
  } = data;

  const handlePrint = () => {
    const printContent =
      document.getElementById('voucher-print-area').innerHTML;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Voucher Print</title>
          <style>
            body { font-family: sans-serif; font-size: 10px; margin: 0; padding: 5px; }
            table { border-collapse: collapse; width: 100%; font-size: 10px; }
            th, td { border: 1px solid #333; padding: 1px; text-align: left; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .voucher-total-section {
                width: 180px; /* Adjust width as needed */
                margin-left: auto; /* Pushes it to the right */
              /*   border: 1px solid #ccc; Add border as in the image */
                padding: 5px;
            }
            .voucher-total-section > div {
                display: flex;
                justify-content: space-between;
                padding: 2px 0;
            }
            .voucher-total-section .red-text {
                color: red;
                font-weight: bold;
            }
            .voucher-total-section .total-final {
                border-top: 1px solid #333;
                margin-top: 5px;
                padding-top: 5px;
                font-weight: bold;
                font-size: 12px;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='relative w-[95%] max-w-3xl'>
        <div className='voucher-container'>
          <div
            id='voucher-print-area'
            className='max-w-3xl mx-auto p-3 bg-white shadow-xl rounded-lg border text-gray-900 text-xs'>
            {/* হেডার */}
            <div className='text-center mb-2 space-y-0.5'>
              <h1 className='text-xl font-bold text-gray-800'>
                এস কে এন্টারপ্রাইজ
              </h1>
              <p className='text-gray-600 text-[10px]'>
                ঠিকানা : মাদানী সেন্টার , তেঁতুলঝোড়া কাউন্টার , সিংগাইর রোড
                ,হেমায়েতপুর,সাভার,ঢাকা
              </p>
              <p className='text-gray-600 text-[10px]'>
                প্রো: মোঃ করিমুল মৃধা , 01320943095 , 01886612965
              </p>
            </div>

            {/* গ্রাহক এবং ভাউচার ইনফো */}
            <div className='flex justify-between items-start mb-1 text-[10px]'>
              <div>
                <p>
                  <span className='font-semibold'>গ্রাহকের নাম:</span>{' '}
                  {customerName || 'N/A'}
                </p>
                <p>
                  <span className='font-semibold'>মোবাইল:</span>{' '}
                  {convertToBangla(customerPhone) || 'N/A'}
                </p>
                <p>
                  <span className='font-semibold'>ঠিকানা:</span>{' '}
                  {customerAddress || 'N/A'}
                </p>
              </div>
              <div className='text-right'>
                <p>
                  <span className='font-semibold'>ভাউচার নং:</span>{' '}
                  {voucherNumber}
                </p>
                <p>
                  <span className='font-semibold'>তারিখ:</span>{' '}
                  {formatToBanglaDateTime(date)}
                </p>
              </div>
            </div>

            {/* পণ্য তালিকা */}
            <h3 className='font-bold text-[11px] mb-1'>
              বিক্রিত পণ্যের তালিকা:
            </h3>
            <table className='w-full border-collapse border border-gray-300 mb-2 text-[10px]'>
              <thead>
                <tr className='bg-blue-100'>
                  <th className='border border-gray-300 p-1 text-left'>
                    পণ্যের নাম
                  </th>
                  <th className='border border-gray-300 p-1 text-center'>
                    পরিমাণ
                  </th>
                  <th className='border border-gray-300 p-1 text-right'>দাম</th>
                  <th className='border border-gray-300 p-1 text-right'>মোট</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td className='border border-gray-300 p-1'>{item.name}</td>
                    <td className='border border-gray-300 p-1 text-center'>
                      {convertToBangla(item.quantity)}
                    </td>
                    <td className='border border-gray-300 p-1 text-right'>
                      ৳{convertToBangla(item.price.toFixed(2))}
                    </td>
                    <td className='border border-gray-300 p-1 text-right'>
                      {convertToBangla((item.quantity * item.price).toFixed(2))}
                      /-
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* এক্সচেঞ্জকৃত মালামাল */}
            {exchangeValue > 0 && (
              <div className='mb-10'>
                <h3 className='font-bold text-[11px] mb-1'>
                  এক্সচেঞ্জকৃত মালামাল:
                </h3>
                <table className='w-full border-collapse border border-gray-300 text-[10px] '>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='border border-gray-300 p-1 text-left'>
                        মালের বিবরণ
                      </th>
                      <th className='border border-gray-300 p-1 text-center'>
                        সংখ্যা
                      </th>
                      <th className='border border-gray-300 p-1 text-center'>
                        ওজন (কেজি)
                      </th>
                      <th className='border border-gray-300 p-1 text-right'>
                        বিবেচিত মূল্য
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-gray-300 p-1'>
                        {exchangeDescription || '--'}
                      </td>
                      <td className='border border-gray-300 p-1 text-center'>
                        {convertToBangla(exchangeQuantity)}
                      </td>
                      <td className='border border-gray-300 p-1 text-center'>
                        {convertToBangla(exchangeWeight)}
                      </td>
                      <td className='border border-gray-300 p-1 text-right text-red-500 font-medium'>
                        = {convertToBangla(exchangeValue.toFixed(2))}/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* টোটাল */}
            {/* Refactored Total Section */}
            <div className='flex justify-end mt-3'>
              <div className='voucher-total-section text-[10px]'>
                <div className='flex justify-between'>
                  <span>সাবটোটাল =</span>{' '}
                  <span>{convertToBangla(subtotal.toFixed(2))}/-</span>
                </div>
                {exchangeValue > 0 && (
                  <div className='flex justify-between red-text'>
                    <span>এক্সচেঞ্জ বাদ =</span>{' '}
                    <span>{convertToBangla(exchangeValue.toFixed(2))}/-</span>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span>ডিসকাউন্ট =</span>{' '}
                  <span>{convertToBangla((discount || 0).toFixed(2))}/-</span>
                </div>
                <div className='flex justify-between total-final'>
                  <span>সর্বমোট =</span>{' '}
                  <span>{convertToBangla(total.toFixed(2))}/-</span>
                </div>
              </div>
            </div>
            {/* End Refactored Total Section */}

            {/* ফুটার */}
            <div className='mt-4 text-[10px] text-white bg-blue-800 py-1 rounded'>
              <p className='text-center'>ধন্যবাদ! আমাদের সাথে থাকার জন্য।</p>
            </div>
          </div>

          {/* বাটন */}
          <div className='text-center mt-4 no-print'>
            <button
              onClick={onBack}
              className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
              ফিরে যান
            </button>
            <button
              onClick={handlePrint}
              className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherModalPrint;
