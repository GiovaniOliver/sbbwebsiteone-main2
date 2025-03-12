import { getDb } from '../../database/db'
import { Post, PostWithAuthor, CreatePostInput } from '../../lib/types/post'
import { v4 as uuidv4 } from 'uuid'

export async function createPost(input: CreatePostInput, authorId: string): Promise<Post> {
  const db = await getDb()
  const id = uuidv4()
  const now = new Date().toISOString()

  await db.run(
    `INSERT INTO posts (id, content, type, media_url, author_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, input.content, input.type || 'POST', input.mediaUrl, authorId, now, now]
  )

return {
    id,
    content: input.content,
    type: input.type || 'POST',
    mediaUrl: input.mediaUrl || null,
    authorId,
    createdAt: new Date(now),
    updatedAt: new Date(now),
    likes: [],
    _count: {
      likes: 0,
      comments: 0
    }
  }
}

export async function getPostById(id: string): Promise<PostWithAuthor | null> {
  const db = await getDb()
  
  const post = await db.get<PostWithAuthor>(
    `SELECT 
      p.*,
      u.id as "author.id",
      u.username as "author.username",
      u.first_name as "author.firstName",
      u.last_name as "author.lastName",
      u.avatar as "author.avatar"
     FROM posts p
     JOIN users u ON p.author_id = u.id
     WHERE p.id = ?`,
    [id]
  )

  if (!post) return null

  return {
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt)
  }
}

export async function getPosts(limit: number = 10, offset: number = 0): Promise<PostWithAuthor[]> {
  const db = await getDb()
  
  const posts = await db.all<PostWithAuthor[]>(
    `SELECT 
      p.*,
      u.id as "author.id",
      u.username as "author.username",
      u.first_name as "author.firstName",
      u.last_name as "author.lastName",
      u.avatar as "author.avatar"
     FROM posts p
     JOIN users u ON p.author_id = u.id
     ORDER BY p.created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  return posts.map(post => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt)
  }))
}

export async function updatePost(id: string, content: string): Promise<Post | null> {
  const db = await getDb()
  const now = new Date().toISOString()

  const result = await db.run(
    `UPDATE posts 
     SET content = ?, updated_at = ?
     WHERE id = ?`,
    [content, now, id]
  )

  if (!result.changes) return null

  const post = await db.get<Post>(
    'SELECT * FROM posts WHERE id = ?',
    [id]
  )

  if (!post) return null

  return {
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt)
  }
}

export async function deletePost(id: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM posts WHERE id = ?',
    [id]
  )

  return (result.changes ?? 0) > 0
}

export async function getPostsByAuthor(authorId: string, limit: number = 10, offset: number = 0): Promise<PostWithAuthor[]> {
  const db = await getDb()
  
  const posts = await db.all<PostWithAuthor[]>(
    `SELECT 
      p.*,
      u.id as "author.id",
      u.username as "author.username",
      u.first_name as "author.firstName",
      u.last_name as "author.lastName",
      u.avatar as "author.avatar"
     FROM posts p
     JOIN users u ON p.author_id = u.id
     WHERE p.author_id = ?
     ORDER BY p.created_at DESC
     LIMIT ? OFFSET ?`,
    [authorId, limit, offset]
  )

  return posts.map(post => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt)
  }))
}

export async function likePost(postId: string, userId: string): Promise<boolean> {
  const db = await getDb()
  const now = new Date().toISOString()
  const id = uuidv4()

  try {
    await db.run(
      `INSERT INTO likes (id, post_id, user_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`,
      [id, postId, userId, now, now]
    )
    return true
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return false
    }
    throw error
  }
}

export async function unlikePost(postId: string, userId: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
    [postId, userId]
  )

  return (result.changes ?? 0) > 0
}

export async function isPostLikedByUser(postId: string, userId: string): Promise<boolean> {
  const db = await getDb()

  const like = await db.get(
    'SELECT 1 FROM likes WHERE post_id = ? AND user_id = ?',
    [postId, userId]
  )

  return !!like
}

export async function getPostLikes(postId: string): Promise<number> {
  const db = await getDb()

  const result = await db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM likes WHERE post_id = ?',
    [postId]
  )

  return result?.count || 0
} 