
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaSpinner, FaUser, FaEnvelope, FaImage, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const ProfileClient = () => {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: ''
  });

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/signin');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        image: user.image || ''
      });
      setLoading(false);
    }
  }, [user, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image || undefined,
      });

      if (error) {
        throw new Error(error.message || 'Failed to update profile');
      }

      await refetch();
      toast.success('Profile updated successfully! 🎉');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-5xl text-emerald-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Please Login</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">You need to be logged in to view your profile</p>
        <Link href="/signin" className="mt-4 inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-8 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden mx-auto">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt={formData.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <FaUser className="text-4xl text-white" />
                </div>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">My Profile</h1>
          <p className="text-white/80 text-sm">Manage your account details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Email cannot be changed</p>
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image URL
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <FaImage />
              </span>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Enter a URL for your profile picture</p>
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{formData.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" /> Updating...
                </span>
              ) : (
                'Update Profile ✏️'
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileClient;