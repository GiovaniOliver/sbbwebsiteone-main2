# API Documentation

## Overview

The SBB DAO platform API is built using Next.js API routes, which provide serverless functions for backend operations. This document outlines the available API endpoints, their parameters, and responses.

## API Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://sbbdao.com/api`

## Authentication

Most API endpoints require authentication via a JWT token provided by Supabase Auth. The token should be included in the `Authorization` header:

```
Authorization: Bearer {jwt_token}
```

## API Endpoints

### User Management

#### Get Current User

```
GET /api/user
```

Returns the current authenticated user's profile information.

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "avatar_url": "https://example.com/avatar.jpg",
  "bio": "This is my bio",
  "website": "https://johndoe.com",
  "web3_wallet_address": "0x123...",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

#### Update User Profile

```
PUT /api/user
```

Updates the current user's profile information.

**Request Body:**

```json
{
  "username": "newusername",
  "full_name": "New Name",
  "avatar_url": "https://example.com/new-avatar.jpg",
  "bio": "My updated bio",
  "website": "https://newwebsite.com",
  "web3_wallet_address": "0x456..."
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "newusername",
  "email": "john@example.com",
  "full_name": "New Name",
  "avatar_url": "https://example.com/new-avatar.jpg",
  "bio": "My updated bio",
  "website": "https://newwebsite.com",
  "web3_wallet_address": "0x456...",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-03-01T00:00:00Z"
}
```

#### Get User Profile by ID

```
GET /api/users/:id
```

Returns a user's public profile information.

**Path Parameters:**

- `id`: User ID

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "johndoe",
  "full_name": "John Doe",
  "avatar_url": "https://example.com/avatar.jpg",
  "bio": "This is my bio",
  "website": "https://johndoe.com",
  "created_at": "2025-01-01T00:00:00Z"
}
```

### Posts

#### Get Posts

```
GET /api/posts
```

Returns a paginated list of posts.

**Query Parameters:**

- `limit`: Number of posts to return (default: 10)
- `offset`: Pagination offset (default: 0)

**Response:**

```json
{
  "posts": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "author_id": "123e4567-e89b-12d3-a456-426614174001",
      "content": "This is a post",
      "images": ["https://example.com/image1.jpg"],
      "likes_count": 10,
      "comments_count": 5,
      "type": "standard",
      "status": "published",
      "visibility": "public",
      "created_at": "2025-03-01T00:00:00Z",
      "updated_at": "2025-03-01T00:00:00Z",
      "author": {
        "id": "123e4567-e89b-12d3-a456-426614174001",
        "username": "janedoe",
        "full_name": "Jane Doe",
        "avatar_url": "https://example.com/avatar2.jpg"
      }
    }
    // More posts...
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

#### Create Post

```
POST /api/posts
```

Creates a new post.

**Request Body:**

```json
{
  "content": "This is my new post",
  "images": ["https://example.com/image1.jpg"],
  "type": "standard",
  "visibility": "public"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "author_id": "123e4567-e89b-12d3-a456-426614174000",
  "content": "This is my new post",
  "images": ["https://example.com/image1.jpg"],
  "likes_count": 0,
  "comments_count": 0,
  "type": "standard",
  "status": "published",
  "visibility": "public",
  "created_at": "2025-03-22T00:00:00Z",
  "updated_at": "2025-03-22T00:00:00Z"
}
```

#### Get Post by ID

```
GET /api/posts/:id
```

Returns a specific post by ID.

**Path Parameters:**

- `id`: Post ID

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "author_id": "123e4567-e89b-12d3-a456-426614174000",
  "content": "This is my new post",
  "images": ["https://example.com/image1.jpg"],
  "likes_count": 0,
  "comments_count": 0,
  "type": "standard",
  "status": "published",
  "visibility": "public",
  "created_at": "2025-03-22T00:00:00Z",
  "updated_at": "2025-03-22T00:00:00Z",
  "author": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "johndoe",
    "full_name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

#### Update Post

```
PUT /api/posts/:id
```

Updates an existing post.

**Path Parameters:**

- `id`: Post ID

**Request Body:**

