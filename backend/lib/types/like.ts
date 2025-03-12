import { UserDb, User, toUser } from './user';
import { PostDb, Post, toPost } from './post';

export interface LikeDb {
  id: string;
  post_id: string | null;
  user_id: string | null;
  created_at: Date;
}

export interface Like {
  id: string;
  postId: string | null;
  userId: string | null;
  createdAt: Date;
}

export interface LikeDbWithRelations extends LikeDb {
  user: UserDb;
  post: PostDb;
}

export interface LikeWithRelations extends Like {
  user: User;
  post: Post;
}

export function toLike(db: LikeDb): Like {
  return {
    id: db.id,
    postId: db.post_id,
    userId: db.user_id,
    createdAt: db.created_at
  };
}

export function toLikeWithRelations(db: LikeDbWithRelations): LikeWithRelations {
  return {
    ...toLike(db),
    user: toUser(db.user),
    post: toPost(db.post)
  };
} 