# ProjectMember Entity

## Version

v1.0

---

# Purpose

The ProjectMember entity connects Users and Projects.

It represents a user's participation in a specific project and defines their project role, responsibilities, and access level.

A user must already be a member of the parent workspace before being added to a project.

---

# Responsibilities

The ProjectMember entity is responsible for:

* Project membership
* Project roles
* Project permissions
* Team collaboration
* Project activity tracking

---

# Why This Entity Exists

A project belongs to a workspace.

A workspace can have hundreds of members.

Not every workspace member should automatically belong to every project.

The ProjectMember entity allows each project to have its own dedicated team.

```text
Workspace
│
├── Members (100)
│
└── Project A
      │
      ├── Member 1
      ├── Member 2
      ├── Member 3
      └── Member 4
```

---

# Fields

| Field        | Type          | Required | Description               |
| ------------ | ------------- | -------- | ------------------------- |
| id           | String (CUID) | Yes      | Primary identifier        |
| projectId    | String        | Yes      | Parent project            |
| userId       | String        | Yes      | Project member            |
| addedById    | String        | Yes      | User who added the member |
| role         | Enum          | Yes      | Project role              |
| status       | Enum          | Yes      | Membership status         |
| joinedAt     | DateTime      | Yes      | Join timestamp            |
| lastActiveAt | DateTime      | No       | Last project activity     |
| createdAt    | DateTime      | Yes      | Record creation           |
| updatedAt    | DateTime      | Yes      | Last update               |

---

# Enums

## ProjectRole

```text
OWNER

MAINTAINER

DEVELOPER

TESTER

DESIGNER

VIEWER
```

---

## ProjectMemberStatus

```text
ACTIVE

INACTIVE

REMOVED
```

---

# Relationships

## Belongs To

```text
Project
    │
    ▼
ProjectMember
```

---

```text
User
    │
    ▼
ProjectMember
```

---

## Added By

```text
User
    │
    ▼
ProjectMember
```

Tracks who invited or added the member.

---

# Constraints

## Workspace Membership Required

A user cannot become a ProjectMember unless they are already an ACTIVE WorkspaceMember of the parent workspace.

This rule is enforced in the application layer.

---

## Unique Membership

Only one membership record is allowed per user per project.

Unique constraint:

```text
(projectId, userId)
```

---

# Indexes

Create indexes for:

```text
projectId

userId

role

status

joinedAt
```

---

# Business Rules

## Project Creation

When a project is created:

Automatically create a ProjectMember record.

Role:

```text
OWNER
```

Status:

```text
ACTIVE
```

---

## Member Removal

Removing a member:

* Revokes project access.
* Does not delete historical contributions.
* Preserves activity history.

---

## Role Changes

Only users with sufficient permissions can promote or demote project members.

---

## Project Owner

Every project must always have one OWNER.

Ownership may be transferred but never removed without assigning a new owner.

---

# Permission Summary

| Role       | Permissions                           |
| ---------- | ------------------------------------- |
| OWNER      | Full project control                  |
| MAINTAINER | Manage members and settings           |
| DEVELOPER  | Create and modify project content     |
| TESTER     | Review and test features              |
| DESIGNER   | Contribute design assets and feedback |
| VIEWER     | Read-only access                      |

---

# API Visibility

Project members can view:

* User
* Role
* Status
* Joined date

Administrative metadata should be restricted based on project permissions.

---

# Future Fields

Potential additions:

* Contribution score
* Assigned modules
* Time tracking
* Workload percentage
* Sprint assignment
* Custom permissions
* Favorite project

---

# Example Record

```json
{
  "id": "clza_projectmember01",
  "projectId": "clz9project01",
  "userId": "clz6zslx90000k0k5m2axr0q8",
  "addedById": "clz6zslx90000k0k5m2axr0q8",
  "role": "OWNER",
  "status": "ACTIVE",
  "joinedAt": "2026-07-13T10:00:00Z"
}
```

---

# Design Decisions

* Every ProjectMember must belong to the parent workspace.
* Projects maintain their own independent team structure.
* Project roles are separate from workspace roles.
* Historical contributions are preserved after removal.
* One user can belong to many projects.

---

# Relationship Summary

```text
User
   │
   ├────────────┐
   │            │
Workspace   Project
   │            │
   ▼            ▼
WorkspaceMember ProjectMember
```

WorkspaceMember grants access to the workspace.

ProjectMember grants access to a specific project.

---

# Next Entity

```text
08-Invitation.md
```

The Invitation entity manages invitations to workspaces and projects. It tracks pending invites, invitation tokens, expiration, acceptance, and rejection, providing a secure onboarding flow for new members.
