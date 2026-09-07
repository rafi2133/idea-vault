import Image from 'next/image';
import Link from 'next/link';
import { AiTwotoneLike } from 'react-icons/ai';
import { FaDollarSign } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/idea/${id}`);
    const idea = await res.json();

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
                    {/* Status Badge */}

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
                            <span className="text-sm text-gray-500 dark:text-gray-400"><FaDollarSign></FaDollarSign> Estimated Budget</span>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {idea.estimatedBudget ? `$${idea.estimatedBudget.toLocaleString()}` : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400"><FaPeopleGroup /> Target Audience</span>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {idea.targetAudience || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className=" mt-4 ">
                        <div className="border-2 p-2">
                            Current Comments
                        </div>
                        <div className=" flex justify-between my-2">
                            <button className='p-2 border text-xl'><AiTwotoneLike /></button>
                            <p className='text-gray-700 text-3xl'>0Likes</p>
                        </div>
                        <fieldset className="fieldset ">
                            <textarea className="textarea border-2 border-[#cce0df] bg-white h-24" placeholder="Your Comment..."></textarea>
                        </fieldset>
                        <button className='btn'>Post</button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default IdeaDetailsPage;