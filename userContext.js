/**
 * userContext.js — LearnTrace identity layer (anonymous + authenticated)
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │  AUTH STATE         getUserId() returns                      │
 * ├──────────────────────────────────────────────────────────────┤
 * │  Not signed in      persistent localStorage UUID             │
 * │  Signed in          Firebase Auth UID (from window.__authState) │
 * └──────────────────────────────────────────────────────────────┘
 *
 * AUTH EXTENSION POINT
 * ────────────────────
 * This is the ONLY file that needs to change when upgrading auth.
 * All call sites in script.js, exports, and comparisons use getUserId()
 * and will automatically get the Firebase UID after sign-in.
 *
 * Future Firebase example (already wired — no changes needed):
 *   The window.__authState.user check below IS the extension point.
 *   When a user signs in, auth-check.js sets window.__authState.user,
 *   and getUserId() immediately returns their Firebase UID.
 */

const USER_ID_KEY = 'learntrace_user_id';

/**
 * Generates a UUID v4-like string.
 * Uses crypto.randomUUID() when available (modern browsers), falling back to
 * a Math.random()-based implementation for older environments.
 * @returns {string}
 */
function _generateUUID() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (_) { /* fall through */ }

  // Fallback: RFC 4122 v4 UUID via Math.random()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gets the persisted anonymous user ID from localStorage,
 * creating and storing one if this is the first visit.
 * @returns {string}
 */
function _getOrCreateAnonymousId() {
  try {
    let id = localStorage.getItem(USER_ID_KEY);
    if (!id || typeof id !== 'string' || id.trim() === '') {
      id = _generateUUID();
      localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
  } catch (e) {
    // localStorage unavailable (e.g. private-browsing restrictions):
    // return a session-scoped fallback so the app still works.
    return _generateUUID();
  }
}

/**
 * Returns the Firebase UID of the currently signed-in user, or null.
 * Reads from window.__authState which is set by auth-check.js.
 * Never throws.
 * @returns {string|null}
 */
function _getFirebaseUid() {
  try {
    const state = window.__authState;
    if (state && state.ready && state.user && state.user.uid) {
      return state.user.uid;
    }
    return null;
  } catch (_) { return null; }
}

/**
 * Returns the current effective user ID.
 *
 * Priority order:
 *  1. Firebase UID — when the user is signed in (window.__authState.user is set)
 *  2. Anonymous UUID — persistent localStorage UUID for anonymous users
 *
 * This is the single function all session recording, exports, and comparisons
 * use. When auth state changes, this function's return value changes accordingly.
 *
 * @returns {string}  Never null/undefined
 */
export function getUserId() {
  return _getFirebaseUid() || _getOrCreateAnonymousId();
}

/**
 * Returns 'authenticated' | 'anonymous'.
 * Useful for UI hints and future cloud-sync gating.
 * @returns {'authenticated'|'anonymous'}
 */
export function getUserRole() {
  return _getFirebaseUid() ? 'authenticated' : 'anonymous';
}

/**
 * Returns a minimal user context object.
 *
 * AUTH EXTENSION POINT — when Firestore profiles are needed, replace this
 * body to fetch from window.userProfile (set by auth-check.js).
 *
 * @returns {{ uid: string, displayName: string, email: string|null, role: string }}
 */
export function getCurrentUser() {
  const uid = getUserId();
  const role = getUserRole();

  // When signed in, auth-check.js stores the profile in window.userProfile
  try {
    if (role === 'authenticated' && window.userProfile) {
      return {
        uid,
        displayName: window.userProfile.displayName || 'Signed-in User',
        email: window.userProfile.email || null,
        role,
      };
    }
  } catch (_) { /* fall through */ }

  return {
    uid,
    displayName: 'Anonymous Learner',
    email: null,
    role,
  };
}