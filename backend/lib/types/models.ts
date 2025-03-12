export interface User {
  id: string
  username: string | null
  firstName: string | null
  lastName: string | null
  email: string
  imageUrl: string | null
  profileImageUrl: string | null
  bio: string | null
  web3WalletAddress: string | null
  role: string | null
  totalLikes: number
  createdAt: string
  updatedAt: string
  profileVideo?: string | null
}

export interface UserWithRelations extends User {
  _count?: {
    followers: number
    following: number
    posts: number
  }
} 