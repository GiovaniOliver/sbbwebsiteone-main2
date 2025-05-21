-- ==============================
-- Consolidated Seed File for SBB Website (Part 5)
-- Groups and Community
-- ==============================

-- =====================================
-- Community Groups
-- =====================================

-- Seed Groups
INSERT INTO public.groups (name, description, creator_id, privacy, image_url)
VALUES
  ('Blockchain Developers', 'A community for Web3 and blockchain developers to share knowledge and resources', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'public', 'https://via.placeholder.com/600x300?text=Blockchain+Developers'),
  
  ('NFT Artists Collective', 'A group for digital artists exploring NFTs and crypto art', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'public', 'https://via.placeholder.com/600x300?text=NFT+Artists'),
  
  ('DeFi Educators Network', 'Dedicated to improving education around decentralized finance', 'e3333333-4444-5555-6666-777777777777', 'public', 'https://via.placeholder.com/600x300?text=DeFi+Educators'),
  
  ('Blockchain Security Experts', 'For security professionals working with blockchain tech', 'f4444444-5555-6666-7777-888888888888', 'private', 'https://via.placeholder.com/600x300?text=Security+Experts'),
  
  ('DAO Governance Council', 'Discussing best practices for decentralized governance', 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'private', 'https://via.placeholder.com/600x300?text=DAO+Governance');

