-- Add location fields to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;

-- Update the handle_new_user function to include location fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    email, 
    full_name, 
    first_name, 
    last_name,
    created_at,
    updated_at,
    state_code,
    city
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', NEW.id::text || '@example.com'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NOW(),
    NOW(),
    COALESCE(NEW.raw_user_meta_data->>'state_code', NULL),
    COALESCE(NEW.raw_user_meta_data->>'city', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create tables for state and city data
DROP TABLE IF EXISTS public.black_population_cities;
DROP TABLE IF EXISTS public.black_population_states;

CREATE TABLE IF NOT EXISTS public.black_population_states (
  id SERIAL PRIMARY KEY,
  state_name TEXT NOT NULL,
  state_code TEXT NOT NULL UNIQUE,
  black_population BIGINT NOT NULL,
  black_percentage TEXT NOT NULL,
  state_rank INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.black_population_cities (
  id SERIAL PRIMARY KEY,
  city_name TEXT NOT NULL,
  state_code TEXT NOT NULL,
  black_population BIGINT NOT NULL,
  black_percentage TEXT NOT NULL,
  city_rank INTEGER NOT NULL,
  FOREIGN KEY (state_code) REFERENCES public.black_population_states(state_code)
);

-- Enable RLS on new tables
ALTER TABLE public.black_population_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.black_population_cities ENABLE ROW LEVEL SECURITY;

-- Create policies for reading state and city data
CREATE POLICY "Anyone can read states data"
ON public.black_population_states
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Anyone can read cities data"
ON public.black_population_cities
FOR SELECT
TO authenticated, anon
USING (true); 