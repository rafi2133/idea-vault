// app/signup/page.jsx
'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Signuppage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (data) => {
    setLoading(true);

    try {
      const { email, name, password, photo } = data;

      // Validate photo URL
      const isValidUrl = (url) => {
        if (!url) return true;
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      if (photo && !isValidUrl(photo)) {
        toast.error('Please enter a valid photo URL (include https://)');
        setLoading(false);
        return;
      }

      const { data: res, error } = await authClient.signUp.email({
        name: name,
        image: photo || '',
        email: email,
        password: password,
      });

      if (error) {
        toast.error(error.message || 'Signup failed');
        setLoading(false);
        return;
      }

      if (res) {
        toast.success('Account created successfully! 🎉');
        router.push('/');
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
          Create Account
        </h2>

        <form onSubmit={handleSubmit(handleSignUp)}>
          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 dark:text-gray-400">Your Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62] dark:bg-gray-800 dark:text-white transition-colors"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 dark:text-gray-400">Your Image URL</label>
            <input
              type="text"
              {...register("photo")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62] dark:bg-gray-800 dark:text-white transition-colors"
              placeholder="Photo URL (optional)"
            />
          </div>

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
          <div className="mb-4">
            <label className="text-sm text-gray-500 dark:text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  validate: {
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) || "Must include uppercase letter",
                    hasLowercase: (value) =>
                      /[a-z]/.test(value) || "Must include lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) || "Must include a number",
                    hasSpecial: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Must include special character"
                  }
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white transition-colors pr-10 ${
                  errors.password
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-[#44cc62]'
                }`}
                placeholder="Password (min 6 characters)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}

            {/* Password Requirements */}
            <div className="mt-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password requirements:
              </p>
              <ul className="space-y-1 text-xs">
                <li className={`flex items-center gap-2 ${
                  watch("password")?.length >= 6 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {watch("password")?.length >= 6 ? '✓' : '•'} Minimum 6 characters
                </li>
                <li className={`flex items-center gap-2 ${
                  /[A-Z]/.test(watch("password") || '') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {/[A-Z]/.test(watch("password") || '') ? '✓' : '•'} At least one uppercase letter
                </li>
                <li className={`flex items-center gap-2 ${
                  /[a-z]/.test(watch("password") || '') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {/[a-z]/.test(watch("password") || '') ? '✓' : '•'} At least one lowercase letter
                </li>
                <li className={`flex items-center gap-2 ${
                  /\d/.test(watch("password") || '') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {/\d/.test(watch("password") || '') ? '✓' : '•'} At least one number
                </li>
                <li className={`flex items-center gap-2 ${
                  /[!@#$%^&*(),.?":{}|<>]/.test(watch("password") || '') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {/[!@#$%^&*(),.?":{}|<>]/.test(watch("password") || '') ? '✓' : '•'} At least one special character
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#44cc62] hover:bg-[#18b63a] text-white py-2 rounded-lg transition-colors disabled:opacity-70 font-medium"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>


        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <Link href="/signin" className="text-[#44cc62] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signuppage;