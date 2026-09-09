// components/MainRouteClient/IdeaDetailsClient.jsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { FaDollarSign, FaSpinner } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';

const IdeaDetailsClient = ({ idea: initialIdea }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.name;
  const userImage = session?.user?.image;

  const [idea, setIdea] = useState(initialIdea);
  const [liked, setLiked] = useState(initialIdea?.likes?.includes(userId) || false);
  const [likeCount, setLikeCount] = useState(initialIdea?.likes?.length || 0);
  const [comments, setComments] = useState(initialIdea?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!idea) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Idea not found</h2>
        <Link href="/ideas" className="mt-4 inline-block text-emerald-500 hover:text-emerald-600">
          Back to Ideas
        </Link>
      </div>
    );
  }

  // Handle Like/Unlike
  const handleLike = async () => {
    if (!userId) {
      toast.error('Please login to like this idea');
      router.push('/signin');
      return;
    }
 
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
         
         },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (res.ok) {
        setLiked(data.liked);
        setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (!userId) {
      toast.error('Please login to comment');
      router.push('/signin');
      return;
    }

    setSubmitting(true);

     
     
    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
       
        },
        body: JSON.stringify({
          userId,
          userName,
          userImage,
          comment: newComment.trim()
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments([data.comment, ...comments]);
        setNewComment('');
        toast.success('Comment added!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <Link
        href="/ideas"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Ideas
      </Link>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-96">
          {idea.imageUrl ? (
            <Image
              src={idea.imageUrl}
              alt={idea.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
              <span className="text-8xl">💡</span>
            </div>
          )}
         
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
              {idea.category || 'Uncategorized'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              📅 {new Date(idea.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {idea.title}
          </h1>

          {/* Tags */}
          {idea.tags && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {idea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Short Description */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-emerald-500">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {idea.shortDescription}
            </p>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Detailed Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {idea.detailedDescription}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Problem Statement
            </h2>
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-gray-700 dark:text-gray-300">
                {idea.problemStatement}
              </p>
            </div>
          </div>

          {/* Proposed Solution */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Proposed Solution
            </h2>
            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-gray-700 dark:text-gray-300">
                {idea.proposedSolution}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FaDollarSign /> Estimated Budget
              </span>
              <p className="font-semibold text-gray-900 dark:text-white">
                {idea.estimatedBudget ? `$${idea.estimatedBudget.toLocaleString()}` : 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FaPeopleGroup /> Target Audience
              </span>
              <p className="font-semibold text-gray-900 dark:text-white">
                {idea.targetAudience || 'N/A'}
              </p>
            </div>
          </div>

          {/* Likes & Comments Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            {/* Likes */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  liked 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {liked ? (
                  <AiTwotoneLike className="text-xl" />
                ) : (
                  <AiOutlineLike className="text-xl" />
                )}
                <span className="font-medium">{likeCount}</span>
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {comments.length} comments
              </span>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comments
              </h3>

              {/* Comment Input */}
              <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Your Comment..."
                  className="flex-1 textarea border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 h-20 resize-y focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? <FaSpinner className="animate-spin" /> : 'Post'}
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3 mt-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex-shrink-0">
                        {comment.userImage ? (
                          <Image
                            src={comment.userImage}
                            alt={comment.userName}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {comment.userName?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {comment.userName || 'Anonymous'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsClient;