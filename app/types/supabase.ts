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
      events: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          start_date: string
          end_date: string
          created_at: string
          user_id: string
          image_url?: string
          status: 'upcoming' | 'ongoing' | 'completed'
          max_participants?: number
          is_virtual: boolean
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          first_name?: string
          last_name?: string
          avatar_url?: string
          online_status?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 