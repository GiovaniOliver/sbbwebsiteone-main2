import { Database } from './supabase';

// Basic post type from the database
export type Post = Database['public']['Tables']['posts']['Row'];

// Profile type for author information
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Types for comments and likes if needed
export type PostComment = Database['public']['Tables']['post_comments']['Row'];
export type PostLike = Database['public']['Tables']['post_likes']['Row'];

/**
 * Extended post type with author and other related information
 */
export interface PostWithRelations extends Omit<Post, 'author_id'> {
  author: Profile;
  isLiked?: boolean;
  likes_count: number;
  comments_count: number;
  comments?: PostComment[];
}

/**
 * Transform a post with joined author data into a PostWithRelations object
 */
export function toPostWithRelations(
  post: Post & { profiles: Profile, liked?: boolean }
): PostWithRelations {
  return {
    id: post.id,
    content: post.content,
    images: post.images,
    type: post.type,
    status: post.status,
    visibility: post.visibility,
    created_at: post.created_at,
    updated_at: post.updated_at,
    author: post.profiles,
    isLiked: post.liked || false,
    likes_count: post.likes_count,
    comments_count: post.comments_count,
  };
}

/**
 * Transform an array of posts with joined data into PostWithRelations objects
 */
export function toPostsWithRelations(
  posts: (Post & { profiles: Profile, liked?: boolean })[]
): PostWithRelations[] {
  return posts.map(toPostWithRelations);
} 