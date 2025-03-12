import { getDb } from '../../database/db'
import { v4 as uuidv4 } from 'uuid'

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  parentId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    avatar: string | null
  }
}

export async function createComment(
  postId: string,
  authorId: string,
  content: string,
  parentId?: string
): Promise<Comment> {
  const db = await getDb()
  const id = uuidv4()
  const now = new Date().toISOString()

  await db.run(
    `INSERT INTO comments (
      id, content, post_id, author_id, parent_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, content, postId, authorId, parentId || null, now, now]
  )

  return {
    id,
    content,
    postId,
    authorId,
    parentId: parentId || null,
    createdAt: new Date(now),
    updatedAt: new Date(now)
  }
}

export async function getCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
  const db = await getDb()
  
  const comments = await db.all<CommentWithAuthor[]>(
    `SELECT 
      c.*,
      u.id as "author.id",
      u.username as "author.username",
      u.first_name as "author.firstName",
      u.last_name as "author.lastName",
      u.avatar as "author.avatar"
     FROM comments c
     JOIN users u ON c.author_id = u.id
     WHERE c.post_id = ?
     ORDER BY c.created_at ASC`,
    [postId]
  )

  return comments.map(comment => ({
    ...comment,
    createdAt: new Date(comment.createdAt),
    updatedAt: new Date(comment.updatedAt)
  }))
}

export async function updateComment(id: string, content: string): Promise<Comment | null> {
  const db = await getDb()
  const now = new Date().toISOString()

  const result = await db.run(
    `UPDATE comments 
     SET content = ?, updated_at = ?
     WHERE id = ?`,
    [content, now, id]
  )

  if (!result.changes) return null

  const comment = await db.get<Comment>(
    'SELECT * FROM comments WHERE id = ?',
    [id]
  )

  if (!comment) return null

  return {
    ...comment,
    createdAt: new Date(comment.createdAt),
    updatedAt: new Date(comment.updatedAt)
  }
}

export async function deleteComment(id: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM comments WHERE id = ?',
    [id]
  )

  return (result.changes ?? 0) > 0
}

export async function getCommentById(id: string): Promise<CommentWithAuthor | null> {
  const db = await getDb()
  
  const comment = await db.get<CommentWithAuthor>(
    `SELECT 
      c.*,
      u.id as "author.id",
      u.username as "author.username",
      u.first_name as "author.firstName",
      u.last_name as "author.lastName",
      u.avatar as "author.avatar"
     FROM comments c
     JOIN users u ON c.author_id = u.id
     WHERE c.id = ?`,
    [id]
  )

  if (!comment) return null

  return {
    ...comment,
    createdAt: new Date(comment.createdAt),
    updatedAt: new Date(comment.updatedAt)
  }
} 