# Support Buying Black Database Schema Documentation

## Overview

This document provides comprehensive documentation for the database schema of the Support Buying Black (SBB) social network DAO. It includes information about tables, relationships, functions, and security policies.

Last Updated: March 11, 2025

## Table of Contents

1. [Core User System](#core-user-system)
2. [Content & Engagement](#content--engagement)
3. [Social Features](#social-features)
4. [Events System](#events-system)
5. [Messaging System](#messaging-system)
6. [Marketplace System](#marketplace-system)
7. [DAO Governance](#dao-governance)
8. [DAO Token Economy](#dao-token-economy)
9. [Additional Features](#additional-features)
10. [Database Maintenance](#database-maintenance)
11. [Security & Access Control](#security--access-control)
12. [Performance Considerations](#performance-considerations)

## Core User System

### Tables

#### `profiles`
- **Purpose**: Stores user profile information
- **Key Fields**: `id`, `username`, `email`, `avatar_url`, `bio`, `web3_wallet_address`
- **Relations**: One-to-one with `auth.users`
- **Notes**: Primary user identity table, reference point for most other tables

#### `follows`
- **Purpose**: Tracks follow relationships between users
- **Key Fields**: `follower_id`, `following_id`
- **Relations**: References `profiles` table for both fields
- **Notes**: Composite primary key ensures uniqueness

#### `follows_count`
- **Purpose**: Materialized count of followers/following for quick access
- **Key Fields**: `user_id`, `followers_count`, `following_count`
- **Relations**: References `profiles` table

## Content & Engagement

### Tables

#### `posts`
- **Purpose**: Stores user posts/content
- **Key Fields**: `id`, `author_id`, `content`, `images`, `likes_count`, `comments_count`, `type`, `status`, `visibility`, `archived`
- **Relations**: References `profiles` for `author_id`
- **Notes**: Central content table with counter caches

#### `post_likes`
- **Purpose**: Tracks post likes
- **Key Fields**: `post_id`, `user_id`
- **Relations**: References `posts` and `profiles`
- **Notes**: Triggers update `likes_count` on `posts` table

#### `post_comments`
- **Purpose**: Stores comments on posts
- **Key Fields**: `id`, `post_id`, `user_id`, `content`
- **Relations**: References `posts` and `profiles`
- **Notes**: Triggers update `comments_count` on `posts` table

#### `videos`
- **Purpose**: Stores video content
- **Key Fields**: `id`, `user_id`, `title`, `url`, `thumbnail_url`, `duration`, `view_count`, `archived`
- **Relations**: References `profiles` for `user_id`

#### `video_likes` and `video_comments`
- Similar structure to post counterparts

#### `stories`
- **Purpose**: Stores ephemeral story content
- **Key Fields**: `id`, `user_id`, `thumbnail_url`, `expires_at`, `content`, `type`, `archived`
- **Relations**: References `profiles` for `user_id`

## Social Features

### Tables

#### `groups`
- **Purpose**: Community groups
- **Key Fields**: `id`, `name`, `description`, `creator_id`, `privacy`, `image_url`
- **Relations**: References `profiles` for `creator_id`

#### `group_members`
- **Purpose**: Group membership
- **Key Fields**: `group_id`, `user_id`, `role`, `joined_at`
- **Relations**: References `groups` and `profiles`

#### `group_posts`
- **Purpose**: Posts specific to groups
- **Key Fields**: `id`, `group_id`, `author_id`, `content`, `images`, `archived`
- **Relations**: References `groups` and `profiles`

#### `notifications`
- **Purpose**: User notifications
- **Key Fields**: `id`, `user_id`, `actor_id`, `type`, `content`, `read`, `reference_id`, `reference_type`
- **Relations**: References `profiles` for `user_id` and `actor_id`

## Events System

### Tables

#### `events`
- **Purpose**: Community events
- **Key Fields**: `id`, `title`, `description`, `location`, `start_date`, `end_date`, `user_id`, `is_virtual`, `status`, `max_participants`, `image_url`
- **Relations**: References `profiles` for `user_id`

#### `event_participants`
- **Purpose**: Event attendance
- **Key Fields**: `id`, `event_id`, `user_id`, `status`, `response_message`, `notification_preference`
- **Relations**: References `events` and `profiles`

#### `event_reminders`
- **Purpose**: Event reminders
- **Key Fields**: `id`, `event_id`, `user_id`, `reminder_time`, `sent`
- **Relations**: References `events` and `profiles`

#### `event_waitlist`
- **Purpose**: Waitlist for full events
- **Key Fields**: `id`, `event_id`, `user_id`, `position`, `join_time`, `status`, `notification_sent`
- **Relations**: References `events` and `profiles`

### Views

#### `event_stats`
- **Purpose**: Summarizes event statistics
- **Fields**: Event details with aggregated counts

#### `user_events`
- **Purpose**: Shows events for a user
- **Fields**: Event details with user-specific information

## Messaging System

### Tables

#### `conversations`
- **Purpose**: Message threads
- **Key Fields**: `id`, `title`, `created_by`, `is_group`, `group_icon`, `status`, `metadata`, `last_message_at`
- **Relations**: References `profiles` for `created_by`

#### `conversation_participants`
- **Purpose**: Participants in conversations
- **Key Fields**: `conversation_id`, `user_id`, `role`, `last_read_at`, `is_muted`, `is_blocked`, `last_message_seen_id`
- **Relations**: References `conversations`, `profiles`, and `messages`

#### `messages`
- **Purpose**: Individual messages
- **Key Fields**: `id`, `conversation_id`, `sender_id`, `content`, `attachment_url`, `attachment_type`, `parent_id`, `mentions`, `edited`, `edited_at`
- **Relations**: References `conversations`, `profiles`, and self-referential for `parent_id`

#### `message_reactions`
- **Purpose**: Reactions to messages
- **Key Fields**: `id`, `message_id`, `user_id`, `reaction`
- **Relations**: References `messages` and `profiles`

#### `message_read_status`
- **Purpose**: Tracks read status
- **Key Fields**: `id`, `message_id`, `user_id`, `read_at`
- **Relations**: References `messages` and `profiles`

### Views

#### `unread_messages_count`
- **Purpose**: Shows unread messages by conversation
- **Fields**: User, conversation, and count information

#### `conversation_summaries`
- **Purpose**: Provides conversation previews
- **Fields**: Conversation details with last message and participant previews

## Marketplace System

### Tables

#### `marketplace_categories`
- **Purpose**: Categories for marketplace listings
- **Key Fields**: `id`, `name`, `parent_id`
- **Relations**: Self-referential for hierarchical categories

#### `marketplace_listings`
- **Purpose**: Product/service listings
- **Key Fields**: `id`, `seller_id`, `title`, `description`, `price`, `condition`, `location`, `category_id`, `status`, `images`, `archived`
- **Relations**: References `profiles` and `marketplace_categories`

#### `marketplace_favorites`
- **Purpose**: Saved/favorite listings
- **Key Fields**: `listing_id`, `user_id`
- **Relations**: References `marketplace_listings` and `profiles`

## DAO Governance

### Tables

#### `dao_proposals`
- **Purpose**: Governance proposals
- **Key Fields**: `id`, `title`, `description`, `creator_id`, `status`, `voting_deadline`, `result`, `proposal_type`, `required_quorum`, `required_majority`, `snapshot_id`, `implementation_date`, `budget`, `category_id`
- **Relations**: References `profiles` and `dao_proposal_categories`

#### `dao_votes`
- **Purpose**: Votes on proposals
- **Key Fields**: `id`, `proposal_id`, `voter_id`, `vote`, `voting_power`
- **Relations**: References `dao_proposals` and `profiles`

#### `dao_proposal_categories`
- **Purpose**: Categories for proposals
- **Key Fields**: `id`, `name`, `description`, `required_quorum`, `required_majority`

#### `dao_governance_policies`
- **Purpose**: Governance rules
- **Key Fields**: `id`, `name`, `description`, `policy_type`, `policy_value`, `active`

#### `dao_governance_logs`
- **Purpose**: Audit trail for governance
- **Key Fields**: `id`, `action`, `proposal_id`, `user_id`, `details`
- **Relations**: References `dao_proposals` and `profiles`

### Functions

#### `tally_proposal_votes`
- **Purpose**: Counts votes and determines outcome
- **Parameters**: `p_proposal_id`
- **Returns**: Vote counts and results as JSONB

#### `can_create_proposal`
- **Purpose**: Checks if user has enough tokens to create a proposal
- **Parameters**: `p_user_id`
- **Returns**: Boolean result

## DAO Token Economy

### Tables

#### `dao_tokens`
- **Purpose**: Token holdings
- **Key Fields**: `id`, `holder_id`, `amount`, `staked_amount`, `last_updated`
- **Relations**: References `profiles` for `holder_id`

#### `dao_token_transactions`
- **Purpose**: Transaction history
- **Key Fields**: `id`, `from_user_id`, `to_user_id`, `amount`, `transaction_type`, `transaction_hash`, `metadata`, `created_at`
- **Relations**: References `profiles` for `from_user_id` and `to_user_id`

#### `dao_staking`
- **Purpose**: Token staking
- **Key Fields**: `id`, `user_id`, `amount`, `lock_period_days`, `start_date`, `end_date`, `status`, `apy`
- **Relations**: References `profiles` for `user_id`

### Functions

#### `stake_tokens`
- **Purpose**: Stake tokens for rewards
- **Parameters**: `p_amount`, `p_lock_period_days`
- **Returns**: Staking ID

#### `unstake_tokens`
- **Purpose**: Unstake tokens
- **Parameters**: `p_staking_id`
- **Returns**: Boolean result

## DAO Community & Reputation

### Tables

#### `dao_reputation`
- **Purpose**: User reputation points
- **Key Fields**: `id`, `user_id`, `reputation_points`, `level`, `last_activity`
- **Relations**: References `profiles` for `user_id`

#### `dao_reputation_history`
- **Purpose**: Reputation history
- **Key Fields**: `id`, `user_id`, `points_change`, `reason`, `source_type`, `source_id`
- **Relations**: References `profiles` for `user_id`

#### `dao_tasks`
- **Purpose**: Community tasks
- **Key Fields**: `id`, `title`, `description`, `creator_id`, `assignee_id`, `status`, `priority`, `reward_tokens`, `reward_reputation`, `due_date`
- **Relations**: References `profiles` for `creator_id` and `assignee_id`

#### `dao_task_submissions`
- **Purpose**: Task completion submissions
- **Key Fields**: `id`, `task_id`, `user_id`, `content`, `status`, `feedback`
- **Relations**: References `dao_tasks` and `profiles`

#### `dao_badges`
- **Purpose**: Achievement badges
- **Key Fields**: `id`, `name`, `description`, `image_url`, `requirement_type`, `requirement_value`

#### `dao_user_badges`
- **Purpose**: User badge awards
- **Key Fields**: `id`, `user_id`, `badge_id`, `awarded_at`
- **Relations**: References `profiles` and `dao_badges`

### Functions

#### `add_reputation_points`
- **Purpose**: Award reputation points
- **Parameters**: `p_user_id`, `p_points`, `p_reason`, `p_source_type`, `p_source_id`
- **Returns**: void

#### `check_and_award_badges`
- **Purpose**: Check and grant badges
- **Parameters**: `p_user_id`
- **Returns**: Number of badges awarded

#### `complete_dao_task`
- **Purpose**: Mark task as completed
- **Parameters**: `p_task_id`, `p_submission_id`
- **Returns**: Boolean result

## Database Maintenance

### Tables

#### `database_backups`
- **Purpose**: Backup tracking
- **Key Fields**: `id`, `backup_name`, `backup_path`, `backup_size`, `backup_type`, `status`, `started_at`, `completed_at`, `initiated_by`, `error_message`, `metadata`
- **Relations**: References `profiles` for `initiated_by`

#### `database_restores`
- **Purpose**: Restore tracking
- **Key Fields**: `id`, `backup_id`, `status`, `started_at`, `completed_at`, `initiated_by`, `error_message`, `metadata`
- **Relations**: References `database_backups` and `profiles`

#### `scheduled_backups`
- **Purpose**: Backup scheduling
- **Key Fields**: `id`, `backup_name`, `backup_type`, `schedule`, `retention_period`, `is_active`, `last_run`, `next_run`, `created_by`
- **Relations**: References `profiles` for `created_by`

### Functions

#### `log_database_backup`
- **Purpose**: Start backup logging
- **Parameters**: `p_backup_name`, `p_backup_path`, `p_backup_type`, `p_metadata`
- **Returns**: Backup ID

#### `update_backup_status`
- **Purpose**: Update backup status
- **Parameters**: `p_backup_id`, `p_status`, `p_backup_size`, `p_error_message`
- **Returns**: Boolean result

#### `list_available_backups`
- **Purpose**: List completed backups
- **Parameters**: `p_backup_type`, `p_limit`, `p_offset`
- **Returns**: Set of backups

#### `create_scheduled_backup`
- **Purpose**: Create backup schedule
- **Parameters**: `p_backup_name`, `p_backup_type`, `p_schedule`, `p_retention_period`
- **Returns**: Schedule ID

## Additional Features

### Tables

#### `audit_logs`
- **Purpose**: System audit trail
- **Key Fields**: `id`, `user_id`, `action`, `details`, `created_at`
- **Relations**: References `profiles` for `user_id`

#### `analytics_events`
- **Purpose**: Analytics data
- **Key Fields**: `id`, `user_id`, `event_type`, `metadata`, `created_at`
- **Relations**: References `profiles` for `user_id`

#### `bookmarks`
- **Purpose**: Saved content
- **Key Fields**: `id`, `user_id`, `content_type`, `content_id`, `created_at`
- **Relations**: References `profiles` for `user_id`

#### `hashtags`
- **Purpose**: Content discovery
- **Key Fields**: `id`, `name`, `posts_count`, `created_at`

#### `user_settings`
- **Purpose**: User preferences
- **Key Fields**: `user_id`, `settings`, `updated_at`
- **Relations**: References `profiles` for `user_id`

#### `verification_requests`
- **Purpose**: User verification
- **Key Fields**: `id`, `user_id`, `document_url`, `status`, `reviewer_id`, `created_at`, `updated_at`
- **Relations**: References `profiles` for `user_id` and `reviewer_id`

## Security & Access Control

### Row-Level Security (RLS)

SBB uses RLS throughout the database to ensure data security. Key policies include:

1. **Profile Policies**
   - Anyone can view profiles
   - Users can only edit their own profiles

2. **Content Policies**
   - Public posts/videos are viewable by everyone
   - Users can only edit/delete their own content
   - Archived content is only visible to its creator

3. **DAO Policies**
   - Public DAO information accessible to all
   - Token operations restricted to token holders
   - Admin functions restricted to appropriate roles

4. **Storage Policies**
   - Users can only modify files in their own paths
   - Public files are readable by anyone

### RLS Helper Functions

#### `check_rls_access`
- **Purpose**: Test RLS policy access
- **Parameters**: `table_name`, `operation`, `test_row`
- **Returns**: Boolean result

#### `check_storage_access`
- **Purpose**: Test storage access
- **Parameters**: `bucket_id`, `operation`, `file_path`
- **Returns**: Boolean result

## Performance Considerations

### Indices

The database uses strategic indexing to optimize common queries:

1. **Foreign Key Indices**
   - All foreign keys are indexed
   - Composite indices for frequently filtered combinations

2. **Timestamp Indices**
   - `created_at` columns indexed for pagination and sorting
   - `updated_at` columns indexed for change tracking

3. **Search Indices**
   - Text columns with search functionality are indexed

### Counter Caches

To reduce expensive COUNT operations:

1. **Like Counters**
   - `likes_count` on posts updated via triggers

2. **Comment Counters**
   - `comments_count` on posts updated via triggers

3. **Follower Counters**
   - `follows_count` table for efficient follower stats

### Materialized Views

For complex, frequently accessed data:

1. **Feed Aggregations**
   - Materialized data for feed algorithms

2. **Analytics Dashboards**
   - Pre-aggregated statistics

## Database Triggers

### Automatic Timestamp Management

1. **Updated At**
   - `handle_updated_at()` function updates timestamps on changes

### Counter Updates

1. **Likes**
   - `update_post_likes_count()` for posts
   - Similar triggers for videos, etc.

2. **Comments**
   - `update_post_comments_count()` for posts
   - Similar triggers for videos, etc.

3. **Follows**
   - `update_follows_count()` for follow relationships

### Notification Generation

1. **Messages**
   - `handle_new_message()` creates notifications for recipients

2. **Mentions**
   - Mention detection in posts and messages

3. **Events**
   - `notify_event_time_change()` and `notify_event_cancellation()`

## Database Functions

The schema includes many utility functions for common operations, which help maintain data integrity and implement business logic consistently:

1. **User Functions**
   - `handle_new_user()` creates profiles when users sign up
   - `check_username_available()` for validation

2. **Post Functions**
   - `archive_post()` for soft deletion
   - `get_paginated_posts()`, `get_user_posts()`, `get_feed_posts()` for pagination

3. **Messaging Functions**
   - `create_conversation()`, `send_message()`, `mark_messages_read()`

4. **Event Functions**
   - `rsvp_to_event()`, `process_event_waitlist()`, `set_event_reminder()`

5. **DAO Functions**
   - Token and governance-related functionality

## Recent Migrations

These migrations have been recently applied:

1. **Database Optimizations** (20250311010000)
   - Added indices for performance
   - Counter management for likes, comments, follows
   - Post archiving functionality

2. **DAO Features** (20250311010001)
   - Added reputation system
   - Governance improvements
   - Task and badge system
   - Staking mechanism

3. **Event RSVP System** (20250311010002)
   - Enhanced event management
   - Added waitlist functionality
   - Notification system for events

4. **Messaging Infrastructure** (20250311010003)
   - Enhanced messaging capabilities
   - Added read receipts
   - Message reactions
   - Thread support

5. **Database Backup & Restore** (20250311010004)
   - Added automated backup procedures
   - Backup scheduling
   - Restoration capabilities

## Schema Versioning

The database schema follows a timestamp-based versioning scheme. Migrations are created with the naming pattern `YYYYMMDDHHMISS_description.sql` to ensure proper ordering.

## Conclusion

This database schema is designed to support the SBB social network DAO with a focus on security, performance, and scalability. The integration of DAO-specific features with traditional social network functionality creates a unique platform for community engagement.

For any questions or suggestions regarding the database schema, please contact the database team.
