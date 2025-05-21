-- Drop existing policy
DROP POLICY IF EXISTS "Select all profiles" ON public.profiles;

-- Create comprehensive RLS policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create the auth trigger if missing
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 