```json
{
  "content": "Updated post content",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "visibility": "private"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "author_id": "123e4567-e89b-12d3-a456-426614174000",
  "content": "Updated post content",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "likes_count": 0,
  "comments_count": 0,
  "type": "standard",
  "status": "published",
  "visibility": "private",
  "created_at": "2025-03-22T00:00:00Z",
  "updated_at": "2025-03-22T01:00:00Z"
}
```

#### Delete Post

```
DELETE /api/posts/:id
```

Deletes a post (soft delete by setting archived flag).

**Path Parameters:**

- `id`: Post ID

**Response:**

```json
{
  "success": true,
  "message": "Post archived successfully"
}
```

#### Like Post

```
POST /api/posts/:id/like
```

Likes a post.

**Path Parameters:**

- `id`: Post ID

**Response:**

```json
{
  "success": true,
  "likes_count": 1
}
```

#### Unlike Post

```
DELETE /api/posts/:id/like
```

Unlikes a post.

**Path Parameters:**

- `id`: Post ID

**Response:**

```json
{
  "success": true,
  "likes_count": 0
}
```

### Comments

#### Get Post Comments

```
GET /api/posts/:id/comments
```

Returns comments for a specific post.

**Path Parameters:**

- `id`: Post ID

**Query Parameters:**

- `limit`: Number of comments to return (default: 10)
- `offset`: Pagination offset (default: 0)

**Response:**

```json
{
  "comments": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174003",
      "post_id": "123e4567-e89b-12d3-a456-426614174002",
      "user_id": "123e4567-e89b-12d3-a456-426614174001",
      "content": "This is a comment",
      "created_at": "2025-03-22T02:00:00Z",
      "updated_at": "2025-03-22T02:00:00Z",
      "user": {
        "id": "123e4567-e89b-12d3-a456-426614174001",
        "username": "janedoe",
        "full_name": "Jane Doe",
        "avatar_url": "https://example.com/avatar2.jpg"
      }
    }
    // More comments...
  ],
  "total": 5,
  "limit": 10,
  "offset": 0
}
```

#### Create Comment

```
POST /api/posts/:id/comments
```

Creates a new comment on a post.

**Path Parameters:**

- `id`: Post ID

**Request Body:**

```json
{
  "content": "This is a new comment"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174004",
  "post_id": "123e4567-e89b-12d3-a456-426614174002",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "content": "This is a new comment",
  "created_at": "2025-03-22T03:00:00Z",
  "updated_at": "2025-03-22T03:00:00Z"
}
```

#### Delete Comment

```
DELETE /api/comments/:id
```

Deletes a comment.

**Path Parameters:**

- `id`: Comment ID

**Response:**

```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

### Follow System

#### Get Followers

```
GET /api/users/:id/followers
```

Returns a list of users who follow the specified user.

**Path Parameters:**

- `id`: User ID

**Query Parameters:**

- `limit`: Number of followers to return (default: 10)
- `offset`: Pagination offset (default: 0)

**Response:**

```json
{
  "followers": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "username": "janedoe",
      "full_name": "Jane Doe",
      "avatar_url": "https://example.com/avatar2.jpg",
      "followed_at": "2025-03-01T00:00:00Z"
    }
    // More followers...
  ],
  "total": 50,
  "limit": 10,
  "offset": 0
}
```

#### Get Following

```
GET /api/users/:id/following
```

Returns a list of users that the specified user follows.

**Path Parameters:**

- `id`: User ID

**Query Parameters:**

- `limit`: Number of following to return (default: 10)
- `offset`: Pagination offset (default: 0)

**Response:**

```json
{
  "following": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "username": "janedoe",
      "full_name": "Jane Doe",
      "avatar_url": "https://example.com/avatar2.jpg",
      "followed_at": "2025-03-01T00:00:00Z"
    }
    // More following...
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

#### Follow User

```
POST /api/users/:id/follow
```

Follows a user.

**Path Parameters:**

- `id`: User ID to follow

**Response:**

```json
{
  "success": true,
  "message": "User followed successfully"
}
```

#### Unfollow User

```
DELETE /api/users/:id/follow
```

Unfollows a user.

**Path Parameters:**

- `id`: User ID to unfollow

**Response:**

```json
{
  "success": true,
  "message": "User unfollowed successfully"
}
```

### Events

#### Get Events

