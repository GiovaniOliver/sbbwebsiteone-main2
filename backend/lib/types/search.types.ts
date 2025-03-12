import { mapToDto } from '../utils/mapper';

export interface SearchResultDb {
  id: string;
  type: 'USER' | 'POST' | 'COMMUNITY' | 'EVENT' | 'PRODUCT' | 'COURSE';
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  relevance_score: number;
  created_at: string;
  updated_at: string;
}

export interface SearchResultDto {
  id: string;
  type: 'USER' | 'POST' | 'COMMUNITY' | 'EVENT' | 'PRODUCT' | 'COURSE';
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  relevanceScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchHistoryDb {
  id: string;
  user_id: string;
  query: string;
  filters: string | null;
  result_count: number;
  created_at: string;
  updated_at: string;
}

export interface SearchHistoryDto {
  id: string;
  userId: string;
  query: string;
  filters: Record<string, any> | null;
  resultCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilterDb {
  id: string;
  user_id: string;
  name: string;
  type: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface SearchFilterDto {
  id: string;
  userId: string;
  name: string;
  type: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

export function toSearchResultDto(db: SearchResultDb): SearchResultDto {
  return mapToDto<SearchResultDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toSearchHistoryDto(db: SearchHistoryDb): SearchHistoryDto {
  return mapToDto<SearchHistoryDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['filters']
  });
}

export function toSearchFilterDto(db: SearchFilterDb): SearchFilterDto {
  return mapToDto<SearchFilterDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['value']
  });
}