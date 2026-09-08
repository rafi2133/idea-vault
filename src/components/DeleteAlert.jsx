"use client";
import React, { useState } from 'react';
import { FaTimes, FaTrash, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DeleteAlert = ({ isOpen, onClose, idea, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/idea/${idea._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: idea.userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete idea');
      }

      toast.success('Idea deleted successfully!');
      onDelete(idea._id);
      onClose();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete idea');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Delete Idea</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <FaTrash className="text-4xl text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Are you sure?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              You are about to delete:
            </p>
            <p className="font-semibold text-gray-900 dark:text-white mb-4">
              "{idea?.title}"
            </p>
            <p className="text-sm text-red-500 dark:text-red-400 mb-6">
              ⚠️ This action cannot be undone!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" /> Deleting...
                </span>
              ) : (
                'Yes, Delete It'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;