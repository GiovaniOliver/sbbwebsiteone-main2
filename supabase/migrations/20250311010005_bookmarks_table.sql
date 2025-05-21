-- ==============================
-- Migration File: Bookmarks Table
-- Date: 2025-03-11
-- Description: Ensure bookmarks table exists and has proper indices and RLS
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
-- 4. Create Helper Functions
-- =====================================

-- Function to check if a content is bookmarked by the current user
CREATE OR REPLACE FUNCTION public.is_bookmarked(
  p_content_type TEXT,
  p_content_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_user_id UUID;
  v_bookmarked BOOLEAN;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  -- Return false if not authenticated
  IF v_user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if bookmarked
  SELECT EXISTS (
    SELECT 1 FROM public.bookmarks
    WHERE user_id = v_user_id
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
RETURNS BOOLEAN AS $$
DECLARE
  v_user_id UUID;
  v_bookmarked BOOLEAN;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  -- Return false if not authenticated
  IF v_user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if already bookmarked
  SELECT EXISTS (
    SELECT 1 FROM public.bookmarks
    WHERE user_id = v_user_id
    AND content_type = p_content_type
    AND content_id = p_content_id
  ) INTO v_bookmarked;
  
  -- Toggle bookmark status
  IF v_bookmarked THEN
    -- Remove bookmark
    DELETE FROM public.bookmarks
    WHERE user_id = v_user_id
    AND content_type = p_content_type
    AND content_id = p_content_id;
    
    RETURN FALSE;
  ELSE
    -- Add bookmark
    INSERT INTO public.bookmarks (
      user_id, content_type, content_id
    ) VALUES (
      v_user_id, p_content_type, p_content_id
    );
    
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 5. Add Bookmark Count to Posts
-- =====================================

-- Add bookmark_count column to posts if it doesn't exist
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS bookmark_count INTEGER DEFAULT 0;

-- Create function to update bookmark count
CREATE OR REPLACE FUNCTION public.update_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.content_type = 'post') THEN
    -- Increment bookmark_count
    UPDATE public.posts
    SET bookmark_count = bookmark_count + 1
    WHERE id = NEW.content_id;
    
  ELSIF (TG_OP = 'DELETE' AND OLD.content_type = 'post') THEN
    -- Decrement bookmark_count
    UPDATE public.posts
    SET bookmark_count = GREATEST(bookmark_count - 1, 0)
    WHERE id = OLD.content_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update bookmark count
DROP TRIGGER IF EXISTS update_post_bookmark_count ON public.bookmarks;
CREATE TRIGGER update_post_bookmark_count
AFTER INSERT OR DELETE ON public.bookmarks
FOR EACH ROW
EXECUTE FUNCTION public.update_bookmark_count();
