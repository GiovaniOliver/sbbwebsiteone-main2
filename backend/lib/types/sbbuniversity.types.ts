import { mapToDto } from '../utils/mapper';

export interface UniversityProgramDb {
  id: string;
  name: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration_weeks: number;
  price: number | null;
  max_students: number | null;
  start_date: string | null;
  end_date: string | null;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface UniversityProgramDto {
  id: string;
  name: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationWeeks: number;
  price: number | null;
  maxStudents: number | null;
  startDate: Date | null;
  endDate: Date | null;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UniversityEnrollmentDb {
  id: string;
  program_id: string;
  student_id: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  enrollment_date: string;
  completion_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface UniversityEnrollmentDto {
  id: string;
  programId: string;
  studentId: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  enrollmentDate: Date;
  completionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UniversityAssignmentDb {
  id: string;
  program_id: string;
  title: string;
  description: string;
  due_date: string;
  points: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface UniversityAssignmentDto {
  id: string;
  programId: string;
  title: string;
  description: string;
  dueDate: Date;
  points: number;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UniversitySubmissionDb {
  id: string;
  assignment_id: string;
  student_id: string;
  content: string;
  status: 'SUBMITTED' | 'GRADED' | 'RETURNED';
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  graded_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UniversitySubmissionDto {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  status: 'SUBMITTED' | 'GRADED' | 'RETURNED';
  grade: number | null;
  feedback: string | null;
  submittedAt: Date;
  gradedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toUniversityProgramDto(db: UniversityProgramDb): UniversityProgramDto {
  return {
    id: db.id,
    name: db.name,
    description: db.description,
    level: db.level,
    durationWeeks: db.duration_weeks,
    price: db.price,
    maxStudents: db.max_students,
    startDate: db.start_date ? new Date(db.start_date) : null,
    endDate: db.end_date ? new Date(db.end_date) : null,
    status: db.status,
    metadata: db.metadata ? JSON.parse(db.metadata) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toUniversityEnrollmentDto(db: UniversityEnrollmentDb): UniversityEnrollmentDto {
  return mapToDto<UniversityEnrollmentDto>(db, {
    dateFields: ['enrollmentDate', 'completionDate', 'createdAt', 'updatedAt']
  });
}