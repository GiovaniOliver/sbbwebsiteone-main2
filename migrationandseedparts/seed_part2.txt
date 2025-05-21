-- ==============================
-- Consolidated Seed File for SBB Website (Part 2)
-- Content: Posts, Likes, Comments
-- ==============================

-- =====================================
-- Content: Posts, Likes, Comments
-- =====================================

-- Seed Posts with different visibility options
INSERT INTO public.posts (author_id, content, images, type, status, visibility)
VALUES
  -- Public posts
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Just launched a new Web3 course for beginners! Check out the link in my profile.', ARRAY['https://via.placeholder.com/800x400?text=Web3+Course'], 'standard', 'published', 'public'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Working on a new smart contract for decentralized voting. Open to collaborators!', ARRAY[]::TEXT[], 'standard', 'published', 'public'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Just minted my new NFT collection inspired by cyberpunk aesthetics. Limited edition of 100.', ARRAY['https://via.placeholder.com/800x800?text=NFT+Collection'], 'standard', 'published', 'public'),
  ('a1111111-2222-3333-4444-555555555555', 'Excited to announce our incubator is now accepting applications from Web3 startups.', ARRAY[]::TEXT[], 'standard', 'published', 'public'),
  ('b1111111-2222-3333-4444-555555555555', 'My digital art exhibition opens this weekend. NFT owners get VIP access!', ARRAY['https://via.placeholder.com/1200x600?text=Art+Exhibition'], 'standard', 'published', 'public'),
  
  -- Followers-only posts
  ('d2222222-3333-4444-5555-666666666666', 'Here''s an early preview of my blockchain adoption framework for enterprises.', ARRAY['https://via.placeholder.com/1000x800?text=Framework+Preview'], 'standard', 'published', 'followers'),
  ('e3333333-4444-5555-6666-777777777777', 'Working on a comprehensive guide to DeFi. Here''s an exclusive look at the first chapter.', ARRAY[]::TEXT[], 'standard', 'published', 'followers'),
  
  -- Private posts
  ('f4444444-5555-6666-7777-888888888888', 'Personal notes from yesterday''s security audit - need to review these later.', ARRAY[]::TEXT[], 'standard', 'published', 'private'),
  ('g5555555-6666-7777-8888-999999999999', 'Drafting a proposal for a new DeFi protocol - not ready to share details yet.', ARRAY[]::TEXT[], 'standard', 'published', 'private'),
  
  -- Archived post
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'Old event announcement that is no longer relevant.', ARRAY[]::TEXT[], 'standard', 'published', 'public');

-- Mark the last post as archived
UPDATE public.posts SET archived = true WHERE author_id = 'h6666666-7777-8888-9999-aaaaaaaaaaaa';

-- Add some more posts for pagination testing
INSERT INTO public.posts (author_id, content, type, status, visibility)
SELECT 
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',  -- Alice
  'Paginated post #' || i || ': Testing the feed pagination functionality with multiple posts.',
  'standard',
  'published',
  'public'
FROM generate_series(1, 15) AS i;

-- Seed Post Likes
INSERT INTO public.post_likes (post_id, user_id)
VALUES
  -- Likes for Alice's post
  ((SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'),
  ((SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8'),
  ((SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'd2222222-3333-4444-5555-666666666666'),
  
  -- Likes for Bob's post
  ((SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ((SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'g5555555-6666-7777-8888-999999999999'),
  
  -- Likes for Carol's post
  ((SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%'), 'b1111111-2222-3333-4444-555555555555'),
  ((SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  
  -- Likes for Dave's post
  ((SELECT id FROM public.posts WHERE author_id = 'a1111111-2222-3333-4444-555555555555' AND content LIKE '%incubator%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'),
  
  -- Likes for Eve's post
  ((SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8'),
  ((SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa');

-- Seed Post Comments
INSERT INTO public.post_comments (post_id, user_id, content)
VALUES
  -- Comments on Alice's post
  ((SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'This looks great! Is it suitable for complete beginners?'),
  ((SELECT id FROM public.posts WHERE author_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND content LIKE '%Web3 course%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Yes, absolutely! It starts from the very basics.'),
  
  -- Comments on Bob's post
  ((SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'g5555555-6666-7777-8888-999999999999', 'I''d be interested in helping. What language are you using?'),
  ((SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Solidity for Ethereum, but considering multi-chain compatibility.'),
  ((SELECT id FROM public.posts WHERE author_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' AND content LIKE '%smart contract%'), 'f4444444-5555-6666-7777-888888888888', 'Let me know if you need help with security auditing once it''s ready.'),
  
  -- Comments on Carol's post
  ((SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%'), 'b1111111-2222-3333-4444-555555555555', 'These look amazing! What marketplace are they available on?'),
  ((SELECT id FROM public.posts WHERE author_id = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND content LIKE '%NFT collection%'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Thank you! They''re available on OpenSea and Rarible.'),
  
  -- Comments on Eve's post
  ((SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'Looking forward to this! Will there be a virtual tour option for those who can''t attend in person?'),
  ((SELECT id FROM public.posts WHERE author_id = 'b1111111-2222-3333-4444-555555555555' AND content LIKE '%exhibition%'), 'b1111111-2222-3333-4444-555555555555', 'Yes! We''ll have a fully immersive virtual gallery tour available online.');
