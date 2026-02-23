# LearnTrace

**Understand how students learn, not what they answer.**

LearnTrace is a lightweight, offline-first learning behavior tracker. Instead of evaluating whether a student's answer is correct, it observes *how* they construct that answer — their effort, pacing, edits, and pauses.

---

## What problem does it solve?

Traditional tools grade answers. LearnTrace tracks the *process* behind the answer:

- Did the student revise or write linearly?
- How long did they genuinely engage?
- When did they pause — to think, or to look things up?
- How many times did they attempt before submitting?

These behavioral signals surface patterns that correctness scores cannot.

---

## What it tracks

| Signal | Description |
|---|---|
| **Time elapsed** | Total active session duration |
| **Keystrokes** | Raw typing volume |
| **Edits** | Backspace / Delete presses (self-correction) |
| **Idle time** | Pauses ≥ 3 seconds (thinking gaps) |
| **Submit attempts** | How many times the student revisited before finishing |

After each session, LearnTrace classifies the learner's pattern (e.g. *Reflective Thinker*, *Fast Executor*, *Revising Learner*) and provides brief, mentor-style feedback.

---

## Running locally

**Prerequisites:** [Node.js](https://nodejs.org) v18+

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Building for deployment

```bash
npm run build
```

The output goes to `dist/`. You can deploy the `dist/` folder to any static host:

- **Netlify** — drag-and-drop `dist/` or connect the repo
- **Vercel** — set the output directory to `dist`
- **GitHub Pages** — copy `dist/` contents to the `gh-pages` branch

No server, backend, or database is required.

---

## Current limitations

- **Anonymous mode only** — no login or user profiles yet. All data is stored in the browser's `localStorage`.
- **Single task** — the task prompt is currently hardcoded. Multi-task support is planned for a future phase.
- **Local data** — clearing browser storage or switching devices will lose history.
- **No export** — session data cannot be exported yet.

> The codebase is structured with clear `AUTH EXTENSION POINT` comments. Adding authentication later requires changes only in `src/storage.js` and a single stub in `script.js` — no other files need touching.

---

## Project structure

```
LearnTrace/
├── index.html        # Main app shell
├── script.js         # Core session tracking logic
├── chatbot.js        # Offline study assistant (rule-based, no API)
├── style.css         # All styles
├── vite.config.js    # Build configuration
└── src/
    ├── tracker.js    # Optional richer session classifier
    └── storage.js    # localStorage abstraction (auth-ready)
```
