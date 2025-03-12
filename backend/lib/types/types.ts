export interface Friend {
  id: string
  user_id: string
  friend_id: string
  status: FriendStatus
  created_at: string
  updated_at: string
  friend: {
    id: string
    username: string | null
    first_name: string | null
    last_name: string | null
    image_url: string | null
  }
}

export type FriendStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' 