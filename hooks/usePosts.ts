'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../backend/lib/types/supabase';
import { PostWithRelations, toPostWithRelations } from '../backend/lib/types/post';

export function usePosts(userId?: string) {
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<PostWithRelations[], Error, { pages: PostWithRelations[][] }, [string, string?], number>({
    queryKey: ['posts', userId],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:users!posts_user_id_fkey(*),
          likes(user_id),
          comments(*)
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data: posts, error } = await query
        .range(pageParam * 10, (pageParam + 1) * 10 - 1);

      if (error) throw error;
      if (!posts) return [];

      return posts.map(toPostWithRelations);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async ({ content, type, mediaUrl }: { content: string, type: string, mediaUrl?: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('posts')
        .insert({
          content,
          type,
          media_url: mediaUrl,
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

  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string, content: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('posts')
        .update({ content })
        .eq('id', postId)
        .eq('user_id', session.user.id) // Ensure user owns the post
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
        .eq('user_id', session.user.id); // Ensure user owns the post

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
        .from('likes')
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
        .from('likes')
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

  const removeBookmarkMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('bookmarks')
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

  const posts = data?.pages.flat() ?? [];
  const hasMore = hasNextPage ?? false;

  return {
    posts,
    isLoading,
    error,
    hasMore,
    fetchNextPage: () => {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    },
    createPost: createPostMutation.mutateAsync,
    updatePost: updatePostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
    likePost: likePostMutation.mutateAsync,
    unlikePost: unlikePostMutation.mutateAsync,
    bookmarkPost: bookmarkPostMutation.mutateAsync,
    removeBookmark: removeBookmarkMutation.mutateAsync
  };
}
