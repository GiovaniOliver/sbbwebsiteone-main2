"use client";

import React from 'react';

type Comment = {
    id: string;
    author: string;
    content: string;
    avatarUrl?: string;
    date?: string;
};

type CommentsSectionProps = {
    comments: Comment[];
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
    return (
        <div className="px-4 py-16 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Comments</h2>
                
                <div className="space-y-6 mb-12">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mr-4">
                                    {comment.avatarUrl ? (
                                        <img 
                                            src={comment.avatarUrl} 
                                            alt={comment.author} 
                                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-700 font-semibold text-lg">
                                                {comment.author.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <h3 className="text-lg font-semibold">{comment.author}</h3>
                                        {comment.date && (
                                            <span className="text-sm text-gray-500 mt-1 sm:mt-0">{comment.date}</span>
                                        )}
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Your email"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="comment">
                                Comment
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Share your thoughts..."
                                rows={4}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                        >
                            Submit Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentsSection;
