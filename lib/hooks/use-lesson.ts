import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
  order: number
  progress: number
  completed: boolean
  thumbnail?: string
  nextLesson?: {
    id: string
    title: string
  }
}

async function fetchLesson(courseId: string, lessonId: string) {
  const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch lesson')
  }
  return response.json()
}

async function markLessonAsCompleted(courseId: string, lessonId: string) {
  const response = await fetch(
    `/api/courses/${courseId}/lessons/${lessonId}/complete`,
    {
      method: 'POST',
    }
  )
  if (!response.ok) {
    throw new Error('Failed to mark lesson as completed')
  }
  return response.json()
}

export function useLesson(courseId: string, lessonId: string) {
  const queryClient = useQueryClient()

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ['lesson', courseId, lessonId],
    queryFn: () => fetchLesson(courseId, lessonId),
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 1 * 60 * 1000, // 1 minute
  })

  const { mutate: markAsCompleted } = useMutation({
    mutationFn: () => markLessonAsCompleted(courseId, lessonId),
    onSuccess: () => {
      // Invalidate lesson and course queries to refetch with updated progress
      queryClient.invalidateQueries({ queryKey: ['lesson', courseId, lessonId] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
    },
  })

  return {
    lesson,
    isLoading,
    markAsCompleted,
  }
} 