# XEEO API Design

## Version

v1.0

---

# Purpose

This document defines the REST API architecture for XEEO.

It establishes standards for endpoint naming, request/response formats, authentication, versioning, pagination, filtering, sorting, validation, and error handling.

Every API endpoint in XEEO must follow these guidelines.

---

---

# Implementation Status

This document defines the API standards and conventions for XEEO.

The following section tracks the implementation progress of the REST API while ensuring future endpoints continue following the standards defined in this document.

---

# API Implementation Progress

## Sprint 1 — Backend Foundation

### Authentication APIs

| Endpoint | Method | Status |
|----------|--------|--------|
| `/auth/register` | POST | ✅ Implemented |
| `/auth/login` | POST | ✅ Implemented |
| `/auth/logout` | POST | ✅ Implemented |
| `/auth/refresh` | POST | ⬜ Planned |
| `/auth/forgot-password` | POST | ⬜ Planned |
| `/auth/reset-password` | POST | ⬜ Planned |
| `/auth/verify-email` | GET | ⬜ Planned |
| `/auth/google` | GET | ⬜ Planned |
| `/auth/github` | GET | ⬜ Planned |

---

### User APIs

| Endpoint | Method | Status |
|----------|--------|--------|
| `/users/me` | GET | ✅ Implemented |
| `/users/me` | PATCH | ✅ Implemented |
| `/users/:id` | GET | ⬜ Planned |
| `/users/:username` | GET | ⬜ Planned |
| `/users` | GET | ⬜ Planned |

---

### Profile APIs

| Endpoint | Method | Status |
|----------|--------|--------|
| Public Profile | ⬜ Planned |
| Profile Search | ⬜ Planned |

---

# Sprint 2 Planned APIs

The following APIs are expected to be implemented during Sprint 2.

## Social Graph

| Endpoint | Method | Status |
|----------|--------|--------|
| `/users/:username/follow` | POST | ⬜ Planned |
| `/users/:username/follow` | DELETE | ⬜ Planned |
| `/users/:username/followers` | GET | ⬜ Planned |
| `/users/:username/following` | GET | ⬜ Planned |

---

# Upcoming Modules

## Sprint 3

Community

- Community Posts
- Comments
- Likes
- Bookmarks

Status

⬜ Planned

---

## Sprint 4

Workspaces

Status

⬜ Planned

---

## Sprint 5

Channels

Status

⬜ Planned

---

## Sprint 6

Projects

Status

⬜ Planned

---

## Sprint 7

Notifications

Status

⬜ Planned

---

## Sprint 8

AI

Status

⬜ Planned

---

# API Progress

```text
████████████████░░░░░░░░░░░░░░░░░░░░░░░ 40%
```

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Authorization | ✅ |
| Users | ✅ |
| Profiles | 🟡 |
| Social Graph | ⬜ |
| Community | ⬜ |
| Workspaces | ⬜ |
| Channels | ⬜ |
| Projects | ⬜ |
| Notifications | ⬜ |
| AI | ⬜ |

---

# Documentation Policy

This document serves two purposes:

1. Define the REST API standards for XEEO.
2. Track the implementation status of every API module.

The API standards described in this document remain stable throughout Version 1.0.

After every completed sprint, only the following sections should be updated:

- API Implementation Progress
- Planned APIs
- API Progress

All other architectural guidelines should remain unchanged unless the API architecture itself changes.

---

# Design Principles

The API should be:

* RESTful
* Consistent
* Predictable
* Secure
* Versioned
* Easy to document
* Easy to consume

---

# Base URL

Development

```text id="r4udc2"
http://localhost:3001/api/v1
```

Production

```text id="rzmb3x"
https://api.xeeo.app/api/v1
```

---

# Versioning

Every endpoint begins with:

```text id="y0q7y9"
/api/v1
```

Future versions:

```text id="ebvjlwm"
/api/v2
```

Breaking changes should only be introduced in a new API version.

---

# Resource Naming

Use plural nouns.

Correct:

```text id="ewbwtb"
/users

/workspaces

/projects

/messages

/comments
```

Incorrect:

```text id="mdqprr"
/getUsers

/createProject

/updateProfile
```

Use HTTP methods instead.

---

# HTTP Methods

| Method | Purpose               |
| ------ | --------------------- |
| GET    | Retrieve data         |
| POST   | Create data           |
| PUT    | Replace data          |
| PATCH  | Partially update data |
| DELETE | Remove data           |

---

# Standard Response Format

