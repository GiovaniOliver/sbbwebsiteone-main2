import { UserDb, User, toUser } from './user';

export interface GuildDb {
  id: string;
  name: string;
  description: string | null;
  owner_id: string | null;
  created_at: Date;
}

export interface Guild {
  id: string;
  name: string;
  description: string | null;
  ownerId: string | null;
  createdAt: Date;
}

export interface GuildDbWithRelations extends GuildDb {
  owner: UserDb;
}

export interface GuildWithRelations extends Guild {
  owner: User;
}

export function toGuild(db: GuildDb): Guild {
  return {
    id: db.id,
    name: db.name,
    description: db.description,
    ownerId: db.owner_id,
    createdAt: db.created_at
  };
}

export function toGuildWithRelations(db: GuildDbWithRelations): GuildWithRelations {
  return {
    ...toGuild(db),
    owner: toUser(db.owner)
  };
} 