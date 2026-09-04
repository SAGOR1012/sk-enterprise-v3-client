// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { MdAccountBalance, MdOutlineCancel } from 'react-icons/md';
// import {
//   FaBars,
//   FaBoxes,
//   FaUsers,
//   FaChartLine,
//   FaClipboardList,
//   FaCog,
//   FaShoppingCart,
//   FaDollarSign,
//   FaBoxOpen,
// } from 'react-icons/fa';
// import { GrMoney, GrUserWorker } from 'react-icons/gr';
// import { SiMoneygram } from 'react-icons/si';
// import { RiLoginBoxFill, RiLogoutBoxRFill } from 'react-icons/ri';
// import UseAuth from '../../Hooks/UseAuth';

// const Drawer = () => {
//   const { user, logout, loading } = UseAuth(); //
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   if (loading) {
//     return <div className='text-white'>Loading...</div>;
//   }
//   if (!user) return null;

//   const handleLogOut = () => {
//     logout()
//       .then(() => {
//         navigate('/login'); // লগআউটের পর লগইন পেজে রিডিরেক্ট
//       })
//       .catch((error) => console.error(error));
//   };

//   // Active nav style handler
//   const activeNav = ({ isActive }) =>
//     isActive ? 'text-blue-500' : 'hover:bg-blue-500 py-2 rounded-md';

//   // Sidebar navigation items
//   const navItems = (
//     <ul className='menu text-gray-300 space-y-2 w-full font-semibold '>
//       <li>
//         <NavLink
//           to='/'
//           className={activeNav}>
//           <FaChartLine className='inline mr-3 text-xl' /> ড্যাশবোর্ড
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/invoiceform'
//           className={activeNav}>
//           <FaBoxes className='inline mr-3 text-xl' /> ইনভয়েস
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/bookproducts'
//           className={activeNav}>
//           <FaBoxOpen className='inline mr-3 text-xl' /> বুক প্রোডাক্টস
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/inventorytable'
//           className={activeNav}>
//           <FaShoppingCart className='inline mr-3 text-xl' /> পণ্যসমূহ
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/buyproducts'
//           className={activeNav}>
//           <FaShoppingCart className='inline mr-3 text-xl' /> পণ্য কিনুন
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/ordersHistory'
//           className={activeNav}>
//           <FaClipboardList className='inline mr-3 text-xl' /> অর্ডার হিস্টোরি
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/shortProducts'
//           className={activeNav}>
//           <FaShoppingCart className='inline mr-3 text-xl ' /> শর্ট প্রোডাক্ট
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/staff'
//           className={activeNav}>
//           <GrUserWorker className='inline mr-3 text-xl' /> স্টাফ
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to='/restAmount'
//           className={({ isActive }) =>
//             isActive
//               ? 'text-blue-500'
//               : 'text-red-500 hover:bg-blue-500 py-2 rounded-md'
//           }>
//           <FaDollarSign className='inline mr-3 text-xl' />
//           বাকি
//         </NavLink>
//       </li>
//       {/* <li>
//         <NavLink
//           to='/customers'
//           className={activeNav}>
//           <FaUsers className='inline mr-3 text-xl' /> কাস্টমার
//         </NavLink>
//       </li> */}

//       <li>
//         <NavLink
//           to='/investment'
//           className={activeNav}>
//           <SiMoneygram className='inline mr-3 text-xl' /> ইনভেস্টমেন্ট
//         </NavLink>
//       </li>
//       {/* <li>
//         <NavLink
//           to='/settings'
//           className={activeNav}>
//           <FaCog className='inline mr-3 text-xl' /> সেটিংস
//         </NavLink>
//       </li> */}

//       {/* Conditional Login/Logout */}
//       {user ? (
//         <li>
//           <button
//             onClick={handleLogOut}
//             className='flex items-center w-full text-left text-red-500 hover:bg-red-500 hover:text-white py-2 px-2 rounded-md'>
//             <RiLogoutBoxRFill className='inline mr-3 text-xl' /> লগ আউট
//           </button>
//         </li>
//       ) : (
//         <li>
//           <NavLink
//             to='/login'
//             className={activeNav}>
//             <RiLoginBoxFill className='inline mr-3 text-xl' /> লগ ইন
//           </NavLink>
//         </li>
//       )}
//     </ul>
//   );

//   return (
//     <div className='min-w-64  bg-gray-900 z-20'>
//       <div
//         className={`fixed lg:static top-0 left-0 z-40 h-screen bg-gray-900 p-4 transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0`}>
//         <div className='flex items-center justify-between mb-6'>
//           <h1 className='text-sm font-bold text-gray-400 w-[80%] text-center'>
//             Email: {user?.email || 'গেস্ট'}
//           </h1>
//           <button
//             className='lg:hidden  text-red-500 p-1 rounded-full hover:bg-red-300 transition'
//             onClick={() => setIsOpen(false)}
//             aria-label='Close sidebar'>
//             <MdOutlineCancel size={26} />
//           </button>
//         </div>
//         {navItems}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className='flex-1 p-4 w-full lg:hidden flex justify-between items-center'>
//         <button
//           className='btn mb-4'
//           onClick={() => setIsOpen(true)}>
//           <FaBars className='mr-2 text-lg' /> মেনু
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Drawer;
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  FaBoxes,
  FaChartLine,
  FaClipboardList,
  FaShoppingCart,
  FaDollarSign,
  FaBoxOpen,
} from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { SiMoneygram } from 'react-icons/si';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import UseAuth from '../../Hooks/UseAuth';
import { MdClose } from 'react-icons/md';

