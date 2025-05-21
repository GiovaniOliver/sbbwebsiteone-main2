-- ==============================
-- Consolidated Seed File for SBB Website (Part 1)
-- Purpose: Provide test data for all tables and functions
-- Created: March 12, 2025
-- ==============================

-- =====================================
-- Core Users and Profiles
-- =====================================

-- Seed auth.users (Only if running in a dev environment where we can access auth schema)
INSERT INTO auth.users (id, email, created_at)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'alice@example.com', NOW()),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'bob@example.com', NOW()),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'carol@example.com', NOW()),
  ('a1111111-2222-3333-4444-555555555555', 'dave@example.com', NOW()),
  ('b1111111-2222-3333-4444-555555555555', 'eve@example.com', NOW()),
  ('d2222222-3333-4444-5555-666666666666', 'frank@example.com', NOW()),
  ('e3333333-4444-5555-6666-777777777777', 'grace@example.com', NOW()),
  ('f4444444-5555-6666-7777-888888888888', 'hannah@example.com', NOW()),
  ('g5555555-6666-7777-8888-999999999999', 'ian@example.com', NOW()),
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'jessica@example.com', NOW());

-- Seed Profiles
INSERT INTO public.profiles (id, username, email, first_name, last_name, avatar_url, bio, web3_wallet_address, role, location, online_status)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'aliceweb3', 'alice@example.com', 'Alice', 'Smith', 'https://i.pravatar.cc/150?u=aliceweb3', 'Web3 enthusiast and educator', '0x1234567890abcdef1234567890abcdef12345678', 'admin', 'San Francisco', 'online'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'bobdev', 'bob@example.com', 'Bob', 'Johnson', 'https://i.pravatar.cc/150?u=bobdev', 'Blockchain developer and open source contributor', '0x234567890abcdef1234567890abcdef123456789', 'user', 'New York', 'online'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'crypto_carol', 'carol@example.com', 'Carol', 'Williams', 'https://i.pravatar.cc/150?u=crypto_carol', 'NFT artist and digital creator', '0x34567890abcdef1234567890abcdef1234567890', 'user', 'London', 'offline'),
  ('a1111111-2222-3333-4444-555555555555', 'dave', 'dave@example.com', 'Dave', 'Miller', 'https://i.pravatar.cc/150?u=dave', 'Tech entrepreneur and investor', '0xabcdefabcdefabcdefabcdefabcdefabcdef', 'user', 'Berlin', 'away'),
  ('b1111111-2222-3333-4444-555555555555', 'eve', 'eve@example.com', 'Eve', 'Davis', 'https://i.pravatar.cc/150?u=eve', 'Digital artist exploring crypto art', '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef', 'user', 'Tokyo', 'offline'),
  ('d2222222-3333-4444-5555-666666666666', 'frank', 'frank@example.com', 'Frank', 'Wilson', 'https://i.pravatar.cc/150?u=frank', 'Business consultant specializing in blockchain adoption', '0x5678901234567890123456789012345678901234', 'user', 'Chicago', 'online'),
  ('e3333333-4444-5555-6666-777777777777', 'grace', 'grace@example.com', 'Grace', 'Brown', 'https://i.pravatar.cc/150?u=grace', 'Crypto educator and advocate for financial inclusion', '0x6789012345678901234567890123456789012345', 'user', 'Miami', 'offline'),
  ('f4444444-5555-6666-7777-888888888888', 'hannah', 'hannah@example.com', 'Hannah', 'Garcia', 'https://i.pravatar.cc/150?u=hannah', 'Smart contract auditor and security specialist', '0x7890123456789012345678901234567890123456', 'moderator', 'Austin', 'online'),
  ('g5555555-6666-7777-8888-999999999999', 'ian', 'ian@example.com', 'Ian', 'Rodriguez', 'https://i.pravatar.cc/150?u=ian', 'DeFi protocol designer and researcher', '0x8901234567890123456789012345678901234567', 'user', 'Denver', 'away'),
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'jessica', 'jessica@example.com', 'Jessica', 'Lee', 'https://i.pravatar.cc/150?u=jessica', 'Tokenomics specialist focusing on community incentives', '0x9012345678901234567890123456789012345678', 'user', 'Seattle', 'online');

-- =====================================
-- Social Relationships
-- =====================================

-- Seed Follows
INSERT INTO public.follows (follower_id, following_id)
VALUES
  -- Alice's relationships
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'), -- Alice follows Bob
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8'), -- Alice follows Carol
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'd2222222-3333-4444-5555-666666666666'), -- Alice follows Frank
  
  -- Bob's relationships
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'), -- Bob follows Alice
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'a1111111-2222-3333-4444-555555555555'), -- Bob follows Dave
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'g5555555-6666-7777-8888-999999999999'), -- Bob follows Ian
  
  -- Carol's relationships
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'), -- Carol follows Alice
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'b1111111-2222-3333-4444-555555555555'), -- Carol follows Eve
  
  -- Dave's relationships
  ('a1111111-2222-3333-4444-555555555555', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'), -- Dave follows Bob
  ('a1111111-2222-3333-4444-555555555555', 'h6666666-7777-8888-9999-aaaaaaaaaaaa'), -- Dave follows Jessica
  
  -- Eve's relationships
  ('b1111111-2222-3333-4444-555555555555', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8'), -- Eve follows Carol
  ('b1111111-2222-3333-4444-555555555555', 'e3333333-4444-5555-6666-777777777777'), -- Eve follows Grace
  
  -- Additional relationships to create a more connected network
  ('d2222222-3333-4444-5555-666666666666', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'), -- Frank follows Alice
  ('e3333333-4444-5555-6666-777777777777', 'f4444444-5555-6666-7777-888888888888'), -- Grace follows Hannah
  ('f4444444-5555-6666-7777-888888888888', 'g5555555-6666-7777-8888-999999999999'), -- Hannah follows Ian
  ('g5555555-6666-7777-8888-999999999999', 'h6666666-7777-8888-9999-aaaaaaaaaaaa'), -- Ian follows Jessica
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'); -- Jessica follows Alice

-- Friend Requests
INSERT INTO public.friend_requests (sender_id, receiver_id, message, status)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'a1111111-2222-3333-4444-555555555555', 'Hey Dave, let''s connect!', 'pending'),
  ('b1111111-2222-3333-4444-555555555555', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Bob, I really like your blockchain work!', 'pending'),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'f4444444-5555-6666-7777-888888888888', 'Hannah, I''d like to learn more about security audits', 'accepted'),
  ('g5555555-6666-7777-8888-999999999999', 'e3333333-4444-5555-6666-777777777777', 'Grace, let''s collaborate on DeFi education', 'accepted'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'Jessica, I''d like to discuss tokenomics for a project', 'pending');

-- Make sure follows_count is populated for all users
SELECT public.recalculate_follows_count();
