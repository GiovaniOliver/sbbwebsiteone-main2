-- Add RLS to follows-related tables
-- ===============================================

-- Enable RLS on follows table
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Create policies for follows table
CREATE POLICY "Anyone can read follows" 
ON public.follows FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can follow others" 
ON public.follows FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow others" 
ON public.follows FOR DELETE 
TO authenticated
USING (auth.uid() = follower_id);

-- Enable RLS on followers table
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;

-- Create policies for followers table
CREATE POLICY "Anyone can read followers" 
ON public.followers FOR SELECT 
TO anon, authenticated
USING (true);

-- Set up follows_count table RLS if it exists
ALTER TABLE public.follows_count ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read follow counts" 
ON public.follows_count FOR SELECT 
TO anon, authenticated
USING (true); 