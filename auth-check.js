// Auth check and profile UI; profile icon top-left
import { onAuthChange, logout, getUserProfile, ensureUserProfile } from "./auth.js";

let profileDropdownOpen = false;

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
  window.__authState = { ready: false, user: null, domReady: false, redirectPerformed: false };
}

function emitAuthReady(user) {
  const ev = new CustomEvent("auth-ready", { detail: { user } });
  window.dispatchEvent(ev);
}

function isLoginPath(path) {
  return path.includes("login.html") || path.endsWith("/login") || path.endsWith("/login/");
}

function decideRedirectOnce() {
  // only run when both DOM and auth are initialized
  if (!window.__authState.domReady || !window.__authState.ready) return;
  if (window.__authState.redirectPerformed) return;
  window.__authState.redirectPerformed = true;

  const path = window.location.pathname || "";
  const onLogin = isLoginPath(path);
  const user = window.__authState.user;

  // If authenticated and on login page -> go to index
  if (user && onLogin) {
    window.location.href = "index.html";
    return;
  }

  // If not authenticated and not on login page -> go to login
  if (!user && !onLogin) {
    window.location.href = "login.html";
    return;
  }

  // otherwise do nothing (page can render)
}

// mark DOM ready and try redirect when both ready
document.addEventListener("DOMContentLoaded", () => {
  window.__authState.domReady = true;
  decideRedirectOnce();
});

// single auth listener per page — update shared state, prepare profile UI, then decide redirect
onAuthChange(async (user) => {
  window.__authState.ready = true;
  window.__authState.user = user || null;

  if (user) {
    try {
      await ensureUserProfile(user);
      const profile = await getUserProfile(user.uid);
      if (profile) showProfile(profile);
    } catch (err) {
      console.error("Profile load error:", err);
      hideProfile();
    }
  } else {
    hideProfile();
  }

  emitAuthReady(window.__authState.user);
  decideRedirectOnce();
});

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
