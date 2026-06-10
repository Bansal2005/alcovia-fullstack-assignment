# Alcovia Full Stack Engineering Intern Assignment

## Project Overview

This project implements an offline-first student productivity application.

The application contains two core features:

1. Focus Sessions
2. Syllabus Progress Tracking

The project is designed to work without an internet connection and synchronize data with the backend when connectivity is restored.

---

## Tech Stack

### Frontend

* React
* JavaScript
* LocalStorage

### Backend

* Node.js
* Express.js

### Storage

* LocalStorage
* JSON Database (db.json)

---

## Features

### Focus Sessions

* Start a focus session
* Give up a session
* Track coins
* Track streak
* Store sessions offline
* Sync with backend

### Syllabus Progress

* Subjects
* Chapters
* Tasks
* Task status updates
* Chapter progress
* Subject progress
* Offline storage

### Offline First

* Works without internet
* Data stored locally
* Syncs when online

---

## Project Structure

frontend/

backend/

backend/data/db.json

README.md

DECISIONS.md

---

## Running the Project

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

http://localhost:5000

Frontend runs on:

http://localhost:5173

---

## API Endpoints

GET /api/state

Returns current backend state.

POST /api/sync

Synchronizes offline data with the backend.

---

## Conflict Handling

* Duplicate sessions are ignored.
* Local changes are preserved.
* Backend acts as synchronization point.

---

## Future Improvements

* Full n8n integration
* Multi-device synchronization
* Real-time updates
* Notification services
* Cloud database support
