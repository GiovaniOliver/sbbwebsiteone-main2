export interface VideoDb {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  original_filename: string;
  file_size: number;
  duration: number;
  width: number;
  height: number;
  format: string;
  status: 'PROCESSING' | 'READY' | 'FAILED';
  is_public: boolean;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface VideoDto {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  originalFilename: string;
  fileSize: number;
  duration: number;
  width: number;
  height: number;
  format: string;
  status: 'PROCESSING' | 'READY' | 'FAILED';
  isPublic: boolean;
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoPlaylistDb {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoPlaylistDto {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaylistItemDb {
  id: string;
  playlist_id: string;
  video_id: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface PlaylistItemDto {
  id: string;
  playlistId: string;
  videoId: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoCommentDb {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  timestamp: number | null;
  created_at: string;
  updated_at: string;
}

export interface VideoCommentDto {
  id: string;
  videoId: string;
  userId: string;
  content: string;
  timestamp: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toVideoDto(db: VideoDb): VideoDto {
  return {
    id: db.id,
    ownerId: db.owner_id,
    title: db.title,
    description: db.description,
    url: db.url,
    thumbnailUrl: db.thumbnail_url,
    originalFilename: db.original_filename,
    fileSize: db.file_size,
    duration: db.duration,
    width: db.width,
    height: db.height,
    format: db.format,
    status: db.status,
    isPublic: db.is_public,
    metadata: db.metadata ? JSON.parse(db.metadata) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}