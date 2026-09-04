import React from 'react';
import UseAuth from '../../Hooks/UseAuth';

const Navbar = () => {
  const { user, loading } = UseAuth();
  if (!user) return null;
  return (
    <div className=' w-full bg-gray-900 '>
      <div className='navbar flex'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl text-white'>SIRAJ BATTERY</a>
        </div>

        {/* <div className="flex gap-2 ">
                    <div className="form-control hidden md:block">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={ 0 }
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default Navbar;
