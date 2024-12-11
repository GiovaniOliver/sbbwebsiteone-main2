import { Post as PrismaPost, User as PrismaUser, PostType } from "@prisma/client";

export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
}

export interface Post extends Omit<PrismaPost, 'authorId' | 'updatedAt'> {
  author: Author;
  likes: { userId: string }[];
  comments?: any[];
  mediaUrls?: string[];
  _count?: {
    likes: number;
    comments: number;
  };
}

export type { PostType }; 