export interface FriendshipDb {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'PENDING' | 'ACCEPTED' | 'BLOCKED';
  created_at: string;
  updated_at: string;
}

export interface FriendshipDto {
  id: string;
  userId: string;
  friendId: string;
  status: 'PENDING' | 'ACCEPTED' | 'BLOCKED';
  createdAt: Date;
  updatedAt: Date;
}

export interface FriendRequestDb {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  responded_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FriendRequestDto {
  id: string;
  senderId: string;
  receiverId: string;
  message: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  respondedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FriendListDb {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface FriendListDto {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FriendListMemberDb {
  id: string;
  list_id: string;
  friend_id: string;
  added_at: string;
  created_at: string;
  updated_at: string;
}

export interface FriendListMemberDto {
  id: string;
  listId: string;
  friendId: string;
  addedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function toFriendshipDto(db: FriendshipDb): FriendshipDto {
  return {
    id: db.id,
    userId: db.user_id,
    friendId: db.friend_id,
    status: db.status,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toFriendRequestDto(db: FriendRequestDb): FriendRequestDto {
  return {
    id: db.id,
    senderId: db.sender_id,
    receiverId: db.receiver_id,
    message: db.message,
    status: db.status,
    respondedAt: db.responded_at ? new Date(db.responded_at) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}