# LearnTrace — Firebase Migration Audit Report

**Date:** 2026-08-11  
**Purpose:** Complete codebase audit before removing Firebase and preparing for Supabase integration.

---

## A. Current Architecture

LearnTrace is a **Vite-powered hybrid application** that combines:

1. **Vanilla HTML/CSS/JS frontend** — `index.html`, `login.html`, `profile.html` served through Vite dev server
2. **React JSX components** — 150+ `.jsx` files in `src/` for interactive learning activities (algorithms, data structures, etc.)
3. **Firebase client SDK** — used for authentication, Firestore database, and Firebase Storage
4. **Firebase Cloud Functions** — `functions/` directory with OpenAI and Judge0 API proxies
5. **Express backend** — `backend/` directory with a standalone Node.js/Express/MongoDB server for code execution, AI chat, and problem management
6. **Vite dev middleware** — `vite.config.js` proxies `/api/reflection`, `/api/run`, `/api/study-assistant` to the Express backend at `localhost:5000`

### Key Entry Points
| Page | HTML | Script Imports |
|------|------|---------------|
| Main App | `index.html` | `auth-check.js`, `script.js`, `chatbot.js`, `src/navigation.js`, `src/learning.js`, `src/practice.js`, `src/splash.js` |
| Login | `login.html` | `auth-check.js`, `login.js` |
| Profile | `profile.html` | `auth-check.js`, `profile.js` |

### Module Dependency Chain (Firebase)
```
firebase.js (Firebase SDK init + Firestore helpers)
  ├── auth.js (Firebase Auth methods + Firestore profile helpers)
  │     ├── auth-check.js (central auth state manager)
  │     │     ├── index.html (via <script>)
  │     │     ├── login.html (via <script>)
  │     │     └── profile.html (via <script>)
  │     ├── login.js (login form handlers)
  │     └── profile.js (profile page logic)
  ├── src/cloudSync.js (Firestore bidirectional sync)
  │     └── auth-check.js (imports syncSessions)
  └── script.js (dynamic import for saveCloudExport, lines 1351 & 1387)
```

---

## B. Current Authentication Flow

1. **Anonymous mode** — Default. `userContext.js` generates a UUID stored in `localStorage` under `learntrace_user_id`. All sessions are tagged with this UUID.

2. **Sign-in flow:**
   - `login.html` loads `auth-check.js` and `login.js`
   - `login.js` calls functions from `auth.js` (which wraps Firebase Auth):
     - `signInWithEmail()` → `signInWithEmailAndPassword()`
     - `signUpWithEmail()` → `createUserWithEmailAndPassword()`
     - `signInWithGoogle()` → `signInWithPopup()` with `GoogleAuthProvider`
     - `sendPasswordReset()` → `sendPasswordResetEmail()`
   - `auth-check.js` registers a global `onAuthStateChanged` listener
   - On sign-in: profile icon shown, anonymous sessions re-tagged with Firebase UID (`claimSessions.js`), cloud sync started (`cloudSync.js`)
   - On sign-out: anonymous UI restored, sync indicator hidden

3. **Profile enrichment:**
   - `auth.js` → `ensureUserProfile()` creates a Firestore `/users/{uid}` document on first sign-in
   - `getUserProfile()` fetches the Firestore profile
   - `updateUserDisplayName()` and `uploadProfileImage()` write to both Firebase Auth and Firestore

4. **Session claiming:**
   - `claimSessions.js` — Pure localStorage operation. Re-tags anonymous sessions with Firebase UID. **No Firebase dependency.** Safe to keep.

5. **Auth-gating:**
   - `index.html` is NEVER gated (anonymous always allowed)
   - `profile.html` requires auth → redirects to `login.html` if not signed in
   - `login.html` redirects to `index.html` if already signed in

---

## C. Current Database/Backend Flow

