# AIConversation Entity

## Version

v1.0

---

# Purpose

The AIConversation entity represents a conversation between a user and the XEEO AI Assistant.

Each conversation groups related AI interactions into a single session, allowing developers to ask questions, generate code, review projects, create documentation, and receive contextual assistance.

---

# Responsibilities

The AIConversation entity is responsible for:

* Organizing AI chat sessions
* Maintaining conversation context
* Connecting AI to projects and workspaces
* Supporting future AI tools and workflows

---

# Entity Overview

```text id="g0c4az"
User
 │
 ▼
AIConversation
 │
 ├── AI Messages
 ├── Project Context
 ├── Workspace Context
 └── AI Actions (Future)
```

---

# Fields

| Field         | Type          | Required | Description                 |
| ------------- | ------------- | -------- | --------------------------- |
| id            | String (CUID) | Yes      | Primary identifier          |
| userId        | String        | Yes      | Conversation owner          |
| workspaceId   | String        | No       | Related workspace           |
| projectId     | String        | No       | Related project             |
| title         | String        | Yes      | Conversation title          |
| contextType   | Enum          | Yes      | Conversation context        |
| model         | String        | Yes      | AI model used               |
| summary       | String        | No       | AI-generated summary        |
| lastMessageAt | DateTime      | No       | Timestamp of latest message |
| isArchived    | Boolean       | Yes      | Archive status              |
| createdAt     | DateTime      | Yes      | Creation timestamp          |
| updatedAt     | DateTime      | Yes      | Last update timestamp       |

---

# Enums

## ContextType

```text id="ig4lbv"
GENERAL

WORKSPACE

PROJECT

CODE

DOCUMENTATION

COMMUNITY
```

---

# Relationships

## Belongs To

```text id="nmuqj3"
User
 │
 ▼
AIConversation
```

---

## Optional Workspace

```text id="9lsm8z"
Workspace
 │
 ▼
AIConversation
```

A conversation may be scoped to a workspace.

---

## Optional Project

```text id="dzdfq7"
Project
 │
 ▼
AIConversation
```

A conversation may focus on a specific project.

---

## Contains

```text id="gbv85g"
AIConversation
 │
 ▼
AIMessage
```

---

# Constraints

## title

* Required
* Maximum 100 characters

If no title is provided, generate one from the first user message.

---

## model

Store the AI model identifier.

Examples:

```text id="1tlvpa"
gpt-5.5

claude-4

gemini-3
```

---

# Indexes

Create indexes for:

```text id="jlwm11"
userId

workspaceId

projectId

lastMessageAt

createdAt
```

---

# Business Rules

## Conversation Ownership

Only the owner can access their AI conversations unless future sharing features are introduced.

---

## Context

When linked to a project or workspace, the AI may use available project metadata and documentation to provide more relevant answers.

Access control must always respect workspace and project permissions.

---

## Archiving

Archived conversations remain searchable but cannot receive new messages until restored.

---

## Title Generation

If the user doesn't specify a title, XEEO AI should generate a meaningful title automatically.

Example:

> "Prisma Database Design"

---

# API Visibility

Visible only to the conversation owner.

Administrators cannot access AI conversations without explicit platform policies.

---

# Future Fields

Potential additions:

* Favorite conversation
* Shared conversation
* Token usage
* Estimated cost
* Conversation tags
* Language
* AI agent type
* Conversation version

---

# Example Record

```json id="6q0ldh"
{
  "id": "clza_ai01",
  "userId": "clz6zslx90000k0k5m2axr0q8",
  "workspaceId": "clz8workspace01",
  "projectId": "clz9project01",
  "title": "Designing the Project Entity",
  "contextType": "PROJECT",
  "model": "gpt-5.5",
  "isArchived": false
}
```

---

# Design Decisions

* Every conversation belongs to one user.
* Conversations may optionally reference a workspace and project.
* Conversation history is preserved.
* Context is used to improve AI responses while respecting permissions.
* The AI model is stored for auditing and future compatibility.

---

# Conversation Lifecycle

```text id="6mgdnx"
Created
    │
    ▼
Active
    │
 ┌──┴─────────┐
 ▼            ▼
Updated   Archived
```

---

# Next Entity

```text id="1qz39l"
15-AIMessage.md
```

The AIMessage entity stores every message exchanged within an AI conversation, including both user prompts and AI responses. It forms the foundation for context-aware conversations, code generation, documentation assistance, and future AI-powered workflows.
