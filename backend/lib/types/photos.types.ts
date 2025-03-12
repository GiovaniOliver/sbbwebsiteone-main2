import { mapToDto } from '../utils/mapper';

export interface PhotoDb {
  id: string;
  owner_id: string;
  album_id: string | null;
  title: string | null;
  description: string | null;
  url: string;
  thumbnail_url: string;
  original_filename: string;
  file_size: number;
  width: number;
  height: number;
  format: string;
  is_public: boolean;
  metadata: string | null;
  taken_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PhotoDto {
  id: string;
  ownerId: string;
  albumId: string | null;
  title: string | null;
  description: string | null;
  url: string;
  thumbnailUrl: string;
  originalFilename: string;
  fileSize: number;
  width: number;
  height: number;
  format: string;
  isPublic: boolean;
  metadata: any | null;
  takenAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlbumDb {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  cover_photo_id: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface AlbumDto {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  coverPhotoId: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoTagDb {
  id: string;
  photo_id: string;
  user_id: string | null;
  x_position: number;
  y_position: number;
  created_at: string;
  updated_at: string;
}

export interface PhotoTagDto {
  id: string;
  photoId: string;
  userId: string | null;
  xPosition: number;
  yPosition: number;
  createdAt: Date;
  updatedAt: Date;
}

export function toPhotoDto(db: PhotoDb): PhotoDto {
  return mapToDto<PhotoDto>(db, {
    dateFields: ['takenAt', 'createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}

export function toPhotoTagDto(db: PhotoTagDb): PhotoTagDto {
  return mapToDto<PhotoTagDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}