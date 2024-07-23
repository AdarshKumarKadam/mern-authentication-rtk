import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Navbar from './Navbar';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo?.name || '');
    setEmail(userInfo?.email || '');
    setPhone(userInfo?.phone || '');
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await updateUser({
        _id: userInfo?._id,
        name,
        email,
        password,
        phone,
      }).unwrap();
      
      dispatch(setCredentials({ ...response }));
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.status === 'FETCH_ERROR') {
        // Network error (server not reachable)
        toast.error("Network error: Unable to reach the server");
      } else {
        // Other types of errors (e.g., validation errors)
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Navbar screen={'dashboard'} />
      <div className="h-screen flex items-center justify-center px-5">
        <div className="max-w-screen-xl bg-white border border-gray-200 shadow sm:rounded-lg pt-6 flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Profile Details
                </h1>
                <p className="text-[12px] text-gray-500">
                  Update your details
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-xs flex flex-col gap-4">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="tel"
                      placeholder="Enter your phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="New Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <span className="ml-3">Update Profile</span>
                    </button>
                    <p className="mt-2 text-xs text-gray-600 text-center">
                      Want to go back?{" "}
                      <span
                        className="text-blue-900 font-semibold cursor-pointer"
                        onClick={() => navigate('/')}
                      >
                        Home
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
