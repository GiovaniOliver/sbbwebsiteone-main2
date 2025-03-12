'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../backend/lib/types/supabase'

interface LessonDb {
  id: string
  title: string
  content: string
  video_url?: string
  duration: number
  order_number: number
  thumbnail_url?: string
  course_id: string
  created_at: string
  updated_at: string
}

interface LessonProgressDb {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  progress: number
  created_at: string
  updated_at: string
}

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
  order: number
  progress: number
  completed: boolean
  thumbnailUrl?: string
  courseId: string
  createdAt: string
  updatedAt: string
  nextLesson?: {
    id: string
    title: string
  }
}

const toLesson = (lesson: LessonDb, progress?: LessonProgressDb, nextLesson?: LessonDb): Lesson => ({
  id: lesson.id,
  title: lesson.title,
  content: lesson.content,
  videoUrl: lesson.video_url,
  duration: lesson.duration,
  order: lesson.order_number,
  progress: progress?.progress ?? 0,
  completed: progress?.completed ?? false,
  thumbnailUrl: lesson.thumbnail_url,
  courseId: lesson.course_id,
  createdAt: lesson.created_at,
  updatedAt: lesson.updated_at,
  nextLesson: nextLesson ? {
    id: nextLesson.id,
    title: nextLesson.title
  } : undefined
})

export function useLesson(courseId: string, lessonId: string) {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', courseId, lessonId],
    queryFn: async () => {
      // Fetch lesson
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single()

      if (lessonError || !lessonData) throw new Error('Failed to fetch lesson')

      // Fetch lesson progress
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('lesson_id', lessonId)
        .single()

      // Fetch next lesson
      const { data: nextLessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .gt('order_number', lessonData.order_number)
        .order('order_number', { ascending: true })
        .limit(1)
        .single()

      return toLesson(lessonData, progressData, nextLessonData)
    },
    staleTime: 60_000,
    gcTime: 300_000,
  })

  const markAsCompleted = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert(
          {
            lesson_id: lessonId,
            completed: true,
            progress: 100
          },
          { onConflict: 'lesson_id,user_id' }
        )

      if (error) throw new Error('Failed to mark lesson as completed')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', courseId, lessonId] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
    },
  })

  return {
    lesson,
    isLoading,
    markAsCompleted: markAsCompleted.mutate,
  }
}
