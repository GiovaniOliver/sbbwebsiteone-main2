# Supabase Database Migrations

This document provides an overview of the current state of migrations in the project.

## Migration Status

As of March 11, 2025, the following migrations have been applied to the database in order:

1. `20240300000000_consolidated_schema.sql` - Base schema with all tables
2. `20240310000000_fix_user_profiles.sql` - Profile table RLS
3. `20250311000000_add_posts_rls.sql` - Posts table RLS
4. `20250311000001_add_rls_helper_function.sql` - Helper functions for RLS
5. `20250311000002_add_storage_rls.sql` - Storage RLS
6. `20250311000003_add_post_relations_rls.sql` - Post relationships (likes, comments) RLS
7. `20250311000004_fix_public_schema_permissions.sql` - Fixed schema permissions for anon and authenticated roles
8. `20250311000005_add_follows_rls.sql` - Added RLS to follows-related tables

## Applying Migrations

To apply migrations, use the following command:

```bash
cd supabase
supabase db reset
```

### Important Notes

- If adding a new migration, ensure the version number is higher than the latest one
- Always back up data before running migrations
- Test migrations in development before applying to production

## Row-Level Security (RLS) Implementation

The following tables have RLS enabled:

1. `profiles` - User profiles
2. `posts` - User posts 
3. `post_likes` - Post likes
4. `post_comments` - Post comments
5. `storage.objects` - Storage objects
6. `follows` - User follows relationships
7. `followers` - User followers view
8. `follows_count` - Follower/following counts

Make sure any new tables have appropriate RLS policies to ensure data security.

## Permissions Model

For RLS to work properly, we need both:
1. **RLS Policies** - Define who can do what with specific rows
2. **Schema Permissions** - Grant basic access to the tables themselves

Our permissions model grants:
- `anon` & `authenticated`: SELECT on all tables
- `authenticated`: INSERT, UPDATE, DELETE on appropriate tables based on RLS policies
- Default privileges are set for future tables

## Troubleshooting

If experiencing issues with database access:

1. Check that the user has proper authentication
2. Verify that appropriate RLS policies exist for the table
3. Ensure table has RLS enabled with `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
4. Verify schema permissions with `SELECT grantee, privilege_type FROM information_schema.role_table_grants WHERE table_schema = 'public' AND table_name = 'table_name';`
5. Verify connections in the application are using the correct Supabase client and credentials 