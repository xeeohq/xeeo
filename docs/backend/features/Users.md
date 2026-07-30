# Users Module

## Status

✅ Completed

**Sprint**

Core Sprint 1 — Identity & Social Foundation

---

# Overview

The Users module is responsible for developer identity, profile management, account management, and social relationships.

It manages:

- Current User
- Public Developer Profiles
- Profile Management
- Account Settings
- Social Graph

This module acts as the central domain for developer information.

---

# Features

## Current User

### Endpoint

```http
GET /users/me
```

### Responsibilities

- Return authenticated user
- Include profile information
- Include social information where applicable

---

## Profile Management

### Endpoint

```http
PATCH /users/me/profile
```

### Editable Fields

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

### Business Rules

- At least one field must be provided.
- Only supplied fields are updated.
- Avatar and Banner are managed as profile attributes.
- URL fields are validated before saving.

---

## Account Settings

### Endpoint

```http
PATCH /users/me
```

### Editable Fields

- username
- email

### Business Rules

- Username must be unique.
- Email must be unique.
- Empty update requests are rejected.
- Account information is managed separately from profile information.

---

## Public Developer Profile

### Endpoint

```http
GET /developers/:username
```

### Returns

- Public user information
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

Creates a follow relationship.

---

## Unfollow User

```http
DELETE /users/:username/follow
```

Removes a follow relationship.

---

## Followers

```http
GET /users/:username/followers
```

Returns users following the developer.

---

## Following

```http
GET /users/:username/following
```

Returns users the developer follows.

---

# Profile Model

The profile currently supports:

- Display Name
- Bio
- Avatar URL
- Banner URL
- Location
- Website
- Portfolio URL
- GitHub URL
- LinkedIn URL
- Twitter URL
- Experience Level
- Availability

These fields represent the developer's public profile.

---

# Account Model

Account information consists of:

- Username
- Email

Password management is handled by the Authentication module.

---

# Validation

The module validates:

- Username uniqueness
- Email uniqueness
- URL formats
- String lengths
- Enum values
- Required update fields

Invalid requests return appropriate validation errors.

---

# Module Structure

```text
users/
├── users.controller.ts
├── users.service.ts
├── users.module.ts
├── user.mapper.ts
│
├── dto/
│   ├── update-account.dto.ts
│   ├── update-profile.dto.ts
│   └── responses/
│
├── constants/
│   └── user.include.ts
```

---

# Dependencies

- Prisma
- Authentication Module

---

# Current Status

| Feature | Status |
|---------|--------|
| Current User | ✅ |
| Profile Retrieval | ✅ |
| Profile Update | ✅ |
| Account Update | ✅ |
| Public Developer Profile | ✅ |
| Follow User | ✅ |
| Unfollow User | ✅ |
| Followers | ✅ |
| Following | ✅ |

---

# Architectural Decisions

## Account vs Profile

Account information and profile information are intentionally separated.

**Account**

- username
- email

**Profile**

- displayName
- bio
- avatarUrl
- bannerUrl
- location
- website
- portfolio
- social links
- experience
- availability

This separation keeps authentication concerns independent from profile management.

---

## Avatar & Banner

Avatar and Banner are stored as profile attributes.

The API updates them using:

```http
PATCH /users/me/profile
```

Dedicated upload or media endpoints are intentionally deferred to later sprints when cloud storage is introduced.

---

# Future Enhancements

Planned for future sprints:

- Profile Completeness
- Username Availability
- Profile Suggestions
- Profile Preview Cards
- Search Integration
- Profile Verification
- Badges
- Achievements
- Media Upload Integration