# SBB DAO Database Entity Relationship Diagram

## Overview

This document provides a visual representation of the database schema for the SBB DAO platform, highlighting the relationships between different entities.

## Core User System

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   profiles  │     │   follows   │     │follows_count│
├─────────────┤     ├─────────────┤     ├─────────────┤
│id (PK)      │◄───┐│follower_id  ├────►│user_id (PK) │
│username     │    ││following_id │     │followers_cnt│
│email        │    │└─────────────┘     │following_cnt│
│full_name    │    │                    └─────────────┘
│avatar_url   │    │
│bio          │    │
│web3_address │    │
│role         │    │
│total_likes  │    │
│location     │    │
│created_at   │    │
│updated_at   │    │
└─────────────┘    │
      ▲             │
      │             │
      └─────────────┘
```

## Content & Engagement

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    posts    │     │ post_likes  │     │post_comments│
├─────────────┤     ├─────────────┤     ├─────────────┤
│id (PK)      │◄───┐│post_id      ├────►│id (PK)      │
│author_id    ├────┼┤user_id      │     │post_id      │
│content      │    ││created_at   │     │user_id      │
│images[]     │    │└─────────────┘     │content      │
│likes_count  │    │                    │created_at   │
│comments_cnt │    │                    │updated_at   │
│type         │    │                    └─────────────┘
│status       │    │                          ▲
│visibility   │    │                          │
│archived     │    │                          │
│created_at   │    │                          │
│updated_at   │    │                          │
└─────────────┘    │                          │
      ▲             │                          │
      │             │                          │
      └─────────────┴──────────────────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   videos    │     │ video_likes │     │video_comments│
├─────────────┤     ├─────────────┤     ├─────────────┤
│id (PK)      │◄───┐│video_id     ├────►│id (PK)      │
│user_id      ├────┼┤user_id      │     │video_id     │
│title        │    ││created_at   │     │user_id      │
│description  │    │└─────────────┘     │content      │
│url          │    │                    │created_at   │
│thumbnail_url│    │                    │updated_at   │
│duration     │    │                    └─────────────┘
│view_count   │    │                          ▲
│archived     │    │                          │
│created_at   │    │                          │
│updated_at   │    │                          │
└─────────────┘    │                          │
      ▲             │                          │
      │             │                          │
      └─────────────┴──────────────────────────┘

┌─────────────┐
│   stories   │
├─────────────┤
│id (PK)      │
│user_id      │
│thumbnail_url│
│expires_at   │
│content      │
│type         │
│archived     │
│created_at   │
│updated_at   │
└─────────────┘
```

## Social Features

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   groups    │     │group_members│     │ group_posts │
├─────────────┤     ├─────────────┤     ├─────────────┤
│id (PK)      │◄───┐│group_id     ├────►│id (PK)      │
│name         │    ││user_id      │     │group_id     │
│description  │    ││role         │     │author_id    │
│creator_id   │    ││joined_at    │     │content      │
│privacy      │    │└─────────────┘     │images[]     │
│image_url    │    │                    │archived     │
│created_at   │    │                    │created_at   │
│updated_at   │    │                    │updated_at   │
└─────────────┘    │                    └─────────────┘
      ▲             │
      │             │
      └─────────────┘

┌─────────────┐
│notifications│
├─────────────┤
│id (PK)      │
│user_id      │
│actor_id     │
│type         │
│content      │
│read         │
│reference_id │
│reference_typ│
│created_at   │
│updated_at   │
└─────────────┘
```

## Events System

```
┌─────────────┐       ┌─────────────┐
│   events    │       │event_particip│
├─────────────┤       ├─────────────┤
│id (PK)      │◄─────►│id (PK)      │
│title        │       │event_id     │
│description  │       │user_id      │
│location     │       │status       │
│start_date   │       │created_at   │
│end_date     │       │updated_at   │
│user_id      │       └─────────────┘
│is_virtual   │
│status       │       ┌─────────────┐
│max_particip │       │event_waitlist│
│image_url    │       ├─────────────┤
│created_at   │       │id (PK)      │
│updated_at   │       │event_id     │
└─────────────┘       │user_id      │
                     │position     │
                     │join_time    │
                     │status       │
                     │notif_sent   │
                     └─────────────┘
```

## Messaging System

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│conversations│     │conv_particip│     │  messages   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│id (PK)      │◄───┐│conv_id      ├────►│id (PK)      │
│title        │    ││user_id      │     │conv_id      │
│created_at   │    ││last_read_at │     │sender_id    │
│updated_at   │    ││created_at   │     │content      │
│last_msg_at  │    │└─────────────┘     │attachment_url│
└─────────────┘    │                    │attachment_typ│
      ▲             │                    │created_at   │
      │             │                    └─────────────┘
      └─────────────┘                         ▲
                                             │
                                             │
┌─────────────┐                              │
│message_react│                              │
├─────────────┤                              │
│id (PK)      │                              │
│message_id   ├──────────────────────────────┘
│user_id      │
│reaction     │
│created_at   │
└─────────────┘
```

## Marketplace System

```
┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│market_categories │      │market_listings  │       │market_favorites │
├─────────────────┤      ├─────────────────┤       ├─────────────────┤
│id (PK)          │◄────►│id (PK)          │◄─────►│listing_id       │
│name             │      │seller_id        │       │user_id          │
│parent_id        │      │title            │       │created_at       │
│created_at       │      │description      │       └─────────────────┘
└─────────────────┘      │price            │
                        │condition        │
                        │location         │
                        │category_id      │
                        │status           │
                        │images[]         │
                        │archived         │
                        │created_at       │
                        │updated_at       │
                        └─────────────────┘
```

