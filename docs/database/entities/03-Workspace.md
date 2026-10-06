# Workspace Entity

## Version

v1.1

---

# Purpose

The Workspace entity represents a collaborative environment where developers work together.

Every workspace serves as a central hub for communication, projects, members, AI assistance, and future collaboration features.

A user can own multiple workspaces and participate in many others.

The current implementation establishes the Workspace persistence and ownership foundation. Workspace membership, invitations, channels, and other collaboration capabilities will be implemented in subsequent phases.

---

# Responsibilities

The Workspace entity is responsible for:

* Team organization
* Project organization
* Communication
* Member management
* Workspace configuration
* Collaboration
* Workspace lifecycle management

---

# Entity Overview

```text
Workspace
│
├── Owner
│
├── Members              (Planned)
├── Channels             (Planned)
├── Projects             (Planned / Integration)
├── Invitations          (Planned)
├── Activity             (Planned)
└── AI                   (Planned)
```

The Workspace currently has a direct ownership relationship with the User entity.

The remaining relationships represent the planned logical Workspace ecosystem and are not all implemented in the current database schema.

---

# Implementation Status

## Implemented

The current Workspace foundation includes:

* Workspace persistence
* Workspace ownership through `ownerId`
* Workspace name
* Workspace description
* Unique workspace slug
* Workspace visibility
* Workspace subscription plan
* Workspace logo URL
* Workspace banner URL
* Archive flag
* Soft-delete timestamp
* Creation timestamp
* Update timestamp
* Workspace database migration
* Unique slug constraint
* Workspace visibility index

---

## Planned

The following Workspace capabilities are defined by the product design but are not yet implemented:

* Workspace members
* Workspace member roles
* Membership lifecycle
* Invitations
* Default channel creation
* Workspace-level activity
* Ownership transfer
* Workspace/project integration

The current Workspace API foundation, owner-based authorization, archive behavior, soft-delete behavior, and basic visibility rules are implemented. More detailed membership-based access control will be introduced with the Workspace Membership phase.

---

# Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| id | String (CUID) | Yes | Primary identifier |
| ownerId | String | Yes | User who owns the workspace |
| name | String | Yes | Workspace name |
| slug | String | Yes | Globally unique workspace identifier used in URLs |
| description | String | No | Workspace description |
| logoUrl | String | No | Workspace logo URL |
| bannerUrl | String | No | Workspace banner image URL |
| visibility | WorkspaceVisibility | Yes | Workspace visibility setting |
| plan | WorkspacePlan | Yes | Workspace subscription tier |
| isArchived | Boolean | Yes | Indicates whether the workspace is archived |
| createdAt | DateTime | Yes | Creation timestamp |
| updatedAt | DateTime | Yes | Last update timestamp |
| deletedAt | DateTime | No | Soft-delete timestamp |

---

# Enums

## WorkspaceVisibility

```text
PRIVATE
PUBLIC
```

### PRIVATE

The workspace is private and access is intended for authorized members.

### PUBLIC

The workspace may expose basic workspace information publicly.

Detailed access-control behavior will be implemented with the Workspace membership system.

---

## WorkspacePlan

```text
FREE
PRO
TEAM
ENTERPRISE
```

The Workspace model supports multiple subscription tiers.

The current MVP implementation defaults new workspaces to:

```text
FREE
```

Paid-plan behavior is not implemented as part of the current Workspace foundation.

---

# Relationships

## Current Relationship

### Workspace Owner

Each Workspace belongs to exactly one User through `ownerId`.

```text
User
 │
 └── owns ──> Workspace
```

A User can own multiple Workspaces.

The Workspace therefore has a:

```text
User 1 ──────── * Workspace
```

ownership relationship.

---

## Planned Relationships

The target Workspace ecosystem includes:

```text
Workspace
│
├── WorkspaceMember
├── Channel
├── Project
├── Invitation
├── Activity Log
└── AI
```

