# XEEO Coding Standards

## Version

v1.0

---

# Purpose

This document defines the coding standards for the XEEO project.

Every contributor must follow these standards to ensure consistency, readability, maintainability, and scalability across the codebase.

These standards apply to the frontend, backend, database, infrastructure, and shared packages.

---

# Core Principles

Every piece of code should be:

* Simple
* Readable
* Maintainable
* Reusable
* Testable
* Secure
* Type-safe
* Well documented

---

# Language

The entire project uses:

TypeScript

JavaScript should not be used except for tooling where required.

---

# Naming Conventions

## Variables

Use:

camelCase

Example

```ts
const currentUser = {};
const workspaceMembers = [];
```

---

## Functions

Use:

camelCase

Example

```ts
createWorkspace()

sendMessage()

generateToken()
```

---

## Classes

Use:

PascalCase

Example

```ts
UserService

AuthGuard

WorkspaceController
```

---

## Interfaces

Prefix with **I** only if necessary.

Prefer descriptive names.

Example

```ts
User

Workspace

Project
```

---

## Types

Use:

PascalCase

Example

```ts
UserRole

WorkspaceStatus
```

---

## Enums

Use:

PascalCase

Enum values:

UPPER_SNAKE_CASE

Example

```ts
enum UserRole {
    USER,
    ADMIN,
    SUPER_ADMIN
}
```

---

# Folder Naming

Always:

kebab-case

Correct

```text
workspace-member

project-review

auth
```

Incorrect

```text
WorkspaceMember

workspaceMember

Workspace_Member
```

---

# File Naming

React Components

PascalCase

```text
WorkspaceCard.tsx

ProjectCard.tsx

LoginForm.tsx
```

Other Files

kebab-case

```text
auth.service.ts

auth.controller.ts

workspace.module.ts
```

---

# Component Rules

Each component should have a single responsibility.

Avoid components longer than:

300 lines

If necessary, split into smaller components.

---

# React Rules

Prefer:

Functional Components

Hooks

Composition

Avoid:

Class Components

---

# Backend Rules

Controllers

Only:

* Receive request
* Validate input
* Call service
* Return response

No business logic.

---

Services

Contain:

Business logic only.

---

Repositories

Database access only.

---

# Prisma Rules

Never access Prisma directly inside controllers.

Always go through services.

---

# API Rules

Always return:

```json
{
  "success": true,
  "data": {}
}
```

Errors:

```json
{
  "success": false,
  "message": "",
  "error": {}
}
```

---

# Error Handling

Never expose:

* Stack traces
* Database errors
* Internal implementation

Return user-friendly messages.

---

# Comments

Write comments only when the code itself cannot clearly explain the intent.

Avoid obvious comments.

Bad

```ts
// Increment i

i++;
```

Good

```ts
// Prevent duplicate workspace creation during concurrent requests.
```

---

# Imports

Order:

1. Node modules
2. External packages
3. Internal packages
4. Relative imports

---

# Formatting

Use:

Prettier

Never manually format code differently.

---

# Linting

ESLint must pass before every commit.

Warnings should be minimized.

Errors are not allowed.

---

# Git Branch Naming

Feature

```text
feature/authentication

feature/workspaces

feature/chat
```

Bug Fix

```text
fix/login

fix/socket-auth
```

Hotfix

```text
hotfix/token-expiry
```

Documentation

```text
docs/api

docs/database
```

---

# Commit Messages

Follow Conventional Commits.

Examples

```text
feat(auth): add JWT authentication

fix(chat): resolve duplicate messages

docs(database): update ER diagram

refactor(project): simplify service logic

test(auth): add login tests
```

---

# Testing

Every module should include:

* Unit tests
* Integration tests (where appropriate)

Critical flows should also have end-to-end tests.

---

# Security

Always:

* Validate input
* Sanitize output
* Check permissions
* Hash passwords
* Never trust client data

---

# Logging

Log:

* Important events
* Errors
* Warnings

Never log:

* Passwords
* Tokens
* Sensitive user data

---

# Environment Variables

Never hardcode:

* API Keys
* Secrets
* Database credentials

Use:

`.env`

---

# Documentation

Every major module should include:

* Purpose
* Responsibilities
* Public API
* Dependencies

---

# Pull Request Checklist

Before merging:

* Code builds successfully
* ESLint passes
* Tests pass
* Documentation updated (if needed)
* No sensitive data committed
* Code reviewed

---

# Code Review Guidelines

Review for:

* Correctness
* Readability
* Performance
* Security
* Maintainability
* Test coverage

Suggestions should explain **why**, not just **what**.

---

# Definition of Done

A task is complete only if:

* Feature works as expected
* Tests pass
* Code reviewed
* Documentation updated (if required)
* No lint errors
* No TypeScript errors

---

# Development Workflow

```text
Plan

↓

Create Branch

↓

Implement

↓

Test

↓

Review

↓

Merge

↓

Deploy
```

---

# Engineering Philosophy

* Write code for humans first.
* Prefer clarity over cleverness.
* Keep modules loosely coupled.
* Favor composition over inheritance.
* Make small, incremental improvements.
* Leave the codebase better than you found it.

---

# Summary

These coding standards establish a consistent engineering culture for XEEO. By following them throughout development, the project will remain maintainable, scalable, and approachable for current and future contributors.
