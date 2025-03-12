export interface CommunityDb {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar_url: string | null;
  banner_url: string | null;
  category: string;
  is_private: boolean;
  member_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  category: string;
  isPrivate: boolean;
  memberCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityMemberDb {
  id: string;
  community_id: string;
  user_id: string;
  role: 'ADMIN' | 'MODERATOR' | 'MEMBER';
  status: 'ACTIVE' | 'BANNED' | 'MUTED';
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityMemberDto {
  id: string;
  communityId: string;
  userId: string;
  role: 'ADMIN' | 'MODERATOR' | 'MEMBER';
  status: 'ACTIVE' | 'BANNED' | 'MUTED';
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityRuleDb {
  id: string;
  community_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CommunityRuleDto {
  id: string;
  communityId: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityInviteDb {
  id: string;
  community_id: string;
  inviter_id: string;
  invitee_id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunityInviteDto {
  id: string;
  communityId: string;
  inviterId: string;
  inviteeId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toCommunityDto(db: CommunityDb): CommunityDto {
  return {
    id: db.id,
    name: db.name,
    slug: db.slug,
    description: db.description,
    avatarUrl: db.avatar_url,
    bannerUrl: db.banner_url,
    category: db.category,
    isPrivate: db.is_private,
    memberCount: db.member_count,
    createdBy: db.created_by,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}