These relationships will be implemented progressively in subsequent Sprint 3 phases.

---

# Ownership

Every Workspace has exactly one owner.

The owner is represented by:

```text
Workspace.ownerId
```

which references:

```text
User.id
```

The current database relationship uses cascading deletion:

```text
User
  │
  └── owns ──> Workspace
                  │
                  └── onDelete: Cascade
```

This means that deletion of the owning User at the database relationship level will remove their owned Workspace records.

Additional ownership-transfer behavior is planned and will be implemented before ownership becomes a complete application-level workflow.

---

# Application Constraints

The following constraints are defined by the product design and should be enforced at the application/API layer.

## name

* Required
* 3–60 characters

Examples:

```text
XEEO Team
AI Research
College Project
```

---

## slug

* Required
* Globally unique
* Generated automatically
* Used for workspace URLs

Examples:

```text
xeeo-team
college-project
ai-research
```

Example URL:

```text
https://xeeo.app/workspaces/xeeo-team
```

The database currently enforces slug uniqueness.

---

## description

* Optional
* Maximum 1000 characters

---

# Database Constraints

The current database implementation enforces:

* `id` as the primary key
* `ownerId` as a required field
* `slug` as a required field
* `slug` as globally unique
* `visibility` as a required enum
* `plan` as a required enum
* `isArchived` as a required boolean
* `createdAt` as a required timestamp
* `updatedAt` as a required timestamp

Application-level validation remains responsible for constraints such as name length, description length, and slug-generation rules.

---

# Indexes

The Workspace model uses the following indexes:

| Index | Purpose |
|---|---|
| Primary key on `id` | Workspace identification |
| Unique index on `slug` | Ensures globally unique workspace URLs |
| Index on `ownerId` | Supports owner-based queries |
| Index on `createdAt` | Supports chronological queries |
| Index on `visibility` | Supports visibility filtering |

---

# Business Rules

The following rules represent the intended Workspace behavior. Rules marked as planned require application/API implementation before they become enforced behavior.

---

## Workspace Creation

### Current

The database supports persistence of Workspace records.

### Planned

The complete Workspace creation flow will:

* Create a Workspace
* Assign the creating User as owner
* Create a WorkspaceMember with Owner role
* Create default channels

Default channels:

```text
#general
#announcements
```

Workspace member and channel creation are planned for subsequent phases.

---

## Ownership

### Current

* Every Workspace has exactly one owner.
* The owner is represented by `ownerId`.
* The database relationship protects referential integrity.

### Planned

The workspace owner:

* Cannot remove themselves.
* Cannot leave without transferring ownership.
* Has full workspace permissions.
* Can transfer ownership.

Ownership-transfer behavior is not yet implemented.

---

## Archiving

The Workspace contains:

```text
isArchived
```

which provides the database foundation for workspace archiving.

### Current behavior

The Workspace API currently:

* Marks the workspace as archived.
* Prevents updates to archived workspaces.
* Prevents archiving an already archived workspace.
* Preserves the workspace record and its data.

Detailed member-level restrictions on archived workspaces will be implemented with Workspace Membership and permission management.

---

## Deleting

The Workspace contains:

```text
deletedAt
```

to support soft deletion.

### Current behavior

The Workspace API:

* Marks the Workspace as deleted using `deletedAt`.
* Preserves the underlying record.
* Prevents normal retrieval of deleted workspaces.
* Excludes deleted workspaces from owner workspace listings.
* Prevents deleting an already soft-deleted workspace.

Permanent deletion and restoration are not part of the current Workspace foundation.

---

## Visibility

## Private

Private workspaces are currently accessible through the Workspace API only to the workspace owner.

Detailed member-based authorization will be implemented with Workspace Membership.

## Public

Public workspaces can currently be retrieved by non-owners through the Workspace API.

Detailed membership and permission rules will be implemented with Workspace Membership and authorization.

---

# API Visibility

The intended public/private visibility boundary is:

