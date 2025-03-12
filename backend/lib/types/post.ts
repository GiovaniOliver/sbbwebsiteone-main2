import { CommentDb, toComment } from './comment';
import { Comment } from './comment';
import { UserDb, User, toUser } from './user';

export type PostType = 'text' | 'image' | 'video' | 'article';
export type PostVisibility = 'public' | 'friends' | 'private';
export type PostStatus = 'active' | 'deleted' | 'hidden';

export interface PostDb {
  id: string;
  user_id: string | null;
  content: string | null;
  media_url: string | null;
  post_type: PostType;
  visibility: PostVisibility;
  status: PostStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: string;
  userId: string | null;
  content: string | null;
  mediaUrl: string | null;
  type: PostType;
  visibility: PostVisibility;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDbWithRelations extends PostDb {
  author: UserDb;
  likes: { user_id: string }[];
  comments: CommentDb[];
}

export interface PostWithRelations extends Post {
  author: User;
  likes: { userId: string }[];
  comments: Comment[];
}

export type CreatePostInput = {
  content: string | null;
  media_url?: string | null;
  post_type: PostType;
  visibility?: PostVisibility;
  user_id: string;
};

export function toPost(db: PostDb): Post {
  return {
    id: db.id,
    userId: db.user_id,
    content: db.content,
    mediaUrl: db.media_url,
    type: db.post_type,
    visibility: db.visibility,
    status: db.status,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}

export function toPostWithRelations(db: PostDbWithRelations): PostWithRelations {
  return {
    ...toPost(db),
    author: toUser(db.author),
    likes: db.likes.map(like => ({ userId: like.user_id })),
    comments: db.comments.map(toComment)
  };
} 