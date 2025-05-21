-- Create or replace the trigger function that will create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    email,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', NEW.id::text || '@example.com'),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger to execute when new users sign up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read all profiles (needed for friend lists, online friends, etc.)
CREATE POLICY "Anyone can read all profiles"
ON public.profiles
FOR SELECT
TO authenticated, anon
USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow users to delete their own profile (if needed)
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Allow Supabase Auth to create profiles
CREATE POLICY "Auth service can create profile on signup"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
