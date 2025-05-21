-- ==============================
-- Consolidated Seed File for SBB Website (Part 7)
-- Additional Features
-- ==============================

-- =====================================
-- Hashtags
-- =====================================

INSERT INTO public.hashtags (name, posts_count)
VALUES 
  ('#Web3', 25),
  ('#Blockchain', 42),
  ('#NFT', 38),
  ('#DeFi', 31),
  ('#SmartContracts', 19),
  ('#DAO', 22),
  ('#Tokenomics', 15),
  ('#Ethereum', 29),
  ('#BlackEntrepreneur', 40),
  ('#SupportBuyingBlack', 65);

-- =====================================
-- Notifications
-- =====================================

INSERT INTO public.notifications (user_id, actor_id, type, content, read, reference_id, reference_type)
VALUES
  -- Alice's notifications
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'like', 'Bob liked your post about the Web3 course.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'post'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'like', 'Carol liked your post about the Web3 course.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'post'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'comment', 'Bob commented on your post about the Web3 course.', FALSE, (SELECT id FROM public.post_comments WHERE user_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%This looks great%'), 'post_comment'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'message', 'Carol sent you a message.', FALSE, (SELECT id FROM public.messages WHERE content LIKE '%invite you to collaborate%'), 'message'),
  
  -- Bob's notifications
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'like', 'Alice liked your post about the smart contract.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'post'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'g5555555-6666-7777-8888-999999999999', 'like', 'Ian liked your post about the smart contract.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'post'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'g5555555-6666-7777-8888-999999999999', 'comment', 'Ian commented on your post about the smart contract.', FALSE, (SELECT id FROM public.post_comments WHERE user_id = 'g5555555-6666-7777-8888-999999999999' AND content LIKE '%I''d be interested in helping%'), 'post_comment'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'b1111111-2222-3333-4444-555555555555', 'friend_request', 'Eve sent you a friend request.', FALSE, (SELECT id FROM public.friend_requests WHERE receiver_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND sender_id = 'b1111111-2222-3333-4444-555555555555'), 'friend_request'),
  
  -- Carol's notifications
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'like', 'Alice liked your post about the NFT collection.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%'), 'post'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'b1111111-2222-3333-4444-555555555555', 'like', 'Eve liked your post about the NFT collection.', FALSE, (SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%'), 'post'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'b1111111-2222-3333-4444-555555555555', 'comment', 'Eve commented on your post about the NFT collection.', FALSE, (SELECT id FROM public.post_comments WHERE user_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%These look amazing%'), 'post_comment'),
  
  -- Other users' notifications
  ('a1111111-2222-3333-4444-555555555555', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'like', 'Bob liked your post about the incubator.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'a1111111-2222-3333-4444-555555555555' AND content LIKE '%incubator%'), 'post'),
  ('a1111111-2222-3333-4444-555555555555', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'friend_request', 'Alice sent you a friend request.', FALSE, (SELECT id FROM public.friend_requests WHERE receiver_id = 'a1111111-2222-3333-4444-555555555555' AND sender_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'), 'friend_request'),
  
  ('b1111111-2222-3333-4444-555555555555', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'like', 'Carol liked your post about the exhibition.', TRUE, (SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%'), 'post'),
  ('b1111111-2222-3333-4444-555555555555', 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'like', 'Jessica liked your post about the exhibition.', FALSE, (SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%'), 'post'),
  ('b1111111-2222-3333-4444-555555555555', 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'comment', 'Jessica commented on your post about the exhibition.', FALSE, (SELECT id FROM public.post_comments WHERE user_id = 'h6666666-7777-8888-9999-aaaaaaaaaaaa' AND content LIKE '%Looking forward to this%'), 'post_comment');

-- =====================================
-- Bookmarks
-- =====================================

INSERT INTO public.bookmarks (user_id, content_type, content_id)
VALUES
  -- Alice's bookmarks
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'post', (SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%')),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'post', (SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%')),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'video', (SELECT id FROM public.videos WHERE title = 'NFT Creation Workshop')),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'event', (SELECT id FROM public.events WHERE title = 'NFT Artists Showcase')),
  
  -- Bob's bookmarks
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'post', (SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%')),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'event', (SELECT id FROM public.events WHERE title = 'Blockchain Security Symposium')),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'video', (SELECT id FROM public.videos WHERE title = 'Blockchain Security Fundamentals')),
  
  -- Carol's bookmarks
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'post', (SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%')),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'marketplace', (SELECT id FROM public.marketplace_listings WHERE title = 'NFT Collection Design')),
  
  -- Other users' bookmarks
  ('a1111111-2222-3333-4444-555555555555', 'post', (SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%')),
  ('a1111111-2222-3333-4444-555555555555', 'video', (SELECT id FROM public.videos WHERE title = 'DeFi Explained')),
  
  ('b1111111-2222-3333-4444-555555555555', 'event', (SELECT id FROM public.events WHERE title = 'NFT Artists Showcase')),
  ('b1111111-2222-3333-4444-555555555555', 'video', (SELECT id FROM public.videos WHERE title = 'NFT Creation Workshop')),
  
  ('g5555555-6666-7777-8888-999999999999', 'event', (SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025')),
  ('g5555555-6666-7777-8888-999999999999', 'marketplace', (SELECT id FROM public.marketplace_listings WHERE title = 'Smart Contract Templates Bundle')),
  
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'event', (SELECT id FROM public.events WHERE title = 'DAO Governance Roundtable')),
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'marketplace', (SELECT id FROM public.marketplace_listings WHERE title = 'DeFi Workshop - 3 Hour Session'));

-- =====================================
-- User Settings
-- =====================================

INSERT INTO public.user_settings (user_id, settings)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', '{"theme": "light", "notifications": {"email": true, "push": true, "browser": true}, "privacy": {"profile_visibility": "public", "activity_visibility": "public"}, "language": "en-US"}'),
  
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', '{"theme": "dark", "notifications": {"email": true, "push": true, "browser": true}, "privacy": {"profile_visibility": "public", "activity_visibility": "public"}, "language": "en-US"}'),
  
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', '{"theme": "light", "notifications": {"email": true, "push": false, "browser": true}, "privacy": {"profile_visibility": "public", "activity_visibility": "followers"}, "language": "en-GB"}'),
  
  ('a1111111-2222-3333-4444-555555555555', '{"theme": "dark", "notifications": {"email": false, "push": true, "browser": true}, "privacy": {"profile_visibility": "public", "activity_visibility": "public"}, "language": "de-DE"}'),
  
  ('b1111111-2222-3333-4444-555555555555', '{"theme": "light", "notifications": {"email": true, "push": true, "browser": false}, "privacy": {"profile_visibility": "public", "activity_visibility": "private"}, "language": "ja-JP"}');

-- =====================================
-- Audit and Analytics
-- =====================================

INSERT INTO public.audit_logs (user_id, action, details)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'login', 'Successful login from San Francisco, CA'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'create_post', 'Created new post'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'like_post', 'Liked post'),
  
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'login', 'Successful login from New York, NY'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'create_post', 'Created new post'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'comment_post', 'Commented on post'),
  
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'login', 'Successful login from London, UK'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'create_post', 'Created new post'),
  
  ('a1111111-2222-3333-4444-555555555555', 'login', 'Successful login from Berlin, Germany'),
  ('a1111111-2222-3333-4444-555555555555', 'create_post', 'Created new post'),
  
  ('b1111111-2222-3333-4444-555555555555', 'login', 'Successful login from Tokyo, Japan'),
  ('b1111111-2222-3333-4444-555555555555', 'create_post', 'Created new post');

INSERT INTO public.analytics_events (user_id, event_type, metadata)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'page_view', '{"page": "home", "time_spent": 120}'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'page_view', '{"page": "profile", "time_spent": 45}'),
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'post_interaction', '{"action": "create", "time_spent": 180}'),
  
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'page_view', '{"page": "home", "time_spent": 90}'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'page_view', '{"page": "marketplace", "time_spent": 200}'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'post_interaction', '{"action": "create", "time_spent": 150}'),
  
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'page_view', '{"page": "home", "time_spent": 75}'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'page_view', '{"page": "events", "time_spent": 120}'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'post_interaction', '{"action": "create", "time_spent": 210}'),
  
  ('a1111111-2222-3333-4444-555555555555', 'page_view', '{"page": "home", "time_spent": 60}'),
  ('a1111111-2222-3333-4444-555555555555', 'page_view', '{"page": "dao", "time_spent": 180}'),
  ('a1111111-2222-3333-4444-555555555555', 'post_interaction', '{"action": "create", "time_spent": 120}'),
  
  ('b1111111-2222-3333-4444-555555555555', 'page_view', '{"page": "home", "time_spent": 45}'),
  ('b1111111-2222-3333-4444-555555555555', 'page_view', '{"page": "marketplace", "time_spent": 90}'),
  ('b1111111-2222-3333-4444-555555555555', 'post_interaction', '{"action": "create", "time_spent": 135}');

-- =====================================
-- Verification Requests
-- =====================================

INSERT INTO public.verification_requests (user_id, document_url, status, reviewer_id)
VALUES
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'https://example.com/docs/carol_id.png', 'approved', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'https://example.com/docs/bob_id.png', 'approved', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('a1111111-2222-3333-4444-555555555555', 'https://example.com/docs/dave_id.png', 'pending', NULL),
  ('b1111111-2222-3333-4444-555555555555', 'https://example.com/docs/eve_id.png', 'rejected', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('g5555555-6666-7777-8888-999999999999', 'https://example.com/docs/ian_id.png', 'pending', NULL);

-- =====================================
-- Database Backups & Maintenance
-- =====================================

INSERT INTO public.database_backups (id, backup_name, backup_path, backup_size, backup_type, status, started_at, completed_at, initiated_by)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Full Backup - March 1, 2025', '/backups/sbb_backup_20250301.sql', 24576, 'full', 'completed', NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days' + INTERVAL '30 minutes', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('20000000-0000-0000-0000-000000000002', 'Full Backup - March 5, 2025', '/backups/sbb_backup_20250305.sql', 25600, 'full', 'completed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '35 minutes', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('30000000-0000-0000-0000-000000000003', 'Incremental Backup - March 8, 2025', '/backups/sbb_backup_inc_20250308.sql', 4096, 'incremental', 'completed', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days' + INTERVAL '10 minutes', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('40000000-0000-0000-0000-000000000004', 'Full Backup - March 10, 2025', '/backups/sbb_backup_20250310.sql', 26624, 'full', 'completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '40 minutes', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6');

INSERT INTO public.scheduled_backups (backup_name, backup_type, schedule, retention_period, is_active, last_run, next_run, created_by)
VALUES
  ('Daily Incremental Backup', 'incremental', 'daily', 7, TRUE, NOW() - INTERVAL '1 day', NOW() + INTERVAL '23 hours', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('Weekly Full Backup', 'full', 'weekly', 30, TRUE, NOW() - INTERVAL '5 days', NOW() + INTERVAL '2 days', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('Monthly Full Backup', 'full', 'monthly', 180, TRUE, NOW() - INTERVAL '11 days', NOW() + INTERVAL '19 days', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6');
