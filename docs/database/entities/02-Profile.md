# Profile Entity

## Status

✅ Current

---

# Purpose

The Profile entity stores all public developer information.

It is intentionally separated from the User entity to keep authentication and profile management independent.

Every User owns exactly one Profile.

---

# Fields

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | References User |
| displayName | String | Public display name |
| bio | String? | Short developer introduction |
| avatarUrl | String? | Profile avatar URL |
| bannerUrl | String? | Profile banner URL |
| location | String? | Developer location |
| website | String? | Personal website |
| portfolioUrl | String? | Portfolio URL |
| githubUrl | String? | GitHub profile |
| linkedinUrl | String? | LinkedIn profile |
| twitterUrl | String? | Twitter/X profile |
| experienceLevel | Enum | Experience level |
| availability | Enum | Current availability |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

---

# Relationships

## User

```text
User
 ─────── 1 : 1 ─────── Profile
```

A Profile cannot exist without a User.

---

# Responsibilities

The Profile entity is responsible for:

- Public developer identity
- Personal information
- Social links
- Professional information
- Public media

The Profile entity is **not** responsible for:

- Authentication
- Username
- Email
- Password
- Account security

Those belong to the User entity.

---

# Business Rules

- Every User automatically receives a Profile during registration.
- Only the authenticated owner can update their Profile.
- Profile updates are performed through:

```http
PATCH /users/me/profile
```

- At least one field must be provided when updating.
- Only supplied fields are modified.
- URL fields are validated before persistence.

---

# Media

Sprint 1 stores only references to media.

Supported fields:

- avatarUrl
- bannerUrl

These fields store URLs only.

Image upload, storage, resizing, optimization, and CDN integration are intentionally deferred to later sprints.

---

# Social Links

Supported platforms:

- Personal Website
- Portfolio
- GitHub
- LinkedIn
- Twitter / X

Each field is optional.

---

# Professional Information

The profile includes:

- Experience Level
- Availability

These fields support future developer discovery and project matching.

---

# Architectural Decisions

## Account vs Profile

Authentication data and profile data are intentionally separated.

```text
User
├── username
├── email
└── passwordHash

Profile
├── displayName
├── bio
├── avatarUrl
├── bannerUrl
├── location
├── website
├── portfolioUrl
├── githubUrl
├── linkedinUrl
├── twitterUrl
├── experienceLevel
└── availability
```

This separation simplifies maintenance, improves security, and keeps responsibilities clear.

---

# Future Enhancements

Planned for future sprints:

- Media uploads
- Image cropping
- Image compression
- CDN integration
- Profile completeness
- Profile verification
- Badges
- AI profile suggestions