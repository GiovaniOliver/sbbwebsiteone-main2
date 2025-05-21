--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _realtime;


ALTER SCHEMA _realtime OWNER TO postgres;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA supabase_functions;


ALTER SCHEMA supabase_functions OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: check_rls_access(text, text, jsonb); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_rls_access(table_name text, operation text, test_row jsonb DEFAULT '{}'::jsonb) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
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


ALTER FUNCTION public.check_rls_access(table_name text, operation text, test_row jsonb) OWNER TO postgres;

--
-- Name: check_rls_enabled(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_rls_enabled(table_name text) RETURNS boolean
    LANGUAGE plpgsql
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


ALTER FUNCTION public.check_rls_enabled(table_name text) OWNER TO postgres;

--
-- Name: check_storage_access(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_storage_access(bucket_id text, operation text, file_path text DEFAULT NULL::text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
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


ALTER FUNCTION public.check_storage_access(bucket_id text, operation text, file_path text) OWNER TO postgres;

--
-- Name: check_username_available(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_username_available(username text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE username = $1
  );
END;
$_$;


ALTER FUNCTION public.check_username_available(username text) OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: handle_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_updated_at() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE FUNCTION supabase_functions.http_request() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'supabase_functions'
    AS $$
  DECLARE
    request_id bigint;
    payload jsonb;
    url text := TG_ARGV[0]::text;
    method text := TG_ARGV[1]::text;
    headers jsonb DEFAULT '{}'::jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
  BEGIN
    IF url IS NULL OR url = 'null' THEN
      RAISE EXCEPTION 'url argument is missing';
    END IF;

    IF method IS NULL OR method = 'null' THEN
      RAISE EXCEPTION 'method argument is missing';
    END IF;

    IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
      headers = '{"Content-Type": "application/json"}'::jsonb;
    ELSE
      headers = TG_ARGV[2]::jsonb;
    END IF;

    IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
      params = '{}'::jsonb;
    ELSE
      params = TG_ARGV[3]::jsonb;
    END IF;

    IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
      timeout_ms = 1000;
    ELSE
      timeout_ms = TG_ARGV[4]::integer;
    END IF;

    CASE
      WHEN method = 'GET' THEN
        SELECT http_get INTO request_id FROM net.http_get(
          url,
          params,
          headers,
          timeout_ms
        );
      WHEN method = 'POST' THEN
        payload = jsonb_build_object(
          'old_record', OLD,
          'record', NEW,
          'type', TG_OP,
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA
        );

        SELECT http_post INTO request_id FROM net.http_post(
          url,
          payload,
          params,
          headers,
          timeout_ms
        );
      ELSE
        RAISE EXCEPTION 'method argument % is invalid', method;
    END CASE;

    INSERT INTO supabase_functions.hooks
      (hook_table_id, hook_name, request_id)
    VALUES
      (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
  END
$$;


ALTER FUNCTION supabase_functions.http_request() OWNER TO supabase_functions_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.extensions (
    id uuid NOT NULL,
    type text,
    settings jsonb,
    tenant_external_id text,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _realtime.extensions OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE _realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.tenants (
    id uuid NOT NULL,
    name text,
    external_id text,
    jwt_secret text,
    max_concurrent_users integer DEFAULT 200 NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    max_events_per_second integer DEFAULT 100 NOT NULL,
    postgres_cdc_default text DEFAULT 'postgres_cdc_rls'::text,
    max_bytes_per_second integer DEFAULT 100000 NOT NULL,
    max_channels_per_client integer DEFAULT 100 NOT NULL,
    max_joins_per_second integer DEFAULT 500 NOT NULL,
    suspend boolean DEFAULT false,
    jwt_jwks jsonb,
    notify_private_alpha boolean DEFAULT false,
    private_only boolean DEFAULT false NOT NULL
);


ALTER TABLE _realtime.tenants OWNER TO supabase_admin;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analytics_events (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid,
    event_type text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.analytics_events OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid,
    action text NOT NULL,
    details text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookmarks (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bookmarks OWNER TO postgres;

--
-- Name: conversation_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversation_participants (
    conversation_id uuid NOT NULL,
    user_id uuid NOT NULL,
    last_read_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.conversation_participants OWNER TO postgres;

--
-- Name: conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversations (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_message_at timestamp with time zone
);


ALTER TABLE public.conversations OWNER TO postgres;

--
-- Name: dao_proposals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dao_proposals (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    creator_id uuid NOT NULL,
    status text DEFAULT 'pending'::text,
    voting_deadline timestamp with time zone,
    result text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.dao_proposals OWNER TO postgres;

--
-- Name: dao_treasury; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dao_treasury (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    balance numeric(20,2) DEFAULT 0,
    last_updated timestamp with time zone DEFAULT now() NOT NULL,
    currency text DEFAULT 'USD'::text
);


ALTER TABLE public.dao_treasury OWNER TO postgres;

--
-- Name: dao_votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dao_votes (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    proposal_id uuid NOT NULL,
    voter_id uuid NOT NULL,
    vote text NOT NULL,
    voting_power numeric(10,2) DEFAULT 1,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.dao_votes OWNER TO postgres;

--
-- Name: event_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_participants (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    event_id uuid NOT NULL,
    user_id uuid NOT NULL,
    status text DEFAULT 'attending'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.event_participants OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text,
    location text,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    user_id uuid NOT NULL,
    is_virtual boolean DEFAULT false,
    status text DEFAULT 'upcoming'::text,
    max_participants integer,
    image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.followers (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    follower_id uuid NOT NULL,
    following_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT no_self_follow CHECK ((follower_id <> following_id))
);


ALTER TABLE public.followers OWNER TO postgres;

--
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows (
    follower_id uuid NOT NULL,
    following_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.follows OWNER TO postgres;

--
-- Name: follows_count; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows_count (
    user_id uuid NOT NULL,
    followers_count integer DEFAULT 0 NOT NULL,
    following_count integer DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.follows_count OWNER TO postgres;

--
-- Name: friend_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friend_requests (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    sender_id uuid NOT NULL,
    receiver_id uuid NOT NULL,
    message text,
    status text DEFAULT 'pending'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.friend_requests OWNER TO postgres;

--
-- Name: group_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_members (
    group_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role text DEFAULT 'member'::text,
    joined_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.group_members OWNER TO postgres;

--
-- Name: group_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_posts (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    group_id uuid NOT NULL,
    author_id uuid NOT NULL,
    content text NOT NULL,
    images text[] DEFAULT '{}'::text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.group_posts OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    creator_id uuid NOT NULL,
    privacy text DEFAULT 'public'::text,
    image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hashtags (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    posts_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hashtags OWNER TO postgres;

--
-- Name: marketplace_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marketplace_categories (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    parent_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.marketplace_categories OWNER TO postgres;

--
-- Name: marketplace_favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marketplace_favorites (
    listing_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.marketplace_favorites OWNER TO postgres;

--
-- Name: marketplace_listings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marketplace_listings (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    seller_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    condition text,
    location text,
    category_id uuid,
    status text DEFAULT 'active'::text,
    images text[] DEFAULT '{}'::text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.marketplace_listings OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    conversation_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    content text NOT NULL,
    attachment_url text,
    attachment_type text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    actor_id uuid,
    type text NOT NULL,
    content text,
    read boolean DEFAULT false,
    reference_id uuid,
    reference_type text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: post_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_comments (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.post_comments OWNER TO postgres;

--
-- Name: post_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_likes (
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.post_likes OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    author_id uuid NOT NULL,
    content text NOT NULL,
    images text[] DEFAULT '{}'::text[],
    likes_count integer DEFAULT 0,
    comments_count integer DEFAULT 0,
    type text DEFAULT 'standard'::text,
    status text DEFAULT 'published'::text,
    visibility text DEFAULT 'public'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    full_name text,
    first_name text,
    last_name text,
    avatar_url text,
    bio text,
    website text,
    web3_wallet_address text,
    role text,
    total_likes integer DEFAULT 0,
    location text,
    profile_video text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: report_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_content (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    reporter_id uuid NOT NULL,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    reason text,
    status text DEFAULT 'pending'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.report_content OWNER TO postgres;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stories (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    thumbnail_url text NOT NULL,
    expires_at timestamp with time zone,
    content text,
    type text DEFAULT 'story'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.stories OWNER TO postgres;

--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_settings (
    user_id uuid NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_settings OWNER TO postgres;

--
-- Name: verification_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_requests (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    document_url text,
    status text DEFAULT 'pending'::text,
    reviewer_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.verification_requests OWNER TO postgres;

--
-- Name: video_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_comments (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    video_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.video_comments OWNER TO postgres;

--
-- Name: video_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_likes (
    video_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.video_likes OWNER TO postgres;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    url text NOT NULL,
    thumbnail_url text NOT NULL,
    duration integer NOT NULL,
    view_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.hooks (
    id bigint NOT NULL,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    request_id bigint
);


ALTER TABLE supabase_functions.hooks OWNER TO supabase_functions_admin;

--
-- Name: TABLE hooks; Type: COMMENT; Schema: supabase_functions; Owner: supabase_functions_admin
--

COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE SEQUENCE supabase_functions.hooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE supabase_functions.hooks_id_seq OWNER TO supabase_functions_admin;

--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER SEQUENCE supabase_functions.hooks_id_seq OWNED BY supabase_functions.hooks.id;


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.migrations (
    version text NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE supabase_functions.migrations OWNER TO supabase_functions_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;


ALTER TABLE vault.decrypted_secrets OWNER TO supabase_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks ALTER COLUMN id SET DEFAULT nextval('supabase_functions.hooks_id_seq'::regclass);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.extensions (id, type, settings, tenant_external_id, inserted_at, updated_at) FROM stdin;
6d00e246-367e-46e0-ae0c-43bac05cbaad	postgres_cdc_rls	{"region": "us-east-1", "db_host": "B2/WHEQ+UmuOfvUwH906bDXZtSUVuyaeIxJ/JxgpVPY=", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}	realtime-dev	2025-03-12 11:17:30	2025-03-12 11:17:30
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.schema_migrations (version, inserted_at) FROM stdin;
20210706140551	2025-03-11 14:38:04
20220329161857	2025-03-11 14:38:04
20220410212326	2025-03-11 14:38:04
20220506102948	2025-03-11 14:38:04
20220527210857	2025-03-11 14:38:04
20220815211129	2025-03-11 14:38:04
20220815215024	2025-03-11 14:38:04
20220818141501	2025-03-11 14:38:04
20221018173709	2025-03-11 14:38:04
20221102172703	2025-03-11 14:38:04
20221223010058	2025-03-11 14:38:04
20230110180046	2025-03-11 14:38:04
20230810220907	2025-03-11 14:38:04
20230810220924	2025-03-11 14:38:04
20231024094642	2025-03-11 14:38:04
20240306114423	2025-03-11 14:38:04
20240418082835	2025-03-11 14:38:04
20240625211759	2025-03-11 14:38:04
20240704172020	2025-03-11 14:38:04
20240902173232	2025-03-11 14:38:04
20241106103258	2025-03-11 14:38:04
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.tenants (id, name, external_id, jwt_secret, max_concurrent_users, inserted_at, updated_at, max_events_per_second, postgres_cdc_default, max_bytes_per_second, max_channels_per_client, max_joins_per_second, suspend, jwt_jwks, notify_private_alpha, private_only) FROM stdin;
d7ba52c5-9dd8-46af-89b2-09b16de407b7	realtime-dev	realtime-dev	iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==	200	2025-03-12 11:17:30	2025-03-12 11:17:30	100	postgres_cdc_rls	100000	100	100	f	{"keys": [{"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}	f	f
\.


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	ecc21f22-71be-4a5e-9d1a-9fee0ae44d8e	{"action":"user_signedup","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-11 15:50:40.438587+00	
00000000-0000-0000-0000-000000000000	7bc66d6c-ecb1-48ec-aa9e-c65f30e857ee	{"action":"login","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-11 15:50:40.444043+00	
00000000-0000-0000-0000-000000000000	383e9216-81a7-46c3-86d3-ca5ec7e00bbb	{"action":"user_repeated_signup","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-03-11 16:05:08.433956+00	
00000000-0000-0000-0000-000000000000	fd4287d7-e761-4c55-b9b4-c23405afafa9	{"action":"token_refreshed","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 17:05:54.440131+00	
00000000-0000-0000-0000-000000000000	68d7abc2-c2d5-48e6-b9ef-0e9fa7c80302	{"action":"token_revoked","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 17:05:54.440676+00	
00000000-0000-0000-0000-000000000000	1be1b64a-a23f-4bc3-a81a-f3ffd2a67fa5	{"action":"token_refreshed","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 02:28:32.662824+00	
00000000-0000-0000-0000-000000000000	f2dafd78-19d6-40e5-9b3d-42872e7292d5	{"action":"token_revoked","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 02:28:32.665114+00	
00000000-0000-0000-0000-000000000000	92ce1dad-2d83-46bd-a01b-8ce0c4b19bef	{"action":"token_refreshed","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 03:37:01.873511+00	
00000000-0000-0000-0000-000000000000	bbd9e797-314e-4951-92d2-eb383f4746c3	{"action":"token_revoked","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 03:37:01.874975+00	
00000000-0000-0000-0000-000000000000	8dee4579-9bd8-430e-b73f-fafeba6445a7	{"action":"token_refreshed","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 04:35:19.605123+00	
00000000-0000-0000-0000-000000000000	5ac63ed4-2d5d-4669-9589-51320894edd0	{"action":"token_revoked","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 04:35:19.606886+00	
00000000-0000-0000-0000-000000000000	bda073a7-b9e6-4a25-a9cd-305d5ab35d9b	{"action":"token_refreshed","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 11:18:14.756702+00	
00000000-0000-0000-0000-000000000000	b109be08-c5c5-4069-920f-654d1d77d88d	{"action":"token_revoked","actor_id":"1fb196e8-6925-4c3f-ac84-f6bb47dad1d6","actor_username":"giovani.company@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 11:18:14.758022+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	{"sub": "1fb196e8-6925-4c3f-ac84-f6bb47dad1d6", "email": "giovani.company@gmail.com", "username": "Giovanitest", "email_verified": false, "phone_verified": false}	email	2025-03-11 15:50:40.43644+00	2025-03-11 15:50:40.436494+00	2025-03-11 15:50:40.436494+00	91c88159-4d29-4f8e-b738-b2a7ad3159ef
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
e922f922-2413-445f-a760-8d88f0fc2fe8	2025-03-11 15:50:40.447715+00	2025-03-11 15:50:40.447715+00	password	22f63dd8-0eed-499f-a4d0-dbd406448a48
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	1	i-oyZzD8_lwGkZdBKIVQJw	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	t	2025-03-11 15:50:40.44627+00	2025-03-11 17:05:54.441081+00	\N	e922f922-2413-445f-a760-8d88f0fc2fe8
00000000-0000-0000-0000-000000000000	2	BlNX3nizqJdV3k7kdoA9bw	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	t	2025-03-11 17:05:54.442006+00	2025-03-12 02:28:32.665599+00	i-oyZzD8_lwGkZdBKIVQJw	e922f922-2413-445f-a760-8d88f0fc2fe8
00000000-0000-0000-0000-000000000000	3	0hv6IGaGC_SEc2Nv8TGFKg	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	t	2025-03-12 02:28:32.666834+00	2025-03-12 03:37:01.875478+00	BlNX3nizqJdV3k7kdoA9bw	e922f922-2413-445f-a760-8d88f0fc2fe8
00000000-0000-0000-0000-000000000000	4	pj1gubcVXWiXIQDt1w91mQ	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	t	2025-03-12 03:37:01.87628+00	2025-03-12 04:35:19.607425+00	0hv6IGaGC_SEc2Nv8TGFKg	e922f922-2413-445f-a760-8d88f0fc2fe8
00000000-0000-0000-0000-000000000000	5	39T3rgEugLTlqpSzwFq0MA	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	t	2025-03-12 04:35:19.60867+00	2025-03-12 11:18:14.758408+00	pj1gubcVXWiXIQDt1w91mQ	e922f922-2413-445f-a760-8d88f0fc2fe8
00000000-0000-0000-0000-000000000000	6	B6c7pT_WG73DV4qZXiS43A	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	f	2025-03-12 11:18:14.758936+00	2025-03-12 11:18:14.758936+00	39T3rgEugLTlqpSzwFq0MA	e922f922-2413-445f-a760-8d88f0fc2fe8
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
e922f922-2413-445f-a760-8d88f0fc2fe8	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	2025-03-11 15:50:40.444691+00	2025-03-12 11:18:14.760667+00	\N	aal1	\N	2025-03-12 11:18:14.760641	Next.js Middleware	172.18.0.1	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\N	e514898f-93b4-40f1-abb7-d6bc6fb254e6	\N	\N	alice@example.com	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-03-11 17:25:49.557629+00	\N	\N	\N			\N		0	\N		\N	f	\N	f
\N	f625898f-93b4-40f1-abb7-d6bc6fb254e7	\N	\N	bob@example.com	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-03-11 17:25:49.557629+00	\N	\N	\N			\N		0	\N		\N	f	\N	f
\N	c736898f-93b4-40f1-abb7-d6bc6fb254e8	\N	\N	carol@example.com	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-03-11 17:25:49.557629+00	\N	\N	\N			\N		0	\N		\N	f	\N	f
\N	a1111111-2222-3333-4444-555555555555	\N	\N	dave@example.com	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-03-11 17:25:49.557629+00	\N	\N	\N			\N		0	\N		\N	f	\N	f
\N	b1111111-2222-3333-4444-555555555555	\N	\N	eve@example.com	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-03-11 17:25:49.557629+00	\N	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	authenticated	authenticated	giovani.company@gmail.com	$2a$10$vuLPfQBkOh7b8UbeWhhqt.1ba7bnEr/TfYSCZNzpSXMgIG.vOgXqu	2025-03-11 15:50:40.439757+00	\N		\N		\N			\N	2025-03-11 15:50:40.444638+00	{"provider": "email", "providers": ["email"]}	{"sub": "1fb196e8-6925-4c3f-ac84-f6bb47dad1d6", "email": "giovani.company@gmail.com", "username": "Giovanitest", "email_verified": true, "phone_verified": false}	\N	2025-03-11 15:50:40.429326+00	2025-03-12 11:18:14.759798+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: analytics_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analytics_events (id, user_id, event_type, metadata, created_at) FROM stdin;
d8dabb2a-6b19-464c-8d3d-e0e93ce83ff9	e514898f-93b4-40f1-abb7-d6bc6fb254e6	page_view	{"page": "home"}	2025-03-11 17:25:49.646113+00
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (id, user_id, action, details, created_at) FROM stdin;
d8489c67-83cc-4574-aafd-e2015b2d1f8e	e514898f-93b4-40f1-abb7-d6bc6fb254e6	login	User logged in successfully	2025-03-11 17:25:49.643392+00
\.


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookmarks (id, user_id, content_type, content_id, created_at) FROM stdin;
b77bcfc6-c767-4c57-915c-12a2916ae1fd	e514898f-93b4-40f1-abb7-d6bc6fb254e6	post	97c4789a-3569-4187-98ec-224486b23fed	2025-03-11 17:25:49.634904+00
\.


--
-- Data for Name: conversation_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversation_participants (conversation_id, user_id, last_read_at, created_at) FROM stdin;
b114522b-ddb2-4131-b6a8-80b5d605654c	e514898f-93b4-40f1-abb7-d6bc6fb254e6	\N	2025-03-11 17:25:49.597813+00
b114522b-ddb2-4131-b6a8-80b5d605654c	f625898f-93b4-40f1-abb7-d6bc6fb254e7	\N	2025-03-11 17:25:49.597813+00
\.


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversations (id, title, created_at, updated_at, last_message_at) FROM stdin;
b114522b-ddb2-4131-b6a8-80b5d605654c	General Chat	2025-03-11 17:25:49.595139+00	2025-03-11 17:25:49.595139+00	2025-03-11 17:25:49.595139+00
\.


--
-- Data for Name: dao_proposals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dao_proposals (id, title, description, creator_id, status, voting_deadline, result, created_at) FROM stdin;
2d24f805-42c3-47c2-9531-706b1f20e89a	Increase Community Fund	Proposal to increase the treasury allocation for community projects.	e514898f-93b4-40f1-abb7-d6bc6fb254e6	pending	2025-03-18 17:25:49.626151+00	\N	2025-03-11 17:25:49.626151+00
\.


--
-- Data for Name: dao_treasury; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dao_treasury (id, balance, last_updated, currency) FROM stdin;
99b4b118-b06b-4ca1-9a49-5202b201938f	10000.00	2025-03-11 17:25:49.632018+00	USD
\.


--
-- Data for Name: dao_votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dao_votes (id, proposal_id, voter_id, vote, voting_power, created_at) FROM stdin;
d2b88320-464e-4a0d-a132-25a28c8fc3ed	2d24f805-42c3-47c2-9531-706b1f20e89a	f625898f-93b4-40f1-abb7-d6bc6fb254e7	yes	1.00	2025-03-11 17:25:49.629023+00
\.


--
-- Data for Name: event_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_participants (id, event_id, user_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, description, location, start_date, end_date, user_id, is_virtual, status, max_participants, image_url, created_at, updated_at) FROM stdin;
4641643a-bc65-41f8-9670-9db2f0031f0f	Web3 Hackathon 2024	Hackathon to build innovative solutions	Tech Campus, 789 Innovation Ave	2025-03-09 17:25:49.586005+00	2025-03-16 17:25:49.586005+00	f625898f-93b4-40f1-abb7-d6bc6fb254e7	f	ongoing	200	https://images.unsplash.com/photo-1638913662252-70efce1e60a7	2025-03-11 17:25:49.586005+00	2025-03-11 17:25:49.586005+00
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.followers (id, follower_id, following_id, created_at) FROM stdin;
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows (follower_id, following_id, created_at) FROM stdin;
e514898f-93b4-40f1-abb7-d6bc6fb254e6	f625898f-93b4-40f1-abb7-d6bc6fb254e7	2025-03-11 17:25:49.566266+00
f625898f-93b4-40f1-abb7-d6bc6fb254e7	e514898f-93b4-40f1-abb7-d6bc6fb254e6	2025-03-11 17:25:49.566266+00
c736898f-93b4-40f1-abb7-d6bc6fb254e8	e514898f-93b4-40f1-abb7-d6bc6fb254e6	2025-03-11 17:25:49.566266+00
1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	e514898f-93b4-40f1-abb7-d6bc6fb254e6	2025-03-12 03:37:12.851+00
\.


--
-- Data for Name: follows_count; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows_count (user_id, followers_count, following_count, updated_at) FROM stdin;
\.


--
-- Data for Name: friend_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friend_requests (id, sender_id, receiver_id, message, status, created_at, updated_at) FROM stdin;
3cc623be-6a84-42dd-b809-2c8be95fa3d7	e514898f-93b4-40f1-abb7-d6bc6fb254e6	c736898f-93b4-40f1-abb7-d6bc6fb254e8	Let's connect!	pending	2025-03-11 17:25:49.612532+00	2025-03-11 17:25:49.612532+00
\.


--
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.group_members (group_id, user_id, role, joined_at) FROM stdin;
e9ac8b1a-44e5-40c9-b334-5f708c827486	f625898f-93b4-40f1-abb7-d6bc6fb254e7	member	2025-03-11 17:25:49.619031+00
e9ac8b1a-44e5-40c9-b334-5f708c827486	c736898f-93b4-40f1-abb7-d6bc6fb254e8	member	2025-03-11 17:25:49.619031+00
\.


--
-- Data for Name: group_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.group_posts (id, group_id, author_id, content, images, created_at, updated_at) FROM stdin;
026d9850-1684-48df-90af-8ceb2ae0adc5	e9ac8b1a-44e5-40c9-b334-5f708c827486	e514898f-93b4-40f1-abb7-d6bc6fb254e6	Welcome to our group!	{}	2025-03-11 17:25:49.623178+00	2025-03-11 17:25:49.623178+00
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (id, name, description, creator_id, privacy, image_url, created_at, updated_at) FROM stdin;
e9ac8b1a-44e5-40c9-b334-5f708c827486	Crypto Enthusiasts	A group for crypto fans	e514898f-93b4-40f1-abb7-d6bc6fb254e6	public	\N	2025-03-11 17:25:49.616099+00	2025-03-11 17:25:49.616099+00
\.


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtags (id, name, posts_count, created_at) FROM stdin;
dc31b126-b03c-4497-817c-003e631885f9	#Web3	0	2025-03-11 17:25:49.588933+00
63ef1d0e-4865-4ed7-8809-625b0173c9e0	#Blockchain	0	2025-03-11 17:25:49.588933+00
bd50fb8b-2556-49b4-8067-964a8232a277	#DAO	0	2025-03-11 17:25:49.588933+00
\.


--
-- Data for Name: marketplace_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketplace_categories (id, name, parent_id, created_at) FROM stdin;
2b44c042-a222-4a2b-b0d7-3263c1f7a8bf	Electronics	\N	2025-03-11 17:25:49.603901+00
dbdde185-c0b5-4ea7-84a8-9a78e9e0737b	Fashion	\N	2025-03-11 17:25:49.603901+00
\.


--
-- Data for Name: marketplace_favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketplace_favorites (listing_id, user_id, created_at) FROM stdin;
99a0c04e-36d7-442e-a662-18ebf8274809	b1111111-2222-3333-4444-555555555555	2025-03-11 17:25:49.60974+00
\.


--
-- Data for Name: marketplace_listings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketplace_listings (id, seller_id, title, description, price, condition, location, category_id, status, images, created_at, updated_at) FROM stdin;
99a0c04e-36d7-442e-a662-18ebf8274809	a1111111-2222-3333-4444-555555555555	Smartphone	Latest model smartphone	699.99	new	Berlin	2b44c042-a222-4a2b-b0d7-3263c1f7a8bf	active	{https://via.placeholder.com/200}	2025-03-11 17:25:49.606724+00	2025-03-11 17:25:49.606724+00
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, conversation_id, sender_id, content, attachment_url, attachment_type, created_at) FROM stdin;
c0b77809-a950-45a0-bbd9-73f8799807f8	b114522b-ddb2-4131-b6a8-80b5d605654c	e514898f-93b4-40f1-abb7-d6bc6fb254e6	Hello everyone!	\N	\N	2025-03-11 17:25:49.601109+00
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, actor_id, type, content, read, reference_id, reference_type, created_at, updated_at) FROM stdin;
118184a3-9f95-438e-a248-06e18d3b48f8	e514898f-93b4-40f1-abb7-d6bc6fb254e6	f625898f-93b4-40f1-abb7-d6bc6fb254e7	like	Bob liked your post	f	\N	\N	2025-03-11 17:25:49.591891+00	2025-03-11 17:25:49.591891+00
\.


--
-- Data for Name: post_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_comments (id, post_id, user_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: post_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_likes (post_id, user_id, created_at) FROM stdin;
97c4789a-3569-4187-98ec-224486b23fed	f625898f-93b4-40f1-abb7-d6bc6fb254e7	2025-03-11 17:25:49.574699+00
7088c9b1-a601-443e-89e8-5712ab94de6a	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	2025-03-12 04:15:46.050281+00
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, author_id, content, images, likes_count, comments_count, type, status, visibility, created_at, updated_at) FROM stdin;
97c4789a-3569-4187-98ec-224486b23fed	e514898f-93b4-40f1-abb7-d6bc6fb254e6	Hello, this is my first post!	{https://via.placeholder.com/150}	0	0	standard	published	public	2025-03-11 17:25:49.570613+00	2025-03-11 17:25:49.570613+00
8384c248-7b10-409e-b238-f9d7b93fda1b	f625898f-93b4-40f1-abb7-d6bc6fb254e7	Blockchain is revolutionizing finance.	{}	0	0	standard	published	public	2025-03-11 17:25:49.570613+00	2025-03-11 17:25:49.570613+00
7088c9b1-a601-443e-89e8-5712ab94de6a	1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	test post	{}	0	0	text	published	public	2025-03-12 02:28:46.015379+00	2025-03-12 02:28:46.015379+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, username, email, full_name, first_name, last_name, avatar_url, bio, website, web3_wallet_address, role, total_likes, location, profile_video, created_at, updated_at) FROM stdin;
1fb196e8-6925-4c3f-ac84-f6bb47dad1d6	Giovanitest	giovani.company@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2025-03-11 15:50:40.428962+00	2025-03-11 15:50:40.428962+00
e514898f-93b4-40f1-abb7-d6bc6fb254e6	user_e514898f	alice@example.com	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2025-03-11 17:25:49.557629+00	2025-03-11 17:25:49.557629+00
f625898f-93b4-40f1-abb7-d6bc6fb254e7	user_f625898f	bob@example.com	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2025-03-11 17:25:49.557629+00	2025-03-11 17:25:49.557629+00
c736898f-93b4-40f1-abb7-d6bc6fb254e8	user_c736898f	carol@example.com	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2025-03-11 17:25:49.557629+00	2025-03-11 17:25:49.557629+00
a1111111-2222-3333-4444-555555555555	user_a1111111	dave@example.com	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2025-03-11 17:25:49.557629+00	2025-03-11 17:25:49.557629+00
b1111111-2222-3333-4444-555555555555	user_b1111111	eve@example.com	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2025-03-11 17:25:49.557629+00	2025-03-11 17:25:49.557629+00
\.


--
-- Data for Name: report_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_content (id, reporter_id, content_type, content_id, reason, status, created_at, updated_at) FROM stdin;
1125b18d-4724-4b35-8d92-792a9371d7c8	f625898f-93b4-40f1-abb7-d6bc6fb254e7	post	97c4789a-3569-4187-98ec-224486b23fed	Inappropriate content	pending	2025-03-11 17:25:49.640678+00	2025-03-11 17:25:49.640678+00
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stories (id, user_id, thumbnail_url, expires_at, content, type, created_at, updated_at) FROM stdin;
72fd0b53-bca0-4d60-a44c-70cf65afab9c	e514898f-93b4-40f1-abb7-d6bc6fb254e6	https://source.unsplash.com/random/800x600?city	2025-03-12 17:25:49.583329+00	Exploring the city	image	2025-03-11 17:25:49.583329+00	2025-03-11 17:25:49.583329+00
\.


--
-- Data for Name: user_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_settings (user_id, settings, updated_at) FROM stdin;
e514898f-93b4-40f1-abb7-d6bc6fb254e6	{"theme": "dark", "notifications": true}	2025-03-11 17:25:49.637869+00
\.


--
-- Data for Name: verification_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_requests (id, user_id, document_url, status, reviewer_id, created_at, updated_at) FROM stdin;
56ca2ec3-5f6c-4291-94e9-8e4e741c8b3c	c736898f-93b4-40f1-abb7-d6bc6fb254e8	https://example.com/docs/carol_id.png	pending	\N	2025-03-11 17:25:49.649393+00	2025-03-11 17:25:49.649393+00
\.


--
-- Data for Name: video_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_comments (id, video_id, user_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: video_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_likes (video_id, user_id, created_at) FROM stdin;
cf511669-668e-4ed0-9513-0e49814ff6b9	f625898f-93b4-40f1-abb7-d6bc6fb254e7	2025-03-11 17:25:49.580131+00
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, user_id, title, description, url, thumbnail_url, duration, view_count, created_at, updated_at) FROM stdin;
cf511669-668e-4ed0-9513-0e49814ff6b9	e514898f-93b4-40f1-abb7-d6bc6fb254e6	Introduction to Web3	Learn the basics of Web3	https://www.youtube.com/watch?v=1	https://i.ytimg.com/vi/1/maxresdefault.jpg	600	0	2025-03-11 17:25:49.577267+00	2025-03-11 17:25:49.577267+00
a7f553e3-1063-41b1-a611-b90c5fc46226	f625898f-93b4-40f1-abb7-d6bc6fb254e7	Smart Contract Development	Solidity tutorial	https://www.youtube.com/watch?v=2	https://i.ytimg.com/vi/2/maxresdefault.jpg	1200	0	2025-03-11 17:25:49.577267+00	2025-03-11 17:25:49.577267+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-03-11 14:38:06
20211116045059	2025-03-11 14:38:06
20211116050929	2025-03-11 14:38:06
20211116051442	2025-03-11 14:38:06
20211116212300	2025-03-11 14:38:06
20211116213355	2025-03-11 14:38:06
20211116213934	2025-03-11 14:38:06
20211116214523	2025-03-11 14:38:06
20211122062447	2025-03-11 14:38:06
20211124070109	2025-03-11 14:38:06
20211202204204	2025-03-11 14:38:06
20211202204605	2025-03-11 14:38:06
20211210212804	2025-03-11 14:38:06
20211228014915	2025-03-11 14:38:06
20220107221237	2025-03-11 14:38:06
20220228202821	2025-03-11 14:38:06
20220312004840	2025-03-11 14:38:06
20220603231003	2025-03-11 14:38:06
20220603232444	2025-03-11 14:38:06
20220615214548	2025-03-11 14:38:06
20220712093339	2025-03-11 14:38:06
20220908172859	2025-03-11 14:38:06
20220916233421	2025-03-11 14:38:06
20230119133233	2025-03-11 14:38:06
20230128025114	2025-03-11 14:38:06
20230128025212	2025-03-11 14:38:06
20230227211149	2025-03-11 14:38:06
20230228184745	2025-03-11 14:38:06
20230308225145	2025-03-11 14:38:06
20230328144023	2025-03-11 14:38:06
20231018144023	2025-03-11 14:38:06
20231204144023	2025-03-11 14:38:06
20231204144024	2025-03-11 14:38:06
20231204144025	2025-03-11 14:38:06
20240108234812	2025-03-11 14:38:06
20240109165339	2025-03-11 14:38:06
20240227174441	2025-03-11 14:38:06
20240311171622	2025-03-11 14:38:06
20240321100241	2025-03-11 14:38:06
20240401105812	2025-03-11 14:38:06
20240418121054	2025-03-11 14:38:06
20240523004032	2025-03-11 14:38:06
20240618124746	2025-03-11 14:38:06
20240801235015	2025-03-11 14:38:06
20240805133720	2025-03-11 14:38:06
20240827160934	2025-03-11 14:38:06
20240919163303	2025-03-11 14:38:06
20240919163305	2025-03-11 14:38:06
20241019105805	2025-03-11 14:38:06
20241030150047	2025-03-11 14:38:06
20241108114728	2025-03-11 14:38:06
20241121104152	2025-03-11 14:38:06
20241130184212	2025-03-11 14:38:06
20241220035512	2025-03-11 14:38:06
20241220123912	2025-03-11 14:38:06
20241224161212	2025-03-11 14:38:06
20250107150512	2025-03-11 14:38:06
20250110162412	2025-03-11 14:38:06
20250123174212	2025-03-11 14:38:06
20250128220012	2025-03-11 14:38:06
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
post-media	post-media	\N	2025-03-11 14:38:10.363987+00	2025-03-11 14:38:10.363987+00	t	f	\N	\N	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-03-11 14:38:07.906523
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-03-11 14:38:07.912833
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-03-11 14:38:07.916152
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-03-11 14:38:07.924891
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-03-11 14:38:07.947922
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-03-11 14:38:07.951324
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-03-11 14:38:07.955599
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-03-11 14:38:07.959318
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-03-11 14:38:07.96259
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-03-11 14:38:07.966026
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-03-11 14:38:07.970061
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-03-11 14:38:07.973958
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-03-11 14:38:07.977976
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-03-11 14:38:07.981358
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-03-11 14:38:07.984695
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-03-11 14:38:08.008497
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-03-11 14:38:08.012286
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-03-11 14:38:08.015873
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-03-11 14:38:08.019514
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-03-11 14:38:08.023227
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-03-11 14:38:08.026359
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-03-11 14:38:08.034787
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-03-11 14:38:08.063447
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-03-11 14:38:08.090638
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-03-11 14:38:08.094919
25	custom-metadata	67eb93b7e8d401cafcdc97f9ac779e71a79bfe03	2025-03-11 14:38:08.098861
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.hooks (id, hook_table_id, hook_name, created_at, request_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.migrations (version, inserted_at) FROM stdin;
initial	2025-03-11 14:37:55.284008+00
20210809183423_update_grants	2025-03-11 14:37:55.284008+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20240300000000	{"-- ==============================\r\n-- Migration File: consolidated_schema.sql\r\n-- ==============================\r\n\r\n-- Enable required extension for UUIDs\r\nCREATE EXTENSION IF NOT EXISTS \\"uuid-ossp\\"","-- =====================================\r\n-- Core Functions\r\n-- =====================================\r\n\r\n-- Function: handle_updated_at (auto-update timestamps)\r\nCREATE OR REPLACE FUNCTION public.handle_updated_at()\r\nRETURNS TRIGGER AS $$\r\nBEGIN\r\n  NEW.updated_at = NOW();\r\n  RETURN NEW;\r\nEND;\r\n$$ LANGUAGE plpgsql","-- Function: handle_new_user (create profile on new user signup)\r\nCREATE OR REPLACE FUNCTION public.handle_new_user()\r\nRETURNS TRIGGER AS $$\r\nBEGIN\r\n  INSERT INTO public.profiles (id, username, email)\r\n  VALUES (\r\n    NEW.id,\r\n    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),\r\n    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', NEW.id::text || '@example.com')\r\n  );\r\n  RETURN NEW;\r\nEND;\r\n$$ LANGUAGE plpgsql SECURITY DEFINER","-- Function: check_username_available\r\nCREATE OR REPLACE FUNCTION public.check_username_available(username text)\r\nRETURNS BOOLEAN AS $$\r\nBEGIN\r\n  RETURN NOT EXISTS (\r\n    SELECT 1 FROM public.profiles WHERE username = $1\r\n  );\r\nEND;\r\n$$ LANGUAGE plpgsql SECURITY DEFINER","-- =====================================\r\n-- Tables: User & Relationships\r\n-- =====================================\r\n\r\n-- Profiles table (references auth.users)\r\nCREATE TABLE IF NOT EXISTS public.profiles (\r\n  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,\r\n  username TEXT UNIQUE NOT NULL,\r\n  email TEXT UNIQUE NOT NULL,\r\n  full_name TEXT,\r\n  first_name TEXT,\r\n  last_name TEXT,\r\n  avatar_url TEXT,\r\n  bio TEXT,\r\n  website TEXT,\r\n  web3_wallet_address TEXT,\r\n  role TEXT,\r\n  total_likes INTEGER DEFAULT 0,\r\n  location TEXT,\r\n  profile_video TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- Follows (simple many-to-many)\r\nCREATE TABLE IF NOT EXISTS public.follows (\r\n  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  PRIMARY KEY (follower_id, following_id)\r\n)","-- Alternative Followers table (if needed)\r\nCREATE TABLE IF NOT EXISTS public.followers (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  UNIQUE (follower_id, following_id),\r\n  CONSTRAINT no_self_follow CHECK (follower_id <> following_id)\r\n)","-- Follows Count Cache\r\nCREATE TABLE IF NOT EXISTS public.follows_count (\r\n  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  followers_count INTEGER DEFAULT 0 NOT NULL,\r\n  following_count INTEGER DEFAULT 0 NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Tables: Content\r\n-- =====================================\r\n\r\n-- Posts\r\nCREATE TABLE IF NOT EXISTS public.posts (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content TEXT NOT NULL,\r\n  images TEXT[] DEFAULT '{}',\r\n  likes_count INTEGER DEFAULT 0,\r\n  comments_count INTEGER DEFAULT 0,\r\n  type TEXT DEFAULT 'standard',\r\n  status TEXT DEFAULT 'published',\r\n  visibility TEXT DEFAULT 'public',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- Post Likes\r\nCREATE TABLE IF NOT EXISTS public.post_likes (\r\n  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  PRIMARY KEY (post_id, user_id)\r\n)","-- Post Comments\r\nCREATE TABLE IF NOT EXISTS public.post_comments (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content TEXT NOT NULL,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- Videos\r\nCREATE TABLE IF NOT EXISTS public.videos (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  title TEXT NOT NULL,\r\n  description TEXT,\r\n  url TEXT NOT NULL,\r\n  thumbnail_url TEXT NOT NULL,\r\n  duration INTEGER NOT NULL,\r\n  view_count INTEGER DEFAULT 0,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- Video Likes\r\nCREATE TABLE IF NOT EXISTS public.video_likes (\r\n  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  PRIMARY KEY (video_id, user_id)\r\n)","-- Video Comments\r\nCREATE TABLE IF NOT EXISTS public.video_comments (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content TEXT NOT NULL,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- Stories\r\nCREATE TABLE IF NOT EXISTS public.stories (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  thumbnail_url TEXT NOT NULL,\r\n  expires_at TIMESTAMPTZ,\r\n  content TEXT,\r\n  type TEXT DEFAULT 'story',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Tables: Events\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.events (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  title TEXT NOT NULL,\r\n  description TEXT,\r\n  location TEXT,\r\n  start_date TIMESTAMPTZ NOT NULL,\r\n  end_date TIMESTAMPTZ NOT NULL,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  is_virtual BOOLEAN DEFAULT FALSE,\r\n  status TEXT DEFAULT 'upcoming',\r\n  max_participants INTEGER,\r\n  image_url TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.event_participants (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  status TEXT DEFAULT 'attending',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  UNIQUE(event_id, user_id)\r\n)","-- =====================================\r\n-- Tables: Missing & Extended Features\r\n-- =====================================\r\n\r\n-- Hashtags for Search & Discovery\r\nCREATE TABLE IF NOT EXISTS public.hashtags (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  name TEXT UNIQUE NOT NULL,\r\n  posts_count INTEGER DEFAULT 0,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- Notifications\r\nCREATE TABLE IF NOT EXISTS public.notifications (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  actor_id UUID REFERENCES public.profiles(id),\r\n  type TEXT NOT NULL,\r\n  content TEXT,\r\n  read BOOLEAN DEFAULT FALSE,\r\n  reference_id UUID,\r\n  reference_type TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Tables: Messaging\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.conversations (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  title TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  last_message_at TIMESTAMPTZ\r\n)","CREATE TABLE IF NOT EXISTS public.conversation_participants (\r\n  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  last_read_at TIMESTAMPTZ,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  PRIMARY KEY (conversation_id, user_id)\r\n)","CREATE TABLE IF NOT EXISTS public.messages (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,\r\n  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content TEXT NOT NULL,\r\n  attachment_url TEXT,\r\n  attachment_type TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Tables: Marketplace\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.marketplace_categories (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  name TEXT NOT NULL,\r\n  parent_id UUID,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.marketplace_listings (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  title TEXT NOT NULL,\r\n  description TEXT,\r\n  price NUMERIC(10,2) NOT NULL,\r\n  condition TEXT,\r\n  location TEXT,\r\n  category_id UUID REFERENCES public.marketplace_categories(id),\r\n  status TEXT DEFAULT 'active',\r\n  images TEXT[] DEFAULT '{}',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.marketplace_favorites (\r\n  listing_id UUID REFERENCES public.marketplace_listings(id) ON DELETE CASCADE,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  PRIMARY KEY (listing_id, user_id)\r\n)","-- =====================================\r\n-- Tables: Friend/Connection\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.friend_requests (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  message TEXT,\r\n  status TEXT DEFAULT 'pending',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Tables: Community Features\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.groups (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  name TEXT NOT NULL,\r\n  description TEXT,\r\n  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  privacy TEXT DEFAULT 'public',\r\n  image_url TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.group_members (\r\n  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  role TEXT DEFAULT 'member',\r\n  joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  PRIMARY KEY (group_id, user_id)\r\n)","CREATE TABLE IF NOT EXISTS public.group_posts (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,\r\n  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content TEXT NOT NULL,\r\n  images TEXT[] DEFAULT '{}',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Tables: DAO Governance\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.dao_proposals (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  title TEXT NOT NULL,\r\n  description TEXT,\r\n  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  status TEXT DEFAULT 'pending',\r\n  voting_deadline TIMESTAMPTZ,\r\n  result TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.dao_votes (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  proposal_id UUID REFERENCES public.dao_proposals(id) ON DELETE CASCADE NOT NULL,\r\n  voter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  vote TEXT NOT NULL,  -- e.g., 'yes', 'no', 'abstain'\r\n  voting_power NUMERIC(10,2) DEFAULT 1,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.dao_treasury (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  balance NUMERIC(20,2) DEFAULT 0,\r\n  last_updated TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  currency TEXT DEFAULT 'USD'\r\n)","-- =====================================\r\n-- Tables: Additional & Utility Features\r\n-- =====================================\r\n\r\nCREATE TABLE IF NOT EXISTS public.bookmarks (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content_type TEXT NOT NULL,\r\n  content_id UUID NOT NULL,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.user_settings (\r\n  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,\r\n  settings JSONB DEFAULT '{}',\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.report_content (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  content_type TEXT NOT NULL,\r\n  content_id UUID NOT NULL,\r\n  reason TEXT,\r\n  status TEXT DEFAULT 'pending',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.audit_logs (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id),\r\n  action TEXT NOT NULL,\r\n  details TEXT,\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.analytics_events (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id),\r\n  event_type TEXT NOT NULL,\r\n  metadata JSONB DEFAULT '{}',\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","CREATE TABLE IF NOT EXISTS public.verification_requests (\r\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\r\n  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\r\n  document_url TEXT,\r\n  status TEXT DEFAULT 'pending',\r\n  reviewer_id UUID REFERENCES public.profiles(id),\r\n  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,\r\n  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL\r\n)","-- =====================================\r\n-- Basic RLS Policies (for demonstration)\r\n-- =====================================\r\n\r\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY","CREATE POLICY \\"Select all profiles\\" ON public.profiles FOR SELECT USING (TRUE)","CREATE POLICY \\"Public profiles are viewable by everyone\\" ON public.profiles FOR SELECT USING (true)","CREATE POLICY \\"Users can insert their own profile\\" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id)","CREATE POLICY \\"Users can update own profile\\" ON public.profiles FOR UPDATE USING (auth.uid() = id)","CREATE POLICY \\"Users can delete own profile\\" ON public.profiles FOR DELETE USING (auth.uid() = id)","-- Special policy to allow the handle_new_user function to create profiles\r\nCREATE POLICY \\"Allow service role to create profiles\\" ON public.profiles FOR INSERT TO service_role WITH CHECK (TRUE)","-- (Similar basic policies should be added for each table as needed.)\r\n\r\n-- =====================================\r\n-- Triggers for updated_at management\r\n-- =====================================\r\n\r\nCREATE TRIGGER handle_profiles_updated_at\r\n  BEFORE UPDATE ON public.profiles\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER handle_posts_updated_at\r\n  BEFORE UPDATE ON public.posts\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER handle_post_comments_updated_at\r\n  BEFORE UPDATE ON public.post_comments\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER handle_videos_updated_at\r\n  BEFORE UPDATE ON public.videos\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER handle_video_comments_updated_at\r\n  BEFORE UPDATE ON public.video_comments\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER handle_stories_updated_at\r\n  BEFORE UPDATE ON public.stories\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","CREATE TRIGGER handle_events_updated_at\r\n  BEFORE UPDATE ON public.events\r\n  FOR EACH ROW\r\n  EXECUTE FUNCTION public.handle_updated_at()","-- (Additional triggers can be added for new tables as needed)"}	consolidated_schema
20240310000000	{"-- Create or replace the trigger function that will create a profile when a new user signs up\nCREATE OR REPLACE FUNCTION public.handle_new_user()\nRETURNS TRIGGER AS $$\nBEGIN\n  INSERT INTO public.profiles (\n    id, \n    username, \n    email,\n    created_at,\n    updated_at\n  )\n  VALUES (\n    NEW.id,\n    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),\n    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', NEW.id::text || '@example.com'),\n    NOW(),\n    NOW()\n  )\n  ON CONFLICT (id) DO NOTHING;\n  \n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER","-- Drop the existing trigger if it exists\nDROP TRIGGER IF EXISTS on_auth_user_created ON auth.users","-- Create the trigger to execute when new users sign up\nCREATE TRIGGER on_auth_user_created\n  AFTER INSERT ON auth.users\n  FOR EACH ROW\n  EXECUTE FUNCTION public.handle_new_user()","-- Enable RLS on profiles table (if not already enabled)\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY","-- Allow users to read all profiles (needed for friend lists, online friends, etc.)\nCREATE POLICY \\"Anyone can read all profiles\\"\nON public.profiles\nFOR SELECT\nTO authenticated, anon\nUSING (true)","-- Allow users to update their own profile\nCREATE POLICY \\"Users can update their own profile\\"\nON public.profiles\nFOR UPDATE\nTO authenticated\nUSING (auth.uid() = id)\nWITH CHECK (auth.uid() = id)","-- Allow users to delete their own profile (if needed)\nCREATE POLICY \\"Users can delete their own profile\\"\nON public.profiles\nFOR DELETE\nTO authenticated\nUSING (auth.uid() = id)","-- Allow Supabase Auth to create profiles\nCREATE POLICY \\"Auth service can create profile on signup\\"\nON public.profiles\nFOR INSERT\nTO authenticated\nWITH CHECK (auth.uid() = id)"}	fix_user_profiles
20250311000000	{"-- Add RLS policies for posts table\r\n\r\n-- Make sure RLS is enabled\r\nALTER TABLE public.posts ENABLE ROW LEVEL SECURITY","-- Allow anyone to read all posts\r\nCREATE POLICY \\"Anyone can read all posts\\"\r\nON public.posts\r\nFOR SELECT\r\nTO authenticated, anon\r\nUSING (true)","-- Allow authenticated users to create posts\r\nCREATE POLICY \\"Authenticated users can create posts\\"\r\nON public.posts\r\nFOR INSERT\r\nTO authenticated\r\nWITH CHECK (auth.uid() = author_id)","-- Allow users to update their own posts\r\nCREATE POLICY \\"Users can update their own posts\\"\r\nON public.posts\r\nFOR UPDATE\r\nTO authenticated\r\nUSING (auth.uid() = author_id)\r\nWITH CHECK (auth.uid() = author_id)","-- Allow users to delete their own posts\r\nCREATE POLICY \\"Users can delete their own posts\\"\r\nON public.posts\r\nFOR DELETE\r\nTO authenticated\r\nUSING (auth.uid() = author_id)","-- Service role can do everything\r\nCREATE POLICY \\"Service role can do anything with posts\\" \r\nON public.posts\r\nTO service_role\r\nUSING (true)"}	add_posts_rls
20250311000001	{"-- Function to check if RLS is enabled on a table\r\nCREATE OR REPLACE FUNCTION public.check_rls_enabled(table_name text)\r\nRETURNS boolean\r\nLANGUAGE plpgsql\r\nSECURITY INVOKER\r\nAS $$\r\nDECLARE\r\n  result boolean;\r\nBEGIN\r\n  SELECT relrowsecurity INTO result\r\n  FROM pg_class\r\n  WHERE oid = (table_name::regclass);\r\n  \r\n  RETURN result;\r\nEXCEPTION\r\n  WHEN OTHERS THEN\r\n    RETURN false;\r\nEND;\r\n$$","-- Function to check if the current user can perform a specific operation on a table\r\nCREATE OR REPLACE FUNCTION public.check_rls_access(\r\n  table_name text,\r\n  operation text, -- 'SELECT', 'INSERT', 'UPDATE', 'DELETE'\r\n  test_row jsonb DEFAULT '{}'::jsonb\r\n)\r\nRETURNS boolean\r\nLANGUAGE plpgsql\r\nSECURITY DEFINER\r\nSET search_path = ''\r\nAS $$\r\nDECLARE\r\n  query text;\r\n  result boolean;\r\nBEGIN\r\n  -- Ensure operation is uppercase\r\n  operation := upper(operation);\r\n  \r\n  -- Validate operation\r\n  IF operation NOT IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE') THEN\r\n    RAISE EXCEPTION 'Invalid operation: %. Must be SELECT, INSERT, UPDATE, or DELETE', operation;\r\n  END IF;\r\n  \r\n  -- Check if RLS is enabled for the table\r\n  IF EXISTS (\r\n    SELECT 1 FROM pg_tables \r\n    WHERE schemaname = 'public' \r\n    AND tablename = table_name \r\n    AND rowsecurity = true\r\n  ) THEN\r\n    -- For SELECT, INSERT, UPDATE, DELETE operations\r\n    IF operation = 'SELECT' THEN\r\n      EXECUTE format('SELECT EXISTS (\r\n        SELECT 1 FROM public.%I LIMIT 1\r\n      )', table_name) INTO result;\r\n      \r\n    ELSIF operation = 'INSERT' THEN\r\n      BEGIN\r\n        EXECUTE format('\r\n          WITH inserted AS (\r\n            INSERT INTO public.%I (\r\n              SELECT * FROM jsonb_populate_record(null::public.%I, %L)\r\n            )\r\n            RETURNING 1\r\n          )\r\n          SELECT EXISTS (SELECT 1 FROM inserted)\r\n        ', table_name, table_name, test_row);\r\n        result := true;\r\n      EXCEPTION WHEN OTHERS THEN\r\n        result := false;\r\n      END;\r\n      \r\n    ELSIF operation = 'UPDATE' THEN\r\n      BEGIN\r\n        EXECUTE format('\r\n          SELECT EXISTS (\r\n            SELECT 1 FROM public.%I \r\n            WHERE current_setting(''auth.uid'') = (id)::text\r\n            AND pg_catalog.pg_has_role(current_setting(''auth.uid'')::uuid, ''authenticated'', ''member'')\r\n            LIMIT 1\r\n          )\r\n        ', table_name) INTO result;\r\n      EXCEPTION WHEN OTHERS THEN\r\n        result := false;\r\n      END;\r\n      \r\n    ELSIF operation = 'DELETE' THEN\r\n      BEGIN\r\n        EXECUTE format('\r\n          SELECT EXISTS (\r\n            SELECT 1 FROM public.%I \r\n            WHERE current_setting(''auth.uid'') = (id)::text\r\n            AND pg_catalog.pg_has_role(current_setting(''auth.uid'')::uuid, ''authenticated'', ''member'')\r\n            LIMIT 1\r\n          )\r\n        ', table_name) INTO result;\r\n      EXCEPTION WHEN OTHERS THEN\r\n        result := false;\r\n      END;\r\n    END IF;\r\n    \r\n    RETURN result;\r\n  ELSE\r\n    -- RLS is not enabled for this table\r\n    RETURN NULL;\r\n  END IF;\r\nEND;\r\n$$","-- Function to check if current user has storage bucket access\r\nCREATE OR REPLACE FUNCTION public.check_storage_access(\r\n  bucket_id text,\r\n  operation text,  -- 'SELECT', 'INSERT', 'UPDATE', 'DELETE'\r\n  file_path text DEFAULT NULL\r\n)\r\nRETURNS boolean\r\nLANGUAGE plpgsql\r\nSECURITY DEFINER\r\nSET search_path = ''\r\nAS $$\r\nDECLARE\r\n  user_id uuid;\r\n  result boolean;\r\nBEGIN\r\n  -- Get current user ID\r\n  user_id := auth.uid();\r\n  \r\n  -- Default file path if not provided\r\n  IF file_path IS NULL THEN\r\n    file_path := user_id || '/test-file.txt';\r\n  END IF;\r\n  \r\n  -- Ensure operation is uppercase\r\n  operation := upper(operation);\r\n  \r\n  -- Validate operation\r\n  IF operation NOT IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE') THEN\r\n    RAISE EXCEPTION 'Invalid operation: %. Must be SELECT, INSERT, UPDATE, or DELETE', operation;\r\n  END IF;\r\n  \r\n  -- Check bucket exists\r\n  IF NOT EXISTS (\r\n    SELECT 1 FROM storage.buckets WHERE name = bucket_id\r\n  ) THEN\r\n    RETURN false;\r\n  END IF;\r\n  \r\n  -- Test access based on operation\r\n  BEGIN\r\n    IF operation = 'SELECT' THEN\r\n      -- Check if user can read from bucket\r\n      EXECUTE format('\r\n        SELECT EXISTS (\r\n          SELECT 1 FROM storage.objects\r\n          WHERE bucket_id = %L AND name = %L\r\n          LIMIT 1\r\n        )', bucket_id, file_path) INTO result;\r\n      \r\n    ELSIF operation = 'INSERT' THEN\r\n      -- Check if user can insert into bucket\r\n      EXECUTE format('\r\n        SELECT pg_catalog.pg_has_role(%L, ''authenticated'', ''member'')\r\n        AND EXISTS (\r\n          SELECT 1 FROM storage.buckets\r\n          WHERE name = %L\r\n        )', user_id, bucket_id) INTO result;\r\n      \r\n    ELSIF operation IN ('UPDATE', 'DELETE') THEN\r\n      -- Check if user can update/delete in bucket\r\n      EXECUTE format('\r\n        SELECT pg_catalog.pg_has_role(%L, ''authenticated'', ''member'')\r\n        AND EXISTS (\r\n          SELECT 1 FROM storage.objects\r\n          WHERE bucket_id = %L\r\n          AND (storage.foldername(name))[1] = %L\r\n          LIMIT 1\r\n        )', user_id, bucket_id, user_id::text) INTO result;\r\n    END IF;\r\n    \r\n    RETURN COALESCE(result, false);\r\n  EXCEPTION WHEN OTHERS THEN\r\n    RETURN false;\r\n  END;\r\nEND;\r\n$$"}	add_rls_helper_function
20250311000002	{"-- Enable RLS on storage.objects table (not on buckets directly)\r\nALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY","-- Policy to allow users to insert their own files with path pattern matching\r\nCREATE POLICY \\"Users can upload their own avatar\\"\r\nON storage.objects FOR INSERT TO authenticated\r\nWITH CHECK (\r\n  -- Only allow uploads to paths that start with the user's ID\r\n  bucket_id = 'avatars' AND\r\n  (storage.foldername(name))[1] = auth.uid()::text\r\n)","-- Policy to allow users to update their own files\r\nCREATE POLICY \\"Users can update their own avatar\\"\r\nON storage.objects FOR UPDATE TO authenticated\r\nUSING (\r\n  bucket_id = 'avatars' AND\r\n  (storage.foldername(name))[1] = auth.uid()::text\r\n)","-- Policy to allow users to delete their own files\r\nCREATE POLICY \\"Users can delete their own avatar\\"\r\nON storage.objects FOR DELETE TO authenticated\r\nUSING (\r\n  bucket_id = 'avatars' AND\r\n  (storage.foldername(name))[1] = auth.uid()::text\r\n)","-- Policy to allow authenticated users to read from any path in the avatars bucket\r\nCREATE POLICY \\"Authenticated users can read any avatar\\"\r\nON storage.objects FOR SELECT TO authenticated\r\nUSING (\r\n  bucket_id = 'avatars'\r\n)","-- Add public read access for avatars if needed\r\nCREATE POLICY \\"Public users can read avatars\\"\r\nON storage.objects FOR SELECT TO anon\r\nUSING (\r\n  bucket_id = 'avatars'\r\n)","-- Add policies for post-media bucket\r\nCREATE POLICY \\"Users can upload their own post media\\"\r\nON storage.objects FOR INSERT TO authenticated\r\nWITH CHECK (\r\n  bucket_id = 'post-media' AND\r\n  (storage.foldername(name))[1] = auth.uid()::text\r\n)","CREATE POLICY \\"Users can update their own post media\\"\r\nON storage.objects FOR UPDATE TO authenticated\r\nUSING (\r\n  bucket_id = 'post-media' AND\r\n  (storage.foldername(name))[1] = auth.uid()::text\r\n)","CREATE POLICY \\"Users can delete their own post media\\"\r\nON storage.objects FOR DELETE TO authenticated\r\nUSING (\r\n  bucket_id = 'post-media' AND\r\n  (storage.foldername(name))[1] = auth.uid()::text\r\n)","CREATE POLICY \\"Authenticated users can read any post media\\"\r\nON storage.objects FOR SELECT TO authenticated\r\nUSING (\r\n  bucket_id = 'post-media'\r\n)","CREATE POLICY \\"Public users can read post media\\"\r\nON storage.objects FOR SELECT TO anon\r\nUSING (\r\n  bucket_id = 'post-media'\r\n)","-- Allow authenticated users to access the bucket\r\nCREATE POLICY \\"Allow users to use post-media bucket\\"\r\nON storage.buckets\r\nFOR ALL\r\nTO authenticated\r\nUSING (name = 'post-media')","-- Create the post-media bucket if it doesn't exist\r\nINSERT INTO storage.buckets (id, name, public)\r\nVALUES ('post-media', 'post-media', true)\r\nON CONFLICT (id) DO NOTHING"}	add_storage_rls
20250311000003	{"-- Our post_relations_rls migration"}	\N
20250311000004	{"-- Fix public schema permissions"}	\N
20250311000005	{"-- Add follows RLS"}	\N
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 6, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: analytics_events analytics_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: conversation_participants conversation_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation_participants
    ADD CONSTRAINT conversation_participants_pkey PRIMARY KEY (conversation_id, user_id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: dao_proposals dao_proposals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dao_proposals
    ADD CONSTRAINT dao_proposals_pkey PRIMARY KEY (id);


--
-- Name: dao_treasury dao_treasury_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dao_treasury
    ADD CONSTRAINT dao_treasury_pkey PRIMARY KEY (id);


--
-- Name: dao_votes dao_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dao_votes
    ADD CONSTRAINT dao_votes_pkey PRIMARY KEY (id);


--
-- Name: event_participants event_participants_event_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_event_id_user_id_key UNIQUE (event_id, user_id);


--
-- Name: event_participants event_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: followers followers_follower_id_following_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_following_id_key UNIQUE (follower_id, following_id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: follows_count follows_count_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows_count
    ADD CONSTRAINT follows_count_pkey PRIMARY KEY (user_id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (follower_id, following_id);


--
-- Name: friend_requests friend_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (id);


--
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (group_id, user_id);


--
-- Name: group_posts group_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_posts
    ADD CONSTRAINT group_posts_pkey PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: marketplace_categories marketplace_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_categories
    ADD CONSTRAINT marketplace_categories_pkey PRIMARY KEY (id);


--
-- Name: marketplace_favorites marketplace_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_favorites
    ADD CONSTRAINT marketplace_favorites_pkey PRIMARY KEY (listing_id, user_id);


--
-- Name: marketplace_listings marketplace_listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_listings
    ADD CONSTRAINT marketplace_listings_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: post_comments post_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_pkey PRIMARY KEY (id);


--
-- Name: post_likes post_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_pkey PRIMARY KEY (post_id, user_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_email_key UNIQUE (email);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username);


--
-- Name: report_content report_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_content
    ADD CONSTRAINT report_content_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_pkey PRIMARY KEY (user_id);


--
-- Name: verification_requests verification_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT verification_requests_pkey PRIMARY KEY (id);


--
-- Name: video_comments video_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_comments
    ADD CONSTRAINT video_comments_pkey PRIMARY KEY (id);


--
-- Name: video_likes video_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_likes
    ADD CONSTRAINT video_likes_pkey PRIMARY KEY (video_id, user_id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks
    ADD CONSTRAINT hooks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: extensions_tenant_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE INDEX extensions_tenant_external_id_index ON _realtime.extensions USING btree (tenant_external_id);


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON _realtime.extensions USING btree (tenant_external_id, type);


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX tenants_external_id_index ON _realtime.tenants USING btree (external_id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- Name: events handle_events_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: post_comments handle_post_comments_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_post_comments_updated_at BEFORE UPDATE ON public.post_comments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: posts handle_posts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: profiles handle_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: stories handle_stories_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_stories_updated_at BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: video_comments handle_video_comments_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_video_comments_updated_at BEFORE UPDATE ON public.video_comments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: videos handle_videos_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_tenant_external_id_fkey FOREIGN KEY (tenant_external_id) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: analytics_events analytics_events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);


--
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);


--
-- Name: bookmarks bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: conversation_participants conversation_participants_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation_participants
    ADD CONSTRAINT conversation_participants_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: conversation_participants conversation_participants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation_participants
    ADD CONSTRAINT conversation_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: dao_proposals dao_proposals_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dao_proposals
    ADD CONSTRAINT dao_proposals_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: dao_votes dao_votes_proposal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dao_votes
    ADD CONSTRAINT dao_votes_proposal_id_fkey FOREIGN KEY (proposal_id) REFERENCES public.dao_proposals(id) ON DELETE CASCADE;


--
-- Name: dao_votes dao_votes_voter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dao_votes
    ADD CONSTRAINT dao_votes_voter_id_fkey FOREIGN KEY (voter_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: event_participants event_participants_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_participants event_participants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_participants
    ADD CONSTRAINT event_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: events events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: followers followers_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: followers followers_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: follows_count follows_count_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows_count
    ADD CONSTRAINT follows_count_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: follows follows_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: follows follows_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: friend_requests friend_requests_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: friend_requests friend_requests_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: group_members group_members_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: group_members group_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: group_posts group_posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_posts
    ADD CONSTRAINT group_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: group_posts group_posts_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_posts
    ADD CONSTRAINT group_posts_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: groups groups_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: marketplace_favorites marketplace_favorites_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_favorites
    ADD CONSTRAINT marketplace_favorites_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.marketplace_listings(id) ON DELETE CASCADE;


--
-- Name: marketplace_favorites marketplace_favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_favorites
    ADD CONSTRAINT marketplace_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: marketplace_listings marketplace_listings_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_listings
    ADD CONSTRAINT marketplace_listings_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.marketplace_categories(id);


--
-- Name: marketplace_listings marketplace_listings_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_listings
    ADD CONSTRAINT marketplace_listings_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: messages messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.profiles(id);


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: post_comments post_comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_comments post_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: post_likes post_likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_likes post_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: posts posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: report_content report_content_reporter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_content
    ADD CONSTRAINT report_content_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: stories stories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: user_settings user_settings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: verification_requests verification_requests_reviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT verification_requests_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.profiles(id);


--
-- Name: verification_requests verification_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT verification_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: video_comments video_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_comments
    ADD CONSTRAINT video_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: video_comments video_comments_video_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_comments
    ADD CONSTRAINT video_comments_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id) ON DELETE CASCADE;


--
-- Name: video_likes video_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_likes
    ADD CONSTRAINT video_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: video_likes video_likes_video_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_likes
    ADD CONSTRAINT video_likes_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id) ON DELETE CASCADE;


--
-- Name: videos videos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles Allow service role to create profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow service role to create profiles" ON public.profiles FOR INSERT TO service_role WITH CHECK (true);


--
-- Name: posts Anyone can read all posts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read all posts" ON public.posts FOR SELECT TO authenticated, anon USING (true);


--
-- Name: profiles Anyone can read all profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read all profiles" ON public.profiles FOR SELECT TO authenticated, anon USING (true);


--
-- Name: follows_count Anyone can read follow counts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read follow counts" ON public.follows_count FOR SELECT TO authenticated, anon USING (true);


--
-- Name: followers Anyone can read followers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read followers" ON public.followers FOR SELECT TO authenticated, anon USING (true);


--
-- Name: follows Anyone can read follows; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read follows" ON public.follows FOR SELECT TO authenticated, anon USING (true);


--
-- Name: post_comments Anyone can read post comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read post comments" ON public.post_comments FOR SELECT TO authenticated, anon USING (true);


--
-- Name: post_likes Anyone can read post likes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read post likes" ON public.post_likes FOR SELECT TO authenticated, anon USING (true);


--
-- Name: profiles Auth service can create profile on signup; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Auth service can create profile on signup" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: post_comments Authenticated users can create comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can create comments" ON public.post_comments FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: post_likes Authenticated users can create likes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can create likes" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: posts Authenticated users can create posts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT TO authenticated WITH CHECK ((auth.uid() = author_id));


--
-- Name: follows Authenticated users can follow others; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can follow others" ON public.follows FOR INSERT TO authenticated WITH CHECK ((auth.uid() = follower_id));


--
-- Name: profiles Public profiles are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);


--
-- Name: profiles Select all profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Select all profiles" ON public.profiles FOR SELECT USING (true);


--
-- Name: posts Service role can do anything with posts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Service role can do anything with posts" ON public.posts TO service_role USING (true);


--
-- Name: profiles Users can delete own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING ((auth.uid() = id));


--
-- Name: post_comments Users can delete their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own comments" ON public.post_comments FOR DELETE TO authenticated USING ((auth.uid() = user_id));


--
-- Name: post_likes Users can delete their own likes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own likes" ON public.post_likes FOR DELETE TO authenticated USING ((auth.uid() = user_id));


--
-- Name: posts Users can delete their own posts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE TO authenticated USING ((auth.uid() = author_id));


--
-- Name: profiles Users can delete their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE TO authenticated USING ((auth.uid() = id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: follows Users can unfollow others; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can unfollow others" ON public.follows FOR DELETE TO authenticated USING ((auth.uid() = follower_id));


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: post_comments Users can update their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own comments" ON public.post_comments FOR UPDATE TO authenticated USING ((auth.uid() = user_id));


--
-- Name: posts Users can update their own posts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE TO authenticated USING ((auth.uid() = author_id)) WITH CHECK ((auth.uid() = author_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: followers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;

--
-- Name: follows; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

--
-- Name: follows_count; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.follows_count ENABLE ROW LEVEL SECURITY;

--
-- Name: post_comments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: post_likes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

--
-- Name: posts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets Allow users to use post-media bucket; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow users to use post-media bucket" ON storage.buckets TO authenticated USING ((name = 'post-media'::text));


--
-- Name: objects Authenticated users can read any avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Authenticated users can read any avatar" ON storage.objects FOR SELECT TO authenticated USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Authenticated users can read any post media; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Authenticated users can read any post media" ON storage.objects FOR SELECT TO authenticated USING ((bucket_id = 'post-media'::text));


--
-- Name: objects Public users can read avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public users can read avatars" ON storage.objects FOR SELECT TO anon USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Public users can read post media; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public users can read post media" ON storage.objects FOR SELECT TO anon USING ((bucket_id = 'post-media'::text));


--
-- Name: objects Users can delete their own avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE TO authenticated USING (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));


--
-- Name: objects Users can delete their own post media; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can delete their own post media" ON storage.objects FOR DELETE TO authenticated USING (((bucket_id = 'post-media'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));


--
-- Name: objects Users can update their own avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE TO authenticated USING (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));


--
-- Name: objects Users can update their own post media; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can update their own post media" ON storage.objects FOR UPDATE TO authenticated USING (((bucket_id = 'post-media'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));


--
-- Name: objects Users can upload their own avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT TO authenticated WITH CHECK (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));


--
-- Name: objects Users can upload their own post media; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can upload their own post media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (((bucket_id = 'post-media'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA net; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA net TO supabase_functions_admin;
GRANT USAGE ON SCHEMA net TO postgres;
GRANT USAGE ON SCHEMA net TO anon;
GRANT USAGE ON SCHEMA net TO authenticated;
GRANT USAGE ON SCHEMA net TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA supabase_functions; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA supabase_functions TO postgres;
GRANT USAGE ON SCHEMA supabase_functions TO anon;
GRANT USAGE ON SCHEMA supabase_functions TO authenticated;
GRANT USAGE ON SCHEMA supabase_functions TO service_role;
GRANT ALL ON SCHEMA supabase_functions TO supabase_functions_admin;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION http_request(); Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

REVOKE ALL ON FUNCTION supabase_functions.http_request() FROM PUBLIC;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO postgres;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO anon;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO authenticated;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.schema_migrations TO postgres;
GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE event_participants; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.event_participants TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.event_participants TO authenticated;


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.events TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.events TO authenticated;


--
-- Name: TABLE followers; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.followers TO anon;
GRANT SELECT,INSERT,DELETE ON TABLE public.followers TO authenticated;


--
-- Name: TABLE follows; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.follows TO anon;
GRANT SELECT,INSERT,DELETE ON TABLE public.follows TO authenticated;


--
-- Name: TABLE post_comments; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.post_comments TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.post_comments TO authenticated;


--
-- Name: TABLE post_likes; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.post_likes TO anon;
GRANT SELECT,INSERT,DELETE ON TABLE public.post_likes TO authenticated;


--
-- Name: TABLE posts; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.posts TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.posts TO authenticated;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.profiles TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.profiles TO authenticated;


--
-- Name: TABLE stories; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.stories TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.stories TO authenticated;


--
-- Name: TABLE videos; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.videos TO anon;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.videos TO authenticated;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE hooks; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.hooks TO postgres;
GRANT ALL ON TABLE supabase_functions.hooks TO anon;
GRANT ALL ON TABLE supabase_functions.hooks TO authenticated;
GRANT ALL ON TABLE supabase_functions.hooks TO service_role;


--
-- Name: SEQUENCE hooks_id_seq; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO postgres;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO anon;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO authenticated;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO service_role;


--
-- Name: TABLE migrations; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.migrations TO postgres;
GRANT ALL ON TABLE supabase_functions.migrations TO anon;
GRANT ALL ON TABLE supabase_functions.migrations TO authenticated;
GRANT ALL ON TABLE supabase_functions.migrations TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO authenticated;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO postgres;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