-- Seed Group Members
INSERT INTO public.group_members (group_id, user_id, role, joined_at)
VALUES
  -- Blockchain Developers members
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'admin', NOW() - INTERVAL '30 days'),
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'member', NOW() - INTERVAL '25 days'),
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'g5555555-6666-7777-8888-999999999999', 'member', NOW() - INTERVAL '20 days'),
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'f4444444-5555-6666-7777-888888888888', 'member', NOW() - INTERVAL '15 days'),
  
  -- NFT Artists Collective members
  ((SELECT id FROM public.groups WHERE name = 'NFT Artists Collective'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'admin', NOW() - INTERVAL '45 days'),
  ((SELECT id FROM public.groups WHERE name = 'NFT Artists Collective'), 'b1111111-2222-3333-4444-555555555555', 'moderator', NOW() - INTERVAL '40 days'),
  ((SELECT id FROM public.groups WHERE name = 'NFT Artists Collective'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'member', NOW() - INTERVAL '35 days'),
  
  -- DeFi Educators Network members
  ((SELECT id FROM public.groups WHERE name = 'DeFi Educators Network'), 'e3333333-4444-5555-6666-777777777777', 'admin', NOW() - INTERVAL '60 days'),
  ((SELECT id FROM public.groups WHERE name = 'DeFi Educators Network'), 'g5555555-6666-7777-8888-999999999999', 'moderator', NOW() - INTERVAL '55 days'),
  ((SELECT id FROM public.groups WHERE name = 'DeFi Educators Network'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'member', NOW() - INTERVAL '50 days'),
  ((SELECT id FROM public.groups WHERE name = 'DeFi Educators Network'), 'a1111111-2222-3333-4444-555555555555', 'member', NOW() - INTERVAL '45 days'),
  
  -- Blockchain Security Experts members
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Security Experts'), 'f4444444-5555-6666-7777-888888888888', 'admin', NOW() - INTERVAL '90 days'),
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Security Experts'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'member', NOW() - INTERVAL '85 days'),
  
  -- DAO Governance Council members
  ((SELECT id FROM public.groups WHERE name = 'DAO Governance Council'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'admin', NOW() - INTERVAL '120 days'),
  ((SELECT id FROM public.groups WHERE name = 'DAO Governance Council'), 'd2222222-3333-4444-5555-666666666666', 'member', NOW() - INTERVAL '115 days'),
  ((SELECT id FROM public.groups WHERE name = 'DAO Governance Council'), 'g5555555-6666-7777-8888-999999999999', 'member', NOW() - INTERVAL '110 days'));

-- Seed Group Posts
INSERT INTO public.group_posts (group_id, author_id, content, images)
VALUES
  -- Blockchain Developers posts
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Welcome to the Blockchain Developers group! Feel free to share your projects, ask questions, and collaborate with fellow developers.', ARRAY[]::TEXT[]),
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Has anyone worked with zkSNARKs? I''m looking for resources to implement them in a privacy-focused project.', ARRAY[]::TEXT[]),
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Developers'), 'g5555555-6666-7777-8888-999999999999', 'Sharing my latest open source project - a library for simplifying common operations with ERC-721 tokens. Feedback welcome!', ARRAY['https://via.placeholder.com/800x400?text=ERC721+Library']),
  
  -- NFT Artists Collective posts
  ((SELECT id FROM public.groups WHERE name = 'NFT Artists Collective'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Welcome to all digital artists! This is a space to share your work, discuss techniques, and explore the world of NFTs together.', ARRAY[]::TEXT[]),
  ((SELECT id FROM public.groups WHERE name = 'NFT Artists Collective'), 'b1111111-2222-3333-4444-555555555555', 'What marketplaces are you finding most success with? I''ve been exploring Foundation, OpenSea, and Rarible.', ARRAY[]::TEXT[]),
  
  -- DeFi Educators Network posts
  ((SELECT id FROM public.groups WHERE name = 'DeFi Educators Network'), 'e3333333-4444-5555-6666-777777777777', 'Let''s collaborate on creating accessible materials to help newcomers understand DeFi concepts!', ARRAY[]::TEXT[]),
  ((SELECT id FROM public.groups WHERE name = 'DeFi Educators Network'), 'g5555555-6666-7777-8888-999999999999', 'I''ve created this visual guide to liquidity pools that explains the concept in simple terms.', ARRAY['https://via.placeholder.com/800x800?text=Liquidity+Pools+Guide']),
  
  -- Blockchain Security Experts posts
  ((SELECT id FROM public.groups WHERE name = 'Blockchain Security Experts'), 'f4444444-5555-6666-7777-888888888888', 'Important discussion: What are the most common vulnerabilities you''re seeing in smart contracts this year?', ARRAY[]::TEXT[]),
  
  -- DAO Governance Council posts
  ((SELECT id FROM public.groups WHERE name = 'DAO Governance Council'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'Let''s discuss how to balance decentralization with efficient decision-making in DAOs.', ARRAY[]::TEXT[]));

-- =====================================
-- Messaging System
-- =====================================

-- Seed Conversations
INSERT INTO public.conversations (title, created_by, is_group, group_icon, status, metadata, last_message_at)
VALUES
  (NULL, 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', FALSE, NULL, 'active', '{}', NOW() - INTERVAL '1 hour'),  -- Alice & Bob
  (NULL, 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', FALSE, NULL, 'active', '{}', NOW() - INTERVAL '3 hours'),  -- Carol & Alice
  ('Web3 Project Collaboration', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', TRUE, 'https://via.placeholder.com/100x100?text=Project', 'active', '{}', NOW() - INTERVAL '2 hours'),
  ('Security Team', 'f4444444-5555-6666-7777-888888888888', TRUE, 'https://via.placeholder.com/100x100?text=Security', 'active', '{}', NOW() - INTERVAL '5 hours'),
  ('Welcome to Support Buying Black', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', TRUE, NULL, 'active', '{"type": "welcome", "public": true}', NOW() - INTERVAL '1 day');

-- Seed Conversation Participants
INSERT INTO public.conversation_participants (conversation_id, user_id, role, last_read_at, is_muted, is_blocked)
VALUES
  -- Alice & Bob conversation
  ((SELECT id FROM public.conversations WHERE created_by = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND is_group = FALSE), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'member', NOW() - INTERVAL '1 hour', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE created_by = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND is_group = FALSE), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'member', NOW() - INTERVAL '1 hour', FALSE, FALSE),
  
  -- Carol & Alice conversation
  ((SELECT id FROM public.conversations WHERE created_by = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND is_group = FALSE), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'member', NOW() - INTERVAL '3 hours', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE created_by = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND is_group = FALSE), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'member', NOW() - INTERVAL '3 hours', FALSE, FALSE),
  
  -- Web3 Project Collaboration group
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'admin', NOW() - INTERVAL '2 hours', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'member', NOW() - INTERVAL '2 hours', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'g5555555-6666-7777-8888-999999999999', 'member', NOW() - INTERVAL '3 hours', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'a1111111-2222-3333-4444-555555555555', 'member', NOW() - INTERVAL '4 hours', TRUE, FALSE),
  
  -- Security Team group
  ((SELECT id FROM public.conversations WHERE title = 'Security Team'), 'f4444444-5555-6666-7777-888888888888', 'admin', NOW() - INTERVAL '5 hours', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Security Team'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'member', NOW() - INTERVAL '5 hours', FALSE, FALSE),
  
  -- Welcome group
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'admin', NOW() - INTERVAL '1 day', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'member', NOW() - INTERVAL '1 day', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'member', NOW() - INTERVAL '2 days', FALSE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'a1111111-2222-3333-4444-555555555555', 'member', NOW() - INTERVAL '2 days', TRUE, FALSE),
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'b1111111-2222-3333-4444-555555555555', 'member', NOW() - INTERVAL '3 days', FALSE, FALSE));

-- Seed Messages
INSERT INTO public.messages (conversation_id, sender_id, content, attachment_url, attachment_type, edited, edited_at, mentions)
VALUES
  -- Alice & Bob conversation
  ((SELECT id FROM public.conversations WHERE created_by = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND is_group = FALSE), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Hey Bob, I saw your post about the decentralized voting contract. Would you like some help with that?', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE created_by = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND is_group = FALSE), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Hi Alice! That would be great. I''m trying to implement a quadratic voting mechanism.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE created_by = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' AND is_group = FALSE), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Perfect, I have some experience with that. I''ll send you some code examples tomorrow.', NULL, NULL, FALSE, NULL, '[]'),
  
  -- Carol & Alice conversation
  ((SELECT id FROM public.conversations WHERE created_by = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND is_group = FALSE), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Alice, I wanted to invite you to collaborate on an NFT collection I''m working on.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE created_by = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND is_group = FALSE), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'That sounds interesting Carol! What''s the theme?', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE created_by = 'c736898f-93b4-40f1-abb7-d6bc6fb254e8' AND is_group = FALSE), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'It''s a series on the evolution of blockchain technology, represented through abstract digital art.', 'https://via.placeholder.com/500x500?text=NFT+Preview', 'image', FALSE, NULL, '[]'),
  
  -- Web3 Project Collaboration group
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Welcome everyone to our collaborative project group! We''ll be working on building a decentralized identity solution.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Thanks for setting this up Bob. I''ve been researching DID protocols and would be happy to share my findings.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'g5555555-6666-7777-8888-999999999999', 'I can help with the token economics design if we''re implementing incentives.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Web3 Project Collaboration'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Great! Let''s set up a weekly call to coordinate our efforts.', NULL, NULL, FALSE, NULL, '[]'),
  
  -- Security Team group
  ((SELECT id FROM public.conversations WHERE title = 'Security Team'), 'f4444444-5555-6666-7777-888888888888', 'I''ve created this group to discuss security audits and best practices for our projects.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Security Team'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Thanks Hannah. I''m working on a new contract that could use an extra pair of eyes.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Security Team'), 'f4444444-5555-6666-7777-888888888888', 'Happy to help. Send over the code when you''re ready and we can schedule a review session.', NULL, NULL, FALSE, NULL, '[]'),
  
  -- Welcome group
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Welcome to Support Buying Black! This is a community for supporting Black-owned businesses and entrepreneurs. Feel free to introduce yourself!', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Hello everyone! I''m Bob, a blockchain developer focusing on Web3 infrastructure.', NULL, NULL, FALSE, NULL, '[]'),
  ((SELECT id FROM public.conversations WHERE title = 'Welcome to Support Buying Black'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Hi all! I''m Carol, an NFT artist and collector excited to connect with this community.', NULL, NULL, FALSE, NULL, '[]');

-- Seed Message Reactions
INSERT INTO public.message_reactions (message_id, user_id, reaction)
VALUES
  -- Reactions to messages in the Welcome group
  ((SELECT id FROM public.messages WHERE content LIKE 'Welcome to Support Buying Black%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', '👍'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Welcome to Support Buying Black%'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', '❤️'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Welcome to Support Buying Black%'), 'b1111111-2222-3333-4444-555555555555', '🎉'),
  
  -- Reactions to Bob's introduction
  ((SELECT id FROM public.messages WHERE content LIKE 'Hello everyone! I''m Bob%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', '👋'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Hello everyone! I''m Bob%'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', '👋'),
  
  -- Reactions to Carol's introduction
  ((SELECT id FROM public.messages WHERE content LIKE 'Hi all! I''m Carol%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', '👋'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Hi all! I''m Carol%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', '👋'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Hi all! I''m Carol%'), 'b1111111-2222-3333-4444-555555555555', '🎨');

-- Seed Message Read Status
INSERT INTO public.message_read_status (message_id, user_id, read_at)
VALUES
  -- Read status for Alice & Bob conversation
  ((SELECT id FROM public.messages WHERE content LIKE 'Hey Bob, I saw your post%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', NOW() - INTERVAL '1 hour'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Hey Bob, I saw your post%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', NOW() - INTERVAL '1 hour'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Hi Alice! That would be great%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', NOW() - INTERVAL '1 hour'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Hi Alice! That would be great%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', NOW() - INTERVAL '1 hour'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Perfect, I have some experience%'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', NOW() - INTERVAL '1 hour'),
  ((SELECT id FROM public.messages WHERE content LIKE 'Perfect, I have some experience%'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', NOW() - INTERVAL '1 hour');
