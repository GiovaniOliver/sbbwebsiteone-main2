-- ==============================
-- Consolidated Migration File (Part 3)
-- Database Optimizations and Enhancements
-- ==============================

-- This file consolidates the following migration files:
-- * 20250311010000_database_optimizations.sql
-- * 20250311010004_database_backup_restore.sql

-- ==============================
-- Database Optimizations (from 20250311010000_database_optimizations.sql)
-- ==============================

-- =====================================
-- 1. Index Optimization
-- =====================================

-- Add indices for post table
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_visibility ON public.posts(visibility);

-- Add indices for interactions
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON public.post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_video_likes_video_id ON public.video_likes(video_id);

-- Add indices for follows and relationships
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON public.follows(following_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_receiver_id ON public.friend_requests(receiver_id);

-- Add indices for group relationships
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON public.group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_posts_group_id ON public.group_posts(group_id);

-- =====================================
-- 2. Counters Management - Post Likes
-- =====================================

CREATE OR REPLACE FUNCTION public.update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    
    -- Update the user's total likes count if they're the post author
    UPDATE public.profiles
    SET total_likes = total_likes + 1
    FROM public.posts
    WHERE profiles.id = posts.author_id AND posts.id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    
    -- Update the user's total likes count if they're the post author
    UPDATE public.profiles
    SET total_likes = total_likes - 1
    FROM public.posts
    WHERE profiles.id = posts.author_id AND posts.id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trig_update_post_likes_count ON public.post_likes;
CREATE TRIGGER trig_update_post_likes_count
AFTER INSERT OR DELETE ON public.post_likes
FOR EACH ROW EXECUTE FUNCTION public.update_post_likes_count();

-- =====================================
-- 3. Counters Management - Post Comments
-- =====================================

CREATE OR REPLACE FUNCTION public.update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trig_update_post_comments_count ON public.post_comments;
CREATE TRIGGER trig_update_post_comments_count
AFTER INSERT OR DELETE ON public.post_comments
FOR EACH ROW EXECUTE FUNCTION public.update_post_comments_count();

-- =====================================
-- 4. Followers Count Tracking
-- =====================================

-- Create any missing follows_count entries
INSERT INTO public.follows_count (user_id, followers_count, following_count)
SELECT id, 0, 0 FROM public.profiles
ON CONFLICT (user_id) DO NOTHING;

-- Function to update the follows_count table
CREATE OR REPLACE FUNCTION public.update_follows_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update following count for follower
    INSERT INTO public.follows_count (user_id, followers_count, following_count)
    VALUES (NEW.follower_id, 0, 1)
    ON CONFLICT (user_id) 
    DO UPDATE SET following_count = follows_count.following_count + 1;
    
    -- Update followers count for followed user
    INSERT INTO public.follows_count (user_id, followers_count, following_count)
    VALUES (NEW.following_id, 1, 0)
    ON CONFLICT (user_id) 
    DO UPDATE SET followers_count = follows_count.followers_count + 1;
    
    -- Update the updated_at timestamp
    UPDATE public.follows_count 
    SET updated_at = NOW() 
    WHERE user_id IN (NEW.follower_id, NEW.following_id);
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrease following count for follower
    UPDATE public.follows_count 
    SET following_count = GREATEST(following_count - 1, 0),
        updated_at = NOW()
    WHERE user_id = OLD.follower_id;
    
    -- Decrease followers count for followed user
    UPDATE public.follows_count 
    SET followers_count = GREATEST(followers_count - 1, 0),
        updated_at = NOW()
    WHERE user_id = OLD.following_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trig_update_follows_count ON public.follows;
CREATE TRIGGER trig_update_follows_count
AFTER INSERT OR DELETE ON public.follows
FOR EACH ROW EXECUTE FUNCTION public.update_follows_count();

-- Calculate current counts to ensure data is accurate
-- This will run once during migration to ensure counts are correct
CREATE OR REPLACE FUNCTION public.recalculate_follows_count()
RETURNS void AS $$
BEGIN
  -- Reset all counts to zero
  UPDATE public.follows_count SET followers_count = 0, following_count = 0, updated_at = NOW();
  
  -- Calculate and update following counts
  UPDATE public.follows_count fc
  SET following_count = subquery.count
  FROM (
    SELECT follower_id as user_id, COUNT(*) as count
    FROM public.follows
    GROUP BY follower_id
  ) as subquery
  WHERE fc.user_id = subquery.user_id;
  
  -- Calculate and update followers counts
  UPDATE public.follows_count fc
  SET followers_count = subquery.count
  FROM (
    SELECT following_id as user_id, COUNT(*) as count
    FROM public.follows
    GROUP BY following_id
  ) as subquery
  WHERE fc.user_id = subquery.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Run the recalculation function
SELECT public.recalculate_follows_count();

-- =====================================
-- 5. Pagination Support
-- =====================================

-- Function for paginated posts (main feed)
CREATE OR REPLACE FUNCTION public.get_paginated_posts(
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0,
  p_visibility TEXT DEFAULT 'public'
)
RETURNS SETOF public.posts AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.posts
  WHERE visibility = p_visibility
  ORDER BY created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function for paginated user posts
CREATE OR REPLACE FUNCTION public.get_user_posts(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS SETOF public.posts AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.posts
  WHERE author_id = p_user_id
  ORDER BY created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function for paginated feed (posts from followed users)
CREATE OR REPLACE FUNCTION public.get_feed_posts(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS SETOF public.posts AS $$
BEGIN
  RETURN QUERY
  SELECT p.* FROM public.posts p
  JOIN public.follows f ON p.author_id = f.following_id
  WHERE f.follower_id = p_user_id
  ORDER BY p.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 6. DAO Token Integration
-- =====================================

-- Create DAO tokens table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.dao_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  holder_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(20,8) DEFAULT 0,
  staked_amount NUMERIC(20,8) DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on holder_id
CREATE INDEX IF NOT EXISTS idx_dao_tokens_holder_id ON public.dao_tokens(holder_id);

-- Enable RLS on dao_tokens
ALTER TABLE public.dao_tokens ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for dao_tokens
CREATE POLICY "Users can view their own token balance"
ON public.dao_tokens FOR SELECT
TO authenticated
USING (auth.uid() = holder_id);

CREATE POLICY "Service role can manage all token balances"
ON public.dao_tokens
TO service_role
USING (true);

-- Create token transaction history
CREATE TABLE IF NOT EXISTS public.dao_token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES public.profiles(id),
  to_user_id UUID REFERENCES public.profiles(id),
  amount NUMERIC(20,8) NOT NULL,
  transaction_type TEXT NOT NULL,
  transaction_hash TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indices for transaction history
CREATE INDEX IF NOT EXISTS idx_dao_token_transactions_from_user_id 
ON public.dao_token_transactions(from_user_id);

CREATE INDEX IF NOT EXISTS idx_dao_token_transactions_to_user_id 
ON public.dao_token_transactions(to_user_id);

-- Enable RLS on dao_token_transactions
ALTER TABLE public.dao_token_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for dao_token_transactions
CREATE POLICY "Users can view their own token transactions"
ON public.dao_token_transactions FOR SELECT
TO authenticated
USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Service role can manage all token transactions"
ON public.dao_token_transactions
TO service_role
USING (true);

-- =====================================
-- 7. Post and Content Archiving
-- =====================================

-- Add archived column to posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;

-- Add index for archived status
CREATE INDEX IF NOT EXISTS idx_posts_archived ON public.posts(archived);

-- Modify RLS policies to respect archived status for public users
DROP POLICY IF EXISTS "Anyone can read all posts" ON public.posts;
CREATE POLICY "Anyone can read non-archived posts"
ON public.posts
FOR SELECT
TO authenticated, anon
USING (NOT archived);

-- Admins and owners can still see archived posts
CREATE POLICY "Post owners can see their archived posts"
ON public.posts
FOR SELECT
TO authenticated
USING (auth.uid() = author_id);

-- Create a function to archive posts instead of deleting them
CREATE OR REPLACE FUNCTION public.archive_post(post_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  post_author_id UUID;
BEGIN
  -- Get the author_id of the post
  SELECT author_id INTO post_author_id FROM public.posts WHERE id = post_id;
  
  -- Check if the current user is the author
  IF post_author_id = auth.uid() THEN
    -- Archive the post instead of deleting
    UPDATE public.posts SET archived = TRUE WHERE id = post_id;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add similar archiving to other content types
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;
ALTER TABLE public.marketplace_listings ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;

-- =====================================
-- 8. Additional RLS Policies
-- =====================================

-- RLS for post_comments
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read comments" ON public.post_comments;
CREATE POLICY "Anyone can read comments"
ON public.post_comments
FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Users can create their own comments" ON public.post_comments;
CREATE POLICY "Users can create their own comments"
ON public.post_comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own comments" ON public.post_comments;
CREATE POLICY "Users can update their own comments"
ON public.post_comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own comments" ON public.post_comments;
CREATE POLICY "Users can delete their own comments"
ON public.post_comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS for videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view videos" ON public.videos;
CREATE POLICY "Anyone can view videos"
ON public.videos
FOR SELECT
TO authenticated, anon
USING (NOT archived);

DROP POLICY IF EXISTS "Users can upload their own videos" ON public.videos;
CREATE POLICY "Users can upload their own videos"
ON public.videos
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own videos" ON public.videos;
CREATE POLICY "Users can update their own videos"
ON public.videos
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own archived videos" ON public.videos;
CREATE POLICY "Users can view their own archived videos"
ON public.videos
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS for marketplace_listings
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active marketplace listings" ON public.marketplace_listings;
CREATE POLICY "Anyone can view active marketplace listings"
ON public.marketplace_listings
FOR SELECT
TO authenticated, anon
USING (status = 'active' AND NOT archived);

DROP POLICY IF EXISTS "Users can create their own listings" ON public.marketplace_listings;
CREATE POLICY "Users can create their own listings"
ON public.marketplace_listings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = seller_id);

DROP POLICY IF EXISTS "Users can update their own listings" ON public.marketplace_listings;
CREATE POLICY "Users can update their own listings"
ON public.marketplace_listings
FOR UPDATE
TO authenticated
USING (auth.uid() = seller_id)
WITH CHECK (auth.uid() = seller_id);

DROP POLICY IF EXISTS "Users can view all their own listings" ON public.marketplace_listings;
CREATE POLICY "Users can view all their own listings"
ON public.marketplace_listings
FOR SELECT
TO authenticated
USING (auth.uid() = seller_id);

-- RLS for groups
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view public groups" ON public.groups;
CREATE POLICY "Anyone can view public groups"
ON public.groups
FOR SELECT
TO authenticated, anon
USING (privacy = 'public');

DROP POLICY IF EXISTS "Members can view private groups" ON public.groups;
CREATE POLICY "Members can view private groups"
ON public.groups
FOR SELECT
TO authenticated
USING (
  privacy = 'private' AND
  EXISTS (
    SELECT 1 FROM public.group_members
    WHERE group_id = public.groups.id
    AND user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can create groups" ON public.groups;
CREATE POLICY "Users can create groups"
ON public.groups
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Group creators can update their groups" ON public.groups;
CREATE POLICY "Group creators can update their groups"
ON public.groups
FOR UPDATE
TO authenticated
USING (auth.uid() = creator_id)
WITH CHECK (auth.uid() = creator_id);

-- =====================================
-- 9. Performance Optimizations
-- =====================================

-- Add updated_at timestamp trigger to dao_tokens
CREATE TRIGGER handle_dao_tokens_updated_at
BEFORE UPDATE ON public.dao_tokens
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Add updated_at timestamp trigger to marketplace_listings if not exists
DROP TRIGGER IF EXISTS handle_marketplace_listings_updated_at ON public.marketplace_listings;
CREATE TRIGGER handle_marketplace_listings_updated_at
BEFORE UPDATE ON public.marketplace_listings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Function to safely increment numeric counters
CREATE OR REPLACE FUNCTION public.safe_increment(
  table_name text,
  column_name text,
  id_column text,
  id_value uuid,
  increment_by integer DEFAULT 1
) RETURNS void AS $$
DECLARE
  update_query text;
BEGIN
  update_query := format(
    'UPDATE public.%I SET %I = GREATEST(%I + %s, 0) WHERE %I = %L',
    table_name,
    column_name,
    column_name,
    increment_by,
    id_column,
    id_value
  );
  
  EXECUTE update_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================
-- Database Backup and Restore (from 20250311010004_database_backup_restore.sql)
-- ==============================

-- =====================================
-- 1. Create Backup Tables
-- =====================================

-- Database backups table
CREATE TABLE IF NOT EXISTS public.database_backups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_name TEXT NOT NULL,
  backup_path TEXT NOT NULL,
  backup_size BIGINT, -- in bytes
  backup_type TEXT NOT NULL, -- 'full', 'incremental', 'schema_only', etc.
  status TEXT NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed'
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  initiated_by UUID REFERENCES public.profiles(id),
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER handle_database_backups_updated_at
BEFORE UPDATE ON public.database_backups
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Indices for database_backups
CREATE INDEX IF NOT EXISTS idx_database_backups_backup_type ON public.database_backups(backup_type);
CREATE INDEX IF NOT EXISTS idx_database_backups_status ON public.database_backups(status);
CREATE INDEX IF NOT EXISTS idx_database_backups_started_at ON public.database_backups(started_at DESC);

-- Database restores table
CREATE TABLE IF NOT EXISTS public.database_restores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_id UUID REFERENCES public.database_backups(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed'
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  initiated_by UUID REFERENCES public.profiles(id),
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER handle_database_restores_updated_at
BEFORE UPDATE ON public.database_restores
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Indices for database_restores
CREATE INDEX IF NOT EXISTS idx_database_restores_backup_id ON public.database_restores(backup_id);
CREATE INDEX IF NOT EXISTS idx_database_restores_status ON public.database_restores(status);
CREATE INDEX IF NOT EXISTS idx_database_restores_started_at ON public.database_restores(started_at DESC);

-- Scheduled backups table
CREATE TABLE IF NOT EXISTS public.scheduled_backups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_name TEXT NOT NULL,
  backup_type TEXT NOT NULL, -- 'full', 'incremental', 'schema_only', etc.
  schedule TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', etc. or cron expression
  retention_period INTEGER NOT NULL, -- in days
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_run TIMESTAMPTZ,
  next_run TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER handle_scheduled_backups_updated_at
BEFORE UPDATE ON public.scheduled_backups
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Indices for scheduled_backups
CREATE INDEX IF NOT EXISTS idx_scheduled_backups_is_active ON public.scheduled_backups(is_active);
CREATE INDEX IF NOT EXISTS idx_scheduled_backups_next_run ON public.scheduled_backups(next_run);

-- =====================================
-- 2. Create Backup Helper Functions
-- =====================================

-- Function to log a backup operation
CREATE OR REPLACE FUNCTION public.log_database_backup(
  p_backup_name TEXT,
  p_backup_path TEXT,
  p_backup_type TEXT,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  backup_id UUID;
BEGIN
  INSERT INTO public.database_backups (
    backup_name,
    backup_path,
    backup_type,
    initiated_by,
    metadata
  )
  VALUES (
    p_backup_name,
    p_backup_path,
    p_backup_type,
    auth.uid(),
    p_metadata
  )
  RETURNING id INTO backup_id;
  
  RETURN backup_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update backup status
CREATE OR REPLACE FUNCTION public.update_backup_status(
  p_backup_id UUID,
  p_status TEXT,
  p_backup_size BIGINT DEFAULT NULL,
  p_error_message TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.database_backups
  SET
    status = p_status,
    backup_size = COALESCE(p_backup_size, backup_size),
    error_message = p_error_message,
    completed_at = CASE WHEN p_status IN ('completed', 'failed') THEN NOW() ELSE NULL END
  WHERE id = p_backup_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to list available backups for restore
CREATE OR REPLACE FUNCTION public.list_available_backups(
  p_backup_type TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS SETOF public.database_backups AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.database_backups
  WHERE status = 'completed'
    AND (p_backup_type IS NULL OR backup_type = p_backup_type)
  ORDER BY completed_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log a restore operation
CREATE OR REPLACE FUNCTION public.log_database_restore(
  p_backup_id UUID,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  restore_id UUID;
BEGIN
  -- Check if backup exists and is completed
  IF NOT EXISTS (
    SELECT 1 FROM public.database_backups
    WHERE id = p_backup_id AND status = 'completed'
  ) THEN
    RAISE EXCEPTION 'Backup does not exist or is not completed';
  END IF;
  
  INSERT INTO public.database_restores (
    backup_id,
    initiated_by,
    metadata
  )
  VALUES (
    p_backup_id,
    auth.uid(),
    p_metadata
  )
  RETURNING id INTO restore_id;
  
  RETURN restore_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update restore status
CREATE OR REPLACE FUNCTION public.update_restore_status(
  p_restore_id UUID,
  p_status TEXT,
  p_error_message TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.database_restores
  SET
    status = p_status,
    error_message = p_error_message,
    completed_at = CASE WHEN p_status IN ('completed', 'failed') THEN NOW() ELSE NULL END
  WHERE id = p_restore_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a scheduled backup
CREATE OR REPLACE FUNCTION public.create_scheduled_backup(
  p_backup_name TEXT,
  p_backup_type TEXT,
  p_schedule TEXT,
  p_retention_period INTEGER
)
RETURNS UUID AS $$
DECLARE
  schedule_id UUID;
  next_run_time TIMESTAMPTZ;
BEGIN
  -- Calculate next run time based on schedule
  IF p_schedule = 'daily' THEN
    next_run_time := NOW() + INTERVAL '1 day';
  ELSIF p_schedule = 'weekly' THEN
    next_run_time := NOW() + INTERVAL '1 week';
  ELSIF p_schedule = 'monthly' THEN
    next_run_time := NOW() + INTERVAL '1 month';
  ELSE
    -- Default to tomorrow
    next_run_time := NOW() + INTERVAL '1 day';
  END IF;
  
  INSERT INTO public.scheduled_backups (
    backup_name,
    backup_type,
    schedule,
    retention_period,
    next_run,
    created_by
  )
  VALUES (
    p_backup_name,
    p_backup_type,
    p_schedule,
    p_retention_period,
    next_run_time,
    auth.uid()
  )
  RETURNING id INTO schedule_id;
  
  RETURN schedule_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get due scheduled backups
CREATE OR REPLACE FUNCTION public.get_due_scheduled_backups()
RETURNS SETOF public.scheduled_backups AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.scheduled_backups
  WHERE is_active = TRUE
    AND (next_run IS NULL OR next_run <= NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update scheduled backup after run
CREATE OR REPLACE FUNCTION public.update_scheduled_backup_after_run(
  p_schedule_id UUID,
  p_backup_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_schedule TEXT;
  next_run_time TIMESTAMPTZ;
BEGIN
  -- Get schedule type
  SELECT schedule INTO v_schedule
  FROM public.scheduled_backups
  WHERE id = p_schedule_id;
  
  -- Calculate next run time based on schedule
  IF v_schedule = 'daily' THEN
    next_run_time := NOW() + INTERVAL '1 day';
  ELSIF v_schedule = 'weekly' THEN
    next_run_time := NOW() + INTERVAL '1 week';
  ELSIF v_schedule = 'monthly' THEN
    next_run_time := NOW() + INTERVAL '1 month';
  ELSE
    -- Default to tomorrow
    next_run_time := NOW() + INTERVAL '1 day';
  END IF;
  
  -- Update the scheduled backup
  UPDATE public.scheduled_backups
  SET
    last_run = NOW(),
    next_run = next_run_time,
    metadata = jsonb_set(
      COALESCE(metadata, '{}'::jsonb),
      '{last_backup_id}',
      to_jsonb(p_backup_id)
    )
  WHERE id = p_schedule_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to prune old backups based on retention period
CREATE OR REPLACE FUNCTION public.prune_old_backups()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
  r RECORD;
BEGIN
  -- For each scheduled backup
  FOR r IN 
    SELECT id, backup_type, retention_period
    FROM public.scheduled_backups
    WHERE is_active = TRUE AND retention_period IS NOT NULL AND retention_period > 0
  LOOP
    -- Delete backups older than retention period
    WITH deleted AS (
      DELETE FROM public.database_backups
      WHERE backup_type = r.backup_type
        AND status = 'completed'
        AND completed_at < (NOW() - (r.retention_period || ' days')::INTERVAL)
        -- Don't delete backups referenced by restores
        AND NOT EXISTS (
          SELECT 1 FROM public.database_restores
          WHERE backup_id = database_backups.id
        )
      RETURNING 1
    )
    SELECT COUNT(*) FROM deleted INTO deleted_count;
  END LOOP;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 3. Enable RLS on backup tables
-- =====================================

-- Enable RLS on database_backups
ALTER TABLE public.database_backups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can view all backups"
ON public.database_backups
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
);

CREATE POLICY "Users can view backups they initiated"
ON public.database_backups
FOR SELECT
TO authenticated
USING (initiated_by = auth.uid());

-- Enable RLS on database_restores
ALTER TABLE public.database_restores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can view all restores"
ON public.database_restores
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
);

CREATE POLICY "Users can view restores they initiated"
ON public.database_restores
FOR SELECT
TO authenticated
USING (initiated_by = auth.uid());

-- Enable RLS on scheduled_backups
ALTER TABLE public.scheduled_backups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can view all scheduled backups"
ON public.scheduled_backups
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
);

CREATE POLICY "Users can view scheduled backups they created"
ON public.scheduled_backups
FOR SELECT
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Admins can create scheduled backups"
ON public.scheduled_backups
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
);

CREATE POLICY "Admins can update scheduled backups"
ON public.scheduled_backups
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
);

CREATE POLICY "Admins can delete scheduled backups"
ON public.scheduled_backups
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  )
); 