# XEEO Information Architecture

## Version

v1.0

---

# Purpose

Information Architecture (IA) defines how content, features, and data are organized inside XEEO.

The goal is to help users find what they need quickly with minimal cognitive effort.

---

# Core Information Hierarchy

```text
Platform
│
├── Personal
│   ├── Dashboard
│   ├── Profile
│   ├── Notifications
│   ├── Search
│   └── Settings
│
├── Team
│   ├── Workspace
│   │   ├── Channels
│   │   ├── Members
│   │   ├── Projects
│   │   └── Activity
│   │
│   └── Project
│       ├── Overview
│       ├── Reviews
│       ├── AI
│       ├── Members
│       └── Activity
│
└── Community
    ├── Feed
    ├── Categories
    ├── Trending
    ├── Posts
    └── Profiles
```

---

# User Areas

## Personal Space

Everything related to the individual user.

Contains:

* Dashboard
* Notifications
* Profile
* Account
* Search
* Preferences

---

## Workspace Space

Everything related to team collaboration.

Contains:

* Channels
* Projects
* Members
* Activity
* Workspace Settings

---

## Project Space

Every software project has its own workspace.

Contains:

* Overview
* Team
* AI
* Reviews
* Files (Future)
* Documentation (Future)

---

## Community Space

Public area for discovering developers and projects.

Contains:

* Trending
* Latest Projects
* Reviews
* Developer Profiles
* Categories

---

# Navigation Rules

* Dashboard is always Home.
* Projects always belong to a Workspace.
* Users may belong to multiple Workspaces.
* Community exists outside Workspaces.
* AI should be accessible from every major screen.

---

# Search Structure

Global Search includes:

* Users
* Workspaces
* Projects
* Posts
* Channels
* Messages

Results should be grouped by category.

---

# Permissions

Guest

↓

Member

↓

Moderator

↓

Admin

↓

Owner

Each role inherits permissions from the previous one.

---

# Content Relationships

```text
User
│
├── Workspaces
│
├── Projects
│
├── Posts
│
└── Reviews
```

```text
Workspace
│
├── Members
├── Channels
├── Projects
└── Activity
```

```text
Project
│
├── Members
├── Reviews
├── AI
└── Activity
```

---

# Design Principles

* Three-click rule for important actions.
* Consistent sidebar navigation.
* Keep active work more visible than settings.
* Minimize context switching.
* Maintain a predictable layout throughout the application.
