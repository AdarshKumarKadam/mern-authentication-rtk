import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import Loader from "./Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const password = watch("password");

  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    console.log("Validation Errors: ", errors);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser(data).unwrap();
      toast.success("User created successfully!");
      navigate("/");
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        toast.error("Network error: Unable to reach the server");
      } else {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Customer Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey, enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },

                      maxLength: {
                        value: 20,
                        message: "Name must be at most 20 characters",
                      },

                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Name must only contain letters ",
                      },
                      onChange: handleInputChange,
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}

                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                      onChange: handleInputChange,
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}

                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="tel"
                    placeholder="Enter your phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                      onChange: handleInputChange,
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}

                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value:
                          /^(?!.*\s)(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          "Password must have at least one uppercase letter, one number, and one special character, and cannot contain spaces",
                      },
                      onChange: handleInputChange,
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}

                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                      onChange: handleInputChange,
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                  <button
                    disabled={isLoading}
                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <span className="ml-3">Sign Up</span>
                  </button>
                  {isLoading && (
                    <div className="flex justify-center mt-4">
                      <Loader />
                    </div>
                  )}
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
