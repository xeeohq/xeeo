# Authentication Module

## Status

✅ Completed

**Sprint**

Core Sprint 1 — Identity & Social Foundation

---

# Overview

The Authentication module is responsible for user identity and secure access to the XEEO platform.

It provides:

- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Route Protection
- Password Change

Authentication is implemented using **JWT (JSON Web Tokens)** and **Argon2** for password hashing.

---

# Features

## Registration

**Endpoint**

```http
POST /auth/register
```

### Responsibilities

- Create a new user account
- Validate request data
- Ensure username is unique
- Ensure email is unique
- Hash password using Argon2
- Create default profile
- Return authenticated user

---

## Login

**Endpoint**

```http
POST /auth/login
```

### Responsibilities

- Authenticate using email
- Verify password
- Generate JWT access token
- Return authenticated user

---

## Current User Authentication

Protected routes require a valid JWT.

Example:

```http
Authorization: Bearer <access_token>
```

---

## Change Password

**Endpoint**

```http
PATCH /auth/change-password
```

### Requirements

User must already be authenticated.

### Validation

- Current password is required.
- New password must satisfy validation rules.

### Business Rules

- Verify current password.
- Reject incorrect current password.
- Hash the new password using Argon2.
- Replace the stored password hash.
- Old password immediately becomes invalid.

---

# Security

## Password Hashing

Passwords are never stored in plain text.

Algorithm:

- Argon2

---

## JWT

Authentication uses JWT access tokens.

Protected endpoints require:

```http
Authorization: Bearer <token>
```

---

## Guards

The application uses:

- JwtAuthGuard

Public endpoints explicitly use:

- Public Decorator

Authenticated user information is injected using:

- CurrentUser Decorator

---

# Validation

## Registration

- Valid email
- Username length validation
- Password minimum length
- Required fields

---

## Login

- Valid email
- Password required

---

## Password Change

- Current password required
- New password minimum length
- Incorrect current password returns an error

---

# Error Handling

Examples include:

- Email already registered
- Username already taken
- Invalid credentials
- Unauthorized request
- Current password is incorrect
- Validation errors

---

# Module Structure

```text
auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
├── auth.mapper.ts
│
├── dto/
│   ├── register.dto.ts
│   ├── login.dto.ts
│   └── change-password.dto.ts
│
├── decorators/
│   ├── current-user.decorator.ts
│   └── public.decorator.ts
│
├── guards/
│   └── jwt-auth.guard.ts
│
├── strategies/
│   └── jwt.strategy.ts
```

---

# Dependencies

- Prisma
- Users Module
- JWT
- Passport
- Argon2
- Config Module

---

# Current Status

| Feature | Status |
|---------|--------|
| Registration | ✅ |
| Login | ✅ |
| JWT Authentication | ✅ |
| Password Hashing | ✅ |
| Route Protection | ✅ |
| CurrentUser Decorator | ✅ |
| Public Decorator | ✅ |
| Password Change | ✅ |

---

# Future Enhancements

Planned for later sprints:

- Refresh Tokens
- Email Verification
- Password Reset via Email
- Two-Factor Authentication (2FA)
- Session Management
- OAuth (GitHub, Google)
- Login History
- Device Management