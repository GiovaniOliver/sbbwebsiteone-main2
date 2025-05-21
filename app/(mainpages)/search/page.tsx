'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
  _count: {
    followers: number;
    posts: number;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author: User;
  _count: {
    likes: number;
    comments: number;
  };
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  created_at: string;
  seller: User;
}

interface Shop {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  cover_image: string | null;
  category: string;
  owner: User;
  _count: {
    products: number;
    followers: number;
  };
}

interface Hashtag {
  id: string;
  name: string;
  post_count: number;
}

interface SearchResults {
  users?: User[];
  posts?: Post[];
  products?: Product[];
  shops?: Shop[];
  hashtags?: Hashtag[];
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResults>({});
  const query = searchParams.get('q') || '';

  const renderUserResults = () => {
    if (!results.users?.length) return null;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Users</h2>
        {results.users.map(user => (
          <div key={user.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
            {user.image_url && (
              <Image
                src={user.image_url}
                alt={user.username}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="font-medium">{user.username}</h3>
              <p className="text-sm text-gray-500">
                {user._count.followers} followers · {user._count.posts} posts
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPostResults = () => {
    if (!results.posts?.length) return null;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        {results.posts.map(post => (
          <div key={post.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-2">
              {post.author.image_url && (
                <Image
                  src={post.author.image_url}
                  alt={post.author.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{post.author.username}</span>
            </div>
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              {post._count.likes} likes · {post._count.comments} comments
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProductResults = () => {
    if (!results.products?.length) return null;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Products</h2>
        {results.products.map(product => (
          <div key={product.id} className="p-4 bg-white rounded-lg shadow">
            {product.images[0] && (
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-lg mb-2"
              />
            )}
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold mt-2">${product.price}</p>
            <div className="mt-2 text-sm text-gray-500">
              Sold by {product.seller.username}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderShopResults = () => {
    if (!results.shops?.length) return null;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shops</h2>
        {results.shops.map(shop => (
          <div key={shop.id} className="p-4 bg-white rounded-lg shadow">
            {shop.cover_image && (
              <div className="relative h-32 mb-4">
                <Image
                  src={shop.cover_image}
                  alt={shop.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex items-center space-x-4">
              {shop.logo && (
                <Image
                  src={shop.logo}
                  alt={shop.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium">{shop.name}</h3>
                <p className="text-gray-600">{shop.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {shop._count.products} products · {shop._count.followers} followers
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHashtagResults = () => {
    if (!results.hashtags?.length) return null;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Hashtags</h2>
        {results.hashtags.map(hashtag => (
          <div key={hashtag.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">#{hashtag.name}</h3>
            <p className="text-sm text-gray-500">
              {hashtag.post_count} posts
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {renderUserResults()}
        {renderPostResults()}
        {renderProductResults()}
        {renderShopResults()}
        {renderHashtagResults()}
      </div>
    </div>
  );
} 