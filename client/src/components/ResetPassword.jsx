import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import Loader from "./Loader";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  useEffect(() => {
    // Parse OTP from URL path
    const pathSegments = location.pathname.split("/");
    const otpFromPath = pathSegments[pathSegments.length - 1];
    setOtp(otpFromPath);
  }, [location.pathname]);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await resetPassword({ otp, password }).unwrap();
      console.log("Response obj ",  response)

      toast.success(response?.message);
      navigate("/login");
     
      
    } catch (err) {
      console.log(err)
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter new Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Want to go back?{" "}
              <span
                className="text-blue-900 font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
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

export default ResetPassword;