## DAO Governance

```
┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│ dao_proposals   │      │   dao_votes     │       │dao_prop_category│
├─────────────────┤      ├─────────────────┤       ├─────────────────┤
│id (PK)          │◄────►│id (PK)          │       │id (PK)          │
│title            │      │proposal_id      │       │name             │
│description      │      │voter_id         │       │description      │
│creator_id       │      │vote             │       │required_quorum  │
│status           │      │voting_power     │       │required_majority│
│voting_deadline  │      │created_at       │       └─────────────────┘
│result           │      └─────────────────┘               ▲
│proposal_type    │                                       │
│required_quorum  │                                       │
│required_majority│                                       │
│snapshot_id      │                                       │
│implementation_dt│                                       │
│budget           │                                       │
│category_id      ├───────────────────────────────────────┘
│created_at       │
└─────────────────┘

┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│  dao_tokens     │      │dao_tok_transact │       │  dao_staking    │
├─────────────────┤      ├─────────────────┤       ├─────────────────┤
│id (PK)          │      │id (PK)          │       │id (PK)          │
│holder_id        │      │from_user_id     │       │user_id          │
│amount           │      │to_user_id       │       │amount           │
│staked_amount    │      │amount           │       │lock_period_days │
│last_updated     │      │transaction_type │       │start_date       │
└─────────────────┘      │transaction_hash │       │end_date         │
                        │metadata         │       │status           │
                        │created_at       │       │apy              │
                        └─────────────────┘       │created_at       │
                                                 │updated_at       │
                                                 └─────────────────┘
```

## DAO Community & Reputation

```
┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│ dao_reputation  │      │dao_rep_history  │       │   dao_tasks     │
├─────────────────┤      ├─────────────────┤       ├─────────────────┤
│id (PK)          │◄────►│id (PK)          │       │id (PK)          │
│user_id          │      │user_id          │       │title            │
│reputation_points│      │points_change    │       │description      │
│level            │      │reason           │       │creator_id       │
│last_activity    │      │source_type      │       │assignee_id      │
│created_at       │      │source_id        │       │status           │
│updated_at       │      │created_at       │       │priority         │
└─────────────────┘      └─────────────────┘       │reward_tokens    │
                                                  │reward_reputation│
                                                  │due_date         │
                                                  │created_at       │
                                                  │updated_at       │
                                                  └─────────────────┘
                                                         ▲
                                                         │
┌─────────────────┐      ┌─────────────────┐            │
│  dao_badges     │      │dao_task_submissi│            │
├─────────────────┤      ├─────────────────┤            │
│id (PK)          │      │id (PK)          │            │
│name             │      │task_id          ├────────────┘
│description      │      │user_id          │
│image_url        │      │content          │
│requirement_type │      │status           │
│requirement_value│      │feedback         │
│created_at       │      │created_at       │
└─────────────────┘      │updated_at       │
      ▲                   └─────────────────┘
      │
      │
┌─────────────────┐
│dao_user_badges  │
├─────────────────┤
│id (PK)          │
│user_id          │
│badge_id         │
│awarded_at       │
└─────────────────┘
```

## Additional Features

```
┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│   audit_logs    │      │analytics_events │       │   bookmarks     │
├─────────────────┤      ├─────────────────┤       ├─────────────────┤
│id (PK)          │      │id (PK)          │       │id (PK)          │
│user_id          │      │user_id          │       │user_id          │
│action           │      │event_type       │       │content_type     │
│details          │      │metadata         │       │content_id       │
│created_at       │      │created_at       │       │created_at       │
└─────────────────┘      └─────────────────┘       └─────────────────┘

┌─────────────────┐      ┌─────────────────┐
│    hashtags     │      │ user_settings   │
├─────────────────┤      ├─────────────────┤
│id (PK)          │      │user_id (PK)     │
│name             │      │settings         │
│posts_count      │      │updated_at       │
│created_at       │      └─────────────────┘
└─────────────────┘
```

## Database Maintenance

```
┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐
│database_backups │      │database_restores│       │scheduled_backups│
├─────────────────┤      ├─────────────────┤       ├─────────────────┤
│id (PK)          │◄────►│id (PK)          │       │id (PK)          │
│backup_name      │      │backup_id        │       │backup_name      │
│backup_path      │      │status           │       │backup_type      │
│backup_size      │      │started_at       │       │schedule         │
│backup_type      │      │completed_at     │       │retention_period │
│status           │      │initiated_by     │       │is_active        │
│started_at       │      │error_message    │       │last_run         │
│completed_at     │      │metadata         │       │next_run         │
│initiated_by     │      └─────────────────┘       │created_by       │
│error_message    │                               └─────────────────┘
│metadata         │
└─────────────────┘
```

## Schema Legend

- PK: Primary Key
- FK: Foreign Key
- Relationships:
  - ◄─────►: Many-to-Many
  - ◄─────: One-to-Many
  - ◄────┐: One-to-Many (self-referential)

## Table Counts

The current schema includes:

- Core User System: 3 tables
- Content & Engagement: 7 tables
- Social Features: 4 tables
- Events System: 3 tables
- Messaging System: 4 tables
- Marketplace System: 3 tables
- DAO Governance: 6 tables
- DAO Community & Reputation: 6 tables
- Additional Features: 5 tables
- Database Maintenance: 3 tables

Total: 44 tables

## Notes

1. Many tables include `created_at` and `updated_at` timestamps for tracking
2. Soft-delete pattern is implemented using `archived` boolean flags
3. Counter cache columns (like `likes_count`) are maintained via triggers
4. JSON/JSONB columns are used for flexible data (settings, metadata)
5. Arrays are used for simple lists (images)
