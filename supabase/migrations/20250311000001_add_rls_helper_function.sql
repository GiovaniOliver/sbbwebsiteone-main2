-- Function to check if RLS is enabled on a table
CREATE OR REPLACE FUNCTION public.check_rls_enabled(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  result boolean;
BEGIN
  SELECT relrowsecurity INTO result
  FROM pg_class
  WHERE oid = (table_name::regclass);
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;

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