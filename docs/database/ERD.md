# XEEO Entity Relationship Diagram (ERD)

## Version

v1.0

---

# Purpose

This document defines the relationships between the core entities in XEEO.

It serves as the conceptual blueprint for the PostgreSQL database and Prisma schema.

The ERD focuses on how entities connect rather than implementation details.

---

# Core Modules

```text
Identity
│
├── User
└── Profile

Workspace
│
├── Workspace
├── WorkspaceMember
└── Invitation

Communication
│
├── Channel
└── Message

Projects
│
├── Project
├── ProjectMember
└── Review

Community
│
├── CommunityPost
├── Comment
├── Like
└── Bookmark

AI
│
├── AIConversation
└── AIMessage

Platform
└── Notification
```

---

# High-Level Relationships

```text
User (1)
│
├──────────────┐
│              │
│              │
▼              ▼
Profile      Workspace (Owner)
(1)            (Many)
```

A user has one profile.

A user can own multiple workspaces.

---

```text
Workspace (1)
│
├──────────────┐
│              │
▼              ▼
WorkspaceMember
Channel
```

A workspace contains many members.

A workspace contains many channels.

---

```text
Workspace (1)
│
▼
Project
(Many)
```

A workspace can contain multiple projects.

---

```text
Channel (1)
│
▼
Message
(Many)
```

A channel contains many messages.

Each message belongs to exactly one channel.

---

```text
Project (1)
│
├──────────────┐
│              │
▼              ▼
ProjectMember Review
```

A project has many members.

A project can receive many reviews.

---

```text
CommunityPost (1)
│
├──────────────┐
│              │
▼              ▼
Comment      Like
```

A community post can have many comments.

A community post can receive many likes.

---

```text
CommunityPost (1)
│
▼
Bookmark
(Many)
```

Users can bookmark community posts.

---

```text
User (1)
│
├──────────────┐
│              │
▼              ▼
CommunityPost Notification
```

Users create community posts.

Users receive notifications.

---

```text
User (1)
│
▼
AIConversation
(Many)
│
▼
AIMessage
(Many)
```

A user can have multiple AI conversations.

Each conversation contains multiple AI messages.

---

# Complete Relationship Map

```text
User
│
├── Profile
│
├── Workspace
│      │
│      ├── WorkspaceMember
│      ├── Invitation
│      ├── Channel
│      │      │
│      │      └── Message
│      │
│      └── Project
│             │
│             ├── ProjectMember
│             └── Review
│
├── CommunityPost
│      │
│      ├── Comment
│      ├── Like
│      └── Bookmark
│
├── Notification
│
└── AIConversation
       │
       └── AIMessage
```

---

# Cardinality Summary

| Relationship                | Type        |
| --------------------------- | ----------- |
| User → Profile              | One-to-One  |
| User → Workspace            | One-to-Many |
| User → CommunityPost        | One-to-Many |
| User → Notification         | One-to-Many |
| User → AIConversation       | One-to-Many |
| Workspace → WorkspaceMember | One-to-Many |
| Workspace → Channel         | One-to-Many |
| Workspace → Project         | One-to-Many |
| Channel → Message           | One-to-Many |
| Project → ProjectMember     | One-to-Many |
| Project → Review            | One-to-Many |
| CommunityPost → Comment     | One-to-Many |
| CommunityPost → Like        | One-to-Many |
| CommunityPost → Bookmark    | One-to-Many |
| AIConversation → AIMessage  | One-to-Many |

---

# Many-to-Many Relationships

These are implemented using junction tables.

## User ↔ Workspace

Junction Table:

* WorkspaceMember

---

## User ↔ Project

Junction Table:

* ProjectMember

---

# Future Relationships

The following will be added in later versions:

* Project ↔ Git Repository
* Project ↔ Tasks
* Message ↔ Attachment
* Message ↔ Reaction
* Voice Channel ↔ Participants
* Project ↔ Documentation
* Project ↔ Deployment
* AI ↔ Code Editor

---

# Design Rules

* Every primary entity has a unique identifier.
* Junction tables manage many-to-many relationships.
* Parent-child relationships use foreign keys.
* Historical data should be preserved where appropriate.
* Business logic should remain in the application layer.

---

# Notes

This ERD represents the logical data model for XEEO.

As individual entities are designed, this document will be updated with additional relationships and constraints before implementation in Prisma.
