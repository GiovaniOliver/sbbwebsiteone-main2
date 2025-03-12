-- Get user IDs from auth.users table
select id, email, raw_user_meta_data->>'username' as username
from auth.users
order by created_at desc
limit 5; 