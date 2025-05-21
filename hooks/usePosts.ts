'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../backend/lib/types/supabase';
import { PostWithRelations, toPostWithRelations } from '../backend/lib/types/post';
import { getSupabaseClient } from './useSupabase';
import { logDebug, logError } from '@/lib/logger';

const PAGE_SIZE = 5;

// Define types for post data from Supabase
type PostData = {
  id: string;
  content: string;
  type: string;
  media_url?: string;
  author_id: string;
  created_at: string;
  users: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
  };
  likes: {
    id: string;
    user_id: string;
  }[];
  comments: {
    count: number;
  };
};

export function usePosts(userId?: string) {
  const supabase = getSupabaseClient();
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', userId],
    queryFn: async ({ pageParam }) => {
      logDebug('usePosts', 'Fetching posts page', { pageParam, userId });
      
      try {
        let query = supabase
          .from('posts')
          .select(`
            *,
            users:author_id (id, username, first_name, last_name, avatar_url),
            likes:post_likes (user_id),
            comments:post_comments (count)
          `)
          .order('created_at', { ascending: false })
          .range((pageParam as number) * PAGE_SIZE, (pageParam as number + 1) * PAGE_SIZE - 1);
          
        if (userId) {
          query = query.eq('author_id', userId);
        }
        
        // Log the generated query for debugging
        console.log('Query:', query);
        
        const response = await query;
        const { data, error } = response;
        
        // Log the response for debugging
        console.log('Response:', JSON.stringify(response, null, 2));
        
        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }
        
        if (!data) {
          console.warn('No data returned from query');
          return [];
        }
        
        logDebug('usePosts', 'Fetched posts successfully', { count: data.length });
        return data as PostData[];
      } catch (err) {
        console.error('Error in usePosts queryFn:', err);
        logError('usePosts', 'Error fetching posts', err);
        throw err;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: PostData[], allPages: PostData[][]) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async ({ content, type, mediaUrl }: { content: string, type: string, mediaUrl?: string }) => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error('Not authenticated');

        // Ensure we have a valid user ID
        const userId = session.user.id;
        if (!userId) {
          throw new Error('User ID is missing');
        }

        logDebug('usePosts', 'Creating post as user', { userId, type });

        // Prepare post data with appropriate fields based on type
        const postData: any = {
          content,
          type,
          author_id: userId
        };

        // Handle different post types
        if (mediaUrl) {
          if (type === 'image' || type === 'video') {
            postData.images = [mediaUrl];
          } else if (type === 'article') {
            // If it's an article, extract title from first line or first sentence
            const title = content.split('\n')[0] || content.split('.')[0] || 'Untitled Article';
            postData.title = title.substring(0, 100); // Limit title length
          }
        }

        logDebug('usePosts', 'Creating post with data', postData);

        // Check if the user exists in the profiles table first
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', userId)
          .single();

        if (profileError) {
          logError('usePosts', 'Error checking profile', profileError);
          
          // If the profile doesn't exist, we need to create it
          if (profileError.code === 'PGRST116') {
            logDebug('usePosts', 'Profile not found, creating profile first');
            const { error: createProfileError } = await supabase
              .from('profiles')
              .insert({
                id: userId,
                username: session.user.email?.split('@')[0] || 'user',
                first_name: '',
                last_name: '',
                email: session.user.email || '',
              });

            if (createProfileError) {
              logError('usePosts', 'Error creating profile', createProfileError);
              throw new Error(`Failed to create user profile: ${createProfileError.message}`);
            }
          } else {
            throw new Error(`Failed to verify user profile: ${profileError.message}`);
          }
        }

        // Now create the post
        const { data, error } = await supabase
          .from('posts')
          .insert(postData)
          .select()
          .single();

        if (error) {
          // Check if it's an RLS error
          if (error.message?.includes('row-level security')) {
            logError('usePosts', 'Row-level security error', error);
            throw new Error(`Permission denied: ${error.message}. Ensure you're logged in and have permission to post.`);
          } else {
            logError('usePosts', 'Error creating post', error);
            throw new Error(`Database error: ${error.message}`);
          }
        }
        
        if (!data) {
          throw new Error('No data returned from post creation');
        }
        
        return data;
      } catch (error) {
        logError('usePosts', 'Error in createPostMutation', error);
        // Rethrow with more context
        if (error instanceof Error) {
          throw new Error(`Post creation failed: ${error.message}`);
        } else {
          throw new Error('Unknown error during post creation');
        }
      }
    },
    onSuccess: (data) => {
      logDebug('usePosts', 'Post created successfully', data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      logError('usePosts', 'Mutation error creating post', error);
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string, content: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('posts')
        .update({ content })
        .eq('id', postId)
        .eq('author_id', session.user.id) // Ensure user owns the post
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('author_id', session.user.id); // Ensure user owns the post

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const likePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('post_likes')
        .insert({
          post_id: postId,
          user_id: session.user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const unlikePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('post_likes')
        .delete()
        .match({
          post_id: postId,
          user_id: session.user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const bookmarkPostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookmarks')
        .insert({
          content_id: postId,
          content_type: 'post',
          user_id: session.user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .match({
          content_id: postId,
          content_type: 'post',
          user_id: session.user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const posts = data?.pages.flat() || [];
  
  return {
    posts,
    fetchNextPage,
    hasNextPage,
    hasMore: hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    createPost: createPostMutation.mutateAsync,
    updatePost: updatePostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
    likePost: likePostMutation.mutateAsync,
    unlikePost: unlikePostMutation.mutateAsync,
    bookmarkPost: bookmarkPostMutation.mutateAsync,
    removeBookmark: removeBookmarkMutation.mutateAsync
  };
}
