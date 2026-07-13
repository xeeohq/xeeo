# Comment Entity

## Version

v1.0

---

# Purpose

The Comment entity represents user discussions on Community Posts.

It allows developers to ask questions, provide feedback, discuss ideas, and collaborate through threaded conversations.

The design supports future expansion to other content types.

---

# Responsibilities

The Comment entity is responsible for:

* Discussions
* Feedback
* Questions & Answers
* Threaded conversations
* Community engagement

---

# Entity Overview

```text
CommunityPost
      │
      ▼
   Comment
      │
      ├── Replies
      ├── Mentions (Future)
      ├── Reactions (Future)
      └── Attachments (Future)
```

---

# Fields

| Field           | Type          | Required | Description                       |
| --------------- | ------------- | -------- | --------------------------------- |
| id              | String (CUID) | Yes      | Primary identifier                |
| postId          | String        | Yes      | Parent community post             |
| authorId        | String        | Yes      | Comment author                    |
| parentCommentId | String        | No       | Parent comment (for replies)      |
| content         | String        | Yes      | Comment body (Markdown supported) |
| edited          | Boolean       | Yes      | Whether the comment was edited    |
| editedAt        | DateTime      | No       | Last edit timestamp               |
| deletedAt       | DateTime      | No       | Soft delete timestamp             |
| createdAt       | DateTime      | Yes      | Creation timestamp                |
| updatedAt       | DateTime      | Yes      | Last update timestamp             |

---

# Relationships

## Belongs To

```text
CommunityPost
      │
      ▼
   Comment
```

---

```text
User
   │
   ▼
Comment
```

---

## Self Relationship

```text
Comment
   │
   ▼
Replies
```

A comment may reply to another comment.

This creates threaded discussions.

---

# Constraints

## content

* Required
* Markdown supported
* Maximum length: 10,000 characters

---

## parentCommentId

Optional.

If provided, it must reference another comment on the same Community Post.

---

# Indexes

Create indexes for:

```text
postId

authorId

parentCommentId

createdAt
```

---

# Business Rules

## Threading

Comments can reply to other comments.

Maximum nesting depth should initially be **5 levels**.

Additional replies should flatten into the last visible level.

---

## Editing

Authors may edit their own comments.

Edited comments display an "Edited" indicator.

---

## Deletion

Comments use soft deletes.

Instead of removing the record:

* Set `deletedAt`
* Hide original content
* Preserve replies

Display:

> This comment was deleted.

---

## Ordering

Top-level comments:

Oldest first.

Replies:

Oldest first within each thread.

---

## Moderation

Moderators may:

* Delete comments
* Lock discussions
* Restore deleted comments

---

# API Visibility

Public:

* Author
* Content
* Created date
* Edited status

Hidden:

* Deleted content
* Internal moderation metadata

---

# Future Fields

Potential additions:

* Reply count
* Like count
* Attachment count
* AI moderation result
* Mention count
* Pinned comment
* Best answer

---

# Example Record

```json
{
  "id": "clza_comment01",
  "postId": "clza_post01",
  "authorId": "clz6zslx90000k0k5m2axr0q8",
  "parentCommentId": null,
  "content": "Amazing project! Have you considered adding offline support?",
  "edited": false,
  "createdAt": "2026-07-13T10:00:00Z"
}
```

---

# Design Decisions

* Comments belong to Community Posts.
* Replies are implemented using a self-referencing relationship.
* Soft deletes preserve discussion history.
* Markdown is supported.
* Future features extend the entity without breaking compatibility.

---

# Comment Lifecycle

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
12-Review.md
```

The Review entity allows developers to provide structured technical feedback on projects. Unlike comments, reviews focus on evaluating software quality, code, UI/UX, documentation, and overall project readiness. It forms the foundation of XEEO's community-driven review system.
