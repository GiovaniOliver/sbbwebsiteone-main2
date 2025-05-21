-- Fix permissions for public schema tables
-- ===============================================

-- Grant usage on the public schema to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant all privileges on all tables in public schema to postgres
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;

-- Grant access to anon and authenticated roles for each table
-- Profiles table
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

-- Posts table
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;

-- Post likes table
GRANT SELECT ON public.post_likes TO anon, authenticated;
GRANT INSERT, DELETE ON public.post_likes TO authenticated;

-- Post comments table
GRANT SELECT ON public.post_comments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.post_comments TO authenticated;

-- Stories table
GRANT SELECT ON public.stories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.stories TO authenticated;

-- Videos table
GRANT SELECT ON public.videos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.videos TO authenticated;

-- Event tables
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT SELECT ON public.event_participants TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.event_participants TO authenticated;

-- Followers and follows tables
GRANT SELECT ON public.followers TO anon, authenticated;
GRANT INSERT, DELETE ON public.followers TO authenticated;
GRANT SELECT ON public.follows TO anon, authenticated;
GRANT INSERT, DELETE ON public.follows TO authenticated;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO anon, authenticated;
    
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT INSERT, UPDATE, DELETE ON TABLES TO authenticated; 