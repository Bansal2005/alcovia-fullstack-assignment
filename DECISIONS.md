# DECISIONS.md

## Overview

The goal of this project was to build an offline-first student productivity application that can continue functioning without internet connectivity and synchronize data once the connection is restored.

The solution focuses on simplicity, reliability, and easy demonstration.

---

# Data Model

## Focus Sessions

Each session stores:

* id
* status (completed / failed)
* reason (give_up / completed)
* coins
* streak
* synced

Example:

```json
{
  "id": "12345",
  "status": "completed",
  "coins": 50,
  "streak": 1,
  "synced": false
}
```

---

## Syllabus

Hierarchy:

Subject

→ Chapters

→ Tasks

Each task contains:

* id
* name
* status

Status Flow:

Not Started

↓

In Progress

↓

Done

---

# Offline First Design

All user actions happen instantly.

No internet connection is required.

Data is first stored locally using LocalStorage and later synchronized with the backend.

This approach ensures a smooth user experience.

---

# Sync Model

1. User performs actions offline.

2. Data is saved locally.

3. User reconnects.

4. Sync API sends local data to backend.

5. Backend stores synchronized state.

---

# Conflict Resolution

A simple and predictable strategy was selected.

## Task Updates

If the same task is modified multiple times, the latest synchronized version is accepted.

## Duplicate Sessions

Each focus session has a unique ID.

If the backend already contains that ID, duplicate rewards are ignored.

---

# Idempotency

The project avoids duplicate processing.

Focus rewards are granted only once for a session.

Repeated sync requests do not create additional rewards.

This prevents duplicate coins and streak increments.

---

# Backend Design

Express.js was selected because it is lightweight and easy to extend.

A JSON file is used as the database to keep the project simple and portable.

---

# Storage Choice

LocalStorage was chosen because:

* Works offline
* No external database required
* Easy to demonstrate
* Fast implementation

---

# Tradeoffs

## Advantages

* Simple architecture
* Easy to understand
* Offline support
* Fast synchronization

## Limitations

* JSON storage is not suitable for production.
* Full multi-device synchronization can be improved.
* n8n automation can be extended further.

---

# Future Improvements

* Database integration
* Better conflict resolution algorithms
* Real-time synchronization
* Push notifications
* Full production-ready n8n workflows

---

# Why This Design

The primary objective was reliability over complexity.

A clean and understandable offline-first architecture was preferred instead of a highly complex synchronization mechanism.

This design ensures that users can continue working even without internet connectivity while keeping the implementation maintainable.
