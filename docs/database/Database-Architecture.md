# XEEO Database Architecture

## Version

v2.0

---

# Purpose

This document defines the overall database architecture of XEEO.

It models the real-world entities used by the platform and the relationships between them.

It serves as the architectural foundation for:

- Database schema
- Prisma models
- API design
- Backend modules
- Authorization
- Future platform expansion

This document describes the intended V1 architecture.

The current implementation may temporarily lag behind the target relationships while the system is built incrementally.

---

# Database Design Principles

The database should follow these principles:

- Normalize data to reduce duplication.
- Keep relationships clear and predictable.
- Design for scalability.
- Separate features into logical modules.
- Store only data required by each entity.
- Prefer references between entities.
- Avoid unnecessary duplication.
- Preserve important historical information.
- Keep business rules primarily in the application layer.
- Avoid premature complexity.

---

# Core Architecture

The high-level platform relationship is:

```text
User
 │
 ├── Profile
 │
 ├── Workspaces
 │      ├── Workspace Members
 │      ├── Invitations
 │      ├── Channels
 │      │      └── Messages
 │      │
 │      └── Projects
 │             ├── Project Members
 │             └── Reviews
 │
 ├── Community
 │      ├── Community Posts
 │      ├── Comments
 │      ├── Likes
 │      └── Bookmarks
 │
 ├── Notifications
 │
 └── AI Conversations
        └── AI Messages
```

---

# Core Entities

## User

Represents every registered developer.

Responsibilities:

- Authentication
- Identity
- Ownership
- Workspace participation
- Project participation
- Community participation
- AI conversations

---

## Profile

Stores public developer information.

Examples:

- Display name
- Bio
- Avatar
- Banner
- Skills
- Portfolio
- Social links

---

## Workspace

A Workspace is the primary organizational environment for a development team.

Responsibilities:

- Team organization
- Member management
- Permissions
- Project organization
- Channel organization
- Workspace configuration

A user may own multiple Workspaces and participate in multiple Workspaces.

---

## Workspace Member

Connects Users to Workspaces.

Responsibilities:

- Membership
- Workspace roles
- Membership status
- Permission foundation
- Membership lifecycle

---

## Invitation

Represents a Workspace invitation.

Responsibilities:

- Invitation creation
- Invitation tracking
- Invitation validation
- Acceptance
- Rejection/decline
- Membership creation after acceptance

---

## Channel

Organizes communication inside a Workspace.

Responsibilities:

- Discussions
- Announcements
- Topic-based conversations

V1 channel types:

- TEXT
- ANNOUNCEMENT

---

## Message

Represents a message inside a Channel.

Responsibilities:

- Text communication
- Author
- Timestamps
- Editing
- Deletion
- Message history
- Real-time delivery

Future message capabilities may include:

- Reactions
- Attachments
- Threads
- Advanced message features

---

## Project

Represents a software project.

Responsibilities:

- Project information
- Project ownership
- Project collaboration
- Project visibility
- Project members
- Project discovery
- Project engagement

### Target Relationship

```text
Workspace
    │
    └── contains
          │
        Project
```

Every final V1 Project belongs to exactly one Workspace.

### Implementation Note

Projects were implemented during Sprint 2 before the Workspace system existed.

Therefore:

```text
Sprint 2
Project
    ↓
independent implementation

Sprint 3
Workspace
    ↓
Project integration phase
```

The Workspace → Project relationship will be introduced during the dedicated Project Integration phase of Sprint 3.

---

## Project Member

Connects Users to Projects.

Responsibilities:

- Project membership
- Project roles
- Project access

### V1 Rule

A user must be an active Workspace Member before becoming a Project Member of a project belonging to that Workspace.

This rule is enforced during Workspace/Project integration.

---

## Review

Represents future structured project review capabilities.

### Priority

Post-V1.

---

## Community Post

Represents public content shared with the developer community.

V1 community content is primarily centered around public project publishing and discovery.

Responsibilities:

- Project showcase
- Public discovery
- Community interaction

---

## Comment

Represents a comment on community content.

V1 responsibilities:

- Create comment
- Retrieve comments
- Edit own comment
- Delete own comment
- Authorization

---

## Like

Represents a community interaction.

A Community Like is separate from Project Star.

---

## Bookmark

Allows users to save community content.

---

## Follow

Represents relationships between users.

---

## Project Star

Represents a user's star on a Project.

Project Star is separate from Community Like.

V1:

- Star
- Unstar
- Duplicate protection

Future:

- Engagement counts
- Fork-related engagement

---

## Notification

Stores user notifications.

Potential V1 events include:

- Workspace invitations
- Mentions
- Project activity
- Community interactions
- Relevant system events

