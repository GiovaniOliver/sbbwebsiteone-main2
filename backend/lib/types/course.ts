// backend/lib/types/course.ts

/**
 * Matches the 'courses' table EXACTLY as columns appear in your database.
 */
export interface CourseDb {
    id: string;
    title: string;
    description: string | null;
    instructorId: string;          // 'instructorId' in Db
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    thumbnail: string | null;
    duration: number | null;       // in minutes
    price: number | null;          // DECIMAL(10,2)
    isPublished: boolean;          // BOOLEAN
    publishedAt: Date | null;
    createdAt: Date;               // DATETIME
    updatedAt: Date;               // DATETIME
  }
  
  /**
   * Public-facing shape for a Course.
   * If you want different naming, do so here.
   */
  export interface CourseDto {
    id: string;
    title: string;
    description: string | null;
    instructorId: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    thumbnail: string | null;
    duration: number | null;
    price: number | null;
    isPublished: boolean;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Converts a row from the 'courses' table (CourseDb) to a public CourseDto.
   */
  export function toCourseDto(dbRow: CourseDb): CourseDto {
    return {
      id: dbRow.id,
      title: dbRow.title,
      description: dbRow.description,
      instructorId: dbRow.instructorId,
      level: dbRow.level,
      category: dbRow.category,
      thumbnail: dbRow.thumbnail,
      duration: dbRow.duration,
      price: dbRow.price,
      isPublished: dbRow.isPublished,
      publishedAt: dbRow.publishedAt,
      createdAt: dbRow.createdAt,
      updatedAt: dbRow.updatedAt,
    };
  }
  