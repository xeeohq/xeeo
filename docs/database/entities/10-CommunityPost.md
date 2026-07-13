# CommunityPost Entity

## Version

v1.0

---

# Purpose

The CommunityPost entity represents content published by users to the public XEEO community.

A post can showcase a software project, share development progress, ask technical questions, publish tutorials, or start discussions.

Community Posts encourage collaboration, learning, and project discovery.

---

# Responsibilities

The CommunityPost entity is responsible for:

* Project showcasing
* Community discussions
* Knowledge sharing
* Developer discovery
* Community engagement

---

# Entity Overview

```text
User
│
▼
CommunityPost
│
├── Comments
├── Likes
├── Bookmarks
└── Shares (Future)
```

---

# Fields

| Field         | Type          | Required | Description               |
| ------------- | ------------- | -------- | ------------------------- |
| id            | String (CUID) | Yes      | Primary identifier        |
| authorId      | String        | Yes      | User who created the post |
| projectId     | String        | No       | Linked project            |
| title         | String        | Yes      | Post title                |
| slug          | String        | Yes      | URL-friendly identifier   |
| content       | String        | Yes      | Markdown content          |
| coverImageUrl | String        | No       | Cover image               |
| category      | Enum          | Yes      | Post category             |
| visibility    | Enum          | Yes      | Visibility level          |
| status        | Enum          | Yes      | Publication status        |
| publishedAt   | DateTime      | No       | Publish timestamp         |
| createdAt     | DateTime      | Yes      | Creation timestamp        |
| updatedAt     | DateTime      | Yes      | Last update               |
| deletedAt     | DateTime      | No       | Soft delete timestamp     |

---

# Enums

## PostCategory

```text
SHOWCASE

QUESTION

TUTORIAL

DISCUSSION

UPDATE

ANNOUNCEMENT
```

---

## PostVisibility

```text
PUBLIC

UNLISTED

PRIVATE
```

---

## PostStatus

```text
DRAFT

PUBLISHED

ARCHIVED
```

---

# Relationships

## Belongs To

```text
User
   │
   ▼
CommunityPost
```

---

## Optional Project

```text
Project
   │
   ▼
CommunityPost
```

A project may have multiple community posts (progress updates, release notes, etc.).

---

## Contains

```text
CommunityPost
│
├── Comments
├── Likes
└── Bookmarks
```

---

# Constraints

## title

* Required
* 5–120 characters

---

## slug

* Required
* Unique across community posts
* Generated automatically

Example:

```text
introducing-xeeo

building-a-compiler

my-first-hackathon
```

---

## content

* Required
* Markdown supported
* Maximum 100,000 characters

---

# Indexes

Create indexes for:

```text
authorId

projectId

slug

category

status

publishedAt

createdAt
```

---

# Business Rules

## Drafts

Users can save posts as drafts.

Drafts are visible only to the author.

---

## Publishing

Only published posts appear in the community feed.

Publishing sets:

* status = PUBLISHED
* publishedAt = current timestamp

---

## Editing

Authors may edit their own posts.

Editors and moderators may edit or remove posts when required.

---

## Deletion

Community posts use soft deletes.

Comments and reactions remain in the database for moderation history.

---

## Project Linking

A post linked to a project should automatically display:

* Project name
* Technologies
* Author
* Repository (if public)

---

# API Visibility

Public:

* Title
* Content
* Author
* Category
* Published date

Private:

* Drafts
* Deleted records

---

# Future Fields

Potential additions:

* Read time
* Tags
* Featured status
* View count
* Share count
* SEO metadata
* Language
* AI-generated summary

---

# Example Record

```json
{
  "id": "clza_post01",
  "authorId": "clz6zslx90000k0k5m2axr0q8",
  "projectId": "clz9project01",
  "title": "Introducing XEEO",
  "slug": "introducing-xeeo",
  "content": "# Welcome to XEEO...",
  "category": "SHOWCASE",
  "visibility": "PUBLIC",
  "status": "PUBLISHED"
}
```

---

# Design Decisions

* Community posts are independent content.
* A post may optionally reference a project.
* Markdown is used for rich content.
* Soft deletes preserve moderation history.
* Community engagement entities remain separate.

---

# Content Lifecycle

```text
Draft
   │
   ▼
Published
   │
 ┌─┴─────────┐
 ▼           ▼
Updated   Archived
```

---

# Next Entity

```text
11-Comment.md
```

The Comment entity powers discussions on community posts. It supports threaded conversations, developer feedback, and future features such as mentions, reactions, and moderation tools.
