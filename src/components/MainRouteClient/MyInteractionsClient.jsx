
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSpinner, FaHeart, FaComment, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const MyInteractionsClient = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!isPending && !userId) {
      setLoading(false);
      return;
    }

    if (userId) {
      fetchInteractions();
    }
  }, [userId, isPending]);

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/idea/interactions/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch interactions');
      const data = await res.json();
      setInteractions(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load interactions');
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-5xl text-emerald-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {isPending ? 'Checking session...' : 'Loading interactions...'}
          </p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-8 text-center">
            <div className="text-5xl mb-3">🔒</div>
            <h2 className="text-2xl font-bold text-white">Login Required</h2>
            <p className="text-white/80 mt-1">Please sign in to view your interactions</p>
          </div>
          <div className="p-8 text-center">
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Failed to load interactions
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{error}</p>
        <button
          onClick={fetchInteractions}
          className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Interactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ideas you've liked or commented on
          </p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {interactions.length} interactions
        </span>
      </div>

      {interactions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <FaLightbulb className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No interactions yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Like or comment on ideas to see them here!
          </p>
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Explore Ideas →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interactions.map((item) => (
            <div
              key={item.ideaId}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <div className="flex h-32">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                      <span className="text-3xl">💡</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-hidden">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {item.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaHeart className={item.hasLiked ? 'text-red-500' : ''} />
                        {item.likeCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment />
                        {item.commentCount}
                      </span>
                    </div>
                  </div>
                  {item.userComments.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      💬 "{item.userComments[0].comment}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInteractionsClient;