// auth.js — Firebase auth helpers (npm imports, Vite-compatible)
import { auth, db } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from './firebase.js';

const USERS_COLLECTION = 'users';

function displayNameFromEmail(email) {
  if (!email || typeof email !== 'string') return 'User';
  const part = email.split('@')[0].trim();
  return part || 'User';
}

// ─── Auth actions ─────────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
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

/**
 * Sends a Firebase password-reset email to the given address.
 * Throws a Firebase AuthError on failure (e.g. invalid-email, user-not-found).
 * @param {string} email
 */
export async function sendPasswordReset(email) {
  const { sendPasswordResetEmail } = await import('firebase/auth');
  return sendPasswordResetEmail(auth, email.trim());
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// ─── Profile helpers ──────────────────────────────────────────────────────────

/**
 * Creates the Firestore user document on first sign-in.
 * If it already exists, returns the stored data unchanged.
 */
export async function ensureUserProfile(user) {
  const uid = user.uid;
  const email = user.email || '';
  const displayName = user.displayName || displayNameFromEmail(email);
  const photoURL = user.photoURL || null;
  const provider = resolveProvider(user);

  const ref = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();

  const data = {
    uid,
    email,
    displayName,
    photoURL,
    provider,
    createdAt: new Date().toISOString(),
  };
  await setDoc(ref, data);
  return data;
}

/** Returns the stored profile or null. */
export async function getUserProfile(uid) {
  try {
    const ref = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error('getUserProfile:', err);
    return null;
  }
}

/** Update display name in both Firebase Auth and Firestore. */
export async function updateUserDisplayName(uid, displayName) {
  const trimmed = (displayName || '').trim();
  if (!trimmed) return;
  // Update the Firebase Auth profile (so it's consistent everywhere)
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: trimmed });
  }
  // Update the Firestore document
  const ref = doc(db, USERS_COLLECTION, uid);
  await updateDoc(ref, { displayName: trimmed });
}

/** Update photoURL in Firestore after Storage upload. */
export async function updateUserPhotoURL(uid, photoURL) {
  const ref = doc(db, USERS_COLLECTION, uid);
  await updateDoc(ref, { photoURL });
}

/** Upload a profile image to Storage and return its download URL. */
export async function uploadProfileImage(uid, file) {
  const path = `profiles/${uid}/${Date.now()}_${file.name}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  return getDownloadURL(ref);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function resolveProvider(user) {
  try {
    const info = user.providerData && user.providerData[0];
    if (!info) return 'email';
    if (info.providerId === 'google.com') return 'Google';
    if (info.providerId === 'password') return 'Email / Password';
    return info.providerId;
  } catch (e) { return 'email'; }
}
