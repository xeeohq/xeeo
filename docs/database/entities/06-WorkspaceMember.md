# WorkspaceMember Entity

## Version

v1.0

---

# Purpose

The WorkspaceMember entity connects Users and Workspaces.

It represents a user's membership within a workspace and defines their role, permissions, and status.

This entity implements the many-to-many relationship between Users and Workspaces.

---

# Responsibilities

The WorkspaceMember entity is responsible for:

* Workspace membership
* Access control
* Roles
* Permissions
* Join history

---

# Why This Entity Exists

A user can belong to many workspaces.

A workspace can contain many users.

This many-to-many relationship cannot be represented directly and therefore requires a junction entity.

```text
User
   │
   │
WorkspaceMember
   │
   │
Workspace
```

---

# Fields

| Field       | Type          | Required | Description                  |
| ----------- | ------------- | -------- | ---------------------------- |
| id          | String (CUID) | Yes      | Primary identifier           |
| workspaceId | String        | Yes      | Parent workspace             |
| userId      | String        | Yes      | Member                       |
| role        | Enum          | Yes      | Member role                  |
| status      | Enum          | Yes      | Membership status            |
| joinedAt    | DateTime      | Yes      | Join timestamp               |
| invitedById | String        | No       | User who invited this member |
| lastSeenAt  | DateTime      | No       | Last workspace activity      |
| createdAt   | DateTime      | Yes      | Creation timestamp           |
| updatedAt   | DateTime      | Yes      | Last update                  |

---

# Enums

## WorkspaceRole

```text
OWNER

ADMIN

MODERATOR

MEMBER

GUEST
```

---

## MembershipStatus

```text
INVITED

ACTIVE

SUSPENDED

LEFT
```

---

# Relationships

## Belongs To

```text
Workspace
      │
      ▼
WorkspaceMember
```

---

```text
User
      │
      ▼
WorkspaceMember
```

---

## Invited By

```text
User
      │
      ▼
WorkspaceMember
```

This relationship is optional because the workspace owner is not invited—they are created automatically.

---

# Constraints

## Unique Membership

A user may only have **one active membership** in the same workspace.

Unique constraint:

```text
(workspaceId, userId)
```

---

# Indexes

Create indexes for:

```text
workspaceId

userId

role

status

joinedAt
```

---

# Business Rules

## Workspace Creation

When a workspace is created:

Automatically create a WorkspaceMember record.

Role:

```text
OWNER
```

Status:

```text
ACTIVE
```

---

## Invitation

When an invitation is accepted:

Membership status changes from:

```text
INVITED

↓

ACTIVE
```

---

## Leaving

Regular members can leave at any time.

The OWNER cannot leave until ownership has been transferred.

---

## Removal

Admins and Owners can remove members according to the permission system.

Removing a member does not delete their historical contributions.

---

## Suspension

Suspended members:

* Cannot access the workspace.
* Cannot send messages.
* Cannot create projects.
* Historical content remains intact.

---

# Permission Summary

| Role      | Permissions                                        |
| --------- | -------------------------------------------------- |
| OWNER     | Full control, transfer ownership, delete workspace |
| ADMIN     | Manage members, channels, projects                 |
| MODERATOR | Moderate discussions and community                 |
| MEMBER    | Collaborate on projects and channels               |
| GUEST     | Limited read/write access as configured            |

---

# API Visibility

Workspace members can view:

* User
* Role
* Status
* Joined date

Administrative fields such as invitation history should be visible only to users with appropriate permissions.

---

# Future Fields

Potential additions:

* Nickname within workspace
* Custom permissions
* Notification preferences
* Favorite workspace
* Workspace-specific profile
* Last active channel

---

# Example Record

```json
{
  "id": "clza_member01",
  "workspaceId": "clz8workspace01",
  "userId": "clz6zslx90000k0k5m2axr0q8",
  "role": "OWNER",
  "status": "ACTIVE",
  "joinedAt": "2026-07-13T10:00:00Z",
  "invitedById": null
}
```

---

# Design Decisions

* One membership record per user per workspace.
* Workspace roles are stored here instead of the User entity.
* Historical membership information should be preserved.
* Membership controls access to every resource inside the workspace.
* Project permissions build on top of workspace membership.

---

# Next Entity

```text
07-ProjectMember.md
```

ProjectMember defines who participates in a specific project inside a workspace. It allows projects to have their own team structure while still respecting workspace membership and permissions.
