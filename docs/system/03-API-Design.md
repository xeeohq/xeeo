# API Design

## Status

✅ Updated after Core Sprint 1

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

- Workspaces
- Invitations
- Permissions

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