---

## AI Conversation

Represents a conversation between a User and the AI assistant.

V1 AI is conversational and provider-agnostic.

---

## AI Message

Represents an individual message inside an AI Conversation.

---

# Database Modules

## Identity Module

Entities:

- User
- Profile

Future:

- Sessions
- OAuth Accounts

Purpose:

Authentication and developer identity.

---

## Workspace Module

Entities:

- Workspace
- Workspace Member
- Invitation

Purpose:

Team organization and collaboration.

---

## Communication Module

Entities:

- Channel
- Message

Future:

- Attachments
- Reactions
- Threads

Purpose:

Real-time workspace communication.

---

## Project Module

Entities:

- Project
- Project Member

Post-V1:

- Review

Purpose:

Software project management and collaboration.

---

## Community Module

Entities:

- Community Post
- Comment
- Like
- Bookmark
- Follow

Purpose:

Developer community and project discovery.

---

## Platform Module

Entities:

- Notification

Future:

- Activity Log
- Advanced platform analytics

Purpose:

Platform-wide notifications and supporting services.

---

## AI Module

Entities:

- AI Conversation
- AI Message

Purpose:

Basic AI developer assistance.

Future:

- Relational AI
- Project-aware AI
- Codebase-aware AI
- AI agents

---

# Entity Relationships

## User → Workspace

```text
User
 │
 ├── owns → Workspace
 │
 └── joins → Workspace
```

Membership is represented through `WorkspaceMember`.

---

## Workspace → Members

```text
Workspace
    │
    └── WorkspaceMember
             │
             └── User
```

A Workspace can have many members.

A User can belong to many Workspaces.

---

## Workspace → Projects

```text
Workspace
    │
    └── Project
```

A Workspace can contain many Projects.

A Project belongs to one Workspace in the target V1 architecture.

---

## Workspace → Channels

```text
Workspace
    │
    └── Channel
            │
            └── Message
```

---

## Project → Members

```text
Project
    │
    └── ProjectMember
             │
             └── User
```

Project membership is constrained by Workspace membership after Project/Workspace integration.

---

## Community

```text
Community Post
    │
    ├── Comments
    ├── Likes
    └── Bookmarks
```

---

## AI

```text
User
 │
 └── AI Conversation
        │
        └── AI Message
```

---

# V1 Database Scope

The intended V1 database contains:

## Identity

- User
- Profile

## Workspace

- Workspace
- Workspace Member
- Invitation

## Communication

- Channel
- Message

## Projects

- Project
- Project Member

## Community

- Community Post
- Comment
- Like
- Bookmark
- Follow

## Platform

- Notification

## AI

- AI Conversation
- AI Message

Additional entities are introduced only when their corresponding feature is intentionally brought into scope.

---

# Future Database Entities

Potential future entities include:

- Attachments
- Reactions
- Sessions
- OAuth Accounts
- Activity Logs
- Tasks
- Documentation
- Code Reviews
- Git integrations
- AI context/relationship models
- Voice/video sessions
- Shared terminal sessions

---

# Database Rules

- Every entity has a unique identifier.
- Every important record has creation and update timestamps.
- Relationships use foreign keys.
- Unique constraints protect logical relationships.
- Deletion behavior is explicitly defined.
- Important historical data should be preserved where appropriate.
- Duplicate data should be avoided.
- Authorization rules belong primarily to the application layer.
- Indexes should reflect real query patterns.
- Soft deletion is preferred for important business entities.

---

# Implementation Strategy

Database implementation follows the documented entity specifications and actual sprint dependencies.

The existing Project implementation from Sprint 2 remains stable.

Sprint 3 introduces:

1. Workspace
2. Workspace Member
3. Invitation
4. Workspace permissions
5. Project/Workspace integration

Communication follows:

6. Channel
7. Message

Community follows:

8. Community Post
9. Comment
10. Like
11. Bookmark

Platform follows:

12. Notification

AI follows:

13. AI Conversation
14. AI Message

This order may be refined only when implementation reveals a genuine dependency.

---

# Architecture Principle

The Workspace is the organizational boundary of XEEO.

The intended V1 hierarchy is:

```text
User
  │
  └── Workspace
        ├── Members
        ├── Channels
        │     └── Messages
        └── Projects
              └── Project Members
```

This relationship is foundational for permissions, collaboration, communication, and future platform expansion.

---

# Future Expansion

The architecture should support future capabilities without requiring major restructuring:

- Tasks
- Documentation
- Code reviews
- Git integration
- Live collaborative editing
- Voice/video
- Screen sharing
- Shared terminals
- Advanced AI
- Plugins
- Mobile
- Enterprise capabilities
