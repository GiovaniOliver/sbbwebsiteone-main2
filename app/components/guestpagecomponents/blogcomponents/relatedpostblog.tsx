import Link from 'next/link';
// app/components/RelatedPostsSection.tsx
import React from 'react';

type RelatedPost = {
    id: string;
    title: string;
};

type RelatedPostsSectionProps = {
    posts: RelatedPost[];
};

const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = ({ posts }) => {
    return (
        <div className="px-10 py-5 bg-gray-100">
            <h2 className="text-2xl font-bold mb-2">Related Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`}>
                            <div className="text-blue-500 hover:underline">{post.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedPostsSection;