```
GET /api/events
```

Returns a list of events.

**Query Parameters:**

- `limit`: Number of events to return (default: 10)
- `offset`: Pagination offset (default: 0)
- `status`: Filter by status ('upcoming', 'ongoing', 'completed')

**Response:**

```json
{
  "events": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174005",
      "title": "Community Meetup",
      "description": "Join us for a community meetup",
      "location": "New York, NY",
      "start_date": "2025-04-01T18:00:00Z",
      "end_date": "2025-04-01T20:00:00Z",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "is_virtual": false,
      "status": "upcoming",
      "max_participants": 50,
      "image_url": "https://example.com/event.jpg",
      "created_at": "2025-03-01T00:00:00Z",
      "organizer": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "johndoe",
        "full_name": "John Doe",
        "avatar_url": "https://example.com/avatar.jpg"
      },
      "participants_count": 10
    }
    // More events...
  ],
  "total": 20,
  "limit": 10,
  "offset": 0
}
```

#### Create Event

```
POST /api/events
```

Creates a new event.

**Request Body:**

```json
{
  "title": "Workshop: Building Web3 Applications",
  "description": "Learn how to build decentralized applications",
  "location": "Online",
  "start_date": "2025-05-01T15:00:00Z",
  "end_date": "2025-05-01T17:00:00Z",
  "is_virtual": true,
  "max_participants": 100,
  "image_url": "https://example.com/workshop.jpg"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174006",
  "title": "Workshop: Building Web3 Applications",
  "description": "Learn how to build decentralized applications",
  "location": "Online",
  "start_date": "2025-05-01T15:00:00Z",
  "end_date": "2025-05-01T17:00:00Z",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "is_virtual": true,
  "status": "upcoming",
  "max_participants": 100,
  "image_url": "https://example.com/workshop.jpg",
  "created_at": "2025-03-22T00:00:00Z"
}
```

#### RSVP to Event

```
POST /api/events/:id/rsvp
```

RSVPs to an event.

**Path Parameters:**

- `id`: Event ID

**Request Body:**

```json
{
  "status": "attending"
}
```

**Response:**

```json
{
  "success": true,
  "message": "RSVP successful",
  "status": "attending"
}
```

### DAO Governance

#### Get Proposals

```
GET /api/dao/proposals
```

Returns a list of DAO proposals.

**Query Parameters:**

- `limit`: Number of proposals to return (default: 10)
- `offset`: Pagination offset (default: 0)
- `status`: Filter by status ('pending', 'active', 'passed', 'rejected')

**Response:**

```json
{
  "proposals": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174007",
      "title": "Increase Developer Fund",
      "description": "Proposal to increase the developer fund by 10%",
      "creator_id": "123e4567-e89b-12d3-a456-426614174000",
      "status": "active",
      "voting_deadline": "2025-04-01T00:00:00Z",
      "result": null,
      "created_at": "2025-03-01T00:00:00Z",
      "proposal_type": "budget",
      "required_quorum": 25,
      "required_majority": 51,
      "snapshot_id": "0x123...",
      "implementation_date": null,
      "budget": 1000,
      "creator": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "johndoe",
        "full_name": "John Doe",
        "avatar_url": "https://example.com/avatar.jpg"
      },
      "votes_count": {
        "yes": 15,
        "no": 5,
        "abstain": 2
      }
    }
    // More proposals...
  ],
  "total": 30,
  "limit": 10,
  "offset": 0
}
```

#### Create Proposal

```
POST /api/dao/proposals
```

Creates a new DAO proposal.

**Request Body:**

```json
{
  "title": "Community Event Budget",
  "description": "Proposal to allocate 500 tokens for community events",
  "proposal_type": "budget",
  "voting_deadline": "2025-04-15T00:00:00Z",
  "budget": 500,
  "category_id": "123e4567-e89b-12d3-a456-426614174008"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174009",
  "title": "Community Event Budget",
  "description": "Proposal to allocate 500 tokens for community events",
  "creator_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "pending",
  "voting_deadline": "2025-04-15T00:00:00Z",
  "result": null,
  "created_at": "2025-03-22T00:00:00Z",
  "proposal_type": "budget",
  "required_quorum": 25,
  "required_majority": 51,
  "snapshot_id": null,
  "implementation_date": null,
  "budget": 500,
  "category_id": "123e4567-e89b-12d3-a456-426614174008"
}
```

