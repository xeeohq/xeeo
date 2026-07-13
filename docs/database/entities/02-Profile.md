# Profile Entity

## Version

v1.0

---

# Purpose

The Profile entity stores a user's public information and developer identity.

Separating profile data from the User entity keeps authentication secure while allowing profile information to evolve independently.

Each user has exactly one profile.

---

# Responsibilities

The Profile entity is responsible for:

* Public identity
* Avatar
* Bio
* Skills
* Portfolio
* Social links
* Developer preferences

Authentication and security information remain in the User entity.

---

# Entity Overview

```text
User
  │
  └──────► Profile
            │
            ├── Avatar
            ├── Bio
            ├── Skills
            ├── Portfolio
            └── Social Links
```

---

# Fields

| Field           | Type          | Required | Description              |
| --------------- | ------------- | -------- | ------------------------ |
| id              | String (CUID) | Yes      | Primary identifier       |
| userId          | String        | Yes      | Reference to User        |
| displayName     | String        | Yes      | Public display name      |
| avatarUrl       | String        | No       | Profile picture URL      |
| bannerUrl       | String        | No       | Profile banner           |
| bio             | String        | No       | Short introduction       |
| location        | String        | No       | City/Country             |
| website         | String        | No       | Personal website         |
| portfolioUrl    | String        | No       | Portfolio link           |
| githubUsername  | String        | No       | GitHub username          |
| linkedinUrl     | String        | No       | LinkedIn profile         |
| twitterUrl      | String        | No       | X/Twitter profile        |
| skills          | JSON          | No       | List of technical skills |
| experienceLevel | Enum          | Yes      | Developer experience     |
| availability    | Enum          | Yes      | Collaboration status     |
| createdAt       | DateTime      | Yes      | Record creation          |
| updatedAt       | DateTime      | Yes      | Last update              |

---

# Enums

## ExperienceLevel

```text
BEGINNER

INTERMEDIATE

ADVANCED

PROFESSIONAL
```

---

## Availability

```text
AVAILABLE

BUSY

LOOKING_FOR_TEAM

NOT_AVAILABLE
```

---

# Relationships

## One-to-One

```text
User
    │
    ▼
Profile
```

Every user owns exactly one profile.

Every profile belongs to exactly one user.

---

# Constraints

## displayName

* Required
* 2–50 characters

---

## bio

* Maximum 500 characters

---

## avatarUrl

Must be a valid URL.

Supported formats:

* JPG
* PNG
* WebP
* SVG

---

## website

Must be a valid HTTPS URL.

---

## githubUsername

Store only the username.

Example:

```text
suraj-86
```

Not:

```text
https://github.com/suraj-86
```

---

# Indexes

Create indexes for:

```text
userId

displayName

githubUsername
```

---

# Business Rules

## Profile Creation

A profile is automatically created when a new user registers.

---

## Avatar

If no avatar is uploaded, use the default XEEO avatar.

---

## Skills

Users may select multiple skills.

Examples:

* JavaScript
* TypeScript
* Python
* Java
* C++
* React
* Next.js
* Node.js
* Docker
* PostgreSQL
* Machine Learning

The list should remain configurable as new technologies emerge.

---

## Portfolio

Users can add multiple projects through XEEO, but only one external portfolio URL.

---

## Privacy

Public profile information is visible according to the user's privacy settings.

Private account information (email, password, security data) must never appear in the Profile entity.

---

# API Visibility

## Public

* displayName
* avatarUrl
* bio
* location
* website
* portfolioUrl
* githubUsername
* linkedinUrl
* twitterUrl
* skills
* experienceLevel
* availability

---

## Private

No authentication or security fields belong here.

---

# Future Fields

Potential additions:

* Cover image
* Resume URL
* Badges
* Certifications
* Languages
* Timezone
* Preferred programming languages
* Open-source contribution statistics
* Reputation score
* Achievement system

---

# Example Record

```json
{
  "id": "clz7abc123",
  "userId": "clz6zslx90000k0k5m2axr0q8",
  "displayName": "Suraj Kumar",
  "avatarUrl": "https://cdn.xeeo.dev/avatar.png",
  "bio": "Full-stack developer passionate about building developer tools.",
  "location": "India",
  "website": "https://suraj.dev",
  "portfolioUrl": "https://portfolio.dev",
  "githubUsername": "suraj-86",
  "skills": [
    "TypeScript",
    "Next.js",
    "NestJS",
    "PostgreSQL"
  ],
  "experienceLevel": "INTERMEDIATE",
  "availability": "LOOKING_FOR_TEAM"
}
```

---

# Design Decisions

* One Profile per User.
* Store only public developer information.
* Keep authentication completely separate.
* Allow the profile to grow without affecting the User entity.
* Support future developer reputation and achievements.

---

# Next Entity

```text
03-Workspace.md
```

The Workspace entity is the heart of collaboration in XEEO. It represents a team's shared environment where members communicate, organize projects, and build software together.
