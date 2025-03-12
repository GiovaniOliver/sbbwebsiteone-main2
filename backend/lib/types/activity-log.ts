import { UserDb, User, toUser } from './user';

export interface ActivityLogDb {
  id: string;
  user_id: string | null;
  activity_type: string | null;
  metadata: unknown;
  created_at: Date;
}

export interface ActivityLog {
  id: string;
  userId: string | null;
  activityType: string | null;
  metadata: unknown;
  createdAt: Date;
}

export interface ActivityLogDbWithRelations extends ActivityLogDb {
  user: UserDb;
}

export interface ActivityLogWithRelations extends ActivityLog {
  user: User;
}

export function toActivityLog(db: ActivityLogDb): ActivityLog {
  return {
    id: db.id,
    userId: db.user_id,
    activityType: db.activity_type,
    metadata: db.metadata,
    createdAt: db.created_at
  };
}

export function toActivityLogWithRelations(db: ActivityLogDbWithRelations): ActivityLogWithRelations {
  return {
    ...toActivityLog(db),
    user: toUser(db.user)
  };
} 