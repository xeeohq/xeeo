# Invitation Entity

## Version

v1.0

---

# Purpose

The Invitation entity manages invitations sent to users for joining workspaces or projects.

It provides a secure onboarding process by tracking invitation status, expiration, sender, recipient, and acceptance.

---

# Responsibilities

The Invitation entity is responsible for:

* Sending invitations
* Tracking invitation status
* Secure invite links
* Invitation expiration
* Join workflow
* Invitation history

---

# Why This Entity Exists

Users should not automatically join workspaces or projects.

Instead, invitations create a controlled onboarding flow.

```text
User
   │
   ▼
Invitation
   │
   ├── Pending
   ├── Accepted
   ├── Declined
   └── Expired
```

---

# Fields

| Field       | Type          | Required | Description                  |
| ----------- | ------------- | -------- | ---------------------------- |
| id          | String (CUID) | Yes      | Primary identifier           |
| workspaceId | String        | Yes      | Target workspace             |
| projectId   | String        | No       | Target project (optional)    |
| invitedById | String        | Yes      | User who sent the invitation |
| email       | String        | Yes      | Recipient email              |
| token       | String        | Yes      | Secure invitation token      |
| role        | Enum          | Yes      | Assigned role                |
| status      | Enum          | Yes      | Invitation status            |
| expiresAt   | DateTime      | Yes      | Expiration date              |
| acceptedAt  | DateTime      | No       | Acceptance timestamp         |
| createdAt   | DateTime      | Yes      | Creation timestamp           |
| updatedAt   | DateTime      | Yes      | Last update timestamp        |

---

# Enums

## InvitationStatus

```text
PENDING

ACCEPTED

DECLINED

EXPIRED

CANCELLED
```

---

## InvitationRole

```text
MEMBER

MODERATOR

ADMIN

GUEST
```

The assigned role is applied after the invitation is accepted.

---

# Relationships

## Sent By

```text
User
    │
    ▼
Invitation
```

---

## Belongs To Workspace

```text
Workspace
      │
      ▼
Invitation
```

---

## Optional Project

```text
Project
    │
    ▼
Invitation
```

A workspace invitation may optionally include access to a specific project.

---

# Constraints

## Email

* Required
* Valid email format
* Stored in lowercase

---

## Token

* Unique
* Cryptographically secure
* Randomly generated

Example:

```text
7c6ff18fd9bb4cb2b42d7f5b9b2af4d8
```

---

## Expiration

Default expiration:

```text
7 days
```

Expired invitations cannot be accepted.

---

# Indexes

Create indexes for:

```text
workspaceId

projectId

email

status

token

expiresAt
```

---

# Business Rules

## Sending

Only users with permission can send invitations.

Workspace Owners and Admins may invite members.

Project Maintainers may invite users to their projects.

---

## Acceptance

When an invitation is accepted:

* Create a WorkspaceMember if needed.
* Create a ProjectMember if the invitation includes a project.
* Mark the invitation as ACCEPTED.
* Record the acceptance timestamp.

---

## Declining

Declining an invitation changes its status to DECLINED.

The invitation remains in history.

---

## Expiration

Expired invitations:

* Cannot be accepted.
* Require a new invitation to join.

---

## Cancellation

The sender may cancel a pending invitation.

Cancelled invitations become invalid immediately.

---

# Security Rules

* Tokens must be unpredictable.
* Tokens should be single-use.
* Expired tokens are invalid.
* Tokens should never be exposed after acceptance.

---

# API Visibility

Workspace administrators can view:

* Recipient email
* Role
* Status
* Expiration date

Regular members cannot view invitation details.

---

# Future Fields

Potential additions:

* Personal message
* Invitation source
* QR code invitation
* Maximum uses
* Invite via username
* Invite analytics

---

# Example Record

```json
{
  "id": "clza_invite01",
  "workspaceId": "clz8workspace01",
  "projectId": null,
  "invitedById": "clz6zslx90000k0k5m2axr0q8",
  "email": "developer@example.com",
  "token": "7c6ff18fd9bb4cb2b42d7f5b9b2af4d8",
  "role": "MEMBER",
  "status": "PENDING",
  "expiresAt": "2026-07-20T10:00:00Z"
}
```

---

# Design Decisions

* Invitations are email-based in the MVP.
* Every invitation has a secure unique token.
* Invitations automatically expire.
* Invitation history is preserved.
* One invitation can optionally include project access.

---

# Invitation Lifecycle

```text
Created
    │
    ▼
Pending
    │
 ┌──┴──────────────┐
 ▼                 ▼
Accepted      Declined
 │
 ▼
Membership Created

OR

Pending
 │
 ▼
Expired
```

---

# Next Entity

```text
09-Message.md
```

The Message entity is the foundation of real-time communication in XEEO. It stores channel conversations and will later support replies, mentions, reactions, attachments, edits, and AI-generated responses.
