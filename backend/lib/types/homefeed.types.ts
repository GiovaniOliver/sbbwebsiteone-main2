export interface FeedItemDb {
  id: string;
  user_id: string;
  content_type: 'POST' | 'EVENT' | 'COURSE' | 'PRODUCT' | 'PHOTO' | 'VIDEO';
  content_id: string;
  score: number;
  is_pinned: boolean;
  is_hidden: boolean;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface FeedItemDto {
  id: string;
  userId: string;
  contentType: 'POST' | 'EVENT' | 'COURSE' | 'PRODUCT' | 'PHOTO' | 'VIDEO';
  contentId: string;
  score: number;
  isPinned: boolean;
  isHidden: boolean;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedPreferenceDb {
  id: string;
  user_id: string;
  content_type: 'POST' | 'EVENT' | 'COURSE' | 'PRODUCT' | 'PHOTO' | 'VIDEO';
  weight: number;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeedPreferenceDto {
  id: string;
  userId: string;
  contentType: 'POST' | 'EVENT' | 'COURSE' | 'PRODUCT' | 'PHOTO' | 'VIDEO';
  weight: number;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedFilterDb {
  id: string;
  user_id: string;
  filter_type: 'KEYWORD' | 'USER' | 'CATEGORY' | 'TAG';
  filter_value: string;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeedFilterDto {
  id: string;
  userId: string;
  filterType: 'KEYWORD' | 'USER' | 'CATEGORY' | 'TAG';
  filterValue: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedInteractionDb {
  id: string;
  user_id: string;
  feed_item_id: string;
  interaction_type: 'VIEW' | 'LIKE' | 'SHARE' | 'HIDE' | 'REPORT';
  duration_seconds: number | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface FeedInteractionDto {
  id: string;
  userId: string;
  feedItemId: string;
  interactionType: 'VIEW' | 'LIKE' | 'SHARE' | 'HIDE' | 'REPORT';
  durationSeconds: number | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toFeedItemDto(db: FeedItemDb): FeedItemDto {
  return {
    id: db.id,
    userId: db.user_id,
    contentType: db.content_type,
    contentId: db.content_id,
    score: db.score,
    isPinned: db.is_pinned,
    isHidden: db.is_hidden,
    metadata: db.metadata ? JSON.parse(db.metadata) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toFeedPreferenceDto(db: FeedPreferenceDb): FeedPreferenceDto {
  return {
    id: db.id,
    userId: db.user_id,
    contentType: db.content_type,
    weight: db.weight,
    isEnabled: db.is_enabled,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}