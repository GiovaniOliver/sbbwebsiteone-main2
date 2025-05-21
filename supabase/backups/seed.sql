-- ==============================
-- Seed File: seed.sql
-- ==============================

-- Seed auth.users (dummy data for testing)
-- Adjust the columns as needed to match your actual auth.users schema.
INSERT INTO auth.users (id, email, created_at)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'alice@example.com', NOW()),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'bob@example.com', NOW()),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'carol@example.com', NOW()),
  ('a1111111-2222-3333-4444-555555555555', 'dave@example.com', NOW()),
  ('b1111111-2222-3333-4444-555555555555', 'eve@example.com', NOW());

-- Seed Profiles
INSERT INTO public.profiles (id, username, email, first_name, last_name, avatar_url, bio, web3_wallet_address, role, location)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'aliceweb3', 'alice@example.com', 'Alice', 'Smith', 'https://i.pravatar.cc/150?u=aliceweb3', 'Web3 enthusiast and educator', '0x1234567890abcdef1234567890abcdef12345678', 'user', 'San Francisco'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'bobdev', 'bob@example.com', 'Bob', 'Johnson', 'https://i.pravatar.cc/150?u=bobdev', 'Blockchain developer and open source contributor', '0x234567890abcdef1234567890abcdef123456789', 'user', 'New York'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'crypto_carol', 'carol@example.com', 'Carol', 'Williams', 'https://i.pravatar.cc/150?u=crypto_carol', 'NFT artist and digital creator', '0x34567890abcdef1234567890abcdef1234567890', 'user', 'London'),
  ('a1111111-2222-3333-4444-555555555555', 'dave', 'dave@example.com', 'Dave', 'Miller', 'https://i.pravatar.cc/150?u=dave', 'Tech entrepreneur and investor', '0xabcdefabcdefabcdefabcdefabcdefabcdef', 'user', 'Berlin'),
  ('b1111111-2222-3333-4444-555555555555', 'eve', 'eve@example.com', 'Eve', 'Davis', 'https://i.pravatar.cc/150?u=eve', 'Digital artist exploring crypto art', '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef', 'user', 'Tokyo');

-- Seed Follows
INSERT INTO public.follows (follower_id, following_id)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6');

-- Seed Posts
INSERT INTO public.posts (author_id, content, images)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Hello, this is my first post!', ARRAY['https://via.placeholder.com/150']),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Blockchain is revolutionizing finance.', ARRAY[]::TEXT[]);

-- Seed Post Likes
INSERT INTO public.post_likes (post_id, user_id)
VALUES
  ((SELECT id FROM public.posts WHERE content LIKE '%first post%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7');

-- Seed Video Content
INSERT INTO public.videos (user_id, title, description, url, thumbnail_url, duration)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Introduction to Web3', 'Learn the basics of Web3', 'https://www.youtube.com/watch?v=1', 'https://i.ytimg.com/vi/1/maxresdefault.jpg', 600),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Smart Contract Development', 'Solidity tutorial', 'https://www.youtube.com/watch?v=2', 'https://i.ytimg.com/vi/2/maxresdefault.jpg', 1200);

-- Seed Video Likes
INSERT INTO public.video_likes (video_id, user_id)
VALUES
  ((SELECT id FROM public.videos WHERE title = 'Introduction to Web3'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7');

-- Seed Stories
INSERT INTO public.stories (user_id, thumbnail_url, expires_at, content, type)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'https://source.unsplash.com/random/800x600?city', NOW() + INTERVAL '24 hours', 'Exploring the city', 'image');

-- Seed Events
INSERT INTO public.events (title, description, location, start_date, end_date, user_id, is_virtual, status, max_participants, image_url)
VALUES
  ('Web3 Hackathon 2024', 'Hackathon to build innovative solutions', 'Tech Campus, 789 Innovation Ave', NOW() - INTERVAL '2 days', NOW() + INTERVAL '5 days', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', false, 'ongoing', 200, 'https://images.unsplash.com/photo-1638913662252-70efce1e60a7');

-- Seed Hashtags
INSERT INTO public.hashtags (name)
VALUES ('#Web3'), ('#Blockchain'), ('#DAO');

-- Seed Notifications
INSERT INTO public.notifications (user_id, actor_id, type, content)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'like', 'Bob liked your post');

-- Seed Messaging: Conversations, Participants, Messages
INSERT INTO public.conversations (title, last_message_at)
VALUES ('General Chat', NOW());

INSERT INTO public.conversation_participants (conversation_id, user_id)
VALUES
  ((SELECT id FROM public.conversations WHERE title = 'General Chat'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ((SELECT id FROM public.conversations WHERE title = 'General Chat'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7');

INSERT INTO public.messages (conversation_id, sender_id, content)
VALUES
  ((SELECT id FROM public.conversations WHERE title = 'General Chat'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Hello everyone!');

-- Seed Marketplace: Categories, Listings, Favorites
INSERT INTO public.marketplace_categories (name)
VALUES ('Electronics'), ('Fashion');

INSERT INTO public.marketplace_listings (seller_id, title, description, price, condition, location, category_id, images)
VALUES
  ('a1111111-2222-3333-4444-555555555555', 'Smartphone', 'Latest model smartphone', 699.99, 'new', 'Berlin', (SELECT id FROM public.marketplace_categories WHERE name = 'Electronics'), ARRAY['https://via.placeholder.com/200']);

INSERT INTO public.marketplace_favorites (listing_id, user_id)
VALUES
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Smartphone'), 'b1111111-2222-3333-4444-555555555555');

-- Seed Friend Requests
INSERT INTO public.friend_requests (sender_id, receiver_id, message)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Let''s connect!');

-- Seed Community Groups
INSERT INTO public.groups (name, description, creator_id)
VALUES ('Crypto Enthusiasts', 'A group for crypto fans', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6');

INSERT INTO public.group_members (group_id, user_id, role)
VALUES
  ((SELECT id FROM public.groups WHERE name = 'Crypto Enthusiasts'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'member'),
  ((SELECT id FROM public.groups WHERE name = 'Crypto Enthusiasts'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'member');

INSERT INTO public.group_posts (group_id, author_id, content, images)
VALUES
  ((SELECT id FROM public.groups WHERE name = 'Crypto Enthusiasts'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Welcome to our group!', ARRAY[]::TEXT[]);

-- Seed DAO Governance: Proposals, Votes, Treasury
INSERT INTO public.dao_proposals (title, description, creator_id, voting_deadline)
VALUES
  ('Increase Community Fund', 'Proposal to increase the treasury allocation for community projects.', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', NOW() + INTERVAL '7 days');

INSERT INTO public.dao_votes (proposal_id, voter_id, vote, voting_power)
VALUES
  ((SELECT id FROM public.dao_proposals WHERE title = 'Increase Community Fund'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'yes', 1);

INSERT INTO public.dao_treasury (balance, currency)
VALUES (10000, 'USD');

-- Seed Additional: Bookmarks, User Settings, Report Content, Audit Logs, Analytics, Verification Requests
INSERT INTO public.bookmarks (user_id, content_type, content_id)
VALUES ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'post', (SELECT id FROM public.posts LIMIT 1));

INSERT INTO public.user_settings (user_id, settings)
VALUES ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', '{"theme": "dark", "notifications": true}');

INSERT INTO public.report_content (reporter_id, content_type, content_id, reason)
VALUES ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'post', (SELECT id FROM public.posts LIMIT 1), 'Inappropriate content');

INSERT INTO public.audit_logs (user_id, action, details)
VALUES ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'login', 'User logged in successfully');

INSERT INTO public.analytics_events (user_id, event_type, metadata)
VALUES ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'page_view', '{"page": "home"}');

INSERT INTO public.verification_requests (user_id, document_url)
VALUES ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'https://example.com/docs/carol_id.png');
