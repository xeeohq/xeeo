# XEEO Entity Design

## Version

v2.0

---

# Purpose

This document defines the standards used to design database entities in XEEO.

Each entity specification should define:

- Purpose
- Fields
- Relationships
- Constraints
- Indexes
- Business rules

The purpose is to ensure that database and backend decisions are made deliberately before implementation.

---

# Entity Design Standards

Every entity should define the following.

## 1. Purpose

Why does this entity exist?

---

## 2. Fields

Each field should specify:

- Name
- Data type
- Required / optional
- Default value
- Validation rules

---

## 3. Relationships

Relationships should explicitly define:

- One-to-one
- One-to-many
- Many-to-many

The owning side and junction entities should be clear.

---

## 4. Constraints

Where applicable:

- Unique constraints
- Foreign keys
- Composite unique constraints
- Cascade behavior
- Restrict behavior
- Soft-delete behavior

---

## 5. Indexes

Indexes should reflect real query patterns.

Common examples:

- username
- email
- slug
- workspaceId
- projectId
- userId
- createdAt
- updatedAt

Indexes should not be added without a query/use-case reason.

---

## 6. Business Rules

Each entity should document important application-level rules.

Example:

> A Workspace Owner cannot leave the Workspace until ownership is transferred.

Another example:

> A Project Member must belong to the corresponding Workspace before becoming a Project Member.

---

# Entity Groups

Entities are organized according to product dependency.

## Identity

1. User
2. Profile

---

## Workspace

3. Workspace
4. Workspace Member
5. Invitation

---

## Communication

6. Channel
7. Message

---

## Projects

8. Project
9. Project Member
10. Review

---

## Community

11. Community Post
12. Comment
13. Like
14. Bookmark

---

## Platform

15. Notification

---

## AI

16. AI Conversation
17. AI Message

---

# Entity Dependencies

The target V1 relationship is:

```text
User
│
├── Profile
│
├── Workspace
│     │
│     ├── Workspace Member
│     ├── Invitation
│     │
│     ├── Channel
│     │      └── Message
│     │
│     └── Project
│            └── Project Member
│
├── Community Post
│     ├── Comment
│     ├── Like
│     └── Bookmark
│
├── Notification
│
└── AI Conversation
       └── AI Message
```

---

# Workspace Dependency Rules

Workspace is the organizational boundary for team collaboration.

Therefore:

```text
Workspace
   │
   ├── Members
   ├── Channels
   └── Projects
```

A Project belongs to a Workspace in the target V1 architecture.

A Project Member must satisfy the Workspace membership requirement after Project/Workspace integration.

---

# Project Integration Rule

Projects were implemented before Workspaces.

Therefore the development sequence is:

```text
Sprint 2
Project system
    ↓
Sprint 3
Workspace system
    ↓
Sprint 3
Project / Workspace integration
```

The existing Project implementation should not be unnecessarily rewritten while the Workspace foundation is being built.

---

# Design Principles

- Keep entities focused on one responsibility.
- Avoid duplicated information.
- Use foreign keys instead of copied data.
- Use junction entities for many-to-many relationships.
- Design for future scalability.
- Prefer composition over unnecessary complexity.
- Keep business logic primarily in the application layer.
- Do not add fields without a clear product or technical reason.

---

# Implementation Process

For each new entity:

```text
Entity specification
        ↓
Review relationships
        ↓
Review constraints
        ↓
Review indexes
        ↓
Review business rules
        ↓
Prisma implementation
        ↓
Migration
        ↓
Service/API implementation
        ↓
Testing
```

Entity design and implementation may proceed incrementally by dependency group.

It is not necessary to wait for every future entity in the platform before implementing the current sprint.

---

# Completion Criteria

An entity is considered designed when it contains:

- Purpose
- Fields
- Relationships
- Constraints
- Indexes
- Business rules

An entity is considered implemented when:

- Prisma mapping exists
- Database migration succeeds
- Related service/module behavior exists
- Validation exists
- Authorization is handled where required
- Relevant API behavior is tested
- Negative cases are tested where applicable

---

# Current Implementation State

The following major entities are already implemented:

- User
- Profile
- Follow
- Project
- Project Member
- Project Star

The next entity group is:

- Workspace
- Workspace Member
- Invitation

---

# Future Entity Groups

After the current V1 foundation:

- Channel
- Message
- Community Post
- Comment
- Like
- Bookmark
- Notification
- AI Conversation
- AI Message

Future versions may introduce:

- Tasks
- Documentation
- Code Reviews
- Git integration
- Attachments
- Reactions
- Sessions
- OAuth Accounts
- Activity Logs
- Advanced AI entities
