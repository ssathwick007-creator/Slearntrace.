/**
 * src/services/database/index.js — Database service interface
 *
 * SUPABASE INTEGRATION ACTIVE
 * ────────────────────────────
 * This file re-exports all Supabase data access functions and provides
 * backward-compatible wrappers for existing LearnTrace code.
 */
import { supabase } from '../config/index.js';
import * as contentService from './contentService.js';
import * as userService from './userService.js';

// Re-export all content and user services for convenience
export { contentService, userService };

// ─── Tasks (legacy stubs — not backed by a Supabase table yet) ────────────

export async function getCloudTasks(localFallback) {
  return localFallback;
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function saveCloudSession(session) {
  // No-op: general cloud session sync not implemented yet
}

export async function getCloudSessions(userId) {
  return [];
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export async function saveCloudExport(userId, format, payloadStr) {
  // No-op: cloud export sync not implemented yet
}

// ─── Profiles (Supabase-backed) ───────────────────────────────────────────────

export async function saveLearnerProfile(userId, profileData) {
  return userService.updateProfile(userId, {
    display_name: profileData.displayName || profileData.display_name,
    photo_url: profileData.photoURL || profileData.photo_url,
  });
}

export async function fetchLearnerProfile(userId) {
  return userService.getProfile(userId);
}

// ─── User Profiles (Auth-linked) ──────────────────────────────────────────────

export async function ensureUserProfile(user) {
  // The Supabase trigger auto-creates profiles, so just fetch it
  const profile = await userService.getProfile(user.uid);
  if (profile) {
    return {
      uid: profile.id,
      email: user.email || '',
      displayName: profile.display_name || user.displayName || 'User',
      photoURL: profile.photo_url || user.photoURL || null,
    };
  }
  // Fallback if profile hasn't been created yet (race condition with trigger)
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'User',
    photoURL: user.photoURL || null,
  };
}

export async function getUserProfile(uid) {
  const profile = await userService.getProfile(uid);
  if (!profile) return null;
  return {
    uid: profile.id,
    email: '',
    displayName: profile.display_name || 'User',
    photoURL: profile.photo_url || null,
  };
}

export async function updateUserDisplayName(uid, displayName) {
  await userService.updateProfile(uid, { display_name: displayName });
}

export async function updateUserPhotoURL(uid, photoURL) {
  await userService.updateProfile(uid, { photo_url: photoURL });
}

export async function uploadProfileImage(uid, file) {
  // Upload to Supabase Storage (bucket: 'avatars')
  const ext = file.name.split('.').pop();
  const path = `${uid}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  
  // Update profile with new photo URL
  await userService.updateProfile(uid, { photo_url: data.publicUrl });
  
  return data.publicUrl;
}
