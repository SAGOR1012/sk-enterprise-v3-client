import React from 'react';
import UseSalary from '../../Hooks/UseSalary';
import moment from 'moment';

const SalaryHistory = () => {
  const [salary, isLoading] = UseSalary();

  if (isLoading)
    return <p className='text-center'>Loading salary history...</p>;

  return (
    <div className='p-6'>
      <h2 className='text-lg font-semibold mb-4'>Salary History</h2>
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Name
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Month
              </th>
              <th className='border border-gray-300 px-4 py-2 text-right'>
                Basic Salary
              </th>
              <th className='border border-gray-300 px-4 py-2 text-right'>
                Advance
              </th>
              <th className='border border-gray-300 px-4 py-2 text-right'>
                Bonus
              </th>
              <th className='border border-gray-300 px-4 py-2 text-right'>
                Net Salary
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {salary.map((s) => (
              <tr
                key={s._id}
                className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2'>{s.name}</td>
                <td className='border border-gray-300 px-4 py-2'>{s.month}</td>
                <td className='border border-gray-300 px-4 py-2 text-right'>
                  {s.basicSalary} BDT
                </td>
                <td className='border border-gray-300 px-4 py-2 text-right'>
                  {s.advance || 0} BDT
                </td>
                <td className='border border-gray-300 px-4 py-2 text-right'>
                  {s.bonus || 0} BDT
                </td>
                <td className='border border-gray-300 px-4 py-2 text-right font-semibold text-green-600'>
                  {s.netSalary} BDT
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {moment(s.createdAt).format('YYYY-MM-DD')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryHistory;
