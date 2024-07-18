import { useState, useRef, useEffect } from 'react';
import devPic from '../images/dypLogo.jpg';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProfileMenuDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation(); // Use the correct logout mutation

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Add error handling logic here, if needed
    }
  };
  const {  userInfo } = useSelector((state) => state.auth);


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center cursor-pointer" onClick={handleToggleDropdown}>
        <img
          src={devPic}
          alt="Profile"
          className="rounded-full h-10 w-10"
        />
        <p className="user hidden md:block">{userInfo?.name}</p>
      </div>
      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenuDropdown;
