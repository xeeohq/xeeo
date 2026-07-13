# Project Entity

## Version

v1.0

---

# Purpose

The Project entity represents the primary software development unit within a workspace.

A project serves as the central hub for planning, collaboration, reviews, AI assistance, documentation, and future development tools.

Every project belongs to one workspace.

---

# Responsibilities

The Project entity is responsible for:

* Organizing software development
* Team collaboration
* Project lifecycle management
* AI integration
* Community publishing
* Progress tracking

---

# Entity Overview

```text
Workspace
│
└── Project
      │
      ├── Members
      ├── Reviews
      ├── AI
      ├── Activity
      ├── Tasks (Future)
      ├── Files (Future)
      ├── Documentation (Future)
      └── Git Repository (Future)
```

---

# Fields

| Field         | Type          | Required | Description              |
| ------------- | ------------- | -------- | ------------------------ |
| id            | String (CUID) | Yes      | Primary identifier       |
| workspaceId   | String        | Yes      | Parent workspace         |
| createdById   | String        | Yes      | Project creator          |
| name          | String        | Yes      | Project name             |
| slug          | String        | Yes      | URL-friendly identifier  |
| description   | String        | No       | Project description      |
| logoUrl       | String        | No       | Project logo             |
| visibility    | Enum          | Yes      | Project visibility       |
| status        | Enum          | Yes      | Current lifecycle status |
| techStack     | JSON          | No       | Technologies used        |
| repositoryUrl | String        | No       | Git repository           |
| websiteUrl    | String        | No       | Live application         |
| version       | String        | No       | Current version          |
| isArchived    | Boolean       | Yes      | Archive flag             |
| createdAt     | DateTime      | Yes      | Creation timestamp       |
| updatedAt     | DateTime      | Yes      | Last update              |
| deletedAt     | DateTime      | No       | Soft delete timestamp    |

---

# Enums

## ProjectStatus

```text
PLANNING

ACTIVE

TESTING

COMPLETED

ARCHIVED
```

---

## ProjectVisibility

```text
PRIVATE

WORKSPACE

PUBLIC
```

Meaning:

PRIVATE → Only project members

WORKSPACE → Anyone in the workspace

PUBLIC → Visible to everyone

---

# Relationships

## Belongs To

```text
Workspace

↓

Project
```

---

## Created By

```text
User

↓

Project
```

---

## Contains

```text
Project

↓

Project Members

↓

Reviews

↓

AI Conversations

↓

Activity
```

Future:

* Tasks
* Files
* Documentation
* Deployments

---

# Constraints

## name

* Required
* 3–80 characters

---

## slug

Unique inside a workspace.

Example:

```text
railway-booking-system

xeeo-platform

portfolio-website
```

---

## repositoryUrl

Must be a valid HTTPS URL.

Supported providers:

* GitHub
* GitLab
* Bitbucket

---

# Indexes

Create indexes for:

```text
id

workspaceId

createdById

slug

status

createdAt
```

---

# Business Rules

## Creation

When a project is created:

Automatically create:

* Project
* ProjectMember (Creator)
* Activity entry

---

## Visibility

Private projects:

Visible only to project members.

Workspace projects:

Visible to every workspace member.

Public projects:

Can be published to the XEEO Community.

---

## Publishing

Only PUBLIC projects may be showcased in the Community.

Publishing creates a linked Community Post while keeping project data synchronized.

---

## Archiving

Archived projects:

* Become read-only.
* Cannot receive new updates.
* Remain searchable for historical purposes.

---

## Deletion

Projects use soft deletes.

Historical activity should be preserved whenever possible.

---

# API Visibility

Public:

* name
* description
* logoUrl
* visibility
* status
* techStack
* websiteUrl

Internal:

* workspaceId
* createdById
* deletedAt

---

# Future Fields

Potential additions:

* Deployment status
* Build status
* CI/CD provider
* Repository provider
* License
* Contributors count
* Completion percentage
* Estimated deadline
* Sprint number

---

# Example Record

```json
{
  "id": "clz9project01",
  "workspaceId": "clz8workspace01",
  "createdById": "clz6zslx90000k0k5m2axr0q8",
  "name": "XEEO Platform",
  "slug": "xeeo-platform",
  "description": "Collaborative developer workspace.",
  "visibility": "PRIVATE",
  "status": "ACTIVE",
  "techStack": [
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "Prisma"
  ],
  "repositoryUrl": "https://github.com/xeeo/platform",
  "websiteUrl": null,
  "version": "0.1.0"
}
```

---

# Design Decisions

* Every project belongs to exactly one workspace.
* Projects are the primary place where software development happens.
* Community posts reference projects instead of duplicating project data.
* Future features such as Tasks, Documentation, Git, and Deployments attach to Project rather than Workspace.
* Soft deletes preserve project history and collaboration records.

---

# Next Entity

```text
06-WorkspaceMember.md
```

WorkspaceMember defines who belongs to a workspace, their role, permissions, and access level. It creates the many-to-many relationship between Users and Workspaces and forms the basis of XEEO's permission system.
