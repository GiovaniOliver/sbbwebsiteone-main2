-- Add online_status column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS online_status TEXT DEFAULT 'offline';

-- Create an index on the online_status column for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_online_status ON public.profiles(online_status);

-- Update the handle_new_user function to include online_status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    email,
    online_status,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', NEW.id::text || '@example.com'),
    'offline',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update a user's online status
CREATE OR REPLACE FUNCTION public.update_online_status(user_id UUID, status TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.profiles
  SET online_status = status, updated_at = NOW()
  WHERE id = user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
