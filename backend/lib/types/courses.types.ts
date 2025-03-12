import { mapToDto } from '../utils/mapper';

export interface CourseDb {
  id: string;
  instructor_id: string;
  title: string;
  slug: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  thumbnail_url: string | null;
  duration_minutes: number;
  price: number | null;
  is_published: boolean;
  published_at: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseDto {
  id: string;
  instructorId: string;
  title: string;
  slug: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  thumbnailUrl: string | null;
  durationMinutes: number;
  price: number | null;
  isPublished: boolean;
  publishedAt: Date | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEnrollmentDb {
  id: string;
  course_id: string;
  user_id: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  progress_percentage: number;
  enrolled_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseEnrollmentDto {
  id: string;
  courseId: string;
  userId: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  progressPercentage: number;
  enrolledAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseReviewDb {
  id: string;
  course_id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseReviewDto {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  review: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCertificateDb {
  id: string;
  course_id: string;
  user_id: string;
  certificate_url: string;
  issued_at: string;
  created_at: string;
  updated_at: string;
}

export interface CourseCertificateDto {
  id: string;
  courseId: string;
  userId: string;
  certificateUrl: string;
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function toCourseDto(db: CourseDb): CourseDto {
  return mapToDto<CourseDto>(db, {
    dateFields: ['publishedAt', 'createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}

export function toCourseEnrollmentDto(db: CourseEnrollmentDb): CourseEnrollmentDto {
  return mapToDto<CourseEnrollmentDto>(db, {
    dateFields: ['enrolledAt', 'completedAt', 'createdAt', 'updatedAt']
  });
}

export function toCourseReviewDto(db: CourseReviewDb): CourseReviewDto {
  return mapToDto<CourseReviewDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toCourseCertificateDto(db: CourseCertificateDb): CourseCertificateDto {
  return mapToDto<CourseCertificateDto>(db, {
    dateFields: ['issuedAt', 'createdAt', 'updatedAt']
  });
}