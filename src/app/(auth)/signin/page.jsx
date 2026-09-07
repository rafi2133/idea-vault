'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash,  } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Signinpage = () => {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginFunc = async (data) => {
        console.log(data);
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1500);


        const { email,  password } = data;
        const { data: res, error } = await authClient.signIn.email({
            email: email, // required
            password: password, // required
            rememberMe: true,
            callbackURL: "/",
        });
        console.log(res, error);
        if (error) {
            toast.error(error.message || 'Signup failed');
            return;
        }
        if (res) {
            toast.success('SignIN Successfully')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit(handleLoginFunc)}>
                    <div className="mb-4">
                        <label htmlFor="" className='text-sm text-gray-500'>E-mail</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62]"
                            placeholder="Email address"
                            required
                        />

                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="" className='text-sm text-gray-500'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("password")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44cc62]"
                            placeholder="Password"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-11 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}

                        className="w-full bg-[#44cc62] hover:bg-[#1cb63d] text-white py-2 rounded-lg transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <button
                        onClick={async () =>await authClient.signIn.social({
                            provider: "google",
                        })}
                        className="btn w-full mt-2 rounded-xl bg-white text-black border-[#e5e5e5] flex items-center">
                            <span className='text-xl'>
                        <FcGoogle />
                            </span>
                        Login with Google
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4 ">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-[#44cc62] hover:underline ">
                        Sign up  
                    </Link>
                </p>
                  <p className="text-end mt-5 cursor-pointer text-sm text-[#f3313b] hover:underline ">Forget Password ?</p>
               

            </div>
        </div>
    );
};

export default Signinpage;