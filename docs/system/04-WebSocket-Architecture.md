# XEEO WebSocket Architecture

## Version

v1.0

---

# Purpose

This document defines the real-time communication architecture for XEEO.

It describes how WebSocket connections are established, authenticated, managed, and used to provide instant collaboration across workspaces, projects, and the community.

---

# Goals

The real-time system should be:

* Fast
* Reliable
* Secure
* Scalable
* Event-driven
* Fault tolerant

---

# Technology

Socket.IO

Why?

* Automatic reconnection
* Room support
* Event-based communication
* Cross-browser compatibility

---

# High-Level Architecture

```text id="71ovcv"
Browser

↓

Socket.IO Client

↓

NestJS WebSocket Gateway

↓

Authentication

↓

Business Logic

↓

Database
```

---

# Connection Flow

```text id="oj4kjn"
User Login

↓

Receive Access Token

↓

Connect Socket

↓

Authenticate Token

↓

Connection Accepted

↓

Join Rooms
```

---

# Room Architecture

Users automatically join several rooms.

```text id="jlwmg4"
User Room

Workspace Rooms

Project Rooms

Channel Rooms
```

Example

```text id="gqyw7o"
user:clz123

workspace:workspace01

project:project01

channel:general
```

This allows events to be sent only to relevant users.

---

# Event Naming Convention

Use lowercase with namespaces.

Examples:

```text id="n1vlf8"
chat:send

chat:message

chat:edit

chat:delete

workspace:join

workspace:leave

project:update

notification:new

typing:start

typing:stop

presence:update
```

---

# Client → Server Events

```text id="g7w7wo"
chat:send

typing:start

typing:stop

workspace:join

workspace:leave

project:join

project:leave
```

---

# Server → Client Events

```text id="n5ezq4"
chat:new

chat:edited

chat:deleted

notification:new

presence:update

project:updated

workspace:updated
```

---

# Authentication

Every socket connection requires a valid JWT.

Flow:

```text id="lh4lgt"
Socket Connect

↓

Verify JWT

↓

Load User

↓

Accept Connection

↓

Join Rooms
```

Invalid tokens result in immediate disconnection.

---

# Message Flow

```text id="8iz8n5"
User

↓

chat:send

↓

Gateway

↓

Validation

↓

Database

↓

Broadcast

↓

Connected Clients
```

---

# Presence System

User status:

```text id="dffopk"
ONLINE

AWAY

DO_NOT_DISTURB

OFFLINE
```

Presence updates are broadcast to relevant workspaces.

---

# Typing Indicators

Flow:

```text id="h5dgoa"
typing:start

↓

Broadcast

↓

typing:stop
```

Typing indicators are temporary and are never stored in the database.

---

# Notifications

Notifications are delivered instantly.

Examples:

* New message
* Mention
* Project invite
* Review received
* Comment added
* AI response ready

If the user is offline, the notification remains in the database and is delivered on the next connection.

---

# Reconnection

Socket.IO automatically reconnects.

After reconnecting:

* Verify JWT again.
* Restore room memberships.
* Resume real-time events.

---

# Error Handling

Possible socket errors:

```text id="k1lsiw"
INVALID_TOKEN

UNAUTHORIZED

ROOM_NOT_FOUND

MESSAGE_TOO_LARGE

RATE_LIMIT_EXCEEDED

INTERNAL_ERROR
```

Errors should be emitted as structured events.

---

# Security

* JWT authentication required
* Rate limiting
* Input validation
* Maximum message size
* Permission checks
* Event authorization

---

# Future Scalability

Current MVP

```text id="nqarfm"
Client

↓

NestJS Gateway
```

Future

```text id="lrjlwm"
Client

↓

Load Balancer

↓

Gateway 1

Gateway 2

↓

Redis Adapter

↓

Database
```

Redis enables WebSocket scaling across multiple servers.

---

# Logging

Log:

* Connections
* Disconnections
* Failed authentication
* Message events
* Errors
* Reconnection attempts

Avoid logging sensitive content.

---

# Design Decisions

* Socket.IO is the real-time transport.
* JWT secures every connection.
* Rooms organize communication efficiently.
* Events follow consistent naming conventions.
* WebSockets complement REST APIs rather than replace them.

---

# Event Lifecycle

```text id="klh68r"
Client Event

↓

Gateway

↓

Validation

↓

Service

↓

Database

↓

Broadcast

↓

Connected Clients
```

---

# Future Features

* Voice channels
* Screen sharing
* Collaborative editing
* Live cursors
* Video calls
* Shared terminals
* AI live collaboration
* Presence synchronization

---

# Summary

XEEO uses Socket.IO to provide secure, scalable, real-time communication. Authentication is JWT-based, users are organized into rooms, and all events follow a consistent naming convention. The architecture is designed to support the MVP while remaining ready for horizontal scaling using Redis in future releases.
