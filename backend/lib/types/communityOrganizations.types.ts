export interface OrganizationDb {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  banner_url: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  isVerified: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMemberDb {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  title: string | null;
  department: string | null;
  joined_at: string;
  invited_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMemberDto {
  id: string;
  organizationId: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  title: string | null;
  department: string | null;
  joinedAt: Date;
  invitedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationTeamDb {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationTeamDto {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberDb {
  id: string;
  team_id: string;
  user_id: string;
  role: 'LEAD' | 'MEMBER';
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberDto {
  id: string;
  teamId: string;
  userId: string;
  role: 'LEAD' | 'MEMBER';
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function toOrganizationDto(db: OrganizationDb): OrganizationDto {
  return {
    id: db.id,
    name: db.name,
    slug: db.slug,
    description: db.description,
    logoUrl: db.logo_url,
    bannerUrl: db.banner_url,
    website: db.website,
    email: db.email,
    phone: db.phone,
    address: db.address,
    city: db.city,
    state: db.state,
    postalCode: db.postal_code,
    country: db.country,
    isVerified: db.is_verified,
    verifiedAt: db.verified_at ? new Date(db.verified_at) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toOrganizationMemberDto(db: OrganizationMemberDb): OrganizationMemberDto {
  return {
    id: db.id,
    organizationId: db.organization_id,
    userId: db.user_id,
    role: db.role,
    title: db.title,
    department: db.department,
    joinedAt: new Date(db.joined_at),
    invitedBy: db.invited_by,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toOrganizationTeamDto(db: OrganizationTeamDb): OrganizationTeamDto {
  return {
    id: db.id,
    organizationId: db.organization_id,
    name: db.name,
    description: db.description,
    createdBy: db.created_by,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toTeamMemberDto(db: TeamMemberDb): TeamMemberDto {
  return {
    id: db.id,
    teamId: db.team_id,
    userId: db.user_id,
    role: db.role,
    joinedAt: new Date(db.joined_at),
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}