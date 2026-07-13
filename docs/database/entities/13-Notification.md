# Notification Entity

## Version

v1.0

---

# Purpose

The Notification entity represents alerts delivered to users about important events across XEEO.

Notifications help users stay informed about collaboration, project activity, community engagement, invitations, and AI interactions.

---

# Responsibilities

The Notification entity is responsible for:

* User alerts
* Activity updates
* Collaboration reminders
* Invitation notifications
* AI notifications
* Community engagement updates

---

# Entity Overview

```text
Workspace
Project
Community
AI
     │
     ▼
Notification
     │
     ▼
User
```

---

# Fields

| Field     | Type          | Required | Description                         |
| --------- | ------------- | -------- | ----------------------------------- |
| id        | String (CUID) | Yes      | Primary identifier                  |
| userId    | String        | Yes      | Notification recipient              |
| actorId   | String        | No       | User who triggered the notification |
| type      | Enum          | Yes      | Notification type                   |
| title     | String        | Yes      | Short notification title            |
| message   | String        | Yes      | Notification message                |
| link      | String        | No       | Destination URL                     |
| isRead    | Boolean       | Yes      | Read status                         |
| readAt    | DateTime      | No       | Time marked as read                 |
| metadata  | JSON          | No       | Additional notification data        |
| createdAt | DateTime      | Yes      | Creation timestamp                  |
| updatedAt | DateTime      | Yes      | Last update                         |

---

# Enums

## NotificationType

```text
INVITATION

MENTION

MESSAGE

PROJECT_UPDATE

PROJECT_REVIEW

COMMENT

COMMUNITY_POST

AI_RESPONSE

WORKSPACE_UPDATE

SYSTEM
```

---

# Relationships

## Recipient

```text
User
 │
 ▼
Notification
```

Every notification belongs to exactly one user.

---

## Actor

```text
User
 │
 ▼
Notification
```

Optional.

For example:

* Suraj commented on your project.
* Alex invited you to a workspace.

System notifications may not have an actor.

---

# Constraints

## title

* Required
* Maximum 100 characters

---

## message

* Required
* Maximum 500 characters

---

## link

Optional.

Must be a valid internal route.

Examples:

```text
/workspaces/xeeo-development

/projects/xeeo-platform

/community/introducing-xeeo
```

---

# Indexes

Create indexes for:

```text
userId

type

isRead

createdAt
```

---

# Business Rules

## Read Status

Every notification starts as:

```text
isRead = false
```

When opened:

* isRead = true
* readAt = current timestamp

---

## Deletion

Users may delete notifications from their inbox.

Historical notification events may still be retained internally for analytics if required.

---

## Ordering

Newest notifications appear first.

Sort by:

```text
createdAt DESC
```

---

## Deduplication

Similar notifications occurring within a short period may be grouped.

Example:

Instead of:

* Alex commented.
* Sarah commented.
* John commented.

Display:

> 3 people commented on your project.

This grouping is handled by the application layer.

---

# API Visibility

Users can only access their own notifications.

Administrative system notifications follow the platform permission model.

---

# Future Fields

Potential additions:

* Priority
* Icon
* Notification category
* Email sent
* Push sent
* Mobile delivered
* Archived
* Expiration date

---

# Example Record

```json
{
  "id": "clza_notification01",
  "userId": "clz6zslx90000k0k5m2axr0q8",
  "actorId": "clza_user02",
  "type": "PROJECT_REVIEW",
  "title": "New Project Review",
  "message": "Alex reviewed your project 'XEEO Platform'.",
  "link": "/projects/xeeo-platform/reviews",
  "isRead": false,
  "createdAt": "2026-07-13T10:00:00Z"
}
```

---

# Design Decisions

* Notifications belong to one user.
* Notifications may optionally reference the user who triggered them.
* Rich context is stored in the metadata field.
* Read status is tracked independently.
* Notification generation is handled by the application layer.

---

# Notification Lifecycle

```text
Event Occurs
      │
      ▼
Notification Created
      │
      ▼
Unread
      │
      ▼
Read
      │
      ▼
Deleted (Optional)
```

---

# Supported Notification Sources

Notifications may be generated from:

* Workspace invitations
* Channel messages
* Mentions
* Project updates
* Project reviews
* Community comments
* Community posts
* AI responses
* System announcements

---

# Next Entity

```text
14-AIConversation.md
```

The AIConversation entity represents a conversation between a user and XEEO AI. It organizes AI interactions into separate chat sessions, allowing developers to ask coding questions, review projects, generate documentation, and receive contextual assistance.