#### Vote on Proposal

```
POST /api/dao/proposals/:id/vote
```

Votes on a DAO proposal.

**Path Parameters:**

- `id`: Proposal ID

**Request Body:**

```json
{
  "vote": "yes"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Vote recorded successfully",
  "voting_power": 1,
  "vote": "yes"
}
```

### Tokens & Staking

#### Get Token Balance

```
GET /api/dao/tokens
```

Returns the current user's token balance.

**Response:**

```json
{
  "holder_id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 1000,
  "staked_amount": 500,
  "last_updated": "2025-03-01T00:00:00Z"
}
```

#### Stake Tokens

```
POST /api/dao/tokens/stake
```

Stakes tokens for rewards.

**Request Body:**

```json
{
  "amount": 100,
  "lock_period_days": 30
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174010",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 100,
  "lock_period_days": 30,
  "start_date": "2025-03-22T00:00:00Z",
  "end_date": "2025-04-21T00:00:00Z",
  "status": "active",
  "apy": 5,
  "created_at": "2025-03-22T00:00:00Z"
}
```

#### Unstake Tokens

```
POST /api/dao/tokens/unstake/:id
```

Unstakes tokens.

**Path Parameters:**

- `id`: Staking ID

**Response:**

```json
{
  "success": true,
  "message": "Tokens unstaked successfully",
  "amount": 100,
  "rewards": 4.1
}
```

### Marketplace

#### Get Listings

```
GET /api/marketplace/listings
```

Returns a list of marketplace listings.

**Query Parameters:**

- `limit`: Number of listings to return (default: 10)
- `offset`: Pagination offset (default: 0)
- `category`: Filter by category ID
- `status`: Filter by status ('active', 'sold', 'expired')

**Response:**

```json
{
  "listings": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174011",
      "seller_id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Handmade Soap",
      "description": "Natural handmade soap with essential oils",
      "price": 10.99,
      "condition": "new",
      "location": "Chicago, IL",
      "category_id": "123e4567-e89b-12d3-a456-426614174012",
      "status": "active",
      "images": ["https://example.com/soap1.jpg", "https://example.com/soap2.jpg"],
      "created_at": "2025-03-01T00:00:00Z",
      "updated_at": "2025-03-01T00:00:00Z",
      "seller": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "johndoe",
        "full_name": "John Doe",
        "avatar_url": "https://example.com/avatar.jpg"
      },
      "category": {
        "id": "123e4567-e89b-12d3-a456-426614174012",
        "name": "Health & Beauty"
      }
    }
    // More listings...
  ],
  "total": 50,
  "limit": 10,
  "offset": 0
}
```

#### Create Listing

```
POST /api/marketplace/listings
```

Creates a new marketplace listing.

**Request Body:**

```json
{
  "title": "Organic Coffee Beans",
  "description": "Freshly roasted organic coffee beans",
  "price": 15.99,
  "condition": "new",
  "location": "Portland, OR",
  "category_id": "123e4567-e89b-12d3-a456-426614174013",
  "images": ["https://example.com/coffee1.jpg", "https://example.com/coffee2.jpg"]
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174014",
  "seller_id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Organic Coffee Beans",
  "description": "Freshly roasted organic coffee beans",
  "price": 15.99,
  "condition": "new",
  "location": "Portland, OR",
  "category_id": "123e4567-e89b-12d3-a456-426614174013",
  "status": "active",
  "images": ["https://example.com/coffee1.jpg", "https://example.com/coffee2.jpg"],
  "created_at": "2025-03-22T00:00:00Z",
  "updated_at": "2025-03-22T00:00:00Z"
}
```

### Messaging

#### Get Conversations

```
GET /api/conversations
```

Returns the current user's conversations.

**Query Parameters:**

- `limit`: Number of conversations to return (default: 10)
- `offset`: Pagination offset (default: 0)

**Response:**

