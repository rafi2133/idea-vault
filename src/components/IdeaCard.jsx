"use client";
import React from 'react';
import Link from 'next/link';
import { FaDollarSign } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';

const IdeaCard = ({ idea }) => {
  // Fallback values if data is missing
  const {
    _id,
    title = 'Untitled Idea',
    shortDescription = 'No description provided',
    category = 'Uncategorized',
    tags = [],
    imageUrl = '',
    estimatedBudget = null,
    targetAudience = 'N/A',
    status = 'pending',
    createdAt = null
  } = idea || {};

  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:scale-[1.02] h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
            <span className="text-6xl">💡</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[56px]">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
          {shortDescription}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-500">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Info Row - Budget & Audience */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1">
            <span><FaDollarSign /></span>
            <span>{estimatedBudget ? `$${estimatedBudget.toLocaleString()}` : 'Budget N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span><FaPeopleGroup /></span>
            <span className="truncate max-w-[100px]">{targetAudience}</span>
          </div>
        </div>

        {/* Date */}
        {formattedDate && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            <SlCalender /> {formattedDate}
          </div>
        )}

        {/* View Details Button */}
        <Link href={`/ideas/${_id}`} className="mt-4">
          <button className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-emerald-500/30 hover:scale-[1.02] transform">
            View Details 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IdeaCard;