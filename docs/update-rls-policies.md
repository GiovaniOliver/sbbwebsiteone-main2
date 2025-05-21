# How to Apply RLS Policy Fixes

Follow these steps to fix the Row-Level Security (RLS) policy issues in your Supabase project:

## Step 1: Access the Supabase SQL Editor

1. Open your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query

## Step 2: Apply the RLS Policies

Copy and paste the following SQL statements into the editor and run them:

```sql
-- Enable RLS on all buckets
ALTER BUCKET "avatars" ENABLE ROW LEVEL SECURITY;
ALTER BUCKET "post-media" ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own files with path pattern matching
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  -- Only allow uploads to paths that start with the user's ID
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to update their own files
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to delete their own files
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow authenticated users to read from any path in the avatars bucket
CREATE POLICY "Authenticated users can read any avatar"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'avatars'
);

-- Add public read access for avatars if needed
CREATE POLICY "Public users can read avatars"
ON storage.objects FOR SELECT TO anon
USING (
  bucket_id = 'avatars'
);

-- Add policies for post-media bucket
CREATE POLICY "Users can upload their own post media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own post media"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own post media"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can read any post media"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'post-media'
);

CREATE POLICY "Public users can read post media"
ON storage.objects FOR SELECT TO anon
USING (
  bucket_id = 'post-media'
);

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

-- Function to check if the current user can perform a specific operation on a table
CREATE OR REPLACE FUNCTION public.check_rls_access(
  table_name text,
  operation text, -- 'SELECT', 'INSERT', 'UPDATE', 'DELETE'
  test_row jsonb DEFAULT '{}'::jsonb
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  query text;
  result boolean;
BEGIN
  -- Ensure operation is uppercase
  operation := upper(operation);
  
  -- Validate operation
  IF operation NOT IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE') THEN
    RAISE EXCEPTION 'Invalid operation: %. Must be SELECT, INSERT, UPDATE, or DELETE', operation;
  END IF;
  
  -- Check if RLS is enabled for the table
  IF EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = table_name 
    AND rowsecurity = true
  ) THEN
    -- For SELECT, INSERT, UPDATE, DELETE operations
    IF operation = 'SELECT' THEN
      EXECUTE format('SELECT EXISTS (
        SELECT 1 FROM public.%I LIMIT 1
      )', table_name) INTO result;
      
    ELSIF operation = 'INSERT' THEN
      BEGIN
        EXECUTE format('
          WITH inserted AS (
            INSERT INTO public.%I (
              SELECT * FROM jsonb_populate_record(null::public.%I, %L)
            )
            RETURNING 1
          )
          SELECT EXISTS (SELECT 1 FROM inserted)
        ', table_name, table_name, test_row);
        result := true;
      EXCEPTION WHEN OTHERS THEN
        result := false;
      END;
      
    ELSIF operation = 'UPDATE' THEN
      BEGIN
        EXECUTE format('
          SELECT EXISTS (
            SELECT 1 FROM public.%I 
            WHERE current_setting(''auth.uid'') = (id)::text
            AND pg_catalog.pg_has_role(current_setting(''auth.uid'')::uuid, ''authenticated'', ''member'')
            LIMIT 1
          )
        ', table_name) INTO result;
      EXCEPTION WHEN OTHERS THEN
        result := false;
      END;
      
    ELSIF operation = 'DELETE' THEN
      BEGIN
        EXECUTE format('
          SELECT EXISTS (
            SELECT 1 FROM public.%I 
            WHERE current_setting(''auth.uid'') = (id)::text
            AND pg_catalog.pg_has_role(current_setting(''auth.uid'')::uuid, ''authenticated'', ''member'')
            LIMIT 1
          )
        ', table_name) INTO result;
      EXCEPTION WHEN OTHERS THEN
        result := false;
      END;
    END IF;
    
    RETURN result;
  ELSE
    -- RLS is not enabled for this table
    RETURN NULL;
  END IF;
END;
$$;

-- Function to check if current user has storage bucket access
CREATE OR REPLACE FUNCTION public.check_storage_access(
  bucket_id text,
  operation text,  -- 'SELECT', 'INSERT', 'UPDATE', 'DELETE'
  file_path text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_id uuid;
  result boolean;
BEGIN
  -- Get current user ID
  user_id := auth.uid();
  
  -- Default file path if not provided
  IF file_path IS NULL THEN
    file_path := user_id || '/test-file.txt';
  END IF;
  
  -- Ensure operation is uppercase
  operation := upper(operation);
  
  -- Validate operation
  IF operation NOT IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE') THEN
    RAISE EXCEPTION 'Invalid operation: %. Must be SELECT, INSERT, UPDATE, or DELETE', operation;
  END IF;
  
  -- Check bucket exists
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = bucket_id
  ) THEN
    RETURN false;
  END IF;
  
  -- Test access based on operation
  BEGIN
    IF operation = 'SELECT' THEN
      -- Check if user can read from bucket
      EXECUTE format('
        SELECT EXISTS (
          SELECT 1 FROM storage.objects
          WHERE bucket_id = %L AND name = %L
          LIMIT 1
        )', bucket_id, file_path) INTO result;
      
    ELSIF operation = 'INSERT' THEN
      -- Check if user can insert into bucket
      EXECUTE format('
        SELECT pg_catalog.pg_has_role(%L, ''authenticated'', ''member'')
        AND EXISTS (
          SELECT 1 FROM storage.buckets
          WHERE name = %L
        )', user_id, bucket_id) INTO result;
      
    ELSIF operation IN ('UPDATE', 'DELETE') THEN
      -- Check if user can update/delete in bucket
      EXECUTE format('
        SELECT pg_catalog.pg_has_role(%L, ''authenticated'', ''member'')
        AND EXISTS (
          SELECT 1 FROM storage.objects
          WHERE bucket_id = %L
          AND (storage.foldername(name))[1] = %L
          LIMIT 1
        )', user_id, bucket_id, user_id::text) INTO result;
    END IF;
    
    RETURN COALESCE(result, false);
  EXCEPTION WHEN OTHERS THEN
    RETURN false;
  END;
END;
$$;
```

## Step 3: Access the Debug Page

1. After applying the SQL fixes, navigate to `/debug` in your application
2. Use the RLS Policy Checker to verify that the policies are working correctly
3. Test with different operations to ensure all access is appropriately granted

## Step 4: Restart Your Application

1. Restart your application to ensure all changes take effect
2. Try again to upload an avatar in your profile settings
3. Verify that the right-sidebar component loads correctly

## Key Points to Remember

1. **Storage Path Structure**: Always ensure files are uploaded with the user's ID as the first path segment. For example: `userId/avatars/profile.jpg`

2. **RLS Basics**:
   - RLS operates at the database level to control row access
   - Policies are defined for specific operations (SELECT, INSERT, UPDATE, DELETE)
   - You can use the debug tools to check policy effectiveness

3. **Common Issues**:
   - `new row violates row-level security policy` means your user doesn't have permission to perform that operation
   - Empty error objects (`{}`) often indicate RLS policy violations where the error is not properly surfaced to the client

## Troubleshooting

If you continue to have issues:

1. Check the browser console for detailed errors
2. Use the `/debug` page to test specific RLS policies
3. Verify that file paths match the expected pattern in your RLS policies
4. Ensure your user is authenticated before attempting any storage operations 