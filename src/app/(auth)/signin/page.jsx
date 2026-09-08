// app/signin/page.jsx
'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Signinpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginFunc = async (data) => {
    setLoading(true);

    try {
      const { email, password } = data;
      const { data: res, error } = await authClient.signIn.email({
        email: email,
        password: password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || 'Login failed');
        setLoading(false);
        return;
      }

      if (res) {
        toast.success('Signed in successfully!');
        // Router will handle redirect via callbackURL
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg dark:shadow-gray-800/30">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(handleLoginFunc)}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62] dark:bg-gray-800 dark:text-white transition-colors"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-sm text-gray-500 dark:text-gray-400">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62] dark:bg-gray-800 dark:text-white transition-colors pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#44cc62] hover:bg-[#1cb63d] text-white py-2 rounded-lg transition-colors disabled:opacity-70 font-medium"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-emerald-500"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
              Or sign in with
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-emerald-500"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "google",
              });
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-300"
          >
            <FcGoogle className="text-xl" />
            <span>Login with Google</span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          <span className="underline">Don't have an account?</span>{' '}
          <Link href="/signup" className="text-[#44cc62] font-semibold hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-end mt-5 cursor-pointer text-sm text-[#f3313b] hover:underline">
          Forget Password?
        </p>
      </div>
    </div>
  );
};

export default Signinpage;