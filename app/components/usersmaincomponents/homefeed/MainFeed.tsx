'use client'

import { useCallback } from 'react';
import { usePosts } from '@/lib/hooks/usePosts';
import Post from './Post';
import { useUser } from '@/lib/hooks/useUser';
import { Skeleton } from './ui/skeleton';
import CreatePost from './CreatePost';

export default function MainFeed() {
  const { data: user } = useUser();
  const { posts, isLoading, error, fetchPosts, createPost, likePost, unlikePost } = usePosts();

  const handlePostCreated = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading posts: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {user && <CreatePost 
        onPostCreated={handlePostCreated} 
        createPost={async (content, type, mediaUrl) => {
          await createPost({ content, type, mediaUrl });
        }} 
      />}
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 space-y-4 bg-white rounded-lg shadow animate-pulse">
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
        <div className="p-8 text-gray-500 text-center bg-white rounded-lg shadow">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="text-sm">Be the first to share something with the community!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={async (postId) => {
                if (post.isLiked) {
                  await unlikePost(postId);
                } else {
                  await likePost(postId);
                }
              } } onUnlike={function (postId: string): Promise<void> {
                throw new Error('Function not implemented.');
              } }            />
          ))}
        </div>
      )}
    </div>
  );
} 