### Client-Side (Firebase Firestore)
- `firebase.js` exports helpers: `getCloudTasks()`, `saveCloudSession()`, `getCloudSessions()`, `saveCloudExport()`, `saveLearnerProfile()`, `fetchLearnerProfile()`
- `src/cloudSync.js` — bidirectional sync engine: uploads unsynced local sessions to Firestore, downloads cross-device sessions
- `src/storage.js` — localStorage-backed session storage (pure local, no Firebase)

### Server-Side (Express backend)
- `backend/server.js` — Express server with MongoDB (via Mongoose), serves:
  - `/api/study-assistant` — AI chat (Grok API)
  - `/api/run` — Code execution
  - `/api/reflection` — Reflection endpoint
- **No Firebase dependency** in `backend/`

### Firebase Cloud Functions
- `functions/index.js` — Two Cloud Functions:
  - `askAI` — OpenAI proxy for AI chat
  - `executeCode` — Judge0 code execution proxy
- **These appear to be an earlier implementation**, now superseded by the Express backend

---

## D. Firebase Dependencies

### Root `package.json`
| Dependency | Version | Purpose |
|---|---|---|
| `firebase` | `^12.9.0` | Client SDK (Auth, Firestore, Storage) |

### `functions/package.json`
| Dependency | Version | Purpose |
|---|---|---|
| `firebase-admin` | `^13.6.0` | Server-side Firebase Admin |
| `firebase-functions` | `^7.0.0` | Cloud Functions runtime |
| `firebase-functions-test` | `^3.4.1` | Testing (devDep) |

### Firebase Config Files
| File | Purpose |
|---|---|
| `.firebaserc` | Firebase project mapping (`learntrace-26f67`) |
| `firebase.json` | Cloud Functions deployment config |
| `firebase.js` | Client SDK initialization + Firestore data helpers |

### Firebase Config Values (Hardcoded in `firebase.js`)
- `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` (all for project `learntrace-26f67`)

### Environment Variables
| File | Variable | Firebase? |
|---|---|---|
| `.env` (root) | `VITE_BACKEND_URL` | No |
| `.env` (root) | `GROK_API_KEY` | No |
| `backend/.env` | `MONGO_URI` | No |
| `backend/.env` | `GROK_API_KEY` | No |

**No Firebase environment variables** — config is hardcoded in `firebase.js`.

---

## E. Files That Can Be Removed

| File | Reason |
|---|---|
| `firebase.js` | Core Firebase SDK initialization + Firestore data layer. Entirely Firebase-specific. |
| `.firebaserc` | Firebase project config. No longer needed. |
| `firebase.json` | Firebase Cloud Functions deployment config. No longer needed. |
| `functions/` (entire directory) | Firebase Cloud Functions. Superseded by `backend/` Express server. Not imported by frontend. |

---

## F. Files That Must Be Modified

| File | What to Change |
|---|---|
| `auth.js` | Replace Firebase Auth imports and Firestore profile helpers with stub/placeholder service interfaces |
| `auth-check.js` | Remove `import { saveLearnerProfile } from './firebase.js'` and `import { syncSessions } from './src/cloudSync.js'`; stub cloud sync calls |
| `login.js` | Currently imports only from `auth.js` — will work if `auth.js` is properly stubbed |
| `profile.js` | Imports `getUserProfile`, `updateUserDisplayName`, `uploadProfileImage`, `updateUserPhotoURL` from `auth.js` — these need stubs |
| `src/cloudSync.js` | Imports from `firebase.js`. Must be rewritten as a placeholder/stub |
| `script.js` | Lines 1351 and 1387 dynamically import `saveCloudExport` from `firebase.js` — must be stubbed |
| `userContext.js` | Update comments only; the code itself reads from `window.__authState` (no Firebase import) |
| `package.json` | Remove `"firebase"` dependency |
| `.gitignore` | Remove Firebase-specific entries (optional, cosmetic) |
| `src/storage.js` | Update Firestore comments only — no code dependency on Firebase |

---

## G. Files That Must Be Preserved

| File | Reason |
|---|---|
| `index.html` | Main app UI |
| `login.html` | Login/signup UI (kept, just disconnected from Firebase) |
| `profile.html` | Profile UI |
| `profile.css` | Profile styling |
| `style.css` | Main stylesheet |
| `script.js` | Core session logic (no direct Firebase import except dynamic export mirror) |
| `chatbot.js` | Self-contained, rule-based study assistant. No Firebase dependency. |
| `userContext.js` | Identity layer. Reads `window.__authState` but doesn't import Firebase directly. |
| `claimSessions.js` | Pure localStorage session claim bridge. No Firebase imports. |
| `src/storage.js` | localStorage session storage. No Firebase imports. |
| `src/analytics.js` | Pure session analytics. No Firebase dependency. |
| `src/profileSynthesis.js` | Pure learner profile builder. No Firebase dependency. |
| `src/syncIndicator.js` | DOM indicator. No Firebase dependency. |
| `src/multiDeviceInsight.js` | Pure analytics. No Firebase dependency. |
| `src/splash.js` | Splash screen. No Firebase dependency. |
| `src/navigation.js` | Navigation. No Firebase dependency. |
| `src/learning.js` | Learning hub logic. No Firebase dependency. |
| `src/practice.js` | Coding practice logic. No Firebase dependency. |
| `src/reportBuilder.js` | Export report builder. No Firebase dependency. |
| `src/*.jsx` (all) | React learning activity components. No Firebase dependency. |
| `backend/` | Express backend server. No Firebase dependency. Active backend. |
| `vite.config.js` | Vite configuration. No Firebase dependency. |
| `.env` (root) | Contains `VITE_BACKEND_URL` and `GROK_API_KEY` — not Firebase. |

---

## H. Potential Risks

1. **Auth-check.js is loaded on every page** — If the stubbing breaks, all three pages crash.
2. **Dynamic imports in script.js** — Lines 1351/1387 `import('./firebase.js')` will throw module-not-found after removal. Must be stubbed.
3. **Profile page depends heavily on auth** — `profile.js` calls `getUserProfile()`, `updateUserDisplayName()`, etc. These must return sensible defaults.
4. **Cloud sync indicator** — `syncIndicator.js` is safe (pure DOM), but `cloudSync.js` imports from `firebase.js`. Must be fully stubbed.
5. **Staged git changes exist** — 60+ files already staged. Must commit or stash before migration branch.
6. **`functions/` has its own `node_modules`** — Removing the directory is safe but should be clean.

---

## I. Recommended Migration Sequence

### Phase 1: Safe Backup (This migration)
1. Commit current staged changes
2. Create `feature/supabase-migration` branch

### Phase 2: Remove Firebase (This migration)
1. Delete `firebase.js`, `.firebaserc`, `firebase.json`, `functions/`
2. Create stub service interfaces in `src/services/`
3. Modify `auth.js` → stub all Firebase Auth/Firestore calls
4. Modify `auth-check.js` → remove Firebase imports, use stubs
5. Modify `src/cloudSync.js` → replace Firebase imports with no-op stubs
6. Modify `script.js` → remove dynamic `firebase.js` imports
7. Remove `firebase` from `package.json`
8. Run `npm install` to clean lockfile
9. Update comments in `userContext.js`, `src/storage.js`

### Phase 3: Validate (This migration)
1. Run `npm run dev` and verify index.html loads
2. Verify login.html loads (forms present, no crashes)
3. Verify profile.html loads
4. Search codebase for remaining Firebase references
5. Check console for import errors

### Phase 4: Supabase Integration (NEXT migration — NOT this phase)
1. Install `@supabase/supabase-js`
2. Create `src/services/config/supabase.js` with client init
3. Implement `src/services/auth/` with Supabase Auth
4. Implement `src/services/database/` with Supabase tables
5. Wire up `auth.js` and `auth-check.js` to new Supabase services
6. Re-enable cloud sync with Supabase
