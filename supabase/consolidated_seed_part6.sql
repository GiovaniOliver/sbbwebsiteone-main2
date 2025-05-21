-- ==============================
-- Consolidated Seed File for SBB Website (Part 6)
-- DAO Governance & Marketplace
-- ==============================

-- =====================================
-- DAO Governance
-- =====================================

-- Seed DAO Proposals
INSERT INTO public.dao_proposals (title, description, creator_id, status, voting_deadline, result)
VALUES
  ('Expand Community Grants Budget', 'Proposal to increase the treasury allocation for community grants from 5% to 10% of total funds.', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'active', NOW() + INTERVAL '5 days', NULL),
  
  ('Add New Governance Committee', 'Create a dedicated committee focused on developer grants and technical support for the ecosystem.', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'active', NOW() + INTERVAL '7 days', NULL),
  
  ('Modify Voting Threshold', 'Change the minimum voting threshold for standard proposals from 10% to 15% of total token supply.', 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'active', NOW() + INTERVAL '10 days', NULL),
  
  ('Fund Educational Content Creation', 'Allocate 50,000 tokens to fund Web3 educational content development over the next 6 months.', 'e3333333-4444-5555-6666-777777777777', 'completed', NOW() - INTERVAL '10 days', 'passed'),
  
  ('Update Logo and Branding', 'Refresh the community logo and branding materials to better reflect our mission.', 'b1111111-2222-3333-4444-555555555555', 'completed', NOW() - INTERVAL '20 days', 'rejected');

-- Seed DAO Votes
INSERT INTO public.dao_votes (proposal_id, voter_id, vote, voting_power)
VALUES
  -- Votes for the completed educational content proposal
  ((SELECT id FROM public.dao_proposals WHERE title = 'Fund Educational Content Creation'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'yes', 10.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Fund Educational Content Creation'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'yes', 8.5),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Fund Educational Content Creation'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'yes', 5.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Fund Educational Content Creation'), 'a1111111-2222-3333-4444-555555555555', 'yes', 12.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Fund Educational Content Creation'), 'g5555555-6666-7777-8888-999999999999', 'no', 3.0),
  
  -- Votes for the completed branding proposal
  ((SELECT id FROM public.dao_proposals WHERE title = 'Update Logo and Branding'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'no', 10.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Update Logo and Branding'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'no', 8.5),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Update Logo and Branding'), 'b1111111-2222-3333-4444-555555555555', 'yes', 6.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Update Logo and Branding'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'yes', 5.0),
  
  -- Votes for active proposals
  ((SELECT id FROM public.dao_proposals WHERE title = 'Expand Community Grants Budget'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'yes', 10.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Expand Community Grants Budget'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'yes', 8.5),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Expand Community Grants Budget'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'abstain', 5.0),
  
  ((SELECT id FROM public.dao_proposals WHERE title = 'Add New Governance Committee'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'yes', 8.5),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Add New Governance Committee'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'yes', 10.0),
  
  ((SELECT id FROM public.dao_proposals WHERE title = 'Modify Voting Threshold'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'yes', 7.0),
  ((SELECT id FROM public.dao_proposals WHERE title = 'Modify Voting Threshold'), 'g5555555-6666-7777-8888-999999999999', 'yes', 3.0));

-- Seed DAO Treasury
INSERT INTO public.dao_treasury (balance, currency)
VALUES (1000000, 'USD');

-- Seed DAO Tokens
INSERT INTO public.dao_tokens (holder_id, amount, staked_amount)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 100000, 10000),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 85000, 8500),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 50000, 5000),
  ('a1111111-2222-3333-4444-555555555555', 120000, 12000),
  ('b1111111-2222-3333-4444-555555555555', 60000, 6000),
  ('d2222222-3333-4444-5555-666666666666', 45000, 4500),
  ('e3333333-4444-5555-6666-777777777777', 70000, 7000),
  ('f4444444-5555-6666-7777-888888888888', 40000, 4000),
  ('g5555555-6666-7777-8888-999999999999', 30000, 3000),
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 70000, 7000);

-- Seed DAO Token Transactions
INSERT INTO public.dao_token_transactions (from_user_id, to_user_id, amount, transaction_type, transaction_hash, metadata)
VALUES
  (NULL, 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 100000, 'initial_allocation', '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', '{"reason": "Founding member allocation"}'),
  (NULL, 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 85000, 'initial_allocation', '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef', '{"reason": "Founding member allocation"}'),
  (NULL, 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 50000, 'initial_allocation', '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef', '{"reason": "Core team allocation"}'),
  (NULL, 'a1111111-2222-3333-4444-555555555555', 120000, 'initial_allocation', '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef', '{"reason": "Core team allocation"}'),
  
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', NULL, 10000, 'stake', '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef', '{"lock_period_days": 90}'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', NULL, 8500, 'stake', '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef', '{"lock_period_days": 90}'),
  
  ('e3333333-4444-5555-6666-777777777777', 'g5555555-6666-7777-8888-999999999999', 5000, 'transfer', '0x7890123456abcdef7890123456abcdef7890123456abcdef7890123456abcdef', '{"reason": "Payment for services"}'),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'f4444444-5555-6666-7777-888888888888', 2000, 'transfer', '0x8901234567abcdef8901234567abcdef8901234567abcdef8901234567abcdef', '{"reason": "Security audit payment"}');

-- Seed DAO Staking
INSERT INTO public.dao_staking (user_id, amount, lock_period_days, start_date, end_date, status, apy)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 10000, 90, NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', 'active', 8.0),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 8500, 90, NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', 'active', 8.0),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 5000, 30, NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', 'active', 5.0),
  ('a1111111-2222-3333-4444-555555555555', 12000, 180, NOW() - INTERVAL '90 days', NOW() + INTERVAL '90 days', 'active', 12.0),
  ('b1111111-2222-3333-4444-555555555555', 6000, 60, NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', 'active', 6.0);

-- Seed DAO Reputation
INSERT INTO public.dao_reputation (user_id, reputation_points, level)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 1500, 5),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 1200, 4),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 800, 3),
  ('a1111111-2222-3333-4444-555555555555', 950, 3),
  ('b1111111-2222-3333-4444-555555555555', 600, 2),
  ('d2222222-3333-4444-5555-666666666666', 450, 2),
  ('e3333333-4444-5555-6666-777777777777', 700, 3),
  ('f4444444-5555-6666-7777-888888888888', 850, 3),
  ('g5555555-6666-7777-8888-999999999999', 550, 2),
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 900, 3);

-- Seed DAO Reputation History
INSERT INTO public.dao_reputation_history (user_id, points_change, reason, source_type, source_id)
VALUES
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 100, 'Created proposal', 'proposal', (SELECT id FROM public.dao_proposals WHERE title = 'Expand Community Grants Budget')),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 100, 'Created proposal', 'proposal', (SELECT id FROM public.dao_proposals WHERE title = 'Add New Governance Committee')),
  ('e3333333-4444-5555-6666-777777777777', 100, 'Created proposal', 'proposal', (SELECT id FROM public.dao_proposals WHERE title = 'Fund Educational Content Creation')),
  
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 10, 'Voted on proposal', 'vote', (SELECT id FROM public.dao_votes WHERE voter_id = 'e514898f-93b4-40f1-abb7-d6bc6fb254e6' LIMIT 1)),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 10, 'Voted on proposal', 'vote', (SELECT id FROM public.dao_votes WHERE voter_id = 'f625898f-93b4-40f1-abb7-d6bc6fb254e7' LIMIT 1)),
  
  ('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 200, 'Contributed to codebase', 'contribution', NULL),
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 150, 'Contributed to codebase', 'contribution', NULL),
  ('f4444444-5555-6666-7777-888888888888', 250, 'Security audit contribution', 'contribution', NULL),
  
  ('e3333333-4444-5555-6666-777777777777', 300, 'Educational content creation', 'content', NULL),
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 200, 'Community art contribution', 'content', NULL);

-- =====================================
-- Marketplace System
-- =====================================

-- Seed Marketplace Categories
INSERT INTO public.marketplace_categories (name, parent_id)
VALUES
  ('Digital Products', NULL),
  ('Physical Products', NULL),
  ('Services', NULL),
  
  ('NFT Collections', (SELECT id FROM public.marketplace_categories WHERE name = 'Digital Products')),
  ('Digital Art', (SELECT id FROM public.marketplace_categories WHERE name = 'Digital Products')),
  ('Software', (SELECT id FROM public.marketplace_categories WHERE name = 'Digital Products')),
  ('E-books', (SELECT id FROM public.marketplace_categories WHERE name = 'Digital Products')),
  
  ('Clothing', (SELECT id FROM public.marketplace_categories WHERE name = 'Physical Products')),
  ('Accessories', (SELECT id FROM public.marketplace_categories WHERE name = 'Physical Products')),
  ('Electronics', (SELECT id FROM public.marketplace_categories WHERE name = 'Physical Products')),
  ('Home Goods', (SELECT id FROM public.marketplace_categories WHERE name = 'Physical Products')),
  
  ('Development', (SELECT id FROM public.marketplace_categories WHERE name = 'Services')),
  ('Design', (SELECT id FROM public.marketplace_categories WHERE name = 'Services')),
  ('Consulting', (SELECT id FROM public.marketplace_categories WHERE name = 'Services')),
  ('Education', (SELECT id FROM public.marketplace_categories WHERE name = 'Services'));

-- Seed Marketplace Listings
INSERT INTO public.marketplace_listings (seller_id, title, description, price, condition, location, category_id, status, images)
VALUES
  -- Digital Products
  ('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Cyberpunk NFT Collection', 'Limited edition collection of 10 unique cyberpunk-themed NFT artworks.', 250.00, 'new', 'London', (SELECT id FROM public.marketplace_categories WHERE name = 'NFT Collections'), 'active', ARRAY['https://via.placeholder.com/800x800?text=Cyberpunk+NFT']),
  
  ('b1111111-2222-3333-4444-555555555555', 'Abstract Digital Art Series', 'Collection of 5 abstract digital art pieces available as high-resolution downloads.', 75.00, 'new', 'Tokyo', (SELECT id FROM public.marketplace_categories WHERE name = 'Digital Art'), 'active', ARRAY['https://via.placeholder.com/800x800?text=Abstract+Art']),
  
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Smart Contract Templates Bundle', 'Set of 10 audited and battle-tested smart contract templates for common DeFi applications.', 199.99, 'new', 'New York', (SELECT id FROM public.marketplace_categories WHERE name = 'Software'), 'active', ARRAY['https://via.placeholder.com/800x600?text=Smart+Contracts']),
  
  ('e3333333-4444-5555-6666-777777777777', 'DeFi Fundamentals E-book', 'Comprehensive guide to understanding decentralized finance protocols and investment strategies.', 29.99, 'new', 'Miami', (SELECT id FROM public.marketplace_categories WHERE name = 'E-books'), 'active', ARRAY['https://via.placeholder.com/600x800?text=DeFi+E-book']),
  
  -- Physical Products
  ('a1111111-2222-3333-4444-555555555555', 'Crypto Enthusiast T-Shirt', 'Premium cotton t-shirt with original blockchain-themed design. Available in S, M, L, XL.', 34.99, 'new', 'Berlin', (SELECT id FROM public.marketplace_categories WHERE name = 'Clothing'), 'active', ARRAY['https://via.placeholder.com/800x800?text=Crypto+Shirt']),
  
  ('h6666666-7777-8888-9999-aaaaaaaaaaaa', 'Hardware Wallet Case', 'Protective case for popular hardware wallet models. Made from premium leather.', 49.99, 'new', 'Seattle', (SELECT id FROM public.marketplace_categories WHERE name = 'Accessories'), 'active', ARRAY['https://via.placeholder.com/800x800?text=Wallet+Case']),
  
  ('d2222222-3333-4444-5555-666666666666', 'Mechanical Keyboard for Developers', 'Customized mechanical keyboard with special keycaps for blockchain developers.', 159.99, 'new', 'Chicago', (SELECT id FROM public.marketplace_categories WHERE name = 'Electronics'), 'active', ARRAY['https://via.placeholder.com/800x400?text=Developer+Keyboard']),
  
  -- Services
  ('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Smart Contract Development', 'Custom smart contract development for your blockchain project. Includes thorough testing and documentation.', 150.00, NULL, 'New York', (SELECT id FROM public.marketplace_categories WHERE name = 'Development'), 'active', ARRAY['https://via.placeholder.com/800x600?text=Smart+Contract+Development']),
  
  ('f4444444-5555-6666-7777-888888888888', 'Smart Contract Security Audit', 'Comprehensive security audit for your smart contracts. Includes vulnerability assessment and remediation guidance.', 300.00, NULL, 'Austin', (SELECT id FROM public.marketplace_categories WHERE name = 'Consulting'), 'active', ARRAY['https://via.placeholder.com/800x600?text=Security+Audit']),
  
  ('e3333333-4444-5555-6666-777777777777', 'DeFi Workshop - 3 Hour Session', 'Interactive workshop to teach your team the fundamentals of DeFi. Customized to your knowledge level.', 250.00, NULL, 'Miami', (SELECT id FROM public.marketplace_categories WHERE name = 'Education'), 'active', ARRAY['https://via.placeholder.com/800x600?text=DeFi+Workshop']),
  
  ('b1111111-2222-3333-4444-555555555555', 'NFT Collection Design', 'End-to-end design service for your NFT collection. Includes concept development, artwork creation, and metadata.', 500.00, NULL, 'Tokyo', (SELECT id FROM public.marketplace_categories WHERE name = 'Design'), 'active', ARRAY['https://via.placeholder.com/800x800?text=NFT+Design+Service']);

-- Seed Marketplace Favorites
INSERT INTO public.marketplace_favorites (listing_id, user_id)
VALUES
  -- Users favoriting listings
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Cyberpunk NFT Collection'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Cyberpunk NFT Collection'), 'b1111111-2222-3333-4444-555555555555'),
  
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Smart Contract Templates Bundle'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Smart Contract Templates Bundle'), 'g5555555-6666-7777-8888-999999999999'),
  
  ((SELECT id FROM public.marketplace_listings WHERE title = 'DeFi Fundamentals E-book'), 'g5555555-6666-7777-8888-999999999999'),
  ((SELECT id FROM public.marketplace_listings WHERE title = 'DeFi Fundamentals E-book'), 'a1111111-2222-3333-4444-555555555555'),
  
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Smart Contract Security Audit'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'),
  ((SELECT id FROM public.marketplace_listings WHERE title = 'Smart Contract Security Audit'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'),
  
  ((SELECT id FROM public.marketplace_listings WHERE title = 'NFT Collection Design'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8'),
  ((SELECT id FROM public.marketplace_listings WHERE title = 'NFT Collection Design'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'));