```json
{
  "conversations": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174015",
      "title": null,
      "created_at": "2025-03-01T00:00:00Z",
      "updated_at": "2025-03-22T00:00:00Z",
      "last_message_at": "2025-03-22T00:00:00Z",
      "participants": [
        {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "username": "johndoe",
          "full_name": "John Doe",
          "avatar_url": "https://example.com/avatar.jpg"
        },
        {
          "id": "123e4567-e89b-12d3-a456-426614174001",
          "username": "janedoe",
          "full_name": "Jane Doe",
          "avatar_url": "https://example.com/avatar2.jpg"
        }
      ],
      "last_message": {
        "id": "123e4567-e89b-12d3-a456-426614174016",
        "sender_id": "123e4567-e89b-12d3-a456-426614174001",
        "content": "Looking forward to the event!",
        "created_at": "2025-03-22T00:00:00Z"
      },
      "unread_count": 1
    }
    // More conversations...
  ],
  "total": 5,
  "limit": 10,
  "offset": 0
}
```

#### Create Conversation

```
POST /api/conversations
```

Creates a new conversation.

**Request Body:**

```json
{
  "title": "Project Discussion",
  "participant_ids": ["123e4567-e89b-12d3-a456-426614174001", "123e4567-e89b-12d3-a456-426614174002"]
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174017",
  "title": "Project Discussion",
  "created_at": "2025-03-22T00:00:00Z",
  "updated_at": "2025-03-22T00:00:00Z",
  "last_message_at": null,
  "participants": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "johndoe",
      "full_name": "John Doe",
      "avatar_url": "https://example.com/avatar.jpg"
    },
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "username": "janedoe",
      "full_name": "Jane Doe",
      "avatar_url": "https://example.com/avatar2.jpg"
    },
    {
      "id": "123e4567-e89b-12d3-a456-426614174002",
      "username": "bobsmith",
      "full_name": "Bob Smith",
      "avatar_url": "https://example.com/avatar3.jpg"
    }
  ]
}
```

#### Get Messages

```
GET /api/conversations/:id/messages
```

Returns messages for a specific conversation.

**Path Parameters:**

- `id`: Conversation ID

**Query Parameters:**

- `limit`: Number of messages to return (default: 20)
- `offset`: Pagination offset (default: 0)

**Response:**

```json
{
  "messages": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174018",
      "conversation_id": "123e4567-e89b-12d3-a456-426614174017",
      "sender_id": "123e4567-e89b-12d3-a456-426614174000",
      "content": "Hello team, let's discuss the project",
      "attachment_url": null,
      "attachment_type": null,
      "created_at": "2025-03-22T01:00:00Z",
      "sender": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "username": "johndoe",
        "full_name": "John Doe",
        "avatar_url": "https://example.com/avatar.jpg"
      }
    }
    // More messages...
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

#### Send Message

```
POST /api/conversations/:id/messages
```

Sends a message in a conversation.

**Path Parameters:**

- `id`: Conversation ID

**Request Body:**

```json
{
  "content": "I have some ideas to share",
  "attachment_url": "https://example.com/document.pdf",
  "attachment_type": "document"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174019",
  "conversation_id": "123e4567-e89b-12d3-a456-426614174017",
  "sender_id": "123e4567-e89b-12d3-a456-426614174000",
  "content": "I have some ideas to share",
  "attachment_url": "https://example.com/document.pdf",
  "attachment_type": "document",
  "created_at": "2025-03-22T02:00:00Z"
}
```

## Error Handling

All API endpoints return consistent error responses with the following format:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You are not authorized to perform this action",
    "details": {
      "field": "id",
      "reason": "User does not have permission to update this resource"
    }
  }
}
```

### Common Error Codes

- `BAD_REQUEST`: Invalid request parameters
- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: Permission denied
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `INTERNAL_SERVER_ERROR`: Server error

## Rate Limiting

API requests are rate limited to prevent abuse:

- Public API: 60 requests per minute
- Authenticated API: 120 requests per minute

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 119
X-RateLimit-Reset: 1616973240
```

## Versioning

The API follows semantic versioning. The current version is v1. The version can be specified in the URL:

```
/api/v1/users
```

If no version is specified, the latest version is used.

## Conclusion

This API documentation provides a comprehensive guide to the available endpoints, request/response formats, and error handling in the SBB DAO platform. For additional support or questions, please contact the API team.
