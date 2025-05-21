-- ==============================
-- Consolidated Migration File (Part 2)
-- Row Level Security (RLS) and Helper Functions
-- ==============================

-- This file consolidates the following migration files:
-- * 20250311000000_add_posts_rls.sql
-- * 20250311000001_add_rls_helper_function.sql
-- * 20250311000002_add_storage_rls.sql
-- * 20250311000003_add_post_relations_rls.sql
-- * 20250311000004_fix_public_schema_permissions.sql
-- * 20250311000005_add_follows_rls.sql

-- ==============================
-- Posts RLS (from 20250311000000_add_posts_rls.sql)
-- ==============================

-- Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies for posts table
CREATE POLICY "Posts are viewable by everyone"
ON public.posts
FOR SELECT
USING (
  -- Public posts are visible to everyone
  (visibility = 'public' AND status = 'published' AND (archived IS NULL OR archived = false))
  OR 
  -- Followers-only posts are visible to followers and the author
  (visibility = 'followers' AND status = 'published' AND (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM public.follows 
      WHERE following_id = author_id AND follower_id = auth.uid()
    )
  ))
  OR
  -- Private posts are only visible to the author
  (visibility = 'private' AND auth.uid() = author_id)
  OR
  -- Archived posts are only visible to the author
  (archived = true AND auth.uid() = author_id)
);

CREATE POLICY "Users can create their own posts"
ON public.posts
FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
ON public.posts
FOR UPDATE
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts"
ON public.posts
FOR DELETE
USING (auth.uid() = author_id);

-- ==============================
-- RLS Helper Function (from 20250311000001_add_rls_helper_function.sql)
-- ==============================

-- Create RLS helper function
CREATE OR REPLACE FUNCTION public.check_rls_access(
  table_name TEXT,
  operation TEXT, -- 'SELECT', 'INSERT', 'UPDATE', 'DELETE'
  test_row JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
  query TEXT;
  result BOOLEAN;
BEGIN
  -- Construct a query to test if the current user has permission to perform the operation
  IF operation = 'SELECT' THEN
    query := format('
      SELECT EXISTS (
        SELECT 1 FROM %I
        WHERE TRUE
        LIMIT 1
      )', table_name);
  ELSIF operation = 'INSERT' THEN
    query := format('
      SELECT EXISTS (
        WITH inserted AS (
          SELECT * FROM json_populate_record(NULL::%I, %L)
        )
        SELECT 1 FROM inserted
        WHERE TRUE
        LIMIT 1
      )', table_name, test_row);
  ELSIF operation = 'UPDATE' THEN
    query := format('
      SELECT EXISTS (
        WITH updated AS (
          SELECT * FROM json_populate_record(NULL::%I, %L)
        )
        SELECT 1 FROM updated
        WHERE TRUE
        LIMIT 1
      )', table_name, test_row);
  ELSIF operation = 'DELETE' THEN
    query := format('
      SELECT EXISTS (
        WITH deleted AS (
          SELECT * FROM json_populate_record(NULL::%I, %L)
        )
        SELECT 1 FROM deleted
        WHERE TRUE
        LIMIT 1
      )', table_name, test_row);
  ELSE
    RAISE EXCEPTION 'Invalid operation: %', operation;
  END IF;

  EXECUTE query INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================
-- Storage RLS (from 20250311000002_add_storage_rls.sql)
-- ==============================

-- Create helper function for storage access
CREATE OR REPLACE FUNCTION public.check_storage_access(
  bucket_id TEXT,
  operation TEXT, -- 'READ', 'WRITE', 'DELETE'
  file_path TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Get current user ID
  user_id := auth.uid();
  
  -- If no user, no access
  IF user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Public bucket - anyone can read, only authenticated users can write
  IF bucket_id = 'public' THEN
    -- Read access to public bucket
    IF operation = 'READ' THEN
      RETURN TRUE;
    
    -- Write/delete access for authenticated users to their own path
    ELSIF (operation = 'WRITE' OR operation = 'DELETE') THEN
      -- Check if the file_path starts with the user's ID path
      RETURN file_path ~ ('^' || user_id || '/');
    ELSE
      RETURN FALSE;
    END IF;
  
  -- Avatars bucket - anyone can read, only authenticated users can write to their own path
  ELSIF bucket_id = 'avatars' THEN
    -- Read access to avatars
    IF operation = 'READ' THEN
      RETURN TRUE;
    
    -- Write/delete access to their own avatar
    ELSIF (operation = 'WRITE' OR operation = 'DELETE') THEN
      -- Check if the file_path starts with the user's ID
      RETURN file_path ~ ('^' || user_id || '/');
    ELSE
      RETURN FALSE;
    END IF;
  
  -- Private bucket - only owner can access their path
  ELSIF bucket_id = 'private' THEN
    -- All operations require the path to start with user ID
    RETURN file_path ~ ('^' || user_id || '/');
  
  -- Default to no access for unknown buckets
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up storage policies
CREATE POLICY "Public bucket: anyone can read"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'public' AND
  (auth.role() = 'authenticated' OR auth.role() = 'anon')
);

CREATE POLICY "Public bucket: authenticated users can upload to their own folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'public' AND
  auth.role() = 'authenticated' AND
  (object_path ~ ('^' || auth.uid() || '/'))
);

CREATE POLICY "Public bucket: authenticated users can update objects in their own folder"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'public' AND
  auth.role() = 'authenticated' AND
  (object_path ~ ('^' || auth.uid() || '/'))
);

CREATE POLICY "Public bucket: authenticated users can delete objects in their own folder"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'public' AND
  auth.role() = 'authenticated' AND
  (object_path ~ ('^' || auth.uid() || '/'))
);

-- ==============================
-- Post Relations RLS (from 20250311000003_add_post_relations_rls.sql)
-- ==============================

-- Enable RLS on post_likes table
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for post_likes
CREATE POLICY "Anyone can view post likes"
ON public.post_likes
FOR SELECT
USING (true);

CREATE POLICY "Users can like posts"
ON public.post_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their likes"
ON public.post_likes
FOR DELETE
USING (auth.uid() = user_id);

-- Enable RLS on post_comments table
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for post_comments
CREATE POLICY "Anyone can view post comments"
ON public.post_comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.posts p
    WHERE p.id = post_id
    AND (
      -- Comment is on a public post
      (p.visibility = 'public' AND p.status = 'published' AND (p.archived IS NULL OR p.archived = false))
      OR 
      -- Comment is on a followers-only post and user is a follower or author
      (p.visibility = 'followers' AND p.status = 'published' AND (
        auth.uid() = p.author_id OR
        EXISTS (
          SELECT 1 FROM public.follows 
          WHERE following_id = p.author_id AND follower_id = auth.uid()
        )
      ))
      OR
      -- Comment is on a private post and user is the author
      (p.visibility = 'private' AND auth.uid() = p.author_id)
      OR
      -- Comment is on an archived post and user is the author
      (p.archived = true AND auth.uid() = p.author_id)
    )
  )
);

CREATE POLICY "Users can comment on viewable posts"
ON public.post_comments
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.posts p
    WHERE p.id = post_id
    AND (
      -- Can comment on public posts
      (p.visibility = 'public' AND p.status = 'published' AND (p.archived IS NULL OR p.archived = false))
      OR 
      -- Can comment on followers-only posts if user is a follower or author
      (p.visibility = 'followers' AND p.status = 'published' AND (
        auth.uid() = p.author_id OR
        EXISTS (
          SELECT 1 FROM public.follows 
          WHERE following_id = p.author_id AND follower_id = auth.uid()
        )
      ))
    )
  )
);

CREATE POLICY "Users can edit their own comments"
ON public.post_comments
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.post_comments
FOR DELETE
USING (auth.uid() = user_id);

-- ==============================
-- Fix Public Schema Permissions (from 20250311000004_fix_public_schema_permissions.sql)
-- ==============================

-- Grant usage on public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant select on all tables in public schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;

-- Grant execute on all functions in public schema
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- Grant all on sequences in public schema
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- For authenticated users, grant insert, update, delete permissions (RLS will control access)
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO authenticated;

-- ==============================
-- Follows RLS (from 20250311000005_add_follows_rls.sql)
-- ==============================

-- Enable RLS on follows table
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Create policies for follows table
CREATE POLICY "Anyone can view follows relationships"
ON public.follows
FOR SELECT
USING (true);

CREATE POLICY "Users can follow others"
ON public.follows
FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow others"
ON public.follows
FOR DELETE
USING (auth.uid() = follower_id);

-- Enable RLS on follows_count table
ALTER TABLE public.follows_count ENABLE ROW LEVEL SECURITY;

-- Create policies for follows_count table
CREATE POLICY "Anyone can view follows counts"
ON public.follows_count
FOR SELECT
USING (true);

-- Service role handles updates to follows_count via triggers
CREATE POLICY "Only service role can modify follows counts"
ON public.follows_count
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
