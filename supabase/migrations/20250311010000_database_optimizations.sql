-- ==============================
-- Migration File: Database Optimizations
-- Date: 2025-03-11
-- Description: Adding performance improvements and additional features
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
