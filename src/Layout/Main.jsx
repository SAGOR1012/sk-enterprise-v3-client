import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Drawer from '../Shared/Drawer/Drawer';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
  return (
    <div className='bg-blue-50'>
      <Navbar></Navbar>
      <div className='flex flex-col min-h-screen lg:flex-row overflow-hidden  '>
        <Drawer></Drawer>
        <div className='bg-[#f9fafb]  w-full '>
          <Outlet></Outlet>
        </div>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default Main;
