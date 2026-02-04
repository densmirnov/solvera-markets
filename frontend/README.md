# Frontend

## Purpose
This folder hosts the operator UI and public-facing pages for Solvera Markets. The UI is for observability and agent guidance, not end-user custody.

## Structure
- `src/` — UI sources (React + Vite).
- `src/pages` — Landing, Skill, Docs, API, and monitoring screens.
- `src/lib` — API client and formatting helpers.

## Key principles
- Agent-first system: UI is for observability only.
- Reads from backend API, never from RPC directly.
- Public pages mirror the site markdown sources (without hackathon mentions).

## Environment
- `VITE_API_BASE` (default `http://localhost:3000/api`).

## Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run lint:fix`
- `npm run test`
