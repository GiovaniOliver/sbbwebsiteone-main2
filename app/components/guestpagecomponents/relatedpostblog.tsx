"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type RelatedPost = {
    id: string;
    title: string;
    excerpt?: string;
    imageUrl?: string;
};

type RelatedPostsSectionProps = {
    posts: RelatedPost[];
};

const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = ({ posts }) => {
    return (
        <div className="px-4 py-16 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="h-48 w-full relative">
                                <Image 
                                    src={post.imageUrl || '/images/sbblogo.png'} 
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                {post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}
                                <Link href={`/blog/${post.id}`} className="inline-block">
                                    <span className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedPostsSection;