## Public

Potentially exposed:

* id
* name
* slug
* logoUrl
* description
* visibility

## Private

Restricted information includes:

* ownerId
* plan
* deletedAt

Actual API exposure rules will be enforced by the Workspace API and authorization layer.

---

# Workspace Lifecycle

The Workspace lifecycle is represented by:

```text
Active
  │
  ├── Archived
  │
  └── Soft Deleted
```

Current database state:

```text
isArchived
deletedAt
```

provide the persistence representation for these lifecycle states.

The Workspace API currently implements:

* Active workspaces
* Archiving through `isArchived`
* Soft deletion through `deletedAt`
* Update protection for archived workspaces
* Retrieval exclusion for soft-deleted workspaces

More detailed lifecycle permissions and member-level behavior will be implemented with Workspace Membership.

---

# Migration

The Workspace entity was introduced through Prisma migrations.

## Initial Workspace Model

```text
20260930060540_add_workspace_model
```

## Complete Workspace Model

```text
20261001020741_complete_workspace_model
```

The completed migration adds:

* Workspace visibility enum
* Workspace plan enum
* Workspace slug
* Workspace logo URL
* Workspace banner URL
* Workspace archive flag
* Workspace visibility
* Workspace plan
* Unique slug constraint
* Visibility index

The migration has been applied successfully to the development database.

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

These fields are not part of the current Workspace implementation.

---

# Example Record

```json
{
  "id": "clz8workspace01",
  "ownerId": "clz6zslx90000k0k5m2axr0q8",
  "name": "XEEO Development",
  "slug": "xeeo-development",
  "description": "Building the XEEO platform.",
  "logoUrl": null,
  "bannerUrl": null,
  "visibility": "PRIVATE",
  "plan": "FREE",
  "isArchived": false,
  "createdAt": "2026-07-13T10:00:00Z",
  "updatedAt": "2026-07-13T10:00:00Z",
  "deletedAt": null
}
```

---

# Design Decisions

* Every workspace has exactly one owner.
* A user can own multiple workspaces.
* Workspace ownership is represented by `ownerId`.
* Workspace slug is globally unique.
* Workspace visibility is represented by `WorkspaceVisibility`.
* Workspace subscription tier is represented by `WorkspacePlan`.
* Workspace archiving is represented by `isArchived`.
* Workspace soft deletion is represented by `deletedAt`.
* Members will be stored separately in the WorkspaceMember entity.
* Channels will belong to workspaces.
* Projects will integrate with workspaces.
* Invitations will belong to workspaces.
* Workspace settings should remain independent from member data.
* Workspace capabilities will be implemented incrementally across Sprint 3 phases.

---

# Phase 1 Status

## Completed

The following Workspace foundation has been implemented and verified:

* Prisma Workspace model
* User → Workspace ownership relation
* Workspace metadata
* Workspace slug generation
* Workspace visibility
* Workspace subscription plan
* Workspace archive state
* Workspace soft-delete field
* Workspace migration
* Database migration application
* Database schema verification
* Prisma schema validation
* Workspace creation API
* Workspace retrieval API
* Workspace update API
* Workspace archive API
* Workspace soft-delete API
* Owner-only workspace update authorization
* Owner-only workspace archive authorization
* Owner-only workspace soft-delete authorization
* Private workspace access protection
* Public workspace retrieval
* Archived workspace update protection
* Soft-deleted workspace retrieval protection
* DTO validation
* Negative-case handling
* Workspace service unit tests
* 20 workspace service tests passing
* TypeScript typecheck passing

## Remaining

* Workspace ownership transfer workflow
* Workspace membership integration

Ownership transfer is intentionally deferred until Workspace Membership is implemented, because complete ownership transfer requires membership and role management.

Workspace/project integration will be handled in a later Sprint 3 phase.

Phase 1 Workspace foundation is complete. Membership-based collaboration and ownership transfer remain future Sprint 3 work.

---
