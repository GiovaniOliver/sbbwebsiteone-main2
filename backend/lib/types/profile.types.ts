import { mapToDto } from '../utils/mapper';

export interface ProfileDb {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  social_links: string | null;
  interests: string | null;
  skills: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileDto {
  id: string;
  userId: string;
  displayName: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  socialLinks: Record<string, string> | null;
  interests: string[] | null;
  skills: string[] | null;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileViewDb {
  id: string;
  profile_id: string;
  viewer_id: string;
  viewed_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileViewDto {
  id: string;
  profileId: string;
  viewerId: string;
  viewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileSettingDb {
  id: string;
  profile_id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileSettingDto {
  id: string;
  profileId: string;
  key: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

export function toProfileDto(db: ProfileDb): ProfileDto {
  return mapToDto<ProfileDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['socialLinks', 'interests', 'skills']
  });
}