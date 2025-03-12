import { UserDb, User, toUser } from './user';

export interface CommentDb {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentDbWithRelations extends CommentDb {
  user: UserDb;
}

export interface CommentWithRelations extends Comment {
  user: User;
}

export function toComment(db: CommentDb): Comment {
  return {
    id: db.id,
    content: db.content,
    userId: db.user_id,
    postId: db.post_id,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}

export function toCommentWithRelations(db: CommentDbWithRelations): CommentWithRelations {
  return {
    ...toComment(db),
    user: toUser(db.user)
  };
} 