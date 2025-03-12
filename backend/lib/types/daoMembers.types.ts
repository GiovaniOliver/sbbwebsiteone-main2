import { mapToDto } from '../utils/mapper';

export interface DaoMemberDb {
  id: string;
  dao_id: string;
  user_id: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  joined_at: string;
  contribution_score: number;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoMemberDto {
  id: string;
  daoId: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  joinedAt: Date;
  contributionScore: number;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoMembershipRequestDb {
  id: string;
  dao_id: string;
  user_id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  message: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoMembershipRequestDto {
  id: string;
  daoId: string;
  userId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  message: string | null;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoRoleDb {
  id: string;
  dao_id: string;
  name: string;
  description: string | null;
  permissions: string;
  created_at: string;
  updated_at: string;
}

export interface DaoRoleDto {
  id: string;
  daoId: string;
  name: string;
  description: string | null;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoMemberRoleDb {
  id: string;
  member_id: string;
  role_id: string;
  assigned_by: string;
  assigned_at: string;
  created_at: string;
  updated_at: string;
}

export interface DaoMemberRoleDto {
  id: string;
  memberId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function toDaoMemberDto(db: DaoMemberDb): DaoMemberDto {
  return mapToDto<DaoMemberDto>(db, {
    dateFields: ['joinedAt', 'createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}

export function toDaoRoleDto(db: DaoRoleDb): DaoRoleDto {
  return mapToDto<DaoRoleDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['permissions']
  });
}

export function toDaoMembershipRequestDto(db: DaoMembershipRequestDb): DaoMembershipRequestDto {
  return mapToDto<DaoMembershipRequestDto>(db, {
    dateFields: ['reviewedAt', 'createdAt', 'updatedAt']
  });
}

export function toDaoMemberRoleDto(db: DaoMemberRoleDb): DaoMemberRoleDto {
  return mapToDto<DaoMemberRoleDto>(db, {
    dateFields: ['assignedAt', 'createdAt', 'updatedAt']
  });
}