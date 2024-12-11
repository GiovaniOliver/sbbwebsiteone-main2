'use client'

import { useEffect } from 'react';
import { usePosts } from '@/lib/hooks/usePosts';
import Post from './Post';
import { useUser } from '@/lib/hooks/useUser';
import { Skeleton } from '../../ui/skeleton';
import CreatePost from './CreatePost';

export default function MainFeed() {
  const { user } = useUser();
  const { posts, isLoading, error, fetchPosts, createPost, likePost, unlikePost } = usePosts();

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, fetchPosts]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CreatePost onPostCreated={fetchPosts} />
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 space-y-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : !posts || posts.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">
          No posts yet. Be the first to post!
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={likePost}
              onUnlike={unlikePost}
            />
          ))}
        </div>
      )}
    </div>
  );
} 