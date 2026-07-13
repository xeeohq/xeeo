# AIMessage Entity

## Version

v1.0

---

# Purpose

The AIMessage entity stores every message exchanged between a user and the XEEO AI Assistant.

Each AIMessage belongs to a single AIConversation and represents either a user prompt, an AI response, or a future system-generated event.

Together with AIConversation, this entity enables context-aware, multi-turn AI interactions.

---

# Responsibilities

The AIMessage entity is responsible for:

* Storing user prompts
* Storing AI responses
* Maintaining conversation history
* Supporting context-aware AI
* Tracking AI generation metadata

---

# Entity Overview

```text
AIConversation
      │
      ▼
  AIMessage
      │
      ├── User Prompt
      ├── AI Response
      ├── Code Block
      ├── Documentation
      └── Tool Usage (Future)
```

---

# Fields

| Field          | Type          | Required | Description                       |
| -------------- | ------------- | -------- | --------------------------------- |
| id             | String (CUID) | Yes      | Primary identifier                |
| conversationId | String        | Yes      | Parent AI conversation            |
| senderType     | Enum          | Yes      | Message sender                    |
| content        | String        | Yes      | Markdown message content          |
| messageType    | Enum          | Yes      | Type of AI message                |
| sequence       | Int           | Yes      | Message order within conversation |
| metadata       | JSON          | No       | AI generation metadata            |
| createdAt      | DateTime      | Yes      | Creation timestamp                |
| updatedAt      | DateTime      | Yes      | Last update timestamp             |

---

# Enums

## SenderType

```text
USER

AI

SYSTEM
```

---

## MessageType

```text
TEXT

CODE

DOCUMENTATION

EXPLANATION

SUMMARY

ERROR
```

Only **TEXT** and **CODE** are required for the MVP.

---

# Relationships

## Belongs To

```text
AIConversation
      │
      ▼
   AIMessage
```

---

# Constraints

## content

* Required
* Markdown supported
* Maximum 100,000 characters

---

## sequence

* Required
* Starts at 1
* Must increase within a conversation

Example:

```text
1

2

3

4
```

---

# Indexes

Create indexes for:

```text
conversationId

senderType

sequence

createdAt
```

---

# Business Rules

## Ordering

Messages are always displayed by:

```text
sequence ASC
```

This guarantees deterministic conversation history.

---

## Editing

AI messages are immutable.

User prompts should also remain immutable in the MVP to preserve conversation context.

Future versions may support prompt editing by creating a new conversation branch rather than modifying history.

---

## Deletion

Deleting an AI conversation removes logical access to its messages.

Individual AI messages should not be deleted independently in normal application flow.

---

## Metadata

The metadata field stores optional AI information such as:

* Response time
* Token usage
* Finish reason
* Confidence score (future)
* Tool execution details (future)

Business logic should treat this as optional.

---

# API Visibility

Only the owner of the parent conversation may access AI messages.

System administrators should not access message content without explicit platform policies.

---

# Future Fields

Potential additions:

* Parent message (branching conversations)
* Attachment support
* Tool call results
* Code execution output
* Streaming status
* Regenerated response
* User feedback
* Safety classification

---

# Example Record

```json
{
  "id": "clza_aimessage01",
  "conversationId": "clza_ai01",
  "senderType": "AI",
  "messageType": "CODE",
  "sequence": 2,
  "content": "You should create a WorkspaceMember entity to manage permissions.",
  "metadata": {
    "responseTimeMs": 812,
    "model": "gpt-5.5"
  }
}
```

---

# Design Decisions

* Every AIMessage belongs to exactly one AIConversation.
* Conversation order is determined by the sequence field.
* Messages support Markdown and code blocks.
* AI generation metadata is stored separately from the main content.
* AI conversations remain extensible for future tools and workflows.

---

# Message Lifecycle

```text
User Prompt
      │
      ▼
AI Response
      │
      ▼
Stored
      │
      ▼
Retrieved
```

---

# MVP Scope

The initial version of XEEO AI supports:

* General development questions
* Code explanations
* Architecture discussions
* README generation
* Documentation assistance
* Project-specific conversations

Future releases will expand this with code execution, repository analysis, automated reviews, and AI agents.

---

# Database Design Complete ✅

The following entities now form the XEEO MVP database:

1. User
2. Profile
3. Workspace
4. Channel
5. Project
6. WorkspaceMember
7. ProjectMember
8. Invitation
9. Message
10. CommunityPost
11. Comment
12. Review
13. Notification
14. AIConversation
15. AIMessage

These entities provide the foundation for implementing the PostgreSQL database, Prisma schema, backend APIs, and frontend features.
