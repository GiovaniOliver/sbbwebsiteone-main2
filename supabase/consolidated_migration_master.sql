-- ==============================
-- Consolidated Migration Master File
-- ==============================

-- This file loads all consolidated migration parts in the correct order.
-- Use this file to apply all migrations at once.

-- Start a transaction to ensure all migrations are applied atomically
BEGIN;

-- Part 1: Core Schema and User Profiles
\i 'supabase/consolidated_migration_part1.sql'

-- Part 2: Content and Social Features
\i 'supabase/consolidated_migration_part2.sql'

-- Part 3: Database Optimizations and Enhancements
\i 'supabase/consolidated_migration_part3.sql'

-- Part 4: Event Management and RSVP System
\i 'supabase/consolidated_migration_part4.sql'

-- Part 5: Messaging Infrastructure
\i 'supabase/consolidated_migration_part5.sql'

-- Part 6: Bookmarks Functionality
\i 'supabase/consolidated_migration_part6.sql'

-- Part 7: Online Status Feature
\i 'supabase/consolidated_migration_part7.sql'

-- Commit all changes
COMMIT;

-- Run vacuum analyze to update statistics
VACUUM ANALYZE; 