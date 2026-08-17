// auth.js — Auth helpers (Firebase REMOVED — delegates to service layer)
//
// SUPABASE MIGRATION POINT
// ────────────────────────
// This file re-exports auth actions from the service layer.
// When Supabase is connected, update src/services/auth/index.js
// and src/services/database/index.js — this file needs NO changes.
//
// All call sites (login.js, auth-check.js, profile.js) import from
// this file, so the migration is isolated to the service layer.

import {
  signInWithGoogle as _signInWithGoogle,
  signUpWithEmail as _signUpWithEmail,
  signInWithEmail as _signInWithEmail,
  sendPasswordReset as _sendPasswordReset,
  updatePassword as _updatePassword,
  logout as _logout,
  onAuthChange as _onAuthChange,
} from './src/services/auth/index.js';

import {
  ensureUserProfile as _ensureUserProfile,
  getUserProfile as _getUserProfile,
  updateUserDisplayName as _updateUserDisplayName,
  updateUserPhotoURL as _updateUserPhotoURL,
  uploadProfileImage as _uploadProfileImage,
} from './src/services/database/index.js';

// ─── Auth actions ─────────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  return _signInWithGoogle();
}

export async function signUpWithEmail(email, password) {
  return _signUpWithEmail(email, password);
}

export async function signInWithEmail(email, password) {
  return _signInWithEmail(email, password);
}

export async function logout() {
  return _logout();
}

export async function sendPasswordReset(email) {
  return _sendPasswordReset(email);
}

export async function updatePassword(newPassword) {
  return _updatePassword(newPassword);
}

export function onAuthChange(callback) {
  return _onAuthChange(callback);
}

// ─── Profile helpers ──────────────────────────────────────────────────────────

export async function ensureUserProfile(user) {
  return _ensureUserProfile(user);
}

export async function getUserProfile(uid) {
  return _getUserProfile(uid);
}

export async function updateUserDisplayName(uid, displayName) {
  return _updateUserDisplayName(uid, displayName);
}

export async function updateUserPhotoURL(uid, photoURL) {
  return _updateUserPhotoURL(uid, photoURL);
}

export async function uploadProfileImage(uid, file) {
  return _uploadProfileImage(uid, file);
}
