// app/error.jsx
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaRedo, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = ({ error, reset }) => {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"></div>
          <div className="relative w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
            <FaExclamationTriangle className="text-5xl text-white" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>

        {/* Error Details (Optional - for development) */}
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left overflow-auto max-h-40">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap">
              {error.stack}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Try Again Button */}
          <button
            onClick={() => reset?.() || window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
          >
            <FaRedo /> Try Again
          </button>

          {/* Go Home Button */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <FaHome /> Go Home
          </Link>
        </div>

        {/* Support Message */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;