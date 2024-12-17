import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Notifications from './Notifications';
import { useEffect } from 'react';
import profile from "../images/profile-icon.png"
import profile2 from "../images/profile2.png"

const Navbar = () => {
    const navigate = useNavigate();
    const [show,setShow] = useState(false)
    const handleLogout = async()=>{
        sessionStorage.removeItem("UserId");
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("role")
        sessionStorage.removeItem("skills")
        sessionStorage.removeItem("token");
        navigate('/');
    }
  return (
    <div className="flex justify-between px-7 py-6 items-center text-black">
      <div>
        <Link to="/landing">
          <h1 className="text-2xl">MentorShip</h1>
        </Link>
      </div>
      <div className="lg:flex lg:gap-3 hidden ">
        <Link to="/notifications">
          <h1>Notifications</h1>
        </Link>
        <Link to="/userProfile">
          <h1>Profile</h1>
        </Link>
        <button onClick={handleLogout} >Logout</button>
      </div>
      <div className="block lg:hidden">
        <img
          src={profile2}
          className="w-[3rem] cursor-pointer"
          alt=""
          onClick={() => setShow(!show)}
        />
      </div>
      {show && (
        <div className="flex flex-col  w-full absolute top-[6rem] left-0 bg-[#b097db] text-white  text-xl shadow-md shadow-slate-700 z-40 ">
          <Link to="/notifications">
            <h1 className="py-2 text-center">Notifications</h1>
          </Link>
          <hr />
          <Link to="/userProfile">
            <h1 className="py-2 text-center">Profile</h1>
          </Link>
          <hr />
          <div className='bg-red-600 py-2 text-center'>
            <button onClick={handleLogout} className="">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar