-- ==============================
-- Consolidated Migration File (Part 6)
-- Bookmarks Functionality
-- ==============================

-- This file consolidates the following migration files:
-- * 20250311010005_bookmarks_table.sql

-- ==============================
-- Bookmarks Table (from 20250311010005_bookmarks_table.sql)
-- ==============================

-- =====================================
-- 1. Create Bookmarks Table if not exists
-- =====================================

-- Make sure the bookmarks table exists and has the right structure
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================
-- 2. Add Indices for Performance
-- =====================================

-- Add indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_content_id ON public.bookmarks(content_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_content_type ON public.bookmarks(content_type);
CREATE INDEX IF NOT EXISTS idx_bookmarks_composite ON public.bookmarks(user_id, content_type, content_id);

-- =====================================
-- 3. Enable Row Level Security (RLS)
-- =====================================

-- Enable RLS on bookmarks table
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Users can view their own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can view their own bookmarks"
ON public.bookmarks
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can create their own bookmarks"
ON public.bookmarks
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can delete their own bookmarks"
ON public.bookmarks
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- =====================================
-- 4. Utility Functions
-- =====================================

-- Function to check if content is bookmarked
CREATE OR REPLACE FUNCTION public.is_bookmarked(
  p_content_type TEXT,
  p_content_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_bookmarked BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM public.bookmarks
    WHERE user_id = auth.uid()
      AND content_type = p_content_type
      AND content_id = p_content_id
  ) INTO v_bookmarked;
  
  RETURN v_bookmarked;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle bookmark status
CREATE OR REPLACE FUNCTION public.toggle_bookmark(
  p_content_type TEXT,
  p_content_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_bookmarked BOOLEAN;
  v_exists BOOLEAN;
  v_valid_content BOOLEAN;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Validate content type
  IF p_content_type NOT IN ('post', 'video', 'event', 'marketplace', 'group') THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid content type'
    );
  END IF;
  
  -- Validate content exists
  CASE p_content_type
    WHEN 'post' THEN
      SELECT EXISTS (
        SELECT 1 FROM public.posts WHERE id = p_content_id
      ) INTO v_valid_content;
    WHEN 'video' THEN
      SELECT EXISTS (
        SELECT 1 FROM public.videos WHERE id = p_content_id
      ) INTO v_valid_content;
    WHEN 'event' THEN
      SELECT EXISTS (
        SELECT 1 FROM public.events WHERE id = p_content_id
      ) INTO v_valid_content;
    WHEN 'marketplace' THEN
      SELECT EXISTS (
        SELECT 1 FROM public.marketplace_listings WHERE id = p_content_id
      ) INTO v_valid_content;
    WHEN 'group' THEN
      SELECT EXISTS (
        SELECT 1 FROM public.groups WHERE id = p_content_id
      ) INTO v_valid_content;
    ELSE
      v_valid_content := FALSE;
  END CASE;
  
  IF NOT v_valid_content THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Content does not exist'
    );
  END IF;
  
  -- Check if bookmark exists
  SELECT EXISTS (
    SELECT 1
    FROM public.bookmarks
    WHERE user_id = v_user_id
      AND content_type = p_content_type
      AND content_id = p_content_id
  ) INTO v_exists;
  
  -- Toggle bookmark status
  IF v_exists THEN
    -- Remove bookmark
    DELETE FROM public.bookmarks
    WHERE user_id = v_user_id
      AND content_type = p_content_type
      AND content_id = p_content_id;
    
    v_bookmarked := FALSE;
  ELSE
    -- Add bookmark
    INSERT INTO public.bookmarks (
      user_id,
      content_type,
      content_id
    )
    VALUES (
      v_user_id,
      p_content_type,
      p_content_id
    );
    
    v_bookmarked := TRUE;
  END IF;
  
  -- Return result
  RETURN jsonb_build_object(
    'success', true,
    'bookmarked', v_bookmarked,
    'content_type', p_content_type,
    'content_id', p_content_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 5. Add Bookmark Count to Content
-- =====================================

-- Add bookmark_count column to posts if not exists
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS bookmark_count INTEGER DEFAULT 0;

-- Add bookmark_count column to videos if not exists
ALTER TABLE public.videos 
ADD COLUMN IF NOT EXISTS bookmark_count INTEGER DEFAULT 0;

-- Add bookmark_count column to events if not exists
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS bookmark_count INTEGER DEFAULT 0;

-- Function to update bookmark counts
CREATE OR REPLACE FUNCTION public.update_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment bookmark count based on content type
    CASE NEW.content_type
      WHEN 'post' THEN
        UPDATE public.posts
        SET bookmark_count = bookmark_count + 1
        WHERE id = NEW.content_id;
      WHEN 'video' THEN
        UPDATE public.videos
        SET bookmark_count = bookmark_count + 1
        WHERE id = NEW.content_id;
      WHEN 'event' THEN
        UPDATE public.events
        SET bookmark_count = bookmark_count + 1
        WHERE id = NEW.content_id;
    END CASE;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement bookmark count based on content type
    CASE OLD.content_type
      WHEN 'post' THEN
        UPDATE public.posts
        SET bookmark_count = GREATEST(bookmark_count - 1, 0)
        WHERE id = OLD.content_id;
      WHEN 'video' THEN
        UPDATE public.videos
        SET bookmark_count = GREATEST(bookmark_count - 1, 0)
        WHERE id = OLD.content_id;
      WHEN 'event' THEN
        UPDATE public.events
        SET bookmark_count = GREATEST(bookmark_count - 1, 0)
        WHERE id = OLD.content_id;
    END CASE;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update bookmark counts
DROP TRIGGER IF EXISTS update_post_bookmark_count ON public.bookmarks;
CREATE TRIGGER update_post_bookmark_count
AFTER INSERT OR DELETE ON public.bookmarks
FOR EACH ROW EXECUTE FUNCTION public.update_bookmark_count(); 