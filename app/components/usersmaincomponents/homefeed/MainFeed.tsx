'use client'

import { useCallback, useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import Post from './Post';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/app/components/ui/skeleton';
import CreatePost from './CreatePost';
import { useInView } from 'react-intersection-observer';
import StoriesList from './StoriesList';
import { ErrorBoundary } from 'react-error-boundary';

interface MainFeedProps {
  userId?: string;
}

interface Post {
  id: string;
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

function FeedErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-500 bg-red-50 rounded-lg">
      <p className="font-medium">Error loading feed:</p>
      <p className="text-sm">{error.message}</p>
    </div>
  );
}

export default function MainFeed({ userId }: MainFeedProps) {
  const { user, isLoading: userLoading } = useUser();
  const { 
    posts, 
    isLoading: postsLoading, 
    error,
    createPost, 
    updatePost,
    deletePost,
    likePost, 
    unlikePost,
    bookmarkPost,
    removeBookmark,
    hasMore,
    fetchNextPage 
  } = usePosts(userId);

  // Set up infinite scroll
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !postsLoading) {
      fetchNextPage();
    }
  }, [inView, hasMore, postsLoading, fetchNextPage]);

  const handlePostCreated = useCallback(() => {
    // Invalidation is handled by the mutation
  }, []);

  if (error) {
    return <FeedErrorFallback error={error} />;
  }

  const isLoading = userLoading || postsLoading;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Stories Section */}
      {!userId && (
        <ErrorBoundary fallback={<div className="text-red-500">Error loading stories</div>}>
          <StoriesList />
        </ErrorBoundary>
      )}

      {/* Create Post Section */}
      {!userLoading && user && !userId && (
        <div className="sticky top-[4.5rem] z-10 bg-[#0B1218] pt-4 pb-2">
          <CreatePost 
            onPostCreated={handlePostCreated} 
            createPost={async (content: string, type: string, mediaUrl?: string) => {
              await createPost({ content, type, mediaUrl });
            }} 
          />
        </div>
      )}
      
      {/* Posts Feed */}
      <div className="space-y-4">
        {isLoading && (!posts || posts.length === 0) ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 space-y-4 bg-[#1B2730] rounded-lg shadow animate-pulse">
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
          <div className="p-8 text-gray-400 text-center bg-[#1B2730] rounded-lg shadow">
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm">
              {userId ? "This user hasn't posted anything yet." : "Be the first to share something with the community!"}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {posts.map((post) => (
                <ErrorBoundary key={post.id} fallback={<div className="text-red-500">Error loading post</div>}>
                  <Post
                    post={post}
                    onLike={likePost}
                    onUnlike={unlikePost}
                    onUpdate={(postId: string, content: string) => updatePost({ postId, content })}
                    onDelete={deletePost}
                    onBookmark={bookmarkPost}
                    onRemoveBookmark={removeBookmark}
                  />
                </ErrorBoundary>
              ))}
            </div>
            
            {/* Loading indicator */}
            <div ref={ref} className="py-4">
              {postsLoading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
