# User Entity

## Status

✅ Current

---

# Purpose

The User entity represents an authenticated developer account.

Authentication and account-level information are stored here.

Public profile information is intentionally stored in the Profile entity.

---

# Fields

| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| username | String | Unique username |
| email | String | Unique email address |
| passwordHash | String | Argon2 password hash |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

---

# Relationships

## Profile

A User owns exactly one Profile.

```text
User
 ─────── 1 : 1 ─────── Profile
```

---

## Followers

Users can follow other users.

```text
User
 ─────── N : N ─────── User
```

Implemented using the Follow table.

---

# Responsibilities

The User entity is responsible for:

- Authentication
- Account identity
- Username
- Email
- Password

It is **not** responsible for:

- Bio
- Avatar
- Banner
- Social links
- Location

Those belong to the Profile entity.

---

# Business Rules

- Username must be unique.
- Email must be unique.
- Passwords are stored only as Argon2 hashes.
- A Profile is created automatically when a User is registered.

---

# Related Modules

- Authentication
- Users
- Social Graph

---

# Future Extensions

Later sprints may add:

- Email verification
- Refresh tokens
- OAuth providers
- Two-factor authentication
- Account recovery