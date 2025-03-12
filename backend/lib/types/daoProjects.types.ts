import { mapToDto } from '../utils/mapper';

export interface DaoProjectDb {
  id: string;
  dao_id: string;
  team_id: string | null;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  start_date: string | null;
  end_date: string | null;
  budget_amount: string | null;
  budget_token_address: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DaoProjectDto {
  id: string;
  daoId: string;
  teamId: string | null;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  startDate: Date | null;
  endDate: Date | null;
  budgetAmount: string | null;
  budgetTokenAddress: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMemberDb {
  id: string;
  project_id: string;
  user_id: string;
  role: 'LEAD' | 'MEMBER' | 'CONTRIBUTOR';
  permissions: string[];
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMemberDto {
  id: string;
  projectId: string;
  userId: string;
  role: 'LEAD' | 'MEMBER' | 'CONTRIBUTOR';
  permissions: string[];
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectTaskDb {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to: string | null;
  due_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectTaskDto {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo: string | null;
  dueDate: Date | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toDaoProjectDto(db: DaoProjectDb): DaoProjectDto {
  return mapToDto<DaoProjectDto>(db, {
    dateFields: ['startDate', 'endDate', 'createdAt', 'updatedAt']
  });
}

export function toProjectTaskDto(db: ProjectTaskDb): ProjectTaskDto {
  return mapToDto<ProjectTaskDto>(db, {
    dateFields: ['dueDate', 'createdAt', 'updatedAt']
  });
}

export function toProjectMemberDto(db: ProjectMemberDb): ProjectMemberDto {
  return mapToDto<ProjectMemberDto>(db, {
    dateFields: ['joinedAt', 'createdAt', 'updatedAt']
  });
}