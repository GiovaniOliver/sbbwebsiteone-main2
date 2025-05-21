-- Add RLS policies for post_likes and post_comments tables
-- ===============================================

-- Enable RLS on post_likes table
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for post_likes table
CREATE POLICY "Anyone can read post likes" 
ON public.post_likes FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can create likes" 
ON public.post_likes FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can delete their own likes" 
ON public.post_likes FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Enable RLS on post_comments table
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for post_comments table
CREATE POLICY "Anyone can read post comments" 
ON public.post_comments FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON public.post_comments FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own comments" 
ON public.post_comments FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.post_comments FOR DELETE 
TO authenticated
USING (auth.uid() = user_id); 