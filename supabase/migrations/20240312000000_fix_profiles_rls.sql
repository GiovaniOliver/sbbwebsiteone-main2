-- Drop existing policies
DROP POLICY IF EXISTS "Select all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow service role to create profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Auth service can create profile on signup" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE
USING (auth.uid() = id);

-- Allow the service role (used by server-side operations) full access
CREATE POLICY "Service role has full access to profiles"
ON public.profiles
TO service_role
USING (true)
WITH CHECK (true);

-- Allow authenticated users to create their profile during signup
CREATE POLICY "Allow profile creation during signup"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id); 