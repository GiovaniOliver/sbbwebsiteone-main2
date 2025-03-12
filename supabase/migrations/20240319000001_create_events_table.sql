-- Create events table
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  location text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  created_at timestamp with time zone default now() not null,
  user_id uuid references auth.users(id) not null,
  image_url text,
  status text check (status in ('upcoming', 'ongoing', 'completed')) default 'upcoming' not null,
  max_participants integer,
  is_virtual boolean default false not null
);

-- Enable RLS
alter table public.events enable row level security;

-- Create policies
create policy "Events are viewable by everyone" on events
  for select using (true);

create policy "Users can create events" on events
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own events" on events
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own events" on events
  for delete using (auth.uid() = user_id);

-- Create a test user if it doesn't exist
insert into auth.users (id, email, raw_user_meta_data)
values (
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  'test@example.com',
  '{"username": "testuser"}'::jsonb
) on conflict (id) do nothing;

-- Insert seed data
insert into public.events (title, description, location, start_date, end_date, user_id, is_virtual, status)
values (
  'Web3 Developer Meetup',
  'Join us for an evening of Web3 development discussions and networking',
  'Virtual',
  now() + interval '1 week',
  now() + interval '1 week' + interval '2 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  true,
  'upcoming'
);

insert into public.events (title, description, location, start_date, end_date, user_id, is_virtual, status)
values (
  'Blockchain Workshop',
  'Hands-on workshop about building on blockchain',
  'Tech Hub, 123 Main St',
  now() + interval '2 weeks',
  now() + interval '2 weeks' + interval '4 hours',
  'e514898f-93b4-40f1-abb7-d6bc6fb254e6',
  false,
  'upcoming'
); 