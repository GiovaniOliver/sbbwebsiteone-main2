-- ==============================
-- Consolidated Seed File for SBB Website (Part 3)
-- Content: Videos and Stories
-- ==============================

-- =====================================
-- Content: Videos and Stories
-- =====================================

-- Seed Videos
INSERT INTO public.videos (user_id, title, description, url, thumbnail_url, duration)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Web3 for Beginners', 'Learn the fundamentals of Web3 technology', 'https://www.example.com/videos/web3-beginners', 'https://via.placeholder.com/1280x720?text=Web3+Beginners', 1800),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Smart Contract Development', 'Deep dive into Solidity programming', 'https://www.example.com/videos/solidity-deep-dive', 'https://via.placeholder.com/1280x720?text=Solidity+Programming', 2400),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'NFT Creation Workshop', 'Step-by-step guide to creating your first NFT collection', 'https://www.example.com/videos/nft-workshop', 'https://via.placeholder.com/1280x720?text=NFT+Workshop', 3600),
  ('e3333333-4444-5555-6666-777777777777', 'DeFi Explained', 'Understanding decentralized finance protocols', 'https://www.example.com/videos/defi-explained', 'https://via.placeholder.com/1280x720?text=DeFi+Explained', 1500),
  ('f4444444-5555-6666-7777-888888888888', 'Blockchain Security Fundamentals', 'Best practices for secure blockchain applications', 'https://www.example.com/videos/blockchain-security', 'https://via.placeholder.com/1280x720?text=Blockchain+Security', 2700);

-- Seed Video Likes
INSERT INTO public.video_likes (video_id, user_id)
VALUES
  ((SELECT id FROM public.videos WHERE title = 'Web3 for Beginners'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'),
  ((SELECT id FROM public.videos WHERE title = 'Web3 for Beginners'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8'),
  ((SELECT id FROM public.videos WHERE title = 'Smart Contract Development'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ((SELECT id FROM public.videos WHERE title = 'Smart Contract Development'), 'g5555555-6666-7777-8888-999999999999'),
  ((SELECT id FROM public.videos WHERE title = 'NFT Creation Workshop'), 'b1111111-2222-3333-4444-555555555555'),
  ((SELECT id FROM public.videos WHERE title = 'DeFi Explained'), 'g5555555-6666-7777-8888-999999999999'),
  ((SELECT id FROM public.videos WHERE title = 'Blockchain Security Fundamentals'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7');

-- Seed Video Comments
INSERT INTO public.video_comments (video_id, user_id, content)
VALUES
  ((SELECT id FROM public.videos WHERE title = 'Web3 for Beginners'), 'g5555555-6666-7777-8888-999999999999', 'This was incredibly helpful. Any plans for an advanced course?'),
  ((SELECT id FROM public.videos WHERE title = 'Web3 for Beginners'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Yes! The advanced course will be released next month.'),
  ((SELECT id FROM public.videos WHERE title = 'Smart Contract Development'), 'a1111111-2222-3333-4444-555555555555', 'Great content! Could you cover security best practices in a future video?'),
  ((SELECT id FROM public.videos WHERE title = 'NFT Creation Workshop'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'This helped me launch my first collection. Thank you!'),
  ((SELECT id FROM public.videos WHERE title = 'Blockchain Security Fundamentals'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Essential viewing for any smart contract developer.');

-- Seed Stories (temporary content)
INSERT INTO public.stories (user_id, thumbnail_url, expires_at, content, type)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'https://via.placeholder.com/800x1600?text=Alice+Story', NOW() + INTERVAL '24 hours', 'Just presented at the Web3 Summit!', 'image'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'https://via.placeholder.com/800x1600?text=Bob+Story', NOW() + INTERVAL '24 hours', 'Coding session in progress', 'image'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'https://via.placeholder.com/800x1600?text=Carol+Story', NOW() + INTERVAL '24 hours', 'Preview of my next NFT drop', 'image'),
  ('b1111111-2222-3333-4444-555555555555', 'https://via.placeholder.com/800x1600?text=Eve+Story', NOW() + INTERVAL '24 hours', 'Setting up for tomorrow''s exhibition', 'image'),
  ('f4444444-5555-6666-7777-888888888888', 'https://via.placeholder.com/800x1600?text=Hannah+Story', NOW() + INTERVAL '24 hours', 'Live from the Blockchain Security Conference', 'image');
