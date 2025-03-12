-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  first_name text,
  last_name text,
  avatar_url text,
  bio text,
  web3_wallet_address text,
  role text,
  total_likes integer default 0,
  location text,
  profile_video text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create follows table
create table public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (follower_id, following_id)
);

-- Create videos table
create table public.videos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  url text not null,
  thumbnail_url text not null,
  duration integer not null,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create video_likes table
create table public.video_likes (
  video_id uuid references public.videos(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (video_id, user_id)
);

-- Create video_comments table
create table public.video_comments (
  id uuid default gen_random_uuid() primary key,
  video_id uuid references public.videos(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.follows enable row level security;
alter table public.videos enable row level security;
alter table public.video_likes enable row level security;
alter table public.video_comments enable row level security;

-- Create RLS policies
create policy "Public profiles are viewable by everyone"
on public.profiles for select
to authenticated, anon
using (true);

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Anyone can follow users"
on public.follows for insert
to authenticated
with check (auth.uid() = follower_id);

create policy "Users can unfollow"
on public.follows for delete
to authenticated
using (auth.uid() = follower_id);

create policy "Follow relationships are viewable by everyone"
on public.follows for select
to authenticated, anon
using (true);

create policy "Videos are viewable by everyone"
on public.videos for select
to authenticated, anon
using (true);

create policy "Authenticated users can upload videos"
on public.videos for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own videos"
on public.videos for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own videos"
on public.videos for delete
to authenticated
using (auth.uid() = user_id);

create policy "Video likes are viewable by everyone"
on public.video_likes for select
to authenticated, anon
using (true);

create policy "Authenticated users can like videos"
on public.video_likes for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can remove own likes"
on public.video_likes for delete
to authenticated
using (auth.uid() = user_id);

create policy "Comments are viewable by everyone"
on public.video_comments for select
to authenticated, anon
using (true);

create policy "Authenticated users can comment"
on public.video_comments for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own comments"
on public.video_comments for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own comments"
on public.video_comments for delete
to authenticated
using (auth.uid() = user_id);

-- Create triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_videos_updated_at
  before update on public.videos
  for each row
  execute function public.handle_updated_at();

create trigger handle_video_comments_updated_at
  before update on public.video_comments
  for each row
  execute function public.handle_updated_at(); 