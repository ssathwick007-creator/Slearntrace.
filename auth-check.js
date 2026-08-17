/**
 * auth-check.js — central auth state manager
 *
 * Responsibilities:
 *  - Initialize the auth listener once per page load
 *  - Show / hide the profile icon and the "Sign In" link in the header
 *  - Gate profile.html behind auth (redirect to login.html if not signed in)
 *  - Redirect login.html → index.html when a user is already signed in
 *  - index.html is NEVER gated — anonymous mode is always allowed there
 *  - Claim anonymous sessions on first sign-in (claimSessions.js)
 *  - Cloud sync sessions when backend is connected
 *
 * SUPABASE MIGRATION POINT
 * ────────────────────────
 * Firebase has been removed. This file now delegates to the service layer
 * via auth.js. When Supabase is connected, update the service layer —
 * this file needs NO changes.
 */

import {
  onAuthChange,
  logout,
  getUserProfile,
  ensureUserProfile,
} from './auth.js';
import { claimAnonymousSessions } from './claimSessions.js';
import { hideSyncStatus } from './src/syncIndicator.js';
import { getSessions } from './src/storage.js';
import { analyzeSessions } from './src/analytics.js';
import { buildLearnerProfile } from './src/profileSynthesis.js';
import { saveLearnerProfile } from './src/services/database/index.js';

// ─── Page identity ────────────────────────────────────────────────────────────
function currentPage() {
  try {
    const p = window.location.pathname || '';
    return p.substring(p.lastIndexOf('/') + 1) || 'index.html';
  } catch (e) { return 'index.html'; }
}

const PAGE = currentPage();
const IS_LOGIN = PAGE === 'login.html';
const IS_PROFILE = PAGE === 'profile.html';
// index.html (and everything else) is never gated

// ─── Shared auth state ────────────────────────────────────────────────────────
if (typeof window !== 'undefined' && window.__authState === undefined) {
  window.__authState = { ready: false, user: null };
}

// ─── Profile icon helpers ─────────────────────────────────────────────────────
function showProfileUI(profile) {
  window.userProfile = profile;

  // Show profile wrap, hide "Sign In" link
  const wrap = document.getElementById('profileWrap');
  const signInEl = document.getElementById('signInLink');
  if (wrap) wrap.style.display = 'flex';
  if (signInEl) signInEl.style.display = 'none';

  // Populate icon
  const emailEl = document.getElementById('profileEmail');
  const photoEl = document.getElementById('profilePhoto');
  const letterEl = document.getElementById('profileLetter');
  if (emailEl) emailEl.textContent = profile.email || '—';

  const displayName = profile.displayName || 'User';
  if (profile.photoURL) {
    if (photoEl) { photoEl.src = profile.photoURL; photoEl.alt = displayName; photoEl.hidden = false; }
    if (letterEl) letterEl.hidden = true;
  } else {
    if (photoEl) photoEl.hidden = true;
    if (letterEl) { letterEl.textContent = displayName.charAt(0).toUpperCase(); letterEl.hidden = false; }
  }
}

function showAnonymousUI() {
  window.userProfile = null;
  const wrap = document.getElementById('profileWrap');
  const signInEl = document.getElementById('signInLink');
  if (wrap) wrap.style.display = 'none';
  if (signInEl) signInEl.style.display = '';   // restore default display
}

// ─── Dropdown helpers ─────────────────────────────────────────────────────────
let _dropdownOpen = false;
function toggleDropdown() {
  _dropdownOpen = !_dropdownOpen;
  const dd = document.getElementById('profileDropdown');
  if (dd) dd.hidden = !_dropdownOpen;
}
function closeDropdown() {
  _dropdownOpen = false;
  const dd = document.getElementById('profileDropdown');
  if (dd) dd.hidden = true;
}

