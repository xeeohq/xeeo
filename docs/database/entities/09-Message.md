# Message Entity

## Version

v1.0

---

# Purpose

The Message entity represents every message sent inside a workspace channel.

It provides the foundation for real-time collaboration and communication.

In future versions, messages will support replies, reactions, mentions, attachments, markdown, AI-generated content, and threaded discussions.

---

# Responsibilities

The Message entity is responsible for:

* Real-time communication
* Message history
* Team collaboration
* Mentions
* Rich text support
* Future threading

---

# Entity Overview

```text
Workspace
    │
    ▼
Channel
    │
    ▼
Message
    │
    ├── Attachments (Future)
    ├── Reactions (Future)
    ├── Replies (Future)
    └── AI Responses (Future)
```

---

# Fields

| Field     | Type          | Required | Description               |
| --------- | ------------- | -------- | ------------------------- |
| id        | String (CUID) | Yes      | Primary identifier        |
| channelId | String        | Yes      | Parent channel            |
| senderId  | String        | Yes      | User who sent the message |
| content   | String        | Yes      | Message body              |
| type      | Enum          | Yes      | Message type              |
| edited    | Boolean       | Yes      | Indicates if edited       |
| editedAt  | DateTime      | No       | Last edit time            |
| deletedAt | DateTime      | No       | Soft delete timestamp     |
| createdAt | DateTime      | Yes      | Creation timestamp        |
| updatedAt | DateTime      | Yes      | Last update timestamp     |

---

# Enums

## MessageType

```text
TEXT

SYSTEM

AI

CODE

FILE

IMAGE
```

Only **TEXT** and **SYSTEM** are required for the MVP.

---

# Relationships

## Belongs To

```text
Channel
    │
    ▼
Message
```

---

```text
User
    │
    ▼
Message
```

---

# Constraints

## content

* Required
* Maximum length: 4,000 characters

Markdown is supported.

---

# Indexes

Create indexes for:

```text
channelId

senderId

createdAt

type
```

---

# Business Rules

## Sending

Only active workspace members with channel access can send messages.

---

## Editing

Users may edit their own messages.

System messages cannot be edited.

Edited messages display an "edited" indicator.

---

## Deletion

Messages use soft delete.

Instead of removing the record, populate:

```text
deletedAt
```

The UI should display:

> This message was deleted.

---

## Ordering

Messages are always ordered by:

```text
createdAt ASC
```

---

## Mentions (Future)

Messages may mention users using:

```text
@username
```

Mentions generate notifications.

---

## Code Blocks

Messages support Markdown code fences.

Example:

````markdown
```typescript
console.log("Hello XEEO");
```
````

Syntax highlighting is handled by the frontend.

---

# API Visibility

Workspace members can view:

* Content
* Sender
* Creation time
* Edit status

Deleted messages should never expose original content to unauthorized users.

---

# Future Fields

Potential additions:

* parentMessageId (threads)
* replyCount
* attachmentCount
* reactionCount
* pinned
* mentionCount
* aiGenerated
* metadata (JSON)

---

# Example Record

```json
{
  "id": "clza_message01",
  "channelId": "clz8channel01",
  "senderId": "clz6zslx90000k0k5m2axr0q8",
  "content": "Let's start implementing authentication today.",
  "type": "TEXT",
  "edited": false,
  "createdAt": "2026-07-13T10:00:00Z"
}
```

---

# Design Decisions

* Every message belongs to one channel.
* Every message has one sender.
* Soft deletes preserve conversation history.
* Rich text uses Markdown.
* Future features should extend the entity without breaking existing data.

---

# Message Lifecycle

```text
Created
    │
    ▼
Visible
    │
 ┌──┴──────────┐
 ▼             ▼
Edited     Deleted
```

---

# Next Entity

```text
10-CommunityPost.md
```

The CommunityPost entity powers XEEO's public community. It allows developers to showcase projects, share progress, ask questions, and receive feedback from other developers.
