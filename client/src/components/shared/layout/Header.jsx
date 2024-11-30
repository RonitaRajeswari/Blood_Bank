import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from'react-router-dom'
import {logout} from '../../../redux/features/auth/authSlice'

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();


 

 

  const handleLogout = () => {
    // Handle logout logic here
    console.log('User  logged out');
    dispatch(logout());
    localStorage.clear()
    alert('logout successfully')
    navigate('/login')
    
  };

  return (
    <div>
      {/* Upper nav */}
      <nav className='bg-slate-100  shadow-inner'>
        <div className='container-fluid flex justify-between items-center p-3'>
          <div className="navbar-brand flex text-red-500">
            <BiSolidDonateBlood size={30} />
            <span className='font-bold text-lg p-2'>Blood-Bank</span>
          </div> 
          <div className='hidden md:flex '>
            <span className="me-3 text-red-500">Welcome {user?.name || user?.hospitalName || user?.organisationName}!</span>
           <div className='bg-red-500 p-1 rounded-2xl text-xs shadow-lg text-white'>{user?.role}</div>
          </div>
          <button className="btn btn-outline-light text-red-500" onClick={handleLogout}>
            <FaSignOutAlt size={25} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;