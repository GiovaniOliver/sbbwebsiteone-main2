-- ==============================
-- Consolidated Seed File for SBB Website (Part 4)
-- Events System
-- ==============================

-- =====================================
-- Events System
-- =====================================

-- Seed Events
INSERT INTO public.events (title, description, location, start_date, end_date, user_id, is_virtual, status, max_participants, image_url)
VALUES
  ('Web3 Hackathon 2025', 'Join us for 48 hours of blockchain innovation and development', 'Tech Hub, 123 Innovation Street, New York', NOW() + INTERVAL '30 days', NOW() + INTERVAL '32 days', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', FALSE, 'upcoming', 150, 'https://via.placeholder.com/1200x600?text=Web3+Hackathon'),
  
  ('DeFi Workshop Series', 'Learn about decentralized finance protocols and investment strategies', 'Online', NOW() + INTERVAL '15 days', NOW() + INTERVAL '15 days' + INTERVAL '3 hours', 'e3333333-4444-5555-6666-777777777777', TRUE, 'upcoming', 500, 'https://via.placeholder.com/1200x600?text=DeFi+Workshop'),
  
  ('NFT Artists Showcase', 'Exhibition featuring top blockchain artists and their latest collections', 'Gallery Space, 456 Art Avenue, Miami', NOW() + INTERVAL '7 days', NOW() + INTERVAL '14 days', 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', FALSE, 'upcoming', 200, 'https://via.placeholder.com/1200x600?text=NFT+Artists+Showcase'),
  
  ('Blockchain Security Symposium', 'Industry experts discuss the latest in smart contract security', 'Convention Center, 789 Security Blvd, San Francisco', NOW() + INTERVAL '45 days', NOW() + INTERVAL '46 days', 'f4444444-5555-6666-7777-888888888888', FALSE, 'upcoming', 300, 'https://via.placeholder.com/1200x600?text=Security+Symposium'),
  
  ('DAO Governance Roundtable', 'Open discussion on best practices for decentralized governance', 'Online', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days' + INTERVAL '2 hours', 'h6666666-7777-8888-9999-aaaaaaaaaaaa', TRUE, 'upcoming', 100, 'https://via.placeholder.com/1200x600?text=DAO+Roundtable'),
  
  ('Past Crypto Conference', 'This event has already concluded', 'Convention Center, Boston', NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', FALSE, 'completed', 400, 'https://via.placeholder.com/1200x600?text=Past+Conference');

-- Seed Event Participants
INSERT INTO public.event_participants (event_id, user_id, status, response_message, notification_preference)
VALUES
  -- Web3 Hackathon participants
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'attending', 'Excited to host this event!', 'all'),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'attending', 'Looking forward to seeing everyone there.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'g5555555-6666-7777-8888-999999999999', 'attending', 'Bringing my team to compete.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'f4444444-5555-6666-7777-888888888888', 'maybe', 'Still checking my schedule.', 'important'),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'b1111111-2222-3333-4444-555555555555', 'declined', 'Sorry, I have a conflicting event.', 'none'),
  
  -- DeFi Workshop participants
  ((SELECT id FROM public.events WHERE title = 'DeFi Workshop Series'), 'e3333333-4444-5555-6666-777777777777', 'attending', 'Hosting this workshop!', 'all'),
  ((SELECT id FROM public.events WHERE title = 'DeFi Workshop Series'), 'g5555555-6666-7777-8888-999999999999', 'attending', 'Looking forward to contributing.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'DeFi Workshop Series'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'attending', 'Excited to learn more about DeFi protocols.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'DeFi Workshop Series'), 'a1111111-2222-3333-4444-555555555555', 'attending', 'Will be there with my team.', 'important'),
  
  -- NFT Artists Showcase participants
  ((SELECT id FROM public.events WHERE title = 'NFT Artists Showcase'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'attending', 'Excited to showcase my collection!', 'all'),
  ((SELECT id FROM public.events WHERE title = 'NFT Artists Showcase'), 'b1111111-2222-3333-4444-555555555555', 'attending', 'Will be presenting my latest digital art pieces.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'NFT Artists Showcase'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'attending', 'Looking forward to seeing all the amazing artwork.', 'important'),
  
  -- Blockchain Security Symposium participants
  ((SELECT id FROM public.events WHERE title = 'Blockchain Security Symposium'), 'f4444444-5555-6666-7777-888888888888', 'attending', 'Organizing the security panel discussions.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'Blockchain Security Symposium'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'attending', 'Attending to keep up with latest security practices.', 'all'),
  
  -- DAO Governance Roundtable participants
  ((SELECT id FROM public.events WHERE title = 'DAO Governance Roundtable'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 'attending', 'Hosting the roundtable discussion.', 'all'),
  ((SELECT id FROM public.events WHERE title = 'DAO Governance Roundtable'), 'd2222222-3333-4444-5555-666666666666', 'attending', 'Will share insights from our enterprise adoption framework.', 'all'),
  
  -- Past event participants
  ((SELECT id FROM public.events WHERE title = 'Past Crypto Conference'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'attended', 'It was a great event!', 'none'),
  ((SELECT id FROM public.events WHERE title = 'Past Crypto Conference'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'attended', 'Learned a lot and made great connections.', 'none'),
  ((SELECT id FROM public.events WHERE title = 'Past Crypto Conference'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'attended', 'The NFT panel was really insightful.', 'none');

-- Seed Event Waitlist
INSERT INTO public.event_waitlist (event_id, user_id, position, status)
VALUES
  -- Web3 Hackathon waitlist (since this event will be popular)
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', 1, 'waiting'),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'd2222222-3333-4444-5555-666666666666', 2, 'waiting'),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'h6666666-7777-8888-9999-aaaaaaaaaaaa', 3, 'waiting');

-- Seed Event Reminders
INSERT INTO public.event_reminders (event_id, user_id, reminder_time, sent)
VALUES
  -- Web3 Hackathon reminders
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', (SELECT start_date - INTERVAL '1 day' FROM public.events WHERE title = 'Web3 Hackathon 2025'), FALSE),
  ((SELECT id FROM public.events WHERE title = 'Web3 Hackathon 2025'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', (SELECT start_date - INTERVAL '2 days' FROM public.events WHERE title = 'Web3 Hackathon 2025'), FALSE),
  
  -- DeFi Workshop reminders
  ((SELECT id FROM public.events WHERE title = 'DeFi Workshop Series'), 'e3333333-4444-5555-6666-777777777777', (SELECT start_date - INTERVAL '1 day' FROM public.events WHERE title = 'DeFi Workshop Series'), FALSE),
  ((SELECT id FROM public.events WHERE title = 'DeFi Workshop Series'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', (SELECT start_date - INTERVAL '6 hours' FROM public.events WHERE title = 'DeFi Workshop Series'), FALSE),
  
  -- NFT Artists Showcase reminders
  ((SELECT id FROM public.events WHERE title = 'NFT Artists Showcase'), 'c736898f-93b4-40f1-abb7-d6bc6fb254e8', (SELECT start_date - INTERVAL '2 days' FROM public.events WHERE title = 'NFT Artists Showcase'), FALSE),
  ((SELECT id FROM public.events WHERE title = 'NFT Artists Showcase'), 'b1111111-2222-3333-4444-555555555555', (SELECT start_date - INTERVAL '1 day' FROM public.events WHERE title = 'NFT Artists Showcase'), FALSE);