// ─── Auth listener ────────────────────────────────────────────────────────────
// Guard against double-registration (Vite HMR)
if (!window.__authListenerRegistered) {
  window.__authListenerRegistered = true;

  onAuthChange(async (user) => {
    window.__authState.user = user || null;
    window.__authState.ready = true;

    // Dispatch event so other modules can react
    window.dispatchEvent(new CustomEvent('auth-ready', { detail: { user } }));

    if (user) {
      // ── Signed in ──────────────────────────────────────────────────────────
      // Build a minimal fallback profile from Auth data (always available, even offline)
      const fallbackProfile = {
        email: user.email || '',
        displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
        photoURL: user.photoURL || null,
      };
      // Show the icon immediately — no database needed for this
      showProfileUI(fallbackProfile);

      // Unhide container to prevent screen flash of protected state
      const container = document.querySelector('.insight-container');
      if (container) container.style.display = '';

      // ── Claim bridge — re-tag anonymous sessions with the auth UID ──────
      // Runs once on first sign-in. If anonId === user.uid the check is a no-op.
      try {
        const anonId = localStorage.getItem('learntrace_user_id');
        if (anonId && anonId !== user.uid) {
          const claimed = claimAnonymousSessions(anonId, user.uid);
          // Update the stored ID so future sessions record under the auth UID
          localStorage.setItem('learntrace_user_id', user.uid);
          if (claimed > 0) {
            console.info(`[LearnTrace] Claimed ${claimed} session(s) from anonymous ID → auth UID`);
          }
        }
      } catch (claimErr) {
        // Non-critical — sign-in must succeed even if claiming fails
        console.warn('[LearnTrace] Session claim failed silently:', claimErr);
      }

      // Then silently enrich from database (if connected)
      try {
        await ensureUserProfile(user);
        const profile = await getUserProfile(user.uid);
        if (profile) showProfileUI(profile);
      } catch (err) {
        // Database unavailable — icon already visible
        console.warn('LearnTrace: Database profile unavailable, using Auth data', err);
      }

      // ── Cloud sync — currently disabled (service layer is disconnected) ──
      // When Supabase is connected, re-enable sync here by importing from
      // src/cloudSync.js and calling syncSessions(user.uid)

      // Listen for future session saves so we can sync incrementally.
      // Guard prevents double-registration on HMR or repeated auth events.
      if (!window.__syncListenerRegistered) {
        window.__syncListenerRegistered = true;
        document.addEventListener('learntrace:session-saved', async () => {
          try {
            const uid = window.__authState && window.__authState.user && window.__authState.user.uid;
            if (uid) {
              // Build and sync synthetic profile locally
              try {
                const sessions = getSessions().filter(s => s && s.userId === uid);
                const analytics = analyzeSessions(sessions);
                if (sessions.length > 0) {
                  const profile = buildLearnerProfile(sessions, analytics);
                  if (profile) await saveLearnerProfile(uid, profile);
                }
              } catch (perfErr) {
                console.warn('[LearnTrace] Failed to build/sync learner profile:', perfErr);
              }
            }
          } catch (_) { /* non-critical */ }
        });
      }

      // If on login page, send user to the app (unless they are resetting their password)
      if (IS_LOGIN) {
        const isReset = window.location.search.includes('reset=true') || window.location.hash.includes('type=recovery');
        if (!isReset) {
          window.location.replace('index.html');
          return;
        }
      }

    } else {
      // ── Signed out ─────────────────────────────────────────────────────────
      showAnonymousUI();
      try { hideSyncStatus(); } catch (_) { /* non-critical */ }

      // Profile page requires auth — redirect to login
      if (IS_PROFILE) {
        window.location.replace('login.html');
        return;
      }
      // index.html: stay, anonymous mode
    }
  });
}

// ─── DOM interaction wiring ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  const logoutBtn = document.getElementById('profileLogoutBtn');

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(); });
  }

  document.addEventListener('click', closeDropdown);
  if (profileDropdown) profileDropdown.addEventListener('click', (e) => e.stopPropagation());

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await logout();
        // auth listener above will fire, call showAnonymousUI, and do no redirect on index.html
      } catch (err) {
        alert('Sign out failed. Please try again.');
      }
    });
  }
});
