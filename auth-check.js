// Auth check and profile UI; profile icon top-left
// NOTE: We intentionally DO NOT statically import `auth.js` here so that
// Firebase code is never loaded in anonymous/demo mode. The real auth
// module will be dynamically imported later when a developer explicitly
// enables authentication by setting `window.__ENABLE_AUTH = true`.

let profileDropdownOpen = false;

// Placeholders for auth helpers. When auth is disabled these remain
// safe no-ops so the UI stays functional without any backend.
let onAuthChange = null;
let logout = async () => { console.warn('logout called but auth is disabled'); };
let getUserProfile = async () => null;
let ensureUserProfile = async () => null;

// ---------------------------------------------------------------------------
// DEMO MODE: Temporarily disable authentication and redirects so the app can
// be used as a public demo. This block intentionally bypasses Firebase auth
// listeners and navigation logic. Remove or set to `false` to restore auth.
// ---------------------------------------------------------------------------
const DEMO_PUBLIC_MODE = true; // <<-- set to false to re-enable auth behavior


function showProfile(profile) {
  window.userProfile = profile;
  const wrap = document.getElementById("profileWrap");
  const emailEl = document.getElementById("profileEmail");
  const photoEl = document.getElementById("profilePhoto");
  const letterEl = document.getElementById("profileLetter");
  if (!wrap) return;
  wrap.style.display = "block";
  if (emailEl) emailEl.textContent = profile.email || "—";
  const displayName = profile.displayName || "User";
  if (profile.photoURL) {
    if (photoEl) {
      photoEl.src = profile.photoURL;
      photoEl.alt = displayName;
      photoEl.hidden = false;
    }
    if (letterEl) letterEl.hidden = true;
  } else {
    if (photoEl) photoEl.hidden = true;
    if (letterEl) {
      letterEl.textContent = displayName.charAt(0).toUpperCase();
      letterEl.hidden = false;
    }
  }
}

function hideProfile() {
  window.userProfile = null;
  const wrap = document.getElementById("profileWrap");
  if (wrap) wrap.style.display = "none";
}

function toggleDropdown() {
  profileDropdownOpen = !profileDropdownOpen;
  const dd = document.getElementById("profileDropdown");
  if (dd) dd.hidden = !profileDropdownOpen;
}

function closeDropdown() {
  profileDropdownOpen = false;
  const dd = document.getElementById("profileDropdown");
  if (dd) dd.hidden = true;
}

// Shared lightweight auth state for the page
if (typeof window !== "undefined" && window.__authState === undefined) {
  window.__authState = { ready: false, user: null, redirectPerformed: false };
}

// If a developer wants to enable real auth later, they should set
// `window.__ENABLE_AUTH = true` before loading this module. When enabled
// we dynamically import `./auth.js` and wire up the real listeners. Until
// then we operate in anonymous/demo mode only.
if (typeof window !== 'undefined' && window.__ENABLE_AUTH && !DEMO_PUBLIC_MODE) {
  import('./auth.js').then(mod => {
    onAuthChange = mod.onAuthChange;
    logout = mod.logout;
    getUserProfile = mod.getUserProfile;
    ensureUserProfile = mod.ensureUserProfile;

    // Register the central auth listener now that we have the real helper.
    if (!window.__authListenerRegistered) {
      window.__authListenerRegistered = true;
      const unsubscribe = onAuthChange(async (user) => {
        const previousUid = window.__authState.user && window.__authState.user.uid ? window.__authState.user.uid : null;
        window.__authState.user = user || null;

        if (!window.__authState.ready) {
          window.__authState.ready = true;
          emitAuthReady(window.__authState.user);
        }

        if (user) {
          try {
            await ensureUserProfile(user);
            const profile = await getUserProfile(user.uid);
            if (profile) showProfile(profile);
          } catch (err) {
            console.error('Profile load error:', err);
            hideProfile();
          }
        } else {
          hideProfile();
        }

        try {
          if (previousUid !== (user && user.uid ? user.uid : null)) {
            sessionStorage.removeItem('lt_redirect_uid');
          }
        } catch (e) {}

        decideRedirectFor(window.__authState.user);
      });
      window.__authUnsubscribe = unsubscribe;
    }
  }).catch(err => {
    console.warn('Failed to load auth module dynamically:', err);
  });
}

function emitAuthReady(user) {
  const ev = new CustomEvent("auth-ready", { detail: { user } });
  window.dispatchEvent(ev);
}

// If demo mode is active, mark auth as ready and emit once so pages can
// continue as a public demo without any redirects or auth listeners.
if (typeof window !== "undefined" && DEMO_PUBLIC_MODE) {
  try {
    window.__authState.ready = true;
    window.__authState.user = null;
    emitAuthReady(null);
  } catch (e) {
    // ignore
  }
}

function isLoginPath(path) {
  // Treat only explicit login paths as login. Do NOT treat `/` as login —
  // `index.html` is the app root.
  try {
    const p = path || window.location.pathname || "";
    const base = p.substring(p.lastIndexOf("/") + 1);
    return base === "login.html" || base === "login" || base === "login/" || p.includes("login.html");
  } catch (e) {
    return false;
  }
}

function decideRedirectFor(user) {
  // When demo mode is enabled, do not perform any redirects — the app
  // should behave as a public demo and allow direct access to pages.
  if (DEMO_PUBLIC_MODE) return;
  // single, simple lock persisted for this session to avoid rapid loop redirects
  const LOCK_KEY = "lt_redirect_uid";
  const path = window.location.pathname || "";
  const onLogin = isLoginPath(path);
  const uid = user && user.uid ? user.uid : null;

  // If we've already redirected for this auth identity in this session, skip.
  try {
    const locked = sessionStorage.getItem(LOCK_KEY);
    if (locked === (uid || "anon")) return;
  } catch (e) {
    // ignore storage errors and continue
  }

  // Authenticated users should not remain on the login page
  if (uid && onLogin) {
    try {
      sessionStorage.setItem(LOCK_KEY, uid);
    } catch (e) {}
    window.location.replace("index.html");
    return;
  }

  // Unauthenticated users should not remain on guarded pages
  if (!uid && !onLogin) {
    try {
      sessionStorage.setItem(LOCK_KEY, "anon");
    } catch (e) {}
    window.location.replace("login.html");
    return;
  }

  // otherwise, no redirect necessary for this page/state
}

// mark DOM ready and try redirect when both ready
// No redirects in DOMContentLoaded; keep DOMContentLoaded only for wiring UI below.

// Auth listeners are registered dynamically when real auth is enabled
// (see the dynamic import block above). In anonymous/demo mode no
// listeners are attached and no redirects are performed.

// Setup UI interactions after DOM loaded (no redirects here)
document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  const profileLogoutBtn = document.getElementById("profileLogoutBtn");

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  document.addEventListener("click", () => closeDropdown());
  if (profileDropdown) profileDropdown.addEventListener("click", (e) => e.stopPropagation());

  if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener("click", async () => {
      try {
        await logout();
        // auth-ready and redirect are handled centrally above
      } catch (err) {
        alert("Failed to sign out. Please try again.");
      }
    });
  }
});
