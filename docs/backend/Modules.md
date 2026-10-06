# XEEO Backend Modules

## Version

v1.0

**Last Updated:** July 2026

---

# Purpose

This document provides an overview of every backend feature module in XEEO.

It serves as the central index for backend development by tracking the implementation status of each feature module and linking to its detailed implementation documentation.

Every completed backend module must have its own documentation inside:

```text
docs/backend/features/
```

---

# Backend Development Progress

The backend is currently progressing through **Core Sprint 3 — Collaboration Foundation**.

| Module | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Users & Profiles | ✅ Complete |
| Social Graph | ✅ Complete |
| Projects | ✅ Complete |
| Workspaces | 🟢 Foundation Complete |
| Workspace Membership | ⬜ Planned |
| Invitations | ⬜ Planned |
| Channels | ⬜ Planned |
| Notifications | ⬜ Planned |
| AI | ⬜ Planned |

> **Note:** Workspace foundation is implemented, including the Workspace entity, lifecycle, ownership, visibility, validation, and current API foundation. Membership, invitations, ownership transfer, and workspace/project integration remain deferred to their respective Sprint 3 phases.

---

# Module Roadmap

## Authentication

### Purpose

Provides secure user authentication and authorization.

### Responsibilities

- User registration
- User login
- JWT authentication
- Route protection
- Password management
- Request validation

### Documentation

```text
docs/backend/features/Authentication.md
```

### Status

✅ Complete

---

## Users & Profiles

### Purpose

Manages user accounts, profile information, and public developer profiles.

### Responsibilities

- Current user information
- Account management
- Profile management
- Public developer profiles
- Profile fields and metadata

### Documentation

```text
docs/backend/features/Users.md
```

### Status

✅ Complete

---

## Social Graph

### Purpose

Manages relationships between users.

### Responsibilities

- Follow user
- Unfollow user
- Followers
- Following
- Relationship validation

### Status

✅ Complete

---

## Projects

### Purpose

Manages developer projects and their project-level collaboration foundation.

### Responsibilities

- Project creation
- Project retrieval
- Project updates
- Project archival
- Project visibility
- Project README, license, repository, and live URL metadata
- Project members
- Project member management
- Stars and unstar operations

### Status

✅ Complete for current Core Sprint 2 scope

### Deferred

The following capabilities remain outside the current completed scope:

- Workspace membership integration
- Workspace-based project authorization
- Forks
- Advanced engagement counts

These are addressed by later roadmap phases.

---

## Workspaces

### Purpose

Provides the organizational foundation for workspace-based collaboration.

### Responsibilities

- Workspace creation
- Workspace retrieval
- Workspace updates
- Workspace ownership
- Workspace slug generation
- Workspace visibility
- Workspace metadata
- Workspace archiving
- Workspace soft deletion
- Owner-only management operations
- Public/private access behavior

### Current API

```text
POST   /workspaces
GET    /workspaces
GET    /workspaces/:slug
PATCH  /workspaces/:slug
PATCH  /workspaces/:slug/archive
DELETE /workspaces/:slug
```

### Status

🟢 Foundation Complete

### Deferred

The following capabilities are intentionally deferred to later Sprint 3 phases:

- Workspace membership
- Member roles and permissions
- Invitations
- Ownership transfer
- Workspace/project integration
- Member-level authorization

---

## Workspace Membership

### Purpose

Will provide the membership and role-management layer for workspace collaboration.

### Planned Responsibilities

- Workspace members
- Membership lifecycle
- Member roles
- Permission foundation
- Owner protection
- Membership-based authorization

### Sprint

Core Sprint 3 — Collaboration Foundation

### Status

⬜ Planned

---

## Invitations

### Planned Responsibilities

- Workspace invitations
- Invitation lifecycle
- Invitation acceptance/rejection
- Membership creation through invitations

### Sprint

Core Sprint 3 — Collaboration Foundation

### Status

⬜ Planned

---

## Channels

### Planned Responsibilities

- Channel management
- Messaging
- Attachments
- Permissions

### Status

⬜ Planned

---

## Notifications

### Planned Responsibilities

- In-app notifications
- Mentions
- Activity notifications
- Notification preferences

### Status

⬜ Planned

---

## AI

### Planned Responsibilities

- AI chat
- Code explanation
- Documentation generation
- Project assistant

### Status

⬜ Planned

---

# Module Dependencies

```text
Authentication
        │
        ▼
Users & Profiles
        │
        ├──────────────► Social Graph
        │
        ▼
Projects
        │
        ▼
Workspaces
        │
        ▼
Workspace Membership
        │
        ├──────────────► Invitations
        │
        ▼
Workspace / Project Integration
        │
        ▼
Channels
        │
        ▼
Notifications
        │
        ▼
AI
```

Each module should maintain clear boundaries while building on the foundations established by earlier modules.

> The dependency diagram represents the current product architecture and roadmap direction. It does not imply that every later dependency has already been implemented.

---

# Documentation Policy

Each backend feature module should have its own implementation document where applicable.

Every feature document should include:

- Purpose
- Responsibilities
- Folder structure
- API endpoints
- DTOs
- Controllers
- Services
- Validation
- Business rules
- Testing status
- Future improvements

Documentation must reflect the current implementation state and clearly distinguish implemented functionality from deferred roadmap work.

---

# Sprint History

| Sprint | Modules / Scope |
|---------|-----------------|
| Core Sprint 0 | Backend foundation, Prisma, PostgreSQL, configuration, validation |
| Core Sprint 1 | Authentication, Users & Profiles, Social Graph |
| Core Sprint 2 | Projects, Project Members, Stars |
| Core Sprint 3 | Workspace foundation in progress; membership and collaboration phases next |
| Core Sprint 4+ | Future collaboration, communication, notification, AI, and other planned capabilities |

---

# Maintenance

This document should be updated whenever:

- A backend module is completed.
- A new backend module is introduced.
- A module changes status.
- A sprint is completed.

This document should always reflect the current implementation state of the backend.