// Profile page: photo upload and display
// NOTE: To avoid importing Firebase while the app runs in anonymous/demo
// mode, we do not statically import `auth.js` here. Instead we will
// dynamically import the auth helpers only when authentication is
// explicitly enabled via `window.__ENABLE_AUTH = true`.

let user = null;
let getUserProfile = async () => null;
let uploadProfileImage = async () => { throw new Error('Auth disabled'); };
let updateUserPhotoURL = async () => { throw new Error('Auth disabled'); };

function handleAuthReady(e) {
  user = e && e.detail && e.detail.user ? e.detail.user : null;
  if (!user) return; // auth-check would handle redirects if enabled
  loadProfile();
}

// If authentication is enabled, dynamically import auth helpers and wire
// them up. This keeps Firebase code out of the runtime unless explicitly
// requested by a developer later.
if (typeof window !== 'undefined' && window.__ENABLE_AUTH) {
  import('./auth.js').then(mod => {
    getUserProfile = mod.getUserProfile;
    uploadProfileImage = mod.uploadProfileImage;
    updateUserPhotoURL = mod.updateUserPhotoURL;

    // If auth state is already available on the page, use it; otherwise
    // wait for the central `auth-ready` event.
    if (window.__authState && window.__authState.ready) {
      user = window.__authState.user || null;
      if (user) loadProfile();
    } else {
      window.addEventListener('auth-ready', handleAuthReady);
    }
  }).catch(err => {
    // If dynamic import fails, leave stubs in place and log for debugging.
    console.warn('Auth module not available:', err);
  });
} else {
  // Anonymous/demo mode: rely on UI guards already present in this file.
  // We still listen for `auth-ready` in case a later developer enables
  // auth at runtime and emits the event.
  window.addEventListener('auth-ready', handleAuthReady);
}

async function loadProfile() {
  const profile = await getUserProfile(user.uid);
  const emailEl = document.getElementById("profileEmailDisplay");
  const letterEl = document.getElementById("avatarLetter");
  const imgEl = document.getElementById("avatarImg");
  if (emailEl) emailEl.textContent = profile?.email || user.email || "";
  const displayName = profile?.displayName || (user.email && user.email.split("@")[0]) || "User";
  if (profile?.photoURL) {
    imgEl.src = profile.photoURL;
    imgEl.hidden = false;
    letterEl.hidden = true;
  } else {
    letterEl.textContent = displayName.charAt(0).toUpperCase();
    letterEl.hidden = false;
    imgEl.hidden = true;
  }
}

function showError(msg) {
  const el = document.getElementById("profileError");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  el.classList.add("show");
}

function hideError() {
  const el = document.getElementById("profileError");
  if (el) {
    el.style.display = "none";
    el.classList.remove("show");
  }
}

// Guarded bindings: in demo mode there may be no authenticated `user`.
const uploadBtn = document.getElementById("uploadBtn");
const photoInput = document.getElementById("photoInput");
if (uploadBtn && photoInput) {
  uploadBtn.addEventListener("click", () => {
    // If no user is present (demo mode), show message instead of opening
    // the file picker to avoid confusing behavior.
    if (!user) {
      showError("Profile editing is disabled in demo mode.");
      return;
    }
    photoInput.click();
  });

  photoInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (!user) {
      showError("Profile editing is disabled in demo mode.");
      e.target.value = "";
      return;
    }
    hideError();
    const letterEl = document.getElementById("avatarLetter");
    const imgEl = document.getElementById("avatarImg");
    try {
      const url = await uploadProfileImage(user.uid, file);
      await updateUserPhotoURL(user.uid, url);
      imgEl.src = url;
      imgEl.hidden = false;
      letterEl.hidden = true;
      if (window.userProfile) window.userProfile.photoURL = url;
    } catch (err) {
      showError(err.message || "Upload failed. Try again.");
    }
    e.target.value = "";
  });
}
