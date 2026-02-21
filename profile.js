// Profile page: photo upload and display
import { getUserProfile, uploadProfileImage, updateUserPhotoURL } from "./auth.js";

let user = null;

function handleAuthReady(e) {
  user = e && e.detail && e.detail.user ? e.detail.user : null;
  if (!user) return; // auth-check will handle redirects
  loadProfile();
}

// If auth already initialized earlier on the page, use it; otherwise listen for the event
if (typeof window !== "undefined" && window.__authState && window.__authState.ready) {
  user = window.__authState.user || null;
  if (user) loadProfile();
} else {
  window.addEventListener("auth-ready", handleAuthReady);
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

document.getElementById("uploadBtn").addEventListener("click", () => {
  document.getElementById("photoInput").click();
});

document.getElementById("photoInput").addEventListener("change", async (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file || !file.type.startsWith("image/")) return;
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
