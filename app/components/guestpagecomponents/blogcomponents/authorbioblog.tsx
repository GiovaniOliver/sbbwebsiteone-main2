/* eslint-disable @next/next/no-img-element */
// app/components/AuthorBioSection.tsx
import React from 'react';

type Author = {
    name: string;
    bio: string;
    imageUrl: string;
};

type AuthorBioSectionProps = {
    author: Author;
};

const AuthorBioSection: React.FC<AuthorBioSectionProps> = ({ author }) => {
    return (
        <div className="px-10 py-5 bg-gray-100">
            <h2 className="text-2xl font-bold mb-2">About The Author</h2>
            <div className="flex items-center">
                <img src={author.imageUrl} alt={author.name} className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <h3 className="text-xl font-bold">{author.name}</h3>
                    <p>{author.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default AuthorBioSection;