Success:

```json id="dhd1el"
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully."
}
```

---

Failure:

```json id="d1pjjo"
{
  "success": false,
  "message": "Validation failed.",
  "error": {
    "code": "VALIDATION_ERROR"
  }
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# Authentication

Protected endpoints require:

```http id="rjlwmr"
Authorization: Bearer <access_token>
```

Public endpoints:

* Register
* Login
* Community feed
* Public profiles
* Public projects

---

# Pagination

Request:

```http id="z1dr4l"
GET /projects?page=1&limit=20
```

Response:

```json id="24qj9q"
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 248,
    "totalPages": 13
  }
}
```

---

# Filtering

Example:

```http id="ggqvva"
GET /projects?status=ACTIVE
```

Multiple filters:

```http id="v0kh6w"
GET /projects?status=ACTIVE&visibility=PUBLIC
```

---

# Sorting

Ascending:

```http id="v5dk5m"
?sort=createdAt
```

Descending:

```http id="9wh3p2"
?sort=-createdAt
```

---

# Searching

Example:

```http id="beybpd"
GET /projects?search=chat
```

---

# Field Selection (Future)

```http id="77rt4s"
GET /users?fields=id,username
```

---

# Validation

All request bodies must be validated.

Example rules:

* Required fields
* String length
* Enum values
* Email format
* URL format
* Numeric ranges

Validation failures return:

```http id="8b7a4g"
422 Unprocessable Entity
```

---

# Error Codes

Examples:

```text id="9zbm1r"
VALIDATION_ERROR

INVALID_CREDENTIALS

TOKEN_EXPIRED

NOT_FOUND

ACCESS_DENIED

WORKSPACE_NOT_FOUND

PROJECT_NOT_FOUND
```

Application-specific error codes should be consistent.

---

# Rate Limiting

Authentication endpoints:

```text id="d8b0hd"
5 requests / minute
```

General API:

```text id="h08z6s"
100 requests / minute
```

Values may change based on deployment requirements.

---

# Idempotency

* GET must never modify data.
* DELETE should be idempotent.
* PUT should fully replace a resource.
* PATCH updates only specified fields.

---

# Endpoint Structure

## Authentication

```text id="c50lp4"
/auth/register

/auth/login

/auth/logout

/auth/refresh
```

---

## Users

```text id="r18t8q"
/users

/users/:id

/users/me
```

---

## Profiles

```text id="djlwmc"
/profiles/:username
```

---

## Workspaces

```text id="0lkm2d"
/workspaces

/workspaces/:id
```

---

## Channels

```text id="ofjgfi"
/channels

/channels/:id/messages
```

---

## Projects

```text id="zx10js"
/projects

/projects/:id
```

---

## Community

```text id="c4r5qo"
/community/posts

/community/posts/:id
```

---

## Reviews

```text id="wsbvj8"
/reviews

/reviews/:id
```

---

## AI

```text id="63y2ih"
/ai/conversations

/ai/messages
```

---

# API Documentation

Swagger/OpenAPI will be generated automatically from NestJS decorators.

The API documentation should always reflect the current implementation.

---

# Security

Every request should include:

* Authentication
* Authorization
* Validation
* Rate limiting
* Logging

Sensitive data must never be exposed.

---

# Logging

Log:

* Request ID
* User ID (if authenticated)
* Endpoint
* Response status
* Response time

Avoid logging passwords, tokens, or other sensitive data.

---

# Design Decisions

* REST-first architecture.
* Versioned API.
* Consistent response format.
* Plural resource names.
* JWT authentication.
* Validation before business logic.
* Automatic Swagger documentation.

---

# API Lifecycle

```text id="w9gdvf"
Request
    │
    ▼
Validation
    │
    ▼
Authentication
    │
    ▼
Authorization
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Prisma
    │
    ▼
Database
    │
    ▼
Response
```

---

# Future Enhancements

* GraphQL gateway
* API caching
* API analytics
* Webhooks
* Batch requests
* API keys
* Public developer API

---

# Summary

The XEEO API follows REST principles with a consistent structure, standardized responses, JWT-based authentication, automatic documentation, and strong validation. These conventions ensure every module behaves predictably and remains easy to maintain as the platform grows.

---

# Next Document

```text id="2hm7kx"
docs/system/04-WebSocket-Architecture.md
```

This document defines the real-time communication layer for XEEO, including Socket.IO architecture, event naming conventions, room management, presence tracking, typing indicators, and notification delivery.
