import React, { useState, useEffect } from 'react';
import { FaBoxes, FaTags, FaDollarSign, FaEdit, FaTrash } from 'react-icons/fa';
import UseProductLIst from '../../Hooks/UseProductLIst';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import ProductForm from '../ProductForm/ProductForm';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const InventoryTable = () => {
  const location = useLocation(); // route change detect
  const [products, isLoading, refetch] = UseProductLIst();
  const axiosPublic = UseAxiosPublic();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // ✅ Component mount বা route change হলে ডেটা রিফ্রেশ
  useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

  const openAddModal = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFormSubmit = async (data) => {
    try {
      if (editProduct?._id) {
        const { _id, ...updateData } = data;
        await axiosPublic.put(`/products/${editProduct._id}`, updateData);

        Swal.fire({
          icon: 'success',
          title: 'আপডেট সফল!',
          text: 'পণ্য সফলভাবে আপডেট হয়েছে ✅',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const randomId = `sk${Math.floor(1000 + Math.random() * 9000)}`;
        await axiosPublic.post('/products', { ...data, productId: randomId });

        Swal.fire({
          icon: 'success',
          title: 'যোগ সফল!',
          text: `নতুন পণ্য যোগ করা হয়েছে ✅ (আইডি: ${randomId})`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'কিছু সমস্যা হয়েছে ❌ আবার চেষ্টা করুন।',
      });
    }
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'ডিলিট করলে এটি আর ফেরত আনা যাবে না!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'হ্যাঁ, ডিলিট করুন!',
      cancelButtonText: 'বাতিল',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosPublic.delete(`/products/${_id}`);
      Swal.fire({
        icon: 'success',
        title: 'ডিলিট সফল!',
        text: 'পণ্য ডিলিট করা হয়েছে 🗑️',
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'ডিলিট করতে সমস্যা হয়েছে ❌',
      });
    }
  };

  // সার্চ এবং ফিল্টার অনুযায়ী ডেটা ফিল্টার করা হচ্ছে
  const filteredData = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    const matchesDate = dateFilter ? item.stockDate === dateFilter : true;
    return matchesSearch && matchesCategory && matchesDate;
  });

  // ইউনিক ক্যাটাগরি বের করা হচ্ছে
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // summary data
  const totalCategories = categories.length;
  const totalProducts = products.length;
  const totalBuyValue = products.reduce(
    (acc, item) => acc + (Number(item.purchasePrice) || 0),
    0
  );

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className=' p-1  text-white flex  flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-700'>INVENTORY TABLE</h1>
        </div>
        <div className='font-bold bg-blue-600 text-white p-2 rounded-md'>
          <h3>SK ENTER PRISE</h3>
        </div>
      </div>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
        <div className='bg-blue-500 text-white p-4 rounded-xl shadow-md flex items-center justify-between'>
          <div>
            <p className='text-lg font-semibold'>মোট ক্যাটাগরি</p>
            <h2 className='text-2xl font-bold'>{totalCategories}</h2>
          </div>
          <FaTags size={32} />
        </div>
        <div className='bg-green-500 text-white p-4 rounded-xl shadow-md flex items-center justify-between'>
          <div>
            <p className='text-lg font-semibold'>মোট পণ্য</p>
            <h2 className='text-2xl font-bold'>{totalProducts}</h2>
          </div>
          <FaBoxes size={32} />
        </div>
        <div className='bg-purple-500 text-white p-4 rounded-xl shadow-md flex items-center justify-between'>
          <div>
            <p className='text-lg font-semibold'>স্টক মূল্য</p>
            <h2 className='text-2xl font-bold'>{totalBuyValue}/-</h2>
          </div>
          <FaDollarSign size={32} />
        </div>
      </div>

      {/* Search & Filter */}
      <div className='mb-4 flex flex-col sm:flex-row gap-4 items-center'>
        <input
          type='text'
          placeholder='নাম দিয়ে খুঁজুন...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border p-2 rounded-lg w-full sm:w-1/3'
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className='border p-2 rounded-lg w-full sm:w-1/4'>
          <option value=''>সব ক্যাটাগরি</option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}>
              {capitalize(cat)}
            </option>
          ))}
        </select>
        <input
          type='date'
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className='border p-2 rounded-lg w-full sm:w-1/4'
        />
        <button
          onClick={openAddModal}
          className='ml-0 sm:ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
          + নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* Product Form Modal */}
      {modalOpen && (
        <ProductForm
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          defaultValues={editProduct || {}}
        />
      )}

      {/* Products Table */}
      <div className='bg-white shadow-md rounded-lg overflow-hidden min-h-[200px]'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left min-w-[800px]'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-3'>#</th>
                <th className='p-3'>ID</th>
                <th className='p-3'>নাম</th>
                <th className='p-3'>ক্যাটাগরি</th>
                <th className='p-3'>স্টক</th>
                <th className='p-3'>স্টক তারিখ</th>
                <th className='p-3'>ক্রয় মূল্য</th>
                <th className='p-3'>বিক্রয় মূল্য</th>
                <th className='p-3'>একশন</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan='9'
                    className='text-center py-6 text-gray-500'>
                    লোড হচ্ছে...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((product, i) => (
                  <tr
                    key={i}
                    className='border-b hover:bg-gray-50 '>
                    <td className='p-3'>{i + 1}</td>
                    <td className='p-3'>{capitalize(product.productId)}</td>
                    <td className='p-3'>{capitalize(product.name)}</td>
                    <td className='p-3'>{capitalize(product.category)}</td>
                    <td className='p-3'>{product.stock}</td>
                    <td className='p-3'>{product.stockDate}</td>
                    <td className='p-3'>৳{product.purchasePrice || 0}</td>
                    <td className='p-3'>৳{product.sellPrice || 0}</td>
                    <td className='p-3 flex gap-2'>
                      <button
                        className='bg-green-100 text-green-500 px-3 py-1 rounded-lg flex items-center gap-1'
                        onClick={() => openEditModal(product)}>
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className='bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1'>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan='9'
                    className='text-center py-6 text-gray-500'>
                    কোনো পণ্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
