import { getDb } from '../../database/db'
import { v4 as uuidv4 } from 'uuid'

export interface Lesson {
  id: string
  title: string
  content: string
  courseId: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateLessonInput {
  title: string
  content: string
  courseId: string
  order?: number
}

export async function createLesson(input: CreateLessonInput): Promise<Lesson> {
  const db = await getDb()
  const id = uuidv4()
  const now = new Date().toISOString()

  // Get the max order for the course if not provided
  let order = input.order
  if (order === undefined) {
    const maxOrder = await db.get<{ maxOrder: number }>(
      'SELECT MAX(`order`) as maxOrder FROM lessons WHERE course_id = ?',
      [input.courseId]
    )
    order = (maxOrder?.maxOrder || 0) + 1
  }

  await db.run(
    `INSERT INTO lessons (
      id, title, content, course_id, \`order\`,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.title,
      input.content,
      input.courseId,
      order,
      now,
      now
    ]
  )

  return {
    id,
    title: input.title,
    content: input.content,
    courseId: input.courseId,
    order,
    createdAt: new Date(now),
    updatedAt: new Date(now)
  }
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  const db = await getDb()
  
  const lesson = await db.get<Lesson>(
    'SELECT * FROM lessons WHERE id = ?',
    [id]
  )

  if (!lesson) return null

  return {
    ...lesson,
    createdAt: new Date(lesson.createdAt),
    updatedAt: new Date(lesson.updatedAt)
  }
}

export async function getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
  const db = await getDb()
  
  const lessons = await db.all<Lesson[]>(
    'SELECT * FROM lessons WHERE course_id = ? ORDER BY `order` ASC',
    [courseId]
  )

  return lessons.map(lesson => ({
    ...lesson,
    createdAt: new Date(lesson.createdAt),
    updatedAt: new Date(lesson.updatedAt)
  }))
}

export async function updateLesson(
  id: string,
  data: Partial<{
    title: string
    content: string
    order: number
  }>
): Promise<Lesson | null> {
  const db = await getDb()
  const now = new Date().toISOString()

  const updates = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .map(([key, _]) => `${key} = ?`)
    .join(', ')

  if (!updates) return null

  const values = Object.values(data).filter(value => value !== undefined)
  if (values.length === 0) return null

  const result = await db.run(
    `UPDATE lessons 
     SET ${updates}, updated_at = ?
     WHERE id = ?`,
    [...values, now, id]
  )

  if (!result.changes) return null

  const lesson = await db.get<Lesson>(
    'SELECT * FROM lessons WHERE id = ?',
    [id]
  )

  if (!lesson) return null

  return {
    ...lesson,
    createdAt: new Date(lesson.createdAt),
    updatedAt: new Date(lesson.updatedAt)
  }
}

export async function deleteLesson(id: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM lessons WHERE id = ?',
    [id]
  )

  return (result.changes ?? 0) > 0
}

export async function getNextLesson(lessonId: string): Promise<Lesson | null> {
  const db = await getDb()

  const currentLesson = await getLessonById(lessonId)
  if (!currentLesson) return null

  const nextLesson = await db.get<Lesson>(
    `SELECT * FROM lessons 
     WHERE course_id = ? AND \`order\` > ?
     ORDER BY \`order\` ASC
     LIMIT 1`,
    [currentLesson.courseId, currentLesson.order]
  )

  if (!nextLesson) return null

  return {
    ...nextLesson,
    createdAt: new Date(nextLesson.createdAt),
    updatedAt: new Date(nextLesson.updatedAt)
  }
}

export async function markLessonAsCompleted(lessonId: string, userId: string): Promise<boolean> {
  const db = await getDb()
  const now = new Date().toISOString()
  const id = uuidv4()

  try {
    await db.run(
      `INSERT INTO lesson_progress (
        id, lesson_id, user_id, completed_at,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, lessonId, userId, now, now, now]
    )
    return true
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return false
    }
    throw error
  }
}

export async function isLessonCompleted(lessonId: string, userId: string): Promise<boolean> {
  const db = await getDb()

  const progress = await db.get(
    'SELECT 1 FROM lesson_progress WHERE lesson_id = ? AND user_id = ?',
    [lessonId, userId]
  )

  return !!progress
}

export async function getLessonCompletionCount(courseId: string, userId: string): Promise<number> {
  const db = await getDb()

  const result = await db.get<{ count: number }>(
    `SELECT COUNT(*) as count 
     FROM lesson_progress lp
     JOIN lessons l ON lp.lesson_id = l.id
     WHERE l.course_id = ? AND lp.user_id = ?`,
    [courseId, userId]
  )

  return result?.count || 0
} 