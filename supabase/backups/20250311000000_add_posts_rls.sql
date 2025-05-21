-- Add RLS policies for posts table

-- Make sure RLS is enabled
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all posts
CREATE POLICY "Anyone can read all posts"
ON public.posts
FOR SELECT
TO authenticated, anon
USING (true);

-- Allow authenticated users to create posts
CREATE POLICY "Authenticated users can create posts"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);

-- Allow users to update their own posts
CREATE POLICY "Users can update their own posts"
ON public.posts
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Allow users to delete their own posts
CREATE POLICY "Users can delete their own posts"
ON public.posts
FOR DELETE
TO authenticated
USING (auth.uid() = author_id);

-- Service role can do everything
CREATE POLICY "Service role can do anything with posts" 
ON public.posts
TO service_role
USING (true); 