/**
 * src/cloudSync.js — LearnTrace bidirectional cloud sync engine (STUB)
 *
 * SUPABASE MIGRATION POINT
 * ────────────────────────
 * Firebase/Firestore has been removed. This file is now a no-op stub.
 * When Supabase is connected, re-implement the upload/download logic
 * using the Supabase client from src/services/database/index.js.
 *
 * The public API (syncSessions) is preserved so call sites don't break.
 * auth-check.js currently does NOT import this file (sync is disabled),
 * but this stub is kept for future re-enablement.
 */

import { setSyncing, setSynced, setOffline } from './syncIndicator.js';

/**
 * Runs a full bidirectional sync for the authenticated user.
 * Currently a no-op stub — cloud sync is disabled until Supabase is connected.
 *
 * @param {string} uid  Auth UID of the signed-in user
 * @returns {Promise<void>}
 */
export async function syncSessions(uid) {
  if (!uid) return;

  // No-op: cloud sync disabled until Supabase is connected.
  // When re-enabled, this function should:
  // 1. setSyncing()
  // 2. Upload unsynced local sessions to Supabase
  // 3. Download missing cloud sessions to localStorage
  // 4. setSynced()
  // 5. Dispatch 'learntrace:sync-complete' event

  console.info('[LearnTrace] Cloud sync is disabled (no backend service connected).');
}
