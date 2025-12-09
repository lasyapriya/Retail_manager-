# Architecture Document

## Backend Architecture
Express server loads CSV into memory on startup. All filtering, sorting, and pagination done in a single service function for performance and clarity.

## Frontend Architecture
React functional components with useState/useEffect. Single source of truth in App.js. No Redux.

## Data Flow
Frontend → sends search + filters + sort + page → Backend processes → returns paginated data → Frontend renders.

## Folder Structure
- backend/: Express server + CSV loading
- frontend/src/components/: All UI components
- docs/: This document

## Module Responsibilities
- backend/index.js: Main server + all logic (intentionally simple & readable)
- frontend/App.js: Orchestrates state and components
