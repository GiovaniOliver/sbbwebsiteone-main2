import { UserDb, User, toUser } from './user';

export type GroupMemberRole = 'owner' | 'admin' | 'moderator' | 'member';

export interface GroupDb {
  id: string;
  name: string;
  description: string | null;
  rules: string | null;
  owner_id: string | null;
  created_at: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  rules: string | null;
  ownerId: string | null;
  createdAt: Date;
}

export interface GroupMemberDb {
  id: string;
  group_id: string;
  user_id: string;
  role: GroupMemberRole;
  joined_at: Date;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: GroupMemberRole;
  joinedAt: Date;
}

export interface GroupDbWithRelations extends GroupDb {
  owner: UserDb;
  members: (GroupMemberDb & { user: UserDb })[];
}

export interface GroupWithRelations extends Group {
  owner: User;
  members: (GroupMember & { user: User })[];
}

export function toGroupMember(db: GroupMemberDb): GroupMember {
  return {
    id: db.id,
    groupId: db.group_id,
    userId: db.user_id,
    role: db.role,
    joinedAt: db.joined_at
  };
}

export function toGroup(db: GroupDb): Group {
  return {
    id: db.id,
    name: db.name,
    description: db.description,
    rules: db.rules,
    ownerId: db.owner_id,
    createdAt: db.created_at
  };
}

export function toGroupWithRelations(db: GroupDbWithRelations): GroupWithRelations {
  return {
    ...toGroup(db),
    owner: toUser(db.owner),
    members: db.members.map(member => ({
      ...toGroupMember(member),
      user: toUser(member.user)
    }))
  };
} 