# Authentication Architecture

## Status

✅ Implemented

---

# Overview

XEEO uses **JWT (JSON Web Tokens)** for stateless authentication.

Passwords are securely hashed using **Argon2** before being stored in the database.

Authentication is centralized within the Authentication module and integrated with the Users module.

---

# Authentication Flow

```text
Client
    │
    │ Register / Login
    ▼
Authentication Controller
    │
    ▼
Authentication Service
    │
    ├── Validate Request
    ├── Check Existing User
    ├── Hash / Verify Password
    └── Generate JWT
    │
    ▼
Database
    │
    ▼
JWT Access Token
    │
    ▼
Client Stores Token
```

---

# Request Lifecycle

For protected endpoints:

```text
Client
    │
    │ Authorization: Bearer <token>
    ▼
JwtAuthGuard
    │
    ▼
JWT Strategy
    │
    ▼
Validate Token
    │
    ▼
Load User
    │
    ▼
CurrentUser Decorator
    │
    ▼
Controller
    │
    ▼
Service
```

---

# Components

## Authentication Controller

Responsibilities:

- Register
- Login
- Change Password

Controllers remain thin and delegate business logic to services.

---

## Authentication Service

Responsible for:

- User registration
- Login
- Password hashing
- Password verification
- JWT generation
- Password changes

---

## JWT Strategy

Responsibilities:

- Validate JWT access tokens
- Extract authenticated user information
- Reject invalid or expired tokens

---

## JwtAuthGuard

Protects authenticated endpoints.

Requests without a valid JWT are rejected.

---

## CurrentUser Decorator

Injects the authenticated user into controller methods.

Example:

```ts
@CurrentUser() user
```

This avoids manually extracting the user from the request object.

---

## Public Decorator

Marks endpoints that do not require authentication.

Examples:

- Register
- Login
- Public Developer Profile

---

# Password Security

Passwords are never stored in plain text.

Algorithm:

- Argon2

Workflow:

```text
Password
    │
    ▼
Argon2 Hash
    │
    ▼
Database
```

During login:

```text
Password
    │
    ▼
Argon2 Verify
    │
    ▼
Authenticated
```

---

# JWT

The system uses JWT access tokens.

Protected requests include:

```http
Authorization: Bearer <access_token>
```

The JWT identifies the authenticated user and is validated before the request reaches the controller.

---

# Authentication Endpoints

| Method | Endpoint | Authentication |
|---------|----------|----------------|
| POST | /auth/register | Public |
| POST | /auth/login | Public |
| PATCH | /auth/change-password | Required |

---

# Protected User Endpoints

| Method | Endpoint |
|---------|----------|
| GET | /users/me |
| PATCH | /users/me |
| PATCH | /users/me/profile |
| POST | /users/:username/follow |
| DELETE | /users/:username/follow |

---

# Security Principles

- Passwords are hashed using Argon2.
- JWT protects authenticated endpoints.
- Controllers do not contain business logic.
- Sensitive fields (password hashes) are never exposed in API responses.
- Account information and profile information are separated into distinct domains.

---

# Module Relationships

```text
Authentication
        │
        ▼
      Users
        │
        ▼
     Profile
        │
        ▼
 Social Graph
```

Authentication provides identity and access control for the rest of the system.

---

# Future Enhancements

Planned for later sprints:

- Refresh Tokens
- Email Verification
- Password Reset
- OAuth (GitHub / Google)
- Two-Factor Authentication (2FA)
- Session Management
- Device Management
- Login History