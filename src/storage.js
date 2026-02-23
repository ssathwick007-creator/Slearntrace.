/**
 * LearnTrace — localStorage-backed session storage
 *
 * AUTH EXTENSION POINT — when auth is ready, add a `userId` parameter to
 * getSessions() / saveSessions() and filter/namespace by user. Do NOT change
 * the call sites in script.js; just update the implementation here.
 */
const STORAGE_KEY = "learnTraceAttempts";

/** Returns all stored sessions as an array (newest last). */
export function getSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/** Persists the full sessions array, overwriting the previous snapshot. */
export function saveSessions(sessions) {
  try {
    if (!Array.isArray(sessions)) throw new Error("sessions must be an array");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    return true;
  } catch (e) {
    return false;
  }
}

/** Removes all stored sessions (used by the Clear History button). */
export function clearSessions() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

/** Appends a single session to the existing list and saves. */
export function saveSession(session) {
  try {
    const sessions = getSessions();
    sessions.push(session);
    return saveSessions(sessions);
  } catch (e) {
    return false;
  }
}