const Drawer = () => {
  const { user, logout, loading } = UseAuth();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // screen check
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsCollapsed(mobile); // mobile এ default closed
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-900 text-white'>
        লোডিং...
      </div>
    );
  }

  if (!user) return null;

  const handleLogOut = () => {
    logout()
      .then(() => navigate('/login'))
      .catch((error) => {
        console.error('Logout failed:', error);
        // Optionally show user feedback
      });
  };
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navConfig = [
    { to: '/', icon: FaChartLine, label: 'ড্যাশবোর্ড' },
    { to: '/invoiceform', icon: FaBoxes, label: 'ইনভয়েস' },
    { to: '/bookproducts', icon: FaBoxOpen, label: 'বুক প্রোডাক্টস' },
    { to: '/inventorytable', icon: FaShoppingCart, label: 'পণ্যসমূহ' },
    { to: '/buyproducts', icon: FaShoppingCart, label: 'পণ্য কিনুন' },
    { to: '/ordersHistory', icon: FaClipboardList, label: 'অর্ডার হিস্টোরি' },
    { to: '/shortProducts', icon: FaShoppingCart, label: 'শর্ট প্রোডাক্ট' },
    { to: '/staff', icon: GrUserWorker, label: 'স্টাফ' },
    {
      to: '/restAmount',
      icon: FaDollarSign,
      label: 'বাকি',
      className: 'text-red-500 hover:bg-red-500 hover:text-white',
    },
    { to: '/investment', icon: SiMoneygram, label: 'ইনভেস্টমেন্ট' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && !isCollapsed && (
        <div
          className='fixed inset-0 bg-black/50 z-40'
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          
          bg-gray-900 p-4 flex flex-col
          transition-all duration-300 ease-in-out
          z-50 
          ${
            isMobile
              ? `fixed top-0 left-0 h-full w-64 ${
                  isCollapsed ? '-translate-x-full' : 'translate-x-0'
                }`
              : `sticky top-0 h-screen ${isCollapsed ? 'w-20' : 'w-64'}`
          }
        `}>
        {/* Header */}
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } mb-6`}>
          {isCollapsed ? (
            <div
              className='text-lg font-bold text-blue-400'
              title={user?.email}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <>
              <h1 className='text-sm font-bold text-gray-400 truncate'>
                {user?.email?.split('@')[0]}
              </h1>

              <div className='flex items-center gap-2'>
                {/* Desktop collapse */}
                {!isMobile && (
                  <button
                    onClick={handleToggle}
                    className='text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-700'>
                    <MdChevronLeft size={22} />
                  </button>
                )}

                {/* Mobile close */}
                {isMobile && (
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className='text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-700'
                    aria-label='Close drawer'>
                    <MdClose size={22} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <ul className='text-gray-300 space-y-1 flex-1 font-semibold text-sm'>
          {navConfig.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => isMobile && setIsCollapsed(true)}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'text-blue-500 bg-gray-800'
                        : item.className || 'hover:bg-blue-500 hover:text-white'
                    } py-3 px-3 rounded-md flex items-center ${
                      isCollapsed ? 'justify-center' : ''
                    }`
                  }>
                  <Icon className='text-xl' />
                  {!isCollapsed && <span className='ml-3'>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}

          {/* Logout */}
          <li>
            <button
              onClick={handleLogOut}
              className={`text-red-500 hover:bg-red-500 hover:text-white py-3 px-3 rounded-md flex items-center w-full ${
                isCollapsed ? 'justify-center' : ''
              }`}>
              <RiLogoutBoxRFill className='text-xl' />
              {!isCollapsed && <span className='ml-3'>লগ আউট</span>}
            </button>
          </li>
        </ul>

        {/* Desktop Toggle */}
        {!isMobile && (
          <div className='mt-auto pt-4 border-t border-gray-700'>
            <button
              onClick={handleToggle}
              className='w-full text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 flex items-center justify-center'>
              {isCollapsed ? (
                <MdChevronRight size={20} />
              ) : (
                <>
                  <MdChevronLeft
                    size={20}
                    className='mr-2'
                  />
                  সংক্ষিপ্ত
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      {isMobile && isCollapsed && (
        <button
          onClick={handleToggle}
          className='
    fixed top-4
    left-[22rem]
    md:left-[42rem]
    z-30
    bg-gray-900
    text-white
    p-2
    rounded-r-md
    shadow-lg
  '>
          ☰
        </button>
      )}
    </>
  );
};

export default Drawer;
