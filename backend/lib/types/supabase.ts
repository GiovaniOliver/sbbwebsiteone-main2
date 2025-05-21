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
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          full_name?: string
          first_name?: string
          last_name?: string
          avatar_url?: string
          bio?: string
          website?: string
          web3_wallet_address?: string
          role?: string
          total_likes: number
          location?: string
          profile_video?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at' | 'total_likes'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      posts: {
        Row: {
          id: string
          author_id: string
          content: string
          images: string[]
          likes_count: number
          comments_count: number
          type: string
          status: string
          visibility: string
          created_at: string
          updated_at: string
          archived: boolean
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count' | 'archived'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']> & { archived?: boolean }
      }
      post_likes: {
        Row: {
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['post_likes']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['post_likes']['Insert']>
      }
      post_comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['post_comments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['post_comments']['Insert']>
      }
      follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['follows']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['follows']['Insert']>
      }
      follows_count: {
        Row: {
          user_id: string
          followers_count: number
          following_count: number
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['follows_count']['Row'], 'updated_at'>
        Update: Partial<Database['public']['Tables']['follows_count']['Insert']>
      }
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
      event_participants: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['event_participants']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['event_participants']['Insert']>
      }
      videos: {
        Row: {
          id: string
          user_id: string
          title: string
          description?: string
          url: string
          thumbnail_url: string
          duration: number
          view_count: number
          archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['videos']['Row'], 'id' | 'created_at' | 'updated_at' | 'view_count' | 'archived'>
        Update: Partial<Database['public']['Tables']['videos']['Insert']> & { archived?: boolean }
      }
      video_likes: {
        Row: {
          video_id: string
          user_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['video_likes']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['video_likes']['Insert']>
      }
      video_comments: {
        Row: {
          id: string
          video_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['video_comments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['video_comments']['Insert']>
      }
      stories: {
        Row: {
          id: string
          user_id: string
          thumbnail_url: string
          expires_at?: string
          content?: string
          type: string
          archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['stories']['Row'], 'id' | 'created_at' | 'updated_at' | 'archived'>
        Update: Partial<Database['public']['Tables']['stories']['Insert']> & { archived?: boolean }
      }
      groups: {
        Row: {
          id: string
          name: string
          description?: string
          creator_id: string
          privacy: string
          image_url?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['groups']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['groups']['Insert']>
      }
      group_members: {
        Row: {
          group_id: string
          user_id: string
          role: string
          joined_at: string
        }
        Insert: Omit<Database['public']['Tables']['group_members']['Row'], 'joined_at'>
        Update: Partial<Database['public']['Tables']['group_members']['Insert']>
      }
      group_posts: {
        Row: {
          id: string
          group_id: string
          author_id: string
          content: string
          images: string[]
          archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['group_posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'archived'>
        Update: Partial<Database['public']['Tables']['group_posts']['Insert']> & { archived?: boolean }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          actor_id?: string
          type: string
          content?: string
          read: boolean
          reference_id?: string
          reference_type?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at' | 'updated_at' | 'read'>
        Update: Partial<Database['public']['Tables']['notifications']['Insert']> & { read?: boolean }
      }
      conversations: {
        Row: {
          id: string
          title?: string
          created_at: string
          updated_at: string
          last_message_at?: string
        }
        Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['conversations']['Insert']> & { last_message_at?: string }
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          user_id: string
          last_read_at?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['conversation_participants']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['conversation_participants']['Insert']> & { last_read_at?: string }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          attachment_url?: string
          attachment_type?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      marketplace_categories: {
        Row: {
          id: string
          name: string
          parent_id?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['marketplace_categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['marketplace_categories']['Insert']>
      }
      marketplace_listings: {
        Row: {
          id: string
          seller_id: string
          title: string
          description?: string
          price: number
          condition?: string
          location?: string
          category_id?: string
          status: string
          images: string[]
          archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['marketplace_listings']['Row'], 'id' | 'created_at' | 'updated_at' | 'archived'>
        Update: Partial<Database['public']['Tables']['marketplace_listings']['Insert']> & { archived?: boolean }
      }
      marketplace_favorites: {
        Row: {
          listing_id: string
          user_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['marketplace_favorites']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['marketplace_favorites']['Insert']>
      }
      dao_tokens: {
        Row: {
          id: string
          holder_id: string
          amount: number
          staked_amount: number
          last_updated: string
        }
        Insert: Omit<Database['public']['Tables']['dao_tokens']['Row'], 'id' | 'last_updated' | 'staked_amount'>
        Update: Partial<Database['public']['Tables']['dao_tokens']['Insert']> & { staked_amount?: number }
      }
      dao_token_transactions: {
        Row: {
          id: string
          from_user_id?: string
          to_user_id?: string
          amount: number
          transaction_type: string
          transaction_hash?: string
          metadata: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_token_transactions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['dao_token_transactions']['Insert']>
      }
      dao_proposals: {
        Row: {
          id: string
          title: string
          description?: string
          creator_id: string
          status: string
          voting_deadline?: string
          result?: string
          created_at: string
          proposal_type: string
          required_quorum: number
          required_majority: number
          snapshot_id?: string
          implementation_date?: string
          budget: number
          category_id?: string
        }
        Insert: Omit<Database['public']['Tables']['dao_proposals']['Row'], 'id' | 'created_at' | 'required_quorum' | 'required_majority' | 'budget'>
        Update: Partial<Database['public']['Tables']['dao_proposals']['Insert']> & { 
          required_quorum?: number
          required_majority?: number
          budget?: number
          status?: string
          result?: string
        }
      }
      dao_votes: {
        Row: {
          id: string
          proposal_id: string
          voter_id: string
          vote: string
          voting_power: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_votes']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['dao_votes']['Insert']>
      }
      dao_reputation: {
        Row: {
          id: string
          user_id: string
          reputation_points: number
          level: number
          last_activity: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_reputation']['Row'], 'id' | 'created_at' | 'updated_at' | 'reputation_points' | 'level' | 'last_activity'>
        Update: Partial<Database['public']['Tables']['dao_reputation']['Insert']> & {
          reputation_points?: number
          level?: number
        }
      }
      dao_tasks: {
        Row: {
          id: string
          title: string
          description?: string
          creator_id: string
          assignee_id?: string
          status: string
          priority: string
          reward_tokens: number
          reward_reputation: number
          due_date?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_tasks']['Row'], 'id' | 'created_at' | 'updated_at' | 'reward_tokens' | 'reward_reputation' | 'status' | 'priority'>
        Update: Partial<Database['public']['Tables']['dao_tasks']['Insert']> & {
          reward_tokens?: number
          reward_reputation?: number
          status?: string 
          priority?: string
          assignee_id?: string
        }
      }
      dao_task_submissions: {
        Row: {
          id: string
          task_id: string
          user_id: string
          content: string
          status: string
          feedback?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_task_submissions']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'>
        Update: Partial<Database['public']['Tables']['dao_task_submissions']['Insert']> & {
          status?: string
          feedback?: string
        }
      }
      dao_badges: {
        Row: {
          id: string
          name: string
          description?: string
          image_url?: string
          requirement_type: string
          requirement_value: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_badges']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['dao_badges']['Insert']>
      }
      dao_user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          awarded_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_user_badges']['Row'], 'id' | 'awarded_at'>
        Update: Partial<Database['public']['Tables']['dao_user_badges']['Insert']>
      }
      dao_staking: {
        Row: {
          id: string
          user_id: string
          amount: number
          lock_period_days: number
          start_date: string
          end_date?: string
          status: string
          apy: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['dao_staking']['Row'], 'id' | 'created_at' | 'updated_at' | 'start_date' | 'status' | 'apy' | 'lock_period_days'>
        Update: Partial<Database['public']['Tables']['dao_staking']['Insert']> & {
          status?: string
          end_date?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_reputation_points: {
        Args: {
          p_user_id: string
          p_points: number
          p_reason: string
          p_source_type?: string
          p_source_id?: string
        }
        Returns: void
      }
      archive_post: {
        Args: {
          post_id: string
        }
        Returns: boolean
      }
      can_create_proposal: {
        Args: {
          p_user_id: string
        }
        Returns: boolean
      }
      check_and_award_badges: {
        Args: {
          p_user_id: string
        }
        Returns: number
      }
      check_rls_access: {
        Args: {
          table_name: string
          operation: string
          test_row?: Json
        }
        Returns: boolean
      }
      check_rls_enabled: {
        Args: {
          table_name: string
        }
        Returns: boolean
      }
      check_storage_access: {
        Args: {
          bucket_id: string
          operation: string
          file_path?: string
        }
        Returns: boolean
      }
      check_username_available: {
        Args: {
          username: string
        }
        Returns: boolean
      }
      complete_dao_task: {
        Args: {
          p_task_id: string
          p_submission_id: string
        }
        Returns: boolean
      }
      get_feed_posts: {
        Args: {
          p_user_id: string
          p_limit?: number
          p_offset?: number
        }
        Returns: Database['public']['Tables']['posts']['Row'][]
      }
      get_paginated_posts: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_visibility?: string
        }
        Returns: Database['public']['Tables']['posts']['Row'][]
      }
      get_user_posts: {
        Args: {
          p_user_id: string
          p_limit?: number
          p_offset?: number
        }
        Returns: Database['public']['Tables']['posts']['Row'][]
      }
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      handle_updated_at: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      recalculate_follows_count: {
        Args: Record<PropertyKey, never>
        Returns: void
      }
      safe_increment: {
        Args: {
          table_name: string
          column_name: string
          id_column: string
          id_value: string
          increment_by?: number
        }
        Returns: void
      }
      stake_tokens: {
        Args: {
          p_amount: number
          p_lock_period_days?: number
        }
        Returns: string
      }
      tally_proposal_votes: {
        Args: {
          p_proposal_id: string
        }
        Returns: Json
      }
      unstake_tokens: {
        Args: {
          p_staking_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
} 