import { mapToDto } from '../utils/mapper';

export interface UserSettingDb {
  id: string;
  user_id: string;
  category: 'GENERAL' | 'PRIVACY' | 'NOTIFICATIONS' | 'SECURITY' | 'APPEARANCE';
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettingDto {
  id: string;
  userId: string;
  category: 'GENERAL' | 'PRIVACY' | 'NOTIFICATIONS' | 'SECURITY' | 'APPEARANCE';
  key: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationSettingDb {
  id: string;
  user_id: string;
  type: string;
  email_enabled: boolean;
  push_enabled: boolean;
  in_app_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationSettingDto {
  id: string;
  userId: string;
  type: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrivacySettingDb {
  id: string;
  user_id: string;
  profile_visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  show_online_status: boolean;
  show_activity_status: boolean;
  allow_friend_requests: boolean;
  allow_messages: 'ALL' | 'FRIENDS' | 'NONE';
  created_at: string;
  updated_at: string;
}

export interface PrivacySettingDto {
  id: string;
  userId: string;
  profileVisibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  showOnlineStatus: boolean;
  showActivityStatus: boolean;
  allowFriendRequests: boolean;
  allowMessages: 'ALL' | 'FRIENDS' | 'NONE';
  createdAt: Date;
  updatedAt: Date;
}

export function toUserSettingDto(db: UserSettingDb): UserSettingDto {
  return mapToDto<UserSettingDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['value']
  });
}

export function toNotificationSettingDto(db: NotificationSettingDb): NotificationSettingDto {
  return mapToDto<NotificationSettingDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toPrivacySettingDto(db: PrivacySettingDb): PrivacySettingDto {
  return mapToDto<PrivacySettingDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}