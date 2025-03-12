-- Seed data for profiles table
insert into public.profiles (id, username, first_name, last_name, avatar_url, bio, web3_wallet_address, role, location) values
('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'aliceweb3', 'Alice', 'Smith', 'https://i.pravatar.cc/150?u=aliceweb3', 'Web3 enthusiast and educator', '0x1234567890abcdef1234567890abcdef12345678', 'user', 'San Francisco'),
('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'bobdev', 'Bob', 'Johnson', 'https://i.pravatar.cc/150?u=bobdev', 'Blockchain developer and open source contributor', '0x234567890abcdef1234567890abcdef123456789', 'user', 'New York'),
('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'crypto_carol', 'Carol', 'Williams', 'https://i.pravatar.cc/150?u=crypto_carol', 'NFT artist and digital creator', '0x34567890abcdef1234567890abcdef1234567890', 'user', 'London');

-- Seed data for follows table
insert into public.follows (follower_id, following_id) values
('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'), -- Alice follows Bob
('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'), -- Bob follows Alice
('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'); -- Carol follows Alice

-- Seed data for videos table
insert into public.videos (user_id, title, description, url, thumbnail_url, duration) values
('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Introduction to Web3', 'Learn the basics of Web3 technology', 'https://www.youtube.com/watch?v=1', 'https://i.ytimg.com/vi/1/maxresdefault.jpg', 600),
('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Smart Contract Development', 'Hands-on tutorial for Solidity development', 'https://www.youtube.com/watch?v=2', 'https://i.ytimg.com/vi/2/maxresdefault.jpg', 1200),
('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'Creating NFT Art', 'Digital art creation for NFTs', 'https://www.youtube.com/watch?v=3', 'https://i.ytimg.com/vi/3/maxresdefault.jpg', 900);

-- Seed data for video_likes table
insert into public.video_likes (video_id, user_id) values
((select id from public.videos where title = 'Introduction to Web3'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7'), -- Bob likes Alice's video
((select id from public.videos where title = 'Smart Contract Development'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'), -- Alice likes Bob's video
((select id from public.videos where title = 'Creating NFT Art'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6'); -- Alice likes Carol's video

-- Seed data for video_comments table
insert into public.video_comments (video_id, user_id, content) values
((select id from public.videos where title = 'Introduction to Web3'), 'f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'Great introduction!'),
((select id from public.videos where title = 'Smart Contract Development'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Very helpful tutorial'),
((select id from public.videos where title = 'Creating NFT Art'), 'e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'Amazing artwork!');

-- Seed data for stories table
insert into public.stories (user_id, thumbnail_url, expires_at, content, type) values
('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'https://source.unsplash.com/random/800x600?city=1', now() + interval '24 hours', 'Exploring the city', 'image'),
('e514898f-93b4-40f1-abb7-d6bc6fb254e6', 'https://source.unsplash.com/random/800x600?food=1', now() + interval '24 hours', 'Trying new foods', 'image'),
('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'https://source.unsplash.com/random/800x600?travel=1', now() + interval '24 hours', 'Travel adventures', 'image'),
('f625898f-93b4-40f1-abb7-d6bc6fb254e7', 'https://source.unsplash.com/random/800x600?sports=1', now() + interval '24 hours', 'Sports day', 'image'),
('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'https://source.unsplash.com/random/800x600?art=1', now() + interval '24 hours', 'Art exhibition', 'image'),
('c736898f-93b4-40f1-abb7-d6bc6fb254e8', 'https://source.unsplash.com/random/800x600?music=1', now() + interval '24 hours', 'Music festival', 'image');

-- Existing events seed data
insert into public.events (
  title,
  description,
  location,
  start_date,
  end_date,
  user_id,
  is_virtual,
  status,
  max_participants,
  image_url
) values 
-- Past events
(
  'Introduction to Smart Contracts',
  'Learn the basics of smart contract development with Solidity. Perfect for beginners!',
  'Virtual',
  now() - interval '1 week',
  now() - interval '1 week' + interval '2 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  true,
  'completed',
  50,
  'https://images.unsplash.com/photo-1639322537228-f710d846310a'
),
(
  'DeFi Trading Workshop',
  'Deep dive into decentralized finance trading strategies and risk management.',
  'Crypto Hub, 456 Finance St',
  now() - interval '3 days',
  now() - interval '3 days' + interval '3 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  false,
  'completed',
  30,
  'https://images.unsplash.com/photo-1639322537504-6427a16b0a28'
),
-- Ongoing events
(
  'Web3 Hackathon 2024',
  'Join us for a week-long hackathon building the future of Web3. Great prizes!',
  'Tech Campus, 789 Innovation Ave',
  now() - interval '2 days',
  now() + interval '5 days',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  false,
  'ongoing',
  200,
  'https://images.unsplash.com/photo-1638913662252-70efce1e60a7'
),
(
  'NFT Art Exhibition',
  'Virtual gallery showcasing the best NFT artists in the space.',
  'Virtual',
  now(),
  now() + interval '1 day',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  true,
  'ongoing',
  null,
  'https://images.unsplash.com/photo-1638913662584-731da41f5a59'
),
-- Upcoming events
(
  'Blockchain Security Summit',
  'Expert panel discussions on the latest in blockchain security and best practices.',
  'Grand Conference Center, 321 Security Blvd',
  now() + interval '2 weeks',
  now() + interval '2 weeks' + interval '8 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  false,
  'upcoming',
  150,
  'https://images.unsplash.com/photo-1639322537133-f7c9b56c3c69'
),
(
  'DAO Governance Workshop',
  'Learn how to participate in and create effective DAO governance structures.',
  'Virtual',
  now() + interval '3 weeks',
  now() + interval '3 weeks' + interval '4 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  true,
  'upcoming',
  75,
  'https://images.unsplash.com/photo-1639322537228-f710d846310a'
),
(
  'Crypto Trading Masterclass',
  'Advanced trading strategies and technical analysis for cryptocurrency markets.',
  'Trading Center, 555 Market St',
  now() + interval '1 month',
  now() + interval '1 month' + interval '6 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  false,
  'upcoming',
  40,
  'https://images.unsplash.com/photo-1639322537504-6427a16b0a28'
),
(
  'Web3 Career Fair',
  'Connect with leading Web3 companies and find your next role in the space.',
  'Virtual',
  now() + interval '6 weeks',
  now() + interval '6 weeks' + interval '5 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  true,
  'upcoming',
  500,
  'https://images.unsplash.com/photo-1638913662252-70efce1e60a7'
);
