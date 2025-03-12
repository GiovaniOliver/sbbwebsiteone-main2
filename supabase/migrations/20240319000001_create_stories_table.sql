-- Create stories table
create table if not exists public.stories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  thumbnail_url text not null,
  created_at timestamp with time zone default now() not null,
  expires_at timestamp with time zone not null,
  content text,
  type text default 'image' check (type in ('image', 'video')) not null
);

-- Enable RLS
alter table public.stories enable row level security;

-- Create policies
create policy "Stories are viewable by everyone"
  on stories for select
  to authenticated
  using (true);

create policy "Users can create their own stories"
  on stories for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own stories"
  on stories for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own stories"
  on stories for delete
  to authenticated
  using (auth.uid() = user_id);


-- Create index for faster queries
create index stories_user_id_idx on stories(user_id);
create index stories_created_at_idx on stories(created_at desc);
create index stories_expires_at_idx on stories(expires_at desc);
