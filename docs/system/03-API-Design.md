# API Design

## Status

✅ Updated after Core Sprint 3 — Workspace Foundation

---

# API Principles

The XEEO API follows RESTful design principles.

## Guidelines

- Resource-oriented URLs
- JSON request/response bodies
- JWT authentication
- Consistent HTTP status codes
- Validation on every request
- Thin controllers
- Business logic in services
- Consistent response models

---

# Authentication

## Register

```http
POST /auth/register
```

Creates a new user account.

---

## Login

```http
POST /auth/login
```

Authenticates a user and returns an access token.

---

## Change Password

```http
PATCH /auth/change-password
```

Authentication Required

Changes the authenticated user's password.

---

# Users

## Get Current User

```http
GET /users/me
```

Authentication Required

Returns the authenticated user and profile.

---

## Update Account

```http
PATCH /users/me
```

Authentication Required

Updates:

- username
- email

---

## Update Profile

```http
PATCH /users/me/profile
```

Authentication Required

Updates:

- displayName
- bio
- avatarUrl
- bannerUrl
- location
- website
- portfolioUrl
- githubUrl
- linkedinUrl
- twitterUrl
- experienceLevel
- availability

---

# Developers

## Public Developer Profile

```http
GET /developers/:username
```

Public Endpoint

Returns:

- Public profile
- Skills
- Followers count
- Following count

No private account information is exposed.

---

# Social Graph

## Follow User

```http
POST /users/:username/follow
```

Authentication Required

Creates a follow relationship.

---

## Unfollow User

```http
DELETE /users/:username/follow
```

Authentication Required

Removes a follow relationship.

---

## Followers

```http
GET /users/:username/followers
```

Public Endpoint

Returns followers of a developer.

---

## Following

```http
GET /users/:username/following
```

Public Endpoint

Returns users followed by a developer.

---

# Authentication

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

---


# Workspaces

The Workspace API establishes the organizational foundation for workspace-based collaboration. The current implementation covers workspace creation, retrieval, owner-controlled updates, archive lifecycle, soft deletion, and basic public/private visibility. Membership-based authorization and ownership transfer are deferred to later phases.

## Create Workspace

```http
POST /workspaces
```

Authentication Required

Creates a workspace owned by the authenticated user.

The workspace slug is generated from the workspace name.

## List Owned Workspaces

```http
GET /workspaces
```

Authentication Required

Returns the authenticated user's non-deleted workspaces, ordered by creation time.

## Get Workspace

```http
GET /workspaces/:slug
```

Authentication Required

Returns a workspace by slug.

- Public workspaces can be retrieved by authenticated non-owners.
- Private workspaces are accessible only to the owner in the current implementation.
- Soft-deleted workspaces are treated as not found.

Membership-based access control will be introduced with Workspace Membership.

## Update Workspace

```http
PATCH /workspaces/:slug
```

Authentication Required

Owner Only

Updates supported workspace metadata.

- Only the workspace owner can update the workspace.
- Archived workspaces cannot be updated.
- An empty update request is rejected.
- Soft-deleted workspaces are treated as not found.

## Archive Workspace

```http
PATCH /workspaces/:slug/archive
```

Authentication Required

Owner Only

Archives the workspace without deleting its record.

- Only the owner can archive the workspace.
- An already archived workspace cannot be archived again.
- Archived workspaces cannot be updated through the current API.

## Delete Workspace

```http
DELETE /workspaces/:slug
```

Authentication Required

Owner Only

Soft-deletes the workspace by setting `deletedAt`.

- The workspace record and data are preserved.
- Soft-deleted workspaces are excluded from normal retrieval and owner listings.
- A workspace that has already been soft-deleted cannot be deleted again.

Permanent deletion and restoration are not part of the current Workspace API foundation.

## Workspace API Limitations

The following capabilities are intentionally deferred:

- Workspace membership
- Member roles and permissions
- Invitations
- Ownership transfer
- Workspace/project authorization integration

These capabilities will be implemented in the corresponding later phases of Core Sprint 3.

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Validation Error / Business Rule Violation |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Validation Rules

All incoming requests are validated using `class-validator`.

Validation includes:

- Required fields
- Email format
- URL format
- String length
- Enum values
- Username uniqueness
- Email uniqueness

Invalid requests return structured validation errors.

---

# Response Principles

The API follows these conventions:

- Successful responses return the requested resource.
- Validation errors provide meaningful messages.
- Sensitive fields (such as password hashes) are never returned.
- Public endpoints expose only public developer information.

---

# Sprint 1 API Summary

| Module | Status |
|--------|--------|
| Authentication | ✅ |
| Users | ✅ |
| Profiles | ✅ |
| Developers | ✅ |
| Social Graph | ✅ |

---

# Planned Future APIs

These APIs are intentionally deferred to later sprints:

## Sprint 2

- Projects
- Project Members
- Tech Stack
- Tags
- Stars
- Forks

## Sprint 3

- Workspace foundation — implemented
- Workspace Membership
- Member roles and permissions
- Invitations
- Ownership transfer
- Workspace/project integration

## Sprint 4

- Discussions
- Comments
- Notifications
- Activity Feed

## Sprint 5

- Media Uploads
- Email
- Search
- AI Features
- Analytics