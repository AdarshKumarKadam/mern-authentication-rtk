import { useState } from "react";
import devPic from "../images/dypLogo.jpg";
import ProfileMenuDropdown from "./ProfileMenuDropdown";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = ({ screen }) => {

const navigate = useNavigate()

  return (


    <div className="max-w-screen-2xl block container shadow-md mx-auto px-4 h-16 md:px-20 fixed top-0 left-0  right-0 bg-white z-50">
      <div className="flex justify-between items-center h-16">
        <div className="flex space-x-2">
          <img src={devPic} className="h-12 w-12 rounded-full" alt="Profile" />
          <h1 className="font-medium text-xl cursor-pointer">
            Adars<span className="text-green-500 text-2xl">h</span>
            <p className="text-sm">Software Developer</p>
          </h1>
        </div>

        {screen === 'dashboard' && (
          <div className="flex items-center">
            <ul className="flex space-x-8 mt-2 text-sm">
              <li className="text-lg"><ProfileMenuDropdown /></li>
              <li className="text-lg mt-2"><BsBell /></li>
            </ul>
          </div>
        )}

        {screen === 'home'  && (
          <div className="flex items-center">
            <ul className="flex space-x-8 text-sm ">
              <li className="text-lg cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign Up</li>
              <li className="text-lg  cursor-pointer " onClick={()=>{navigate('/login')}}>Login</li>
            </ul>
          </div>
        )}
               {screen === 'login'  && (
          <div className="flex items-center">
            <ul className="flex space-x-8 text-sm ">
              <li className="text-lg cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign Up</li>
              <li className="text-lg  cursor-pointer " onClick={()=>{navigate('/')}}>Home</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};




export default Navbar;