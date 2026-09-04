import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UseStaff from '../../Hooks/UseStaff';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';

const SalaryForm = () => {
  const [staffList, isLoading] = UseStaff();
  const axiosPrivet = UseAxiosPrivet();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch fields
  const staffId = watch('staffId');
  const bonus = watch('bonus') || 0;

  const [netSalary, setNetSalary] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // When staff changes, update selectedStaff + recalc salary
  useEffect(() => {
    if (staffId) {
      const staff = staffList.find((s) => s._id === staffId);
      setSelectedStaff(staff);

      if (staff) {
        const calculated =
          Number(staff.basicSalary || 0) +
          Number(bonus || 0) -
          Number(staff.advance || 0);
        setNetSalary(calculated);
      }
    }
  }, [staffId, bonus, staffList]);

  // Submit handler
  const onSubmit = async (data) => {
    if (!selectedStaff) return;

    try {
      const payload = {
        staffId: selectedStaff._id,
        name: selectedStaff.name,
        basicSalary: selectedStaff.basicSalary,
        advance: selectedStaff.advance,
        bonus: Number(data.bonus) || 0,
        netSalary: netSalary,
        month: new Date().toISOString().slice(0, 7), // YYYY-MM
        createdAt: new Date(),
      };

      await axiosPrivet.post('/salary', payload);
      alert('Salary payment successful');

      reset();
      setSelectedStaff(null);
      setNetSalary(0);
    } catch (err) {
      console.error(err);
      alert('Failed to process salary payment');
    }
  };

  if (isLoading) return <p className='text-center'>Loading staff...</p>;

  return (
    <div className='p-6 max-w-md mx-auto bg-gray-200 rounded shadow'>
      <h2 className='text-lg font-semibold mb-4'>Salary Payment Form</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-3'>
        {/* Staff Selection */}
        <div>
          <label className='block text-sm font-medium mb-1'>Select Staff</label>
          <select
            {...register('staffId', { required: true })}
            className='w-full border px-3 py-2 rounded'
            defaultValue=''>
            <option
              value=''
              disabled>
              -- Select Staff --
            </option>
            {staffList.map((staff) => (
              <option
                key={staff._id}
                value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
          {errors.staffId && (
            <p className='text-red-500 text-sm'>Please select a staff</p>
          )}
        </div>

        {/* Basic Salary */}
        {selectedStaff && (
          <div>
            <label className='block text-sm font-medium mb-1'>
              Basic Salary
            </label>
            <input
              {...register('basicSalary')}
              value={selectedStaff.basicSalary}
              readOnly
              className='w-full border px-3 py-2 rounded bg-gray-100'
            />
          </div>
        )}

        {/* Advance */}
        {selectedStaff && (
          <div>
            <label className='block text-sm font-medium mb-1'>
              Advance Amount
            </label>
            <input
              {...register('advance')}
              value={selectedStaff.advance || 0}
              readOnly
              className='w-full border px-3 py-2 rounded bg-gray-100'
            />
          </div>
        )}

        {/* Bonus */}
        <div>
          <label className='block text-sm font-medium mb-1'>Bonus</label>
          <input
            {...register('bonus')}
            type='number'
            placeholder='Enter bonus'
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        {/* Net Salary */}
        {selectedStaff && (
          <div>
            <label className='block text-sm font-medium mb-1'>Net Salary</label>
            <input
              {...register('netSalary')}
              value={netSalary}
              readOnly
              className='w-full border px-3 py-2 rounded bg-green-100 font-semibold'
            />
          </div>
        )}

        {/* Submit */}
        <div className='pt-3'>
          <button
            type='submit'
            disabled={!selectedStaff}
            className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400'>
            Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalaryForm;
