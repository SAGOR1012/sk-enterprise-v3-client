import React from 'react';
import UseGetOrder from '../../Hooks/UseGetOrder';
import { TbHandLoveYou } from 'react-icons/tb';

const Print = () => {
  const [orders] = UseGetOrder();
  const handlePrint = (id) => {
    // Print logic here
    console.log('Print voucher with ID:', id);
    window.print();
  };

  return (
    <div>
      <h1 className='text-4xl font-bold mb-4'>Orders : {orders.length}</h1>
      <div className='space-y-6'>
        {orders.map((order) => (
          <div
            key={order._id}
            className='border rounded-lg p-4 mb-4 bg-white shadow'>
            <h2 className='text-2xl font-bold mb-2'>
              Voucher : {order.voucherNumber}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-lg'>
              <div>Customer Name: {order.customerName}</div>
              <div>Customer Phone: {order.customerPhone}</div>
              <div>Customer Address: {order.customerAddress}</div>
              <div>Date: {order.date}</div>
              <div>Subtotal: {order.subtotal}</div>
              <div>Total: {order.total}</div>
              <div>Discount: {order.discount}</div>
              <div>Exchange Description: {order.exchangeDescription}</div>
              <div>Exchange Quantity: {order.exchangeQuantity}</div>
              <div>Exchange Weight: {order.exchangeWeight}</div>
              <div>Exchange Value: {order.exchangeValue}</div>
              <button
                onClick={() => handlePrint(order.voucherNumber)}
                className='btn btn-primary'>
                Print
              </button>
            </div>
            {/* <div className='mt-4'>
              <h3 className='font-semibold text-lg mb-2'>Items:</h3>
              <table className='w-full border text-sm'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-2'>Name</th>
                    <th className='border p-2'>Quantity</th>
                    <th className='border p-2'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id}>
                      <td className='border p-2'>{item.name}</td>
                      <td className='border p-2'>{item.quantity}</td>
                      <td className='border p-2'>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Print;
