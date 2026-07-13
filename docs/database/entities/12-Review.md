# Review Entity

## Version

v1.0

---

# Purpose

The Review entity represents structured feedback provided by users on a project.

Reviews help developers improve their software by receiving constructive technical and design feedback from the community and teammates.

Unlike comments, reviews are intended to evaluate the overall quality of a project.

---

# Responsibilities

The Review entity is responsible for:

* Technical feedback
* Code quality evaluation
* UI/UX feedback
* Bug reporting
* Feature suggestions
* Project ratings

---

# Entity Overview

```text
Project
    │
    ▼
 Review
    │
    ├── Rating
    ├── Feedback
    ├── Strengths
    ├── Improvements
    └── Bug Reports
```

---

# Fields

| Field          | Type          | Required | Description                |
| -------------- | ------------- | -------- | -------------------------- |
| id             | String (CUID) | Yes      | Primary identifier         |
| projectId      | String        | Yes      | Reviewed project           |
| reviewerId     | String        | Yes      | User submitting the review |
| title          | String        | Yes      | Review title               |
| summary        | String        | Yes      | Overall review summary     |
| rating         | Decimal       | Yes      | Overall rating (0.5–5.0)   |
| codeQuality    | Int           | No       | Rating (1–5)               |
| uiUx           | Int           | No       | Rating (1–5)               |
| documentation  | Int           | No       | Rating (1–5)               |
| performance    | Int           | No       | Rating (1–5)               |
| security       | Int           | No       | Rating (1–5)               |
| recommendation | Enum          | Yes      | Recommendation level       |
| status         | Enum          | Yes      | Review status              |
| createdAt      | DateTime      | Yes      | Creation timestamp         |
| updatedAt      | DateTime      | Yes      | Last update                |
| deletedAt      | DateTime      | No       | Soft delete timestamp      |

---

# Enums

## Recommendation

```text
HIGHLY_RECOMMENDED

RECOMMENDED

NEEDS_IMPROVEMENT

NOT_RECOMMENDED
```

---

## ReviewStatus

```text
PUBLISHED

EDITED

HIDDEN

DELETED
```

---

# Relationships

## Belongs To

```text
Project
    │
    ▼
 Review
```

---

```text
User
   │
   ▼
Review
```

---

# Constraints

## Rating

* Minimum: 0.5
* Maximum: 5.0
* Step: 0.5

---

## Category Ratings

Each category score:

* Minimum: 1
* Maximum: 5

---

## Summary

* Required
* Markdown supported
* Maximum 20,000 characters

---

# Indexes

Create indexes for:

```text
projectId

reviewerId

rating

createdAt

status
```

---

# Business Rules

## One Review Per User

Each user may submit only one active review for a project.

Unique constraint:

```text
(projectId, reviewerId)
```

Users may edit their review later.

---

## Editing

Authors may update their reviews.

Updated reviews should display an "Edited" indicator.

---

## Deletion

Reviews use soft deletes.

Historical review data should remain available for moderation and analytics.

---

## Community Visibility

Only published reviews are visible to the public.

Hidden reviews remain accessible to moderators.

---

## Average Rating

Project ratings are calculated dynamically using all published reviews.

The average should not be stored directly in the Review entity.

---

# API Visibility

Public:

* Reviewer
* Rating
* Summary
* Recommendation
* Creation date

Private:

* Moderation metadata
* Deleted reviews

---

# Future Fields

Potential additions:

* Verified reviewer
* Helpful votes
* Developer response
* Review attachments
* AI review summary
* Review badges
* Review version history

---

# Example Record

```json
{
  "id": "clza_review01",
  "projectId": "clz9project01",
  "reviewerId": "clz6zslx90000k0k5m2axr0q8",
  "title": "Excellent Collaboration Platform",
  "summary": "The project has a clean architecture and strong potential. Documentation could be improved.",
  "rating": 4.5,
  "codeQuality": 5,
  "uiUx": 4,
  "documentation": 3,
  "performance": 5,
  "security": 4,
  "recommendation": "HIGHLY_RECOMMENDED",
  "status": "PUBLISHED"
}
```

---

# Design Decisions

* Reviews are structured evaluations, not discussions.
* Every review belongs to one project.
* Every review belongs to one reviewer.
* One user can publish only one active review per project.
* Average project ratings are calculated dynamically.
* Reviews support future AI analysis and moderation.

---

# Review Lifecycle

```text
Created
    │
    ▼
Published
    │
 ┌──┴─────────┐
 ▼            ▼
Edited     Hidden
    │
    ▼
Deleted
```

---

# Review Categories

Every review should encourage constructive feedback across multiple dimensions:

* Code Quality
* UI / UX
* Performance
* Documentation
* Security
* Overall Recommendation

This helps developers receive actionable insights instead of only a numerical score.

---

# Next Entity

```text
13-Notification.md
```

The Notification entity powers real-time alerts across XEEO. It informs users about mentions, invitations, project activity, reviews, comments, AI updates, and other important events, helping users stay connected without constantly checking every workspace.
