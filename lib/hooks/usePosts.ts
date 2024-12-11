import { useCallback, useState } from 'react';
import { useUser } from './useUser';
import { Post, PostType } from '../types';

interface UsePostsOptions {
  initialPosts?: Post[];
}

export function usePosts({ initialPosts = [] }: UsePostsOptions = {}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchPosts = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createPost = useCallback(async (content: string, type: PostType = 'text', mediaUrl?: string) => {
    if (!user) return;

    try {
      setError(null);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, type, mediaUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      setPosts(prevPosts => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      return null;
    }
  }, [user]);

  const likePost = useCallback(async (postId: string) => {
    if (!user) return;

    try {
      setError(null);
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const updatedPost: Post = {
              ...post,
              likes: [...post.likes, { userId: user.id }],
              _count: {
                ...post._count,
                likes: (post._count?.likes ?? 0) + 1,
                comments: post._count?.comments ?? 0,
              },
            };
            return updatedPost;
          }
          return post;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like post');
    }
  }, [user]);

  const unlikePost = useCallback(async (postId: string) => {
    if (!user) return;

    try {
      setError(null);
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to unlike post');
      }

      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const updatedPost: Post = {
              ...post,
              likes: post.likes.filter((like: { userId: string }) => like.userId !== user.id),
              _count: {
                ...post._count,
                likes: Math.max((post._count?.likes ?? 1) - 1, 0),
                comments: post._count?.comments ?? 0,
              },
            };
            return updatedPost;
          }
          return post;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlike post');
    }
  }, [user]);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    likePost,
    unlikePost,
  };
} 