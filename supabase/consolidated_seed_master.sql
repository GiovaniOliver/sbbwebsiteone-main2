-- ==============================
-- Master Consolidated Seed File for SBB Website
-- Purpose: Import all seed data parts in the correct order
-- Created: March 12, 2025
-- ==============================

-- Part 1: Core Users and Profiles
\i 'consolidated_seed_part1.sql'

-- Part 2: Posts, Likes, Comments
\i 'consolidated_seed_part2.sql'

-- Part 3: Videos and Stories
\i 'consolidated_seed_part3.sql'

-- Part 4: Events System
\i 'consolidated_seed_part4.sql'

-- Part 5: Groups and Community
\i 'consolidated_seed_part5.sql'

-- Part 6: DAO Governance & Marketplace
\i 'consolidated_seed_part6.sql'

-- Part 7: Additional Features
\i 'consolidated_seed_part7.sql'

-- COMMIT EVERYTHING
COMMIT;

-- ==============================
-- Seed File Completed Successfully
-- ==============================
