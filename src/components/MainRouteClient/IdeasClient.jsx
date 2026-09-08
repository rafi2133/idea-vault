
"use client";
import React, { useState, useEffect } from 'react';
import IdeaCard from "@/components/IdeaCard";
import { CiFilter } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';

const IdeasClient = () => {
  const [allIdeas, setAllIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch ideas
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch('http://localhost:5000/idea');
        if (!res.ok) throw new Error('Failed to fetch ideas');
        const data = await res.json();
        const ideas = Array.isArray(data) ? data : data.data || [];
        setAllIdeas(ideas);
        setFilteredIdeas(ideas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // Filter ideas when category or search changes
  useEffect(() => {
    let result = allIdeas;

    if (selectedCategory !== 'All') {
      result = result.filter(idea => idea.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(idea =>
        idea.title?.toLowerCase().includes(term) ||
        idea.shortDescription?.toLowerCase().includes(term) ||
        idea.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredIdeas(result);
  }, [selectedCategory, searchTerm, allIdeas]);

  // Get unique categories
  const categories = ['All', ...new Set(allIdeas.map(idea => idea.category).filter(Boolean))];

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading ideas...</p>
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
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore Ideas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Discover innovative ideas from the community
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredIdeas.length} {filteredIdeas.length === 1 ? 'idea' : 'ideas'} found
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search ideas by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:w-48 md:w-56 relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none cursor-pointer appearance-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <CiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategory !== 'All' || searchTerm) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'All' || searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== 'All' && (
            <span className="px-3 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center gap-2">
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory('All')}
                className="hover:text-emerald-900 dark:hover:text-emerald-200"
              >
                ×
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full flex items-center gap-2">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="hover:text-blue-900 dark:hover:text-blue-200"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Grid */}
      {filteredIdeas.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No ideas found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your filters or search terms'
              : 'Be the first to share your innovative idea!'}
          </p>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea._id || idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeasClient;