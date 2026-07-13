# Workspace Entity

## Version

v1.0

---

# Purpose

The Workspace entity represents a collaborative environment where developers work together.

Every workspace serves as a central hub for communication, projects, members, AI assistance, and future collaboration features.

A user can own multiple workspaces and participate in many others.

---

# Responsibilities

The Workspace entity is responsible for:

* Team organization
* Project organization
* Communication
* Member management
* Workspace configuration
* Collaboration

---

# Entity Overview

```text
Workspace
│
├── Members
├── Channels
├── Projects
├── Invitations
├── Activity
└── AI
```

---

# Fields

| Field       | Type          | Required | Description                 |
| ----------- | ------------- | -------- | --------------------------- |
| id          | String (CUID) | Yes      | Primary identifier          |
| ownerId     | String        | Yes      | User who owns the workspace |
| name        | String        | Yes      | Workspace name              |
| slug        | String        | Yes      | Unique workspace URL        |
| description | String        | No       | Workspace description       |
| logoUrl     | String        | No       | Workspace logo              |
| bannerUrl   | String        | No       | Banner image                |
| visibility  | Enum          | Yes      | Public or private           |
| plan        | Enum          | Yes      | Workspace subscription tier |
| isArchived  | Boolean       | Yes      | Archive status              |
| createdAt   | DateTime      | Yes      | Creation timestamp          |
| updatedAt   | DateTime      | Yes      | Last update timestamp       |
| deletedAt   | DateTime      | No       | Soft delete timestamp       |

---

# Enums

## WorkspaceVisibility

```text
PRIVATE

PUBLIC
```

---

## WorkspacePlan

```text
FREE

PRO

TEAM

ENTERPRISE
```

Only **FREE** will be available in the MVP.

---

# Relationships

## One Workspace has:

```text
Workspace

↓

WorkspaceMembers

↓

Channels

↓

Projects

↓

Invitations

↓

Activity Logs (Future)
```

---

## Belongs To

```text
Workspace

↓

Owner (User)
```

One user owns the workspace.

Ownership can be transferred.

---

# Constraints

## name

* Required
* 3–60 characters

Examples:

* XEEO Team
* AI Research
* College Project

---

## slug

Unique across the platform.

Generated automatically.

Example:

```text
xeeo-team

college-project

ai-research
```

Used for URLs:

```text
https://xeeo.app/workspaces/xeeo-team
```

---

## description

Maximum:

1000 characters

---

# Indexes

Create indexes for:

```text
id

ownerId

slug

createdAt

visibility
```

---

# Business Rules

## Workspace Creation

When a workspace is created:

Automatically create:

* Workspace
* WorkspaceMember (Owner role)
* Default channels

Default channels:

```text
#general

#announcements
```

---

## Ownership

The workspace owner:

* Cannot remove themselves.
* Cannot leave without transferring ownership.
* Has full permissions.

---

## Archiving

Archived workspaces:

* Become read-only.
* Members cannot create new content.
* Existing data remains accessible.

---

## Deleting

Use soft delete.

Never permanently remove workspace data immediately.

---

## Visibility

### Private

Only invited members can access.

### Public

Anyone can view basic information.

Joining may still require approval.

---

# API Visibility

Public:

* id
* name
* slug
* logoUrl
* description
* visibility

Private:

* ownerId
* plan
* deletedAt

---

# Future Fields

Potential additions:

* Theme color
* Custom domain
* Workspace tags
* Region
* Language
* Timezone
* AI configuration
* Storage usage
* Member limit
* Project limit

---

# Example Record

```json
{
  "id": "clz8workspace01",
  "ownerId": "clz6zslx90000k0k5m2axr0q8",
  "name": "XEEO Development",
  "slug": "xeeo-development",
  "description": "Building the XEEO platform.",
  "visibility": "PRIVATE",
  "plan": "FREE",
  "isArchived": false,
  "createdAt": "2026-07-13T10:00:00Z",
  "updatedAt": "2026-07-13T10:00:00Z"
}
```

---

# Design Decisions

* Every workspace has exactly one owner.
* A user can own multiple workspaces.
* Members are stored separately in the WorkspaceMember entity.
* Channels belong to workspaces.
* Projects belong to workspaces.
* Invitations belong to workspaces.
* Workspace settings should be independent from member data.

---
