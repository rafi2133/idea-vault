// app/myideas/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const MyIdeaPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const userId = session?.user?.id;

  // Fetch user's ideas
  useEffect(() => {
    if (!isPending && !userId) {
      setLoading(false);
      return;
    }

    if (userId) {
      fetchUserIdeas();
    }
  }, [userId, isPending]);

  const fetchUserIdeas = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/idea/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch your ideas');
      const data = await res.json();
      setIdeas(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load your ideas');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (ideaId) => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    
    try {
      setDeletingId(ideaId);
      
      const res = await fetch(`http://localhost:5000/idea/${ideaId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete idea');
      }
      
      setIdeas(ideas.filter(idea => idea._id !== ideaId));
      toast.success('Idea deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.message || 'Failed to delete idea');
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-5xl text-emerald-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {isPending ? 'Checking session...' : 'Loading your ideas...'}
          </p>
        </div>
      </div>
    );
  }

  // ❌ Not logged in - Show Login Card
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-8 text-center">
            <div className="text-5xl mb-3">🔒</div>
            <h2 className="text-2xl font-bold text-white">Login Required</h2>
            <p className="text-white/80 mt-1">Please sign in to view your ideas</p>
          </div>
          
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FaLightbulb className="text-4xl text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              You're not logged in
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Login to access your ideas, create new ones, and collaborate with the community.
            </p>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform"
            >
              Login Now →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Failed to load ideas
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{error}</p>
        <button
          onClick={fetchUserIdeas}
          className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Ideas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all your submitted ideas in one place
          </p>
        </div>
        <Link
          href="/addidea"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform"
        >
          <FaPlus /> New Idea
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Ideas</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{ideas.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
          <p className="text-2xl font-bold text-green-600">
            {ideas.filter(i => i.status === 'published').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {ideas.filter(i => i.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* No Ideas - Create First Idea Card */}
      {ideas.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-xl"></div>
            <div className="relative w-32 h-32 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-6xl">💡</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No ideas yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            You haven't created any ideas yet. Share your first innovative idea with the community and get feedback!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/addidea"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform"
            >
              <FaPlus /> Create Your First Idea
            </Link>
            <Link
              href="/ideas"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Explore Ideas →
            </Link>
          </div>
        </div>
      ) : (
        /* Ideas Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {idea.imageUrl ? (
                  <Image
                    src={idea.imageUrl}
                    alt={idea.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                    <span className="text-5xl">💡</span>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-lg ${
                    idea.status === 'published'
                      ? 'bg-green-500 text-white'
                      : idea.status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {idea.status || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 flex-1">
                    {idea.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {idea.shortDescription}
                </p>

                {/* Category & Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                    {idea.category}
                  </span>
                  {idea.tags?.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {idea.tags?.length > 2 && (
                    <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-500">
                      +{idea.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Budget & Audience */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-800">
                  <span>💰 {idea.estimatedBudget ? `$${idea.estimatedBudget.toLocaleString()}` : 'N/A'}</span>
                  <span>👥 {idea.targetAudience ? idea.targetAudience.split(',')[0] : 'N/A'}</span>
                </div>

                {/* Action Buttons - Edit & Delete */}
                <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    href={`/editidea/${idea._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(idea._id)}
                    disabled={deletingId === idea._id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === idea._id ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeaPage;