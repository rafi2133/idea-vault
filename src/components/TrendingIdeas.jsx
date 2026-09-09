"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TrendingIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchTrendingIdeas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea?limit=6`);
        if (!res.ok) throw new Error('Failed to fetch trending ideas');
        const data = await res.json();
        const ideasData = Array.isArray(data) ? data : data.data || [];
        const sortedIdeas = ideasData.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setIdeas(sortedIdeas.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingIdeas();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">Loading amazing ideas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😅</div>
        <p className="text-gray-600 dark:text-gray-400">Failed to load trending ideas</p>
      </div>
    );
  }

  if (ideas.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background with gradient orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl animate-pulse">🔥</span>
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                Trending Now
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Trending Ideas
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Discover the most innovative concepts from our community
            </p>
          </div>
          <Link
            href="/ideas"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              View All Ideas
            </span>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea, index) => (
            <div
              key={idea._id || idea.id}
              className="group relative animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:scale-105"></div>
              
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {idea.imageUrl ? (
                    <Image
                      src={idea.imageUrl}
                      alt={idea.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <span className="text-6xl animate-float">💡</span>
                    </div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-xs font-semibold bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white rounded-full shadow-lg">
                      {idea.category || 'Uncategorized'}
                    </span>
                  </div>

                  {/* Trending badge */}
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-500 text-white rounded-full shadow-lg">
                      <span className="animate-pulse">●</span>
                      Trending
                    </span>
                  </div>

                  {/* Stats overlay at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {Math.floor(Math.random() * 50) + 10}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {Math.floor(Math.random() * 30) + 5}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {idea.title || 'Untitled Idea'}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                    {idea.shortDescription || 'No description provided'}
                  </p>

                  {/* Tags */}
                  {idea.tags && idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {idea.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                      {idea.tags.length > 3 && (
                        <span className="px-2.5 py-1 text-xs text-gray-500 dark:text-gray-500">
                          +{idea.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white dark:bg-gray-900 text-xs text-gray-400">✦</span>
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                      <span>💰</span>
                      <span className="font-medium">{idea.estimatedBudget ? `$${idea.estimatedBudget.toLocaleString()}` : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full">
                      <span>👥</span>
                      <span className="truncate max-w-[80px] font-medium">{idea.targetAudience ? idea.targetAudience.split(',')[0] : 'N/A'}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link href={`/ideas/${idea._id || idea.id}`}>
                    <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transform group/btn relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View Details
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      {/* Button shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TrendingIdeas;