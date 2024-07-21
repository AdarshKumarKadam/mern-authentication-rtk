import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';
import Loader from './Loader';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword({email}).unwrap()
      toast.success(response.message);
      navigate('/login')
    } catch (err) {
      
      if (err.status === 'FETCH_ERROR') {
        // Network error (server not reachable)
        toast.error("Network error: Unable to reach the server");
      } else {
        // Other types of errors (e.g., validation errors)
        toast.error(err?.data?.message || err.message);
      }    }
  };

  //   <img
  //   className="mx-auto h-10 w-auto"
  //   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
  //    alt="Your Company"
  // />
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter email..."
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </button>
            <p className="mt-8  text-sm text-gray-600">
              You will receive a link to reset your password on the email
              address entered above .<br />
              <br />
              You will not receive any email if it is not registered.
            </p>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Back to{" "}
              <a href="">
                <span
                  className="text-blue-900 font-semibold"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </span>
              </a>
            </p>
            {isLoading && (
              <div className="flex justify-center mt-4">
                <Loader />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
