export interface ExploreItemDb {
  id: string;
  type: 'TRENDING' | 'RECOMMENDED' | 'FEATURED' | 'NEW';
  content_type: 'USER' | 'POST' | 'COMMUNITY' | 'EVENT' | 'PRODUCT' | 'COURSE';
  content_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  score: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExploreItemDto {
  id: string;
  type: 'TRENDING' | 'RECOMMENDED' | 'FEATURED' | 'NEW';
  contentType: 'USER' | 'POST' | 'COMMUNITY' | 'EVENT' | 'PRODUCT' | 'COURSE';
  contentId: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  score: number;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExploreCategoryDb {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExploreCategoryDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExploreTagDb {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface ExploreTagDto {
  id: string;
  name: string;
  slug: string;
  categoryId: string | null;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export function toExploreItemDto(db: ExploreItemDb): ExploreItemDto {
  return {
    id: db.id,
    type: db.type,
    contentType: db.content_type,
    contentId: db.content_id,
    title: db.title,
    description: db.description,
    thumbnailUrl: db.thumbnail_url,
    score: db.score,
    startDate: db.start_date ? new Date(db.start_date) : null,
    endDate: db.end_date ? new Date(db.end_date) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toExploreCategoryDto(db: ExploreCategoryDb): ExploreCategoryDto {
  return {
    id: db.id,
    name: db.name,
    slug: db.slug,
    description: db.description,
    iconUrl: db.icon_url,
    orderIndex: db.order_index,
    isActive: db.is_active,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}