import { useForm } from 'react-hook-form';
import UseShortProductLists from '../../Hooks/UseShortProductLists';
import UseAxiosPrivet from '../../Hooks/UseAxiosPrivet';

const ShortProductTable = () => {
  const axiosPrivate = UseAxiosPrivet();
  const { register, handleSubmit, reset } = useForm();
  const [products, , refetch] = UseShortProductLists();

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      // New product should start as "pending"
      await axiosPrivate.post('/shortProductList', {
        ...data,
        status: 'pending',
      });
      reset();
      refetch();
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // ✅ Mark product as Done
  const handleDone = async (id) => {
    try {
      await axiosPrivate.patch(`/shortProductList/${id}`, { status: 'done' });
      refetch();
    } catch (err) {
      console.error('Error marking product as done:', err);
    }
  };

  // ! Delete product
  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/shortProductList/${id}`);
      refetch();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-4 border bg-white '>
      <h2 className='text-xl font-bold mb-4 text-center'>
        শর্ট প্রোডাক্ট লিস্ট
      </h2>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-2 mb-6 items-end'>
        <div className='flex-1'>
          {/* <label className='block text-sm '> পণ্যের নাম</label> */}
          <input
            type='text'
            {...register('name', { required: true })}
            className='w-full border px-2 py-1 rounded'
            placeholder='পণ্যের নাম'
          />
        </div>

        <div className='w-32'>
          {/* <label className='block text-sm'>Quantity  </label> */}
          <input
            type='text'
            {...register('quantity', { required: true, min: 1 })}
            className='w-full border px-2 py-1 rounded'
            placeholder='ডিটেইলস'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'>
          অ্যাড
        </button>
      </form>

      {/* Product Table */}
      <table className='w-full border text-sm'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='border px-2 py-1'>#</th>
            <th className='border px-2 py-1'>Name</th>
            <th className='border px-2 py-1'>Quantity</th>
            <th className='border px-2 py-1 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, index) => (
              <tr key={p._id || index}>
                <td className='border px-2 py-1'>{index + 1}</td>
                <td className='border px-2 py-1'>{p.name}</td>
                <td className='border px-2 py-1'>{p.quantity}</td>
                <td className='border px-2 py-1 text-center'>
                  {p.status === 'done' ? (
                    <button
                      onClick={() => handleDelete(p._id)}
                      className='bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600 min-w-20 font-semibold'>
                      Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDone(p._id)}
                      className='bg-yellow-500 text-white px-2 py-0.5 rounded hover:bg-yellow-600 min-w-20 font-semibold'>
                      Pending
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan='4'
                className='text-center py-2'>
                No products yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShortProductTable;
