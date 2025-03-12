import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from './types'

export interface CourseSummary {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  thumbnail?: string
  instructorId: string
  createdAt: string
  updatedAt: string
}

interface UseCoursesOptions {
  category?: string
  level?: string
  search?: string
}

async function fetchCourses(options: UseCoursesOptions = {}): Promise<CourseSummary[]> {
  const params = new URLSearchParams()
  if (options.category) params.append('category', options.category)
  if (options.level) params.append('level', options.level)
  if (options.search) params.append('search', options.search)

  const response = await fetch(`/api/courses?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch courses')
  }
  const json = await response.json() as ApiResponse<CourseSummary[]>
  if (!json.success || !json.data) {
    throw new Error(json.error || 'Invalid response')
  }
  return json.data
}

export function useCourses(options: UseCoursesOptions = {}) {
  return useQuery<CourseSummary[]>({
    queryKey: ['courses', options],
    queryFn: () => fetchCourses(options),
    staleTime: 60_000,
    gcTime: 300_000,
  })
}
