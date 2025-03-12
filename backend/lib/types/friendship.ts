import { UserDb, User, toUser } from './user';

export type FriendshipStatus = 'pending' | 'active' | 'blocked';

export interface FriendshipDb {
  id: string;
  user_id: string | null;
  friend_id: string | null;
  status: FriendshipStatus;
  created_at: Date;
}

export interface Friendship {
  id: string;
  userId: string | null;
  friendId: string | null;
  status: FriendshipStatus;
  createdAt: Date;
}

export interface FriendshipDbWithRelations extends FriendshipDb {
  user: UserDb;
  friend: UserDb;
}

export interface FriendshipWithRelations extends Friendship {
  user: User;
  friend: User;
}

export function toFriendship(db: FriendshipDb): Friendship {
  return {
    id: db.id,
    userId: db.user_id,
    friendId: db.friend_id,
    status: db.status,
    createdAt: db.created_at
  };
}

export function toFriendshipWithRelations(db: FriendshipDbWithRelations): FriendshipWithRelations {
  return {
    ...toFriendship(db),
    user: toUser(db.user),
    friend: toUser(db.friend)
  };
} 