import { UserDb, User, toUser } from './user';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export interface FriendRequestDb {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: FriendRequestStatus;
  created_at: Date;
  updated_at: Date;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FriendRequestDbWithRelations extends FriendRequestDb {
  sender: UserDb;
  receiver: UserDb;
}

export interface FriendRequestWithRelations extends FriendRequest {
  sender: User;
  receiver: User;
}

export function toFriendRequest(db: FriendRequestDb): FriendRequest {
  return {
    id: db.id,
    senderId: db.sender_id,
    receiverId: db.receiver_id,
    status: db.status,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}

export function toFriendRequestWithRelations(db: FriendRequestDbWithRelations): FriendRequestWithRelations {
  return {
    ...toFriendRequest(db),
    sender: toUser(db.sender),
    receiver: toUser(db.receiver)
  };
} 