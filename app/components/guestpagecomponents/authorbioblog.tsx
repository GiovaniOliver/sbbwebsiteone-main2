"use client";

import Image from 'next/image';
import React from 'react';

type Author = {
    name: string;
    bio: string;
    imageUrl: string;
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
};

type AuthorBioSectionProps = {
    author: Author;
};

const AuthorBioSection: React.FC<AuthorBioSectionProps> = ({ author }) => {
    return (
        <div className="px-4 py-16 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">About The Author</h2>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 relative rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                            <img 
                                src={author.imageUrl} 
                                alt={author.name} 
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold mb-3">{author.name}</h3>
                            <p className="text-gray-700 mb-4">{author.bio}</p>
                            
                            {author.socialLinks && (
                                <div className="flex justify-center md:justify-start space-x-4">
                                    {author.socialLinks.twitter && (
                                        <a 
                                            href={author.socialLinks.twitter} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700"
                                            aria-label="Twitter"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                    )}
                                    
                                    {author.socialLinks.linkedin && (
                                        <a 
                                            href={author.socialLinks.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:text-blue-900"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    )}
                                    
                                    {author.socialLinks.website && (
                                        <a 
                                            href={author.socialLinks.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-700 hover:text-gray-900"
                                            aria-label="Website"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorBioSection;
