# User Entity

## Version

v1.0

---

# Purpose

The User entity represents every registered person using XEEO.

A user can own workspaces, join projects, send messages, publish community posts, receive notifications, and interact with the AI assistant.

This is the central entity of the entire platform.

---

# Responsibilities

The User entity is responsible for:

* Authentication
* Identity
* Account ownership
* Security
* Platform access

User-specific information such as biography, skills, and social links belongs in the **Profile** entity.

---

# Entity Overview

```text
User

↓

Owns Workspaces

↓

Joins Projects

↓

Sends Messages

↓

Creates Community Posts

↓

Receives Notifications

↓

Uses AI
```

---

# Fields

| Field         | Type          | Required | Description                               |
| ------------- | ------------- | -------- | ----------------------------------------- |
| id            | String (CUID) | Yes      | Primary identifier                        |
| username      | String        | Yes      | Unique public username                    |
| email         | String        | Yes      | Login email                               |
| passwordHash  | String        | No*      | Password hash (null for OAuth-only users) |
| emailVerified | Boolean       | Yes      | Email verification status                 |
| status        | Enum          | Yes      | Current account status                    |
| role          | Enum          | Yes      | Platform role                             |
| lastLoginAt   | DateTime      | No       | Last successful login                     |
| createdAt     | DateTime      | Yes      | Account creation time                     |
| updatedAt     | DateTime      | Yes      | Last update time                          |
| deletedAt     | DateTime      | No       | Soft delete timestamp                     |

---

# Why CUID Instead of UUID?

For XEEO, I recommend **CUID**.

Reasons:

* Collision resistant
* URL friendly
* Supported by Prisma
* Excellent for distributed systems
* Easier to read than UUIDs

Example:

```text
clz6zslx90000k0k5m2axr0q8
```

---

# Enums

## UserRole

```text
USER
MODERATOR
ADMIN
SUPER_ADMIN
```

Most users will have the **USER** role.

---

## UserStatus

```text
ACTIVE

PENDING_VERIFICATION

SUSPENDED

BANNED

DELETED
```

---

# Relationships

## One-to-One

User

↓

Profile

---

## One-to-Many

User

↓

Owned Workspaces

---

User

↓

Messages

---

User

↓

Community Posts

---

User

↓

Notifications

---

User

↓

AI Conversations

---

## Many-to-Many

User

↓

WorkspaceMember

↓

Workspace

---

User

↓

ProjectMember

↓

Project

---

# Constraints

## username

* Required
* Unique
* 3–30 characters
* Letters
* Numbers
* Underscore
* Lowercase only

Examples:

```text
suraj

john_doe

alex123
```

Invalid:

```text
John Doe

john@

ab

very_very_very_long_username
```

---

## email

* Required
* Unique
* Lowercase
* RFC-compliant format

---

## passwordHash

Required only when using email/password authentication.

OAuth users may not have a password.

---

# Indexes

Create indexes for:

```text
id

username

email

createdAt

status
```

---

# Business Rules

## Username

Users can change their username.

Limit:

Once every 30 days.

---

## Email

Changing email requires verification.

---

## Deleting Account

Use **soft delete**.

Never immediately remove user records.

Set:

```text
deletedAt
```

instead.

---

## Workspace Ownership

A workspace owner cannot leave until ownership has been transferred.

---

## Suspension

Suspended users:

* Cannot login
* Cannot create workspaces
* Cannot post
* Existing data remains visible according to platform rules

---

# Security Rules

Passwords are never stored.

Only password hashes.

Use:

* Argon2id (preferred)
* or bcrypt

Never expose:

* passwordHash
* internal authentication metadata

through the API.

---

# API Visibility

## Public

* id
* username
* createdAt

---

## Private

* email
* role
* status
* lastLoginAt

---

## Never Expose

* passwordHash

---

# Future Fields

Potential additions:

* preferredLanguage
* timezone
* themePreference
* onboardingCompleted
* twoFactorEnabled
* avatarVersion
* accountVisibility

---

# Example Record

```json
{
  "id": "clz6zslx90000k0k5m2axr0q8",
  "username": "suraj",
  "email": "suraj@example.com",
  "emailVerified": true,
  "role": "USER",
  "status": "ACTIVE",
  "createdAt": "2026-07-13T10:00:00Z",
  "updatedAt": "2026-07-13T10:00:00Z",
  "deletedAt": null
}
```

---

# Design Decisions

* Use CUID for primary keys.
* Store profile information separately.
* Support both email/password and OAuth authentication.
* Use soft deletes instead of hard deletes.
* Keep authentication data separate from public profile data.
* Enforce unique usernames and emails.

---

# Next Entity

After completing the User entity, design:

```text
02-Profile.md
```

The Profile entity will contain public information such as avatar, bio, skills, social links, portfolio, and developer preferences while keeping the User entity focused on authentication and identity.
