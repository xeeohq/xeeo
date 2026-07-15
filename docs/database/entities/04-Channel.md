# Channel Entity

## Version

v1.0

---

# Purpose

The Channel entity represents a communication space inside a Workspace.

Channels organize conversations by topic, allowing members to collaborate efficiently without mixing discussions.

Every channel belongs to exactly one Workspace.

---

# Responsibilities

The Channel entity is responsible for:

* Organizing discussions
* Separating topics
* Hosting messages
* Supporting announcements
* Supporting future voice channels

---

# Entity Overview

```text
Workspace
│
├── Channel
│     ├── Messages
│     ├── Members (Future)
│     └── Attachments (Future)
```

---

# Fields

| Field       | Type          | Required | Description                  |
| ----------- | ------------- | -------- | ---------------------------- |
| id          | String (CUID) | Yes      | Primary identifier           |
| workspaceId | String        | Yes      | Parent workspace             |
| createdById | String        | Yes      | User who created the channel |
| name        | String        | Yes      | Channel name                 |
| description | String        | No       | Channel description          |
| type        | Enum          | Yes      | Channel type                 |
| position    | Int           | Yes      | Display order                |
| isPrivate   | Boolean       | Yes      | Private channel flag         |
| isArchived  | Boolean       | Yes      | Archive status               |
| createdAt   | DateTime      | Yes      | Creation timestamp           |
| updatedAt   | DateTime      | Yes      | Last update timestamp        |

---

# Enums

## ChannelType

```text
TEXT

ANNOUNCEMENT

VOICE

FORUM
```

Only **TEXT** and **ANNOUNCEMENT** are included in the MVP.

---

# Relationships

## Belongs To

```text
Workspace

↓

Channel
```

---

## Created By

```text
User

↓

Channel
```

---

## Contains

```text
Channel

↓

Messages
```

---

# Constraints

## name

* Required
* 2–40 characters
* Unique within a workspace

Examples:

* general
* backend
* frontend
* design
* announcements

---

# Indexes

Create indexes for:

```text
id

workspaceId

createdById

position
```

---

# Business Rules

## Default Channels

Every new workspace automatically creates:

* general
* announcements

These channels cannot be deleted.

---

## Ordering

Channels are displayed according to the `position` field.

Users with permission can reorder channels.

---

## Private Channels

Private channels are visible only to authorized members.

This feature is planned for a future release.

---

## Archiving

Archived channels become read-only.

Messages remain accessible for history.

---

# API Visibility

Public to workspace members:

* id
* name
* description
* type
* position

Internal:

* createdById
* workspaceId

---

# Future Fields

Potential additions:

* Slow mode
* Channel icon
* Voice settings
* Topic
* Last message timestamp
* Pinned message count
* Member overrides

---

# Example Record

```json
{
  "id": "clz8channel01",
  "workspaceId": "clz8workspace01",
  "createdById": "clz6zslx90000k0k5m2axr0q8",
  "name": "backend",
  "description": "Backend architecture discussions",
  "type": "TEXT",
  "position": 3,
  "isPrivate": false,
  "isArchived": false
}
```

---

# Design Decisions

* Channels always belong to one workspace.
* Messages always belong to one channel.
* Channel names are unique within a workspace.
* Default channels are protected from deletion.
* Future channel types should not require schema changes.

---

# Next Entity

```text
05-Project.md
```

The Project entity is the **core of XEEO**. Every software project lives inside a workspace and becomes the central place for development, AI assistance, reviews, files, and future task management.
