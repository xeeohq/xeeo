# XEEO Entity Design

## Version

v1.0

---

# Purpose

This document defines the structure of every database entity used in XEEO.

Each entity will include:

* Purpose
* Fields
* Relationships
* Constraints
* Indexes
* Business Rules

The goal is to ensure the database is fully designed before implementation in PostgreSQL and Prisma.

---

# Entity Design Standards

Every entity should define:

## 1. Purpose

Why does this entity exist?

---

## 2. Fields

Each field should specify:

* Name
* Data Type
* Required / Optional
* Default Value
* Validation Rules

---

## 3. Relationships

Examples:

* One-to-One
* One-to-Many
* Many-to-Many

---

## 4. Constraints

Examples:

* Unique
* Foreign Key
* Cascade Delete
* Restrict Delete

---

## 5. Indexes

Define searchable fields.

Example:

* username
* email
* workspaceId
* createdAt

---

## 6. Business Rules

Example:

A Workspace Owner cannot leave a workspace until ownership is transferred.

---

# Entity Order

The entities should be designed in dependency order.

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

---

## Platform

13. Notification

---

## AI

14. AI Conversation
15. AI Message

---

# Entity Dependencies

```text
User
│
├── Profile
├── Workspace
│     ├── Workspace Member
│     ├── Invitation
│     ├── Channel
│     │      └── Message
│     │
│     └── Project
│            ├── Project Member
│            └── Review
│
├── Community Post
│      └── Comment
│
├── Notification
│
└── AI Conversation
       └── AI Message
```

---

# Design Principles

* Keep entities focused on one responsibility.
* Avoid duplicated information.
* Use foreign keys instead of copied data.
* Design for future scalability.
* Prefer composition over unnecessary complexity.

---

# Implementation Order

The database should be implemented in the following order:

1. User
2. Profile
3. Workspace
4. Workspace Member
5. Invitation
6. Channel
7. Message
8. Project
9. Project Member
10. Community Post
11. Comment
12. Review
13. Notification
14. AI Conversation
15. AI Message

---

# Completion Criteria

An entity is considered complete when it includes:

* Purpose
* Fields
* Relationships
* Constraints
* Indexes
* Business Rules
* Prisma model mapping (later)

Only after all entities are complete should the Prisma schema be created.
