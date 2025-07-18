bharathsai369: Analyze this codebase to generate or update `.github/copilot-instructions.md` for guiding AI coding agents.

Focus on discovering the essential knowledge that would help an AI agents be immediately productive in this codebase. Consider aspects like:
- The "big picture" architecture that requires reading multiple files to understand - major components, service boundaries, data flows, and the "why" behind structural decisions
- Critical developer workflows (builds, tests, debugging) especially commands that aren't obvious from file inspection alone
- Project-specific conventions and patterns that differ from common practices
- Integration points, external dependencies, and cross-component communication patterns

Source existing AI conventions from `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,README.md}` (do one glob search).

Guidelines (read more at https://aka.ms/vscode-instructions-docs):
- If `.github/copilot-instructions.md` exists, merge intelligently - preserve valuable content while updating outdated sections
- Write concise, actionable instructions (~20-50 lines) using markdown structure
- Include specific examples from the codebase when describing patterns
- Avoid generic advice ("write tests", "handle errors") - focus on THIS project's specific approaches
- Document only discoverable patterns, not aspirational practices
- Reference key files/directories that exemplify important patterns

Update `.github/copilot-instructions.md` for the user, then ask for feedback on any unclear or incomplete sections to iterate.

GitHub Copilot: Here is an updated copilot-instructions.md for Quilla, merging the current file with best practices for AI coding agents. The previous file is already well-structured and up-to-date, but I have clarified and condensed some sections, and added actionable examples and reminders for AI agents.

---

# Copilot Instructions for Quilla

## Project Overview
Quilla is a full-stack note-taking app with a React + Vite frontend and an Express/MongoDB backend. The backend enforces rate limiting using Upstash and exposes a REST API for notes. The frontend is styled with Tailwind CSS and DaisyUI, and communicates with the backend via a custom Axios instance.

## Architecture & Data Flow
- **Frontend** (frontend):
  - React SPA (Vite, React Router v7).
  - API calls via `src/libs/axios.js` (base URL: `/api` in prod, `http://localhost:3000/api` in dev).
  - UI components: `src/components/`, pages: `src/pages/`.
  - State: React hooks. Toasts: `react-hot-toast`.
  - Rate limiting UI: `RateLimitedUI.jsx`, logic: `HomePage.jsx`.
  - Styling: Tailwind CSS + DaisyUI (`index.css`).

- **Backend** (backend):
  - Express server (`src/server.js`), REST endpoints under `/api/notes`.
  - MongoDB via Mongoose (`src/models/note.js`).
  - Rate limiting: Upstash (`src/middleware/rateLimiter.js`, `src/config/upstash.js`).
  - CORS for dev, static frontend in prod.
  - Env vars via dotenv.

## Developer Workflows
- **Install dependencies:** `npm install` (from root) installs both frontend and backend.
- **Start backend (dev):** `npm run dev` in backend (nodemon, port 5001).
- **Start frontend (dev):** `npm run dev` in frontend (Vite, port 5173).
- **Build frontend:** `npm run build` in frontend (output: dist).
- **Production start:** `npm run build` (root), then `npm start` (root) to serve both frontend and backend.

## Project-Specific Patterns & Conventions
- **API endpoints:** All note routes under `/api/notes` (notesRoute.js).
- **Rate limiting:** Enforced on all backend routes. On 429, frontend shows retry timer (`HomePage.jsx`).
- **Error handling:** Backend returns JSON errors; frontend shows toasts.
- **Component structure:** Pages in `src/pages/`, reusable UI in `src/components/`, utilities in `src/libs/`.
- **Routing:** Uses `react-router` (not `react-router-dom`).
- **Styling:** Tailwind + DaisyUI (`index.css`, `vite.config.js`).
- **Env config:** Backend expects `MONGO_URI` and Upstash creds in `.env` (not committed). Frontend uses Vite env vars.

## Integration Points
- **MongoDB:** Note storage (note.js).
- **Upstash:** Rate limiting (upstash.js).
- **Frontend-backend:** All communication via REST API, handled by Axios instance.

## Examples
- **Add API route:** Update notesRoute.js, implement in notesController.js.
- **Add page:** Create in pages, add route in `App.jsx`.

---

**For AI agents:**
- Always use the provided Axios instance for frontend API calls.
- Respect rate limiting and error handling patterns.
- Follow file structure conventions for new components, pages, and backend routes/controllers.
- When updating this file, preserve project-specific details and update workflows as needed.

---

Please review and let me know if any section is unclear, incomplete, or if you want more detail on specific patterns or workflows.