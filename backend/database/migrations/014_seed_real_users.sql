-- Delete existing users
DELETE FROM users;

-- Seed users table with actual user data
INSERT INTO users (
  id,
  username,
  email,
  first_name,
  last_name,
  image_url,
  profile_image_url,
  password_hash,
  two_factor_enabled,
  banned,
  locked,
  last_sign_in_at,
  created_at,
  updated_at,
  metadata
) VALUES 
-- Test Person
(
  'usr_1',
  'testperson',
  'giovanidishone@gmail.com',
  'Giovani',
  'Oliver',
  'https://www.gravatar.com/avatar?d=mp',
  'https://www.gravatar.com/avatar?d=mp',
  '$2a$10$dummyhash',
  FALSE,
  FALSE,
  FALSE,
  '2024-01-30 12:34:37',
  '2024-01-30 12:34:37',
  '2024-01-30 12:34:37',
  '{"role": "user"}'
),
-- Giovani
(
  'usr_2',
  'giovani',
  'supbuyingblack@gmail.com',
  NULL,
  NULL,
  'https://www.gravatar.com/avatar?d=mp',
  'https://www.gravatar.com/avatar?d=mp',
  '$2a$10$dummyhash',
  FALSE,
  FALSE,
  FALSE,
  '2023-12-05 12:34:37',
  '2023-12-05 12:34:37',
  '2024-02-03 12:34:37',
  '{"role": "admin"}'
),
-- Giobeats
(
  'usr_3',
  'giobeats',
  'giovani.company@gmail.com',
  'Giovani',
  'O',
  'https://www.gravatar.com/avatar?d=mp',
  'https://www.gravatar.com/avatar?d=mp',
  '$2a$10$dummyhash',
  TRUE,
  FALSE,
  FALSE,
  '2024-01-28 12:34:37',
  '2023-08-04 12:34:37',
  '2024-01-28 12:34:37',
  '{"role": "user", "oauth_provider": "google"}'
); 