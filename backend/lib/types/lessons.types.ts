export interface LessonDb {
  id: string;
  course_id: string;
  title: string;
  description: string;
  content: string;
  order_index: number;
  duration_minutes: number;
  video_url: string | null;
  thumbnail_url: string | null;
  is_published: boolean;
  is_free: boolean;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface LessonDto {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  orderIndex: number;
  durationMinutes: number;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  isPublished: boolean;
  isFree: boolean;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonProgressDb {
  id: string;
  lesson_id: string;
  user_id: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progress_percentage: number;
  last_position: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LessonProgressDto {
  id: string;
  lessonId: string;
  userId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercentage: number;
  lastPosition: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonResourceDb {
  id: string;
  lesson_id: string;
  title: string;
  description: string | null;
  type: 'PDF' | 'IMAGE' | 'VIDEO' | 'LINK' | 'OTHER';
  url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface LessonResourceDto {
  id: string;
  lessonId: string;
  title: string;
  description: string | null;
  type: 'PDF' | 'IMAGE' | 'VIDEO' | 'LINK' | 'OTHER';
  url: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonQuizDb {
  id: string;
  lesson_id: string;
  title: string;
  description: string | null;
  passing_score: number;
  time_limit_minutes: number | null;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonQuizDto {
  id: string;
  lessonId: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimitMinutes: number | null;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function toLessonDto(db: LessonDb): LessonDto {
  return {
    id: db.id,
    courseId: db.course_id,
    title: db.title,
    description: db.description,
    content: db.content,
    orderIndex: db.order_index,
    durationMinutes: db.duration_minutes,
    videoUrl: db.video_url,
    thumbnailUrl: db.thumbnail_url,
    isPublished: db.is_published,
    isFree: db.is_free,
    metadata: db.metadata ? JSON.parse(db.metadata) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toLessonProgressDto(db: LessonProgressDb): LessonProgressDto {
  return {
    id: db.id,
    lessonId: db.lesson_id,
    userId: db.user_id,
    status: db.status,
    progressPercentage: db.progress_percentage,
    lastPosition: db.last_position,
    completedAt: db.completed_at ? new Date(db.completed_at) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
} 