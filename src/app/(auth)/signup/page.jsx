'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signuppage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async (data) => {
        console.log(data);

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);

        const { email, name, password, photo } = data;
        const isValidUrl = (url) => {
            if (!url) return true; // Allow empty (will use default avatar)
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (photo && !isValidUrl(photo)) {
            toast.error('Please enter a valid photo URL (include https://)');
            return;
        }
        const { data: res, error } = await authClient.signUp.email({
            name: name, // required
            image: photo || '',
            email: email, // required
            password: password, // required  

        })
        console.log(res, error);
        if (error) {
            toast.error(error.message || 'Signup failed');
            return;
        }
        if (res) {
            toast.success('Signup Successfully');
            router.push('/');
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="mb-4">
                        <label className='text-sm text-gray-500' htmlFor="">Your Name</label>
                        <input
                            type="text"
                            {...register("name")}

                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62]"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='text-sm text-gray-500' htmlFor="">Your Image URL</label>
                        <input
                            type="text"
                            {...register("photo")}

                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62]"
                            placeholder="photo URL"
                        />
                    </div>

                    <div className="mb-4">
                        <label className='text-sm text-gray-500' htmlFor="">E-mail</label>
                        <input
                            type="email"

                            {...register("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62]"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <div className="mb-4">
                            <label className='text-sm text-gray-500' htmlFor="password">Password</label>
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
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-[#44cc62]'
                                        }`}
                                    placeholder="Password (min 6 characters)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* Error message */}
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}

                            {/* Password Requirements - Shows always or when typing */}
                            <div className="mt-2 bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Password requirements:
                                </p>
                                <ul className="space-y-1 text-xs">
                                    <li className={`flex items-center gap-2 ${watch("password")?.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                                        {watch("password")?.length >= 6 ? '✓' : '•'} Minimum 6 characters
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(watch("password") || '') ? 'text-green-600' : 'text-gray-500'}`}>
                                        {/[A-Z]/.test(watch("password") || '') ? '✓' : '•'} At least one uppercase letter
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[a-z]/.test(watch("password") || '') ? 'text-green-600' : 'text-gray-500'}`}>
                                        {/[a-z]/.test(watch("password") || '') ? '✓' : '•'} At least one lowercase letter
                                    </li>
                                    <li className={`flex items-center gap-2 ${/\d/.test(watch("password") || '') ? 'text-green-600' : 'text-gray-500'}`}>
                                        {/\d/.test(watch("password") || '') ? '✓' : '•'} At least one number
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(watch("password") || '') ? 'text-green-600' : 'text-gray-500'}`}>
                                        {/[!@#$%^&*(),.?":{}|<>]/.test(watch("password") || '') ? '✓' : '•'} At least one special character
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#44cc62] hover:bg-[#18b63a] text-white py-2 rounded-lg transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link href="/signin" className="text-[#44cc62] hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signuppage;