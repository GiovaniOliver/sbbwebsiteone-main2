import { mapToDto } from '../utils/mapper';

export interface FileDb {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  path: string;
  owner_id: string;
  parent_folder_id: string | null;
  is_public: boolean;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface FileDto {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  path: string;
  ownerId: string;
  parentFolderId: string | null;
  isPublic: boolean;
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderDb {
  id: string;
  name: string;
  owner_id: string;
  parent_folder_id: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface FolderDto {
  id: string;
  name: string;
  ownerId: string;
  parentFolderId: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileShareDb {
  id: string;
  file_id: string;
  user_id: string;
  permission: 'VIEW' | 'EDIT' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

export interface FileShareDto {
  id: string;
  fileId: string;
  userId: string;
  permission: 'VIEW' | 'EDIT' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export function toFileDto(db: FileDb): FileDto {
  return mapToDto<FileDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}