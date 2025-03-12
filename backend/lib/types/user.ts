// Database type with snake_case
export interface UserDb {
  id: string
  username: string | null
  email: string
  first_name: string | null
  last_name: string | null
  image_url: string | null
  profile_image_url: string | null
  password_hash: string | null
  two_factor_enabled: boolean
  banned: boolean
  locked: boolean
  last_sign_in_at: string | null
  created_at: string
  updated_at: string
  metadata: Record<string, any> | null
}

// Frontend type with camelCase
export interface User {
  id: string
  username: string | null
  email: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  profileImageUrl: string | null
  twoFactorEnabled: boolean
  banned: boolean
  locked: boolean
  lastSignInAt: Date | null
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, any> | null
}

// Database type with relations and counts
export interface UserDbWithRelations extends UserDb {
  _count?: {
    followers: number
    following: number
    events: number
    posts: number
  }
}

// Frontend type with relations and counts
export interface UserWithRelations extends User {
  _count?: {
    followers: number
    following: number
    events: number
    posts: number
  }
}

// Input type for creating/updating users
export type CreateUserInput = Omit<UserDb, 'id' | 'created_at' | 'updated_at' | 'password_hash'>

// Mapping function from database to frontend type
export function toUser(db: UserDb): User {
  return {
    id: db.id,
    username: db.username,
    email: db.email,
    firstName: db.first_name,
    lastName: db.last_name,
    imageUrl: db.image_url,
    profileImageUrl: db.profile_image_url,
    twoFactorEnabled: db.two_factor_enabled,
    banned: db.banned,
    locked: db.locked,
    lastSignInAt: db.last_sign_in_at ? new Date(db.last_sign_in_at) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at),
    metadata: db.metadata
  }
}

// Mapping function for users with relations
export function toUserWithRelations(db: UserDbWithRelations): UserWithRelations {
  return {
    ...toUser(db),
    _count: db._count
  }
} 