import { mapToDto } from '../utils/mapper';

export interface CoursePageDb {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  content: string;
  order_index: number;
  is_published: boolean;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoursePageDto {
  id: string;
  courseId: string;
  title: string;
  slug: string;
  content: string;
  orderIndex: number;
  isPublished: boolean;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoursePageSectionDb {
  id: string;
  page_id: string;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CoursePageSectionDto {
  id: string;
  pageId: string;
  title: string;
  content: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoursePageCommentDb {
  id: string;
  page_id: string;
  user_id: string;
  content: string;
  parent_comment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoursePageCommentDto {
  id: string;
  pageId: string;
  userId: string;
  content: string;
  parentCommentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoursePageRevisionDb {
  id: string;
  page_id: string;
  user_id: string;
  content: string;
  change_summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoursePageRevisionDto {
  id: string;
  pageId: string;
  userId: string;
  content: string;
  changeSummary: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toCoursePageDto(db: CoursePageDb): CoursePageDto {
  return mapToDto<CoursePageDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toCoursePageSectionDto(db: CoursePageSectionDb): CoursePageSectionDto {
  return {
    id: db.id,
    pageId: db.page_id,
    title: db.title,
    content: db.content,
    orderIndex: db.order_index,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toCoursePageCommentDto(db: CoursePageCommentDb): CoursePageCommentDto {
  return {
    id: db.id,
    pageId: db.page_id,
    userId: db.user_id,
    content: db.content,
    parentCommentId: db.parent_comment_id,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toCoursePageRevisionDto(db: CoursePageRevisionDb): CoursePageRevisionDto {
  return mapToDto<CoursePageRevisionDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}