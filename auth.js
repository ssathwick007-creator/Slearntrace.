// Auth and profile: no username input; displayName derived from email
import { auth, db, storage } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  enableNetwork
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const USERS_COLLECTION = "users";

function displayNameFromEmail(email) {
  if (!email || typeof email !== "string") return "User";
  const part = email.split("@")[0].trim();
  return part || "User";
}

async function ensureFirestoreOnline() {
  try {
    await enableNetwork(db);
  } catch (err) {
    console.warn("Firestore network:", err);
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  // Force the account chooser every time to avoid silent/automatic sign-in
  try {
    provider.setCustomParameters({ prompt: "select_account" });
  } catch (e) {
    // ignore if provider doesn't support it
  }
  return signInWithPopup(auth, provider);
}

export async function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export function onAuthChange(callback) {
  // Return the unsubscribe function so callers can ensure a single listener.
  // Keep this function minimal: do not mutate global state here — the central
  // auth-check.js module is responsible for coordinating page-level flags
  // and redirects.
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

/** Create or get user profile. Call only after auth is ready. */
export async function ensureUserProfile(user) {
  await ensureFirestoreOnline();
  const uid = user.uid;
  const email = user.email || "";
  const displayName = user.displayName || displayNameFromEmail(email);
  const photoURL = user.photoURL || null;
  const ref = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  }
  const createdAt = new Date().toISOString();
  const data = {
    uid,
    email,
    displayName,
    photoURL,
    createdAt
  };
  await setDoc(ref, data);
  return data;
}

/** Get profile. Returns null if not found. */
export async function getUserProfile(uid) {
  await ensureFirestoreOnline();
  try {
    const ref = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data();
  } catch (err) {
    console.error("getUserProfile:", err);
    return null;
  }
}

/** Update photoURL in Firestore after Storage upload */
export async function updateUserPhotoURL(uid, photoURL) {
  await ensureFirestoreOnline();
  const ref = doc(db, USERS_COLLECTION, uid);
  await updateDoc(ref, { photoURL });
}

/** Upload profile image to Storage and return download URL */
export async function uploadProfileImage(uid, file) {
  const path = `profiles/${uid}/${Date.now()}_${file.name}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  return getDownloadURL(ref);
}
