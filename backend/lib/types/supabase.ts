export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          image_url: string | null
          bio: string | null
          password_hash: string
          two_factor_enabled: boolean
          banned: boolean
          locked: boolean
          last_sign_in_at: string | null
          created_at: string
          updated_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          username?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          image_url?: string | null
          bio?: string | null
          password_hash: string
          two_factor_enabled?: boolean
          banned?: boolean
          locked?: boolean
          last_sign_in_at?: string | null
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          username?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          image_url?: string | null
          bio?: string | null
          password_hash?: string
          two_factor_enabled?: boolean
          banned?: boolean
          locked?: boolean
          last_sign_in_at?: string | null
          created_at?: string
          updated_at?: string
          metadata?: Json
        }
      }
    }
  }
} 