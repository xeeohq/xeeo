# XEEO Authentication Architecture

## Version

v1.0

---

# Purpose

This document defines the complete authentication and authorization architecture for XEEO.

It describes how users register, authenticate, maintain sessions, reset passwords, verify emails, use OAuth providers, and securely access protected resources.

This document serves as the blueprint for implementing the Authentication module in NestJS.

---

# Goals

The authentication system must be:

* Secure
* Fast
* Scalable
* Stateless
* OAuth-ready
* Mobile-ready
* WebSocket compatible

---

# Authentication Methods

Supported methods:

* Email + Password
* Google OAuth
* GitHub OAuth

Future:

* Passkeys (WebAuthn)
* Two-Factor Authentication (2FA)
* Enterprise SSO

---

# Authentication Flow

```text id="rkpn4h"
Register

↓

Verify Email

↓

Login

↓

Access Token

↓

Refresh Token

↓

Protected Resources
```

---

# Registration Flow

```text id="8m6j7a"
User

↓

Register Form

↓

Validation

↓

Hash Password

↓

Create User

↓

Create Profile

↓

Send Verification Email

↓

Registration Complete
```

---

# Email Verification Flow

```text id="o5uzgc"
User clicks verification link

↓

Verify token

↓

Mark emailVerified = true

↓

Allow login
```

Only verified accounts may access protected features.

---

# Login Flow

```text id="m7tfnt"
Email

+

Password

↓

Validation

↓

Verify Password

↓

Generate JWT

↓

Generate Refresh Token

↓

Return Tokens
```

---

# Token Strategy

## Access Token

Purpose:

Access protected APIs.

Lifetime:

15 minutes

Storage:

Memory (preferred) or secure cookie.

---

## Refresh Token

Purpose:

Generate new access tokens.

Lifetime:

30 days

Storage:

HttpOnly Secure Cookie.

Refresh tokens should never be accessible through JavaScript.

---

# JWT Payload

Example:

```json id="e5m6nh"
{
  "sub": "clz6zslx90000k0k5m2axr0q8",
  "username": "suraj",
  "role": "USER"
}
```

Do not include sensitive information such as email or password hashes.

---

# Password Policy

Minimum:

* 8 characters

Must contain:

* Uppercase letter
* Lowercase letter
* Number
* Special character

Passwords are hashed using:

Argon2id

---

# Password Reset Flow

```text id="2t7r5d"
Forgot Password

↓

Enter Email

↓

Generate Reset Token

↓

Email Link

↓

Choose New Password

↓

Hash Password

↓

Password Updated
```

Reset tokens:

* Single use
* Expire after 30 minutes

---

# Logout Flow

```text id="q2r49b"
User clicks logout

↓

Invalidate Refresh Token

↓

Delete Cookies

↓

Logout Complete
```

Access tokens naturally expire after their lifetime.

---

# OAuth

## Google

Flow:

```text id="53p2o1"
Google Login

↓

Google Consent

↓

Receive Profile

↓

Create User (if needed)

↓

Generate Tokens
```

---

## GitHub

Flow:

```text id="hfhh8h"
GitHub Login

↓

GitHub OAuth

↓

Receive Profile

↓

Create User (if needed)

↓

Generate Tokens
```

---

# Session Management

Sessions are stateless.

The backend does not maintain server-side user sessions.

Authentication is based on:

* JWT Access Token
* Refresh Token

---

# Authorization

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

Authorization uses RBAC.

Platform Roles:

* USER
* MODERATOR
* ADMIN
* SUPER_ADMIN

Workspace Roles:

* OWNER
* ADMIN
* MODERATOR
* MEMBER
* GUEST

Project Roles:

* OWNER
* MAINTAINER
* DEVELOPER
* TESTER
* DESIGNER
* VIEWER

---

# Protected Routes

Examples:

Public:

```text id="x03l0l"
/login

/register

/community

/projects/public
```

Protected:

```text id="9gz5g6"
/dashboard

/workspaces

/projects

/profile

/settings
```

Every protected request requires a valid Access Token.

---

# WebSocket Authentication

```text id="jxtc1i"
User

↓

Login

↓

JWT

↓

Open WebSocket

↓

Verify Token

↓

Join Workspace Rooms
```

Only authenticated users may establish WebSocket connections.

---

# Security Measures

* HTTPS only
* Argon2id password hashing
* JWT expiration
* Refresh token rotation
* HttpOnly cookies
* Secure cookies in production
* Rate limiting
* Brute-force protection
* Email verification
* Input validation
* CSRF protection where applicable
* Helmet security headers

---

# Authentication Module Structure

```text id="jlwmu2"
auth/

├── controllers/
├── services/
├── guards/
├── strategies/
├── decorators/
├── dto/
├── interfaces/
└── auth.module.ts
```

---

# API Endpoints

```text id="9d7mzt"
POST /auth/register

POST /auth/login

POST /auth/logout

POST /auth/refresh

POST /auth/forgot-password

POST /auth/reset-password

GET /auth/verify-email

GET /auth/google

GET /auth/github
```

---

# Error Responses

Example:

```json id="v3mxfe"
{
  "success": false,
  "message": "Invalid email or password.",
  "error": {
    "code": "INVALID_CREDENTIALS"
  }
}
```

---

# Success Response

```json id="1i7tv6"
{
  "success": true,
  "data": {
    "accessToken": "...",
    "user": {}
  }
}
```

---

# Future Enhancements

* Passkeys
* Two-Factor Authentication
* Enterprise SSO
* Session management dashboard
* Device management
* Login history
* Security alerts
* Trusted devices

---

# Authentication Lifecycle

```text id="4iqs3x"
Register
      │
      ▼
Verify Email
      │
      ▼
Login
      │
      ▼
Access Token
      │
      ▼
Protected APIs
      │
      ▼
Refresh Token
      │
      ▼
Logout
```

---

# Design Decisions

* JWT-based stateless authentication.
* Refresh tokens stored in HttpOnly cookies.
* Argon2id for password hashing.
* OAuth support from the beginning.
* Email verification required.
* Role-based authorization for platform, workspace, and project access.
* Authentication designed to work with both REST APIs and WebSockets.

---

# Next Document

```text id="4pxw9e"
docs/system/03-API-Design.md
```

This document defines API conventions, versioning, endpoint structure, request/response formats, pagination, filtering, error handling, and REST principles that every XEEO service will follow.
