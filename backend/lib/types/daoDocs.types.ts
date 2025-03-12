import { mapToDto } from '../utils/mapper';

export interface DaoDocumentDb {
  id: string;
  dao_id: string;
  title: string;
  content: string;
  category: 'WHITEPAPER' | 'TECHNICAL' | 'LEGAL' | 'GOVERNANCE' | 'OTHER';
  version: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author_id: string;
  is_public: boolean;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoDocumentDto {
  id: string;
  daoId: string;
  title: string;
  content: string;
  category: 'WHITEPAPER' | 'TECHNICAL' | 'LEGAL' | 'GOVERNANCE' | 'OTHER';
  version: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  authorId: string;
  isPublic: boolean;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoDocumentRevisionDb {
  id: string;
  document_id: string;
  content: string;
  version: string;
  change_summary: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface DaoDocumentRevisionDto {
  id: string;
  documentId: string;
  content: string;
  version: string;
  changeSummary: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoDocumentCommentDb {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface DaoDocumentCommentDto {
  id: string;
  documentId: string;
  userId: string;
  content: string;
  parentId: string | null;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function toDaoDocumentDto(db: DaoDocumentDb): DaoDocumentDto {
  return mapToDto<DaoDocumentDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}

export function toDaoDocumentRevisionDto(db: DaoDocumentRevisionDb): DaoDocumentRevisionDto {
  return mapToDto<DaoDocumentRevisionDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toDaoDocumentCommentDto(db: DaoDocumentCommentDb): DaoDocumentCommentDto {
  return mapToDto<DaoDocumentCommentDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}