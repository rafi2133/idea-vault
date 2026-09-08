
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const AddIdeaClient = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: '',
    tags: '',
    imageUrl: '',
    estimatedBudget: '',
    targetAudience: '',
    problemStatement: '',
    proposedSolution: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Technology',
    'Health & Wellness',
    'Artificial Intelligence',
    'Education',
    'Finance',
    'Sustainability',
    'Social Impact',
    'Entertainment',
    'E-commerce',
    'Travel',
    'Food & Beverage',
    'Real Estate',
    'Transportation',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Idea title is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!formData.detailedDescription.trim()) newErrors.detailedDescription = 'Detailed description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.problemStatement.trim()) newErrors.problemStatement = 'Problem statement is required';
    if (!formData.proposedSolution.trim()) newErrors.proposedSolution = 'Proposed solution is required';
    if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('📤 Form Data Original:', formData);
    
    setIsSubmitting(true);
    
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const ideaData = {
      ...formData,
      tags: tagsArray,
      estimatedBudget: formData.estimatedBudget
        ? parseFloat(formData.estimatedBudget)
        : null,
      createdAt: new Date().toISOString(),
      status: 'pending',
      userId: session?.user?.id
    };

    try {
      const res = await fetch('http://localhost:5000/idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaData),
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success('Idea added Successfully ');
        router.push('/ideas');
      } else {
        throw new Error(data.message || 'Failed to submit idea');
      }
    } catch (error) {
      console.error('Error submitting idea:', error);
      toast.error(error.message || 'Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user is logged in
  if (!isPending && !session?.user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Please Login</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">You need to be logged in to add an idea</p>
        <button
          onClick={() => router.push('/signin')}
          className="mt-4 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-8">
          <h1 className="text-3xl font-bold text-white">Share Your Idea</h1>
          <p className="text-white/80 mt-2">Fill in the details below to share your innovative idea with the community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Idea Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Idea Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a catchy title for your idea"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief summary of your idea (1-2 sentences)"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.shortDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
              maxLength={200}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formData.shortDescription.length}/200 characters
            </p>
            {errors.shortDescription && <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>}
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              rows={5}
              placeholder="Provide a comprehensive description of your idea..."
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.detailedDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y`}
            />
            {errors.detailedDescription && <p className="mt-1 text-sm text-red-500">{errors.detailedDescription}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags <span className="text-gray-400 text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., AI, Machine Learning, Healthcare"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Separate tags with commas
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Budget <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="Who will benefit from this idea?"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.targetAudience ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
            />
            {errors.targetAudience && <p className="mt-1 text-sm text-red-500">{errors.targetAudience}</p>}
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Problem Statement <span className="text-red-500">*</span>
            </label>
            <textarea
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              rows={3}
              placeholder="What problem does your idea solve?"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.problemStatement ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y`}
            />
            {errors.problemStatement && <p className="mt-1 text-sm text-red-500">{errors.problemStatement}</p>}
          </div>

          {/* Proposed Solution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Proposed Solution <span className="text-red-500">*</span>
            </label>
            <textarea
              name="proposedSolution"
              value={formData.proposedSolution}
              onChange={handleChange}
              rows={3}
              placeholder="How does your idea solve the problem?"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.proposedSolution ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y`}
            />
            {errors.proposedSolution && <p className="mt-1 text-sm text-red-500">{errors.proposedSolution}</p>}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Idea '
              )}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIdeaClient;