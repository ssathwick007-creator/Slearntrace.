/**
 * src/cloudSync.js — LearnTrace bidirectional Firestore sync engine
 *
 * CONTRACT
 * ─────────
 *  - Only runs when user is authenticated (uid required).
 *  - Never blocks the UI: all Firestore calls are async, errors are caught.
 *  - Local-first: localStorage is always the source of truth for reading.
 *  - Idempotent: safe to call multiple times; sessions already in Firestore
 *    are skipped via setDoc({ merge: true }) and the 'synced' flag.
 *
 * EXTENSION POINT
 * ───────────────
 *  When cloud storage becomes the primary store, extend downloadSessions()
 *  to also refresh the Insights panel. The call site in auth-check.js
 *  does not need to change.
 */

import { getCloudSessions, saveCloudSession } from '../firebase.js';
import { setSyncing, setSynced, setOffline } from './syncIndicator.js';
import { markSessionsSynced } from './storage.js';

const LOCAL_KEY = 'learnTraceAttempts';
const DEVICE_KEY = 'learntrace_device_id';

// ─── Device ID ────────────────────────────────────────────────────────────────
/**
 * Returns a per-device UUID stored in localStorage.
 * Allows multi-device sessions to be distinguished without user input.
 * @returns {string}
 */
function getDeviceId() {
    try {
        let id = localStorage.getItem(DEVICE_KEY);
        if (!id) {
            id = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).slice(2) + Date.now().toString(36);
            localStorage.setItem(DEVICE_KEY, id);
        }
        return id;
    } catch (_) { return 'unknown-device'; }
}

// ─── Local helpers ─────────────────────────────────────────────────────────────
function readLocal() {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (_) { return []; }
}

function writeLocal(sessions) {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(sessions)); } catch (_) { }
}

/**
 * Converts a localStorage session record into the Firestore document shape.
 * Makes the shape forward-compatible without touching stored local data.
 */
function toFirestoreDoc(session, uid) {
    const m = session.metrics || {};
    return {
        sessionId: String(session.timestamp),
        userId: uid,
        timestamp: session.timestamp || Date.now(),
        taskId: session.taskId || 'unknown',
        taskType: session.taskType || '',
        pattern: session.pattern || '',
        sessionLabel: session.sessionLabel || '',
        metrics: {
            durationSeconds: Number(m.durationSeconds) || 0,
            keystrokes: Number(m.keystrokes) || 0,
            edits: Number(m.edits) || 0,
            idleSeconds: Number(m.idleSeconds) || 0,
            retries: Number(m.retries) || 0,
        },
        insight: session.insight || '',
        response: session.response || '',
        deviceId: session.deviceId || getDeviceId(),
        source: 'local',
        synced: true,
    };
}

/**
 * Converts a Firestore document back into a localStorage session shape.
 * Keeps both formats compatible so renderHistory() works unchanged.
 */
function fromFirestoreDoc(data) {
    return {
        timestamp: data.timestamp,
        pattern: data.pattern || '',
        sessionLabel: data.sessionLabel || '',
        metrics: data.metrics || {},
        insight: data.insight || '',
        response: data.response || '',
        taskId: data.taskId || 'unknown',
        taskType: data.taskType || '',
        userId: data.userId || '',
        deviceId: data.deviceId || '',
        source: 'cloud',
        synced: true,
    };
}

// ─── Upload (local → Firestore) ────────────────────────────────────────────────
/**
 * Uploads all unsynced local sessions for the given uid.
 * Uses the exact saveCloudSession wrapper to enforce schema and rules.
 * @param {string} uid
 * @returns {Promise<number>} count of sessions uploaded
 */
async function uploadSessions(uid) {
    const sessions = readLocal();
    const unsynced = sessions.filter(s => s && s.userId === uid && s.synced !== true);
    if (!unsynced.length) return 0;

    const deviceId = getDeviceId();
    const IDs = [];

    // Write in parallel using the new rule-compliant helper
    await Promise.all(
        unsynced.map(async (s) => {
            await saveCloudSession({ ...s, deviceId, userId: uid });
            IDs.push(s.timestamp);
        })
    );

    if (IDs.length) markSessionsSynced(IDs);
    return IDs.length;
}

// ─── Download (Firestore → local) ──────────────────────────────────────────────
/**
 * Downloads all cloud sessions for the given uid that are missing from localStorage.
 * Inserts them into localStorage with source='cloud'.
 * Uses newest-wins for any true conflict.
 * @param {string} uid
 * @returns {Promise<number>} count of sessions downloaded
 */
async function downloadSessions(uid) {
    const cloudSessions = await getCloudSessions(uid);
    if (!cloudSessions || !cloudSessions.length) return 0;

    const local = readLocal();
    const localIndex = new Map(local.map(s => [String(s.timestamp), s]));

    let added = 0;
    cloudSessions.forEach(data => {
        const key = String(data.timestamp);
        if (!localIndex.has(key)) {
            local.push(fromFirestoreDoc(data));
            added++;
        } else {
            // Conflict: keep newest
            const existing = localIndex.get(key);
            if ((data.timestamp || 0) > (existing.timestamp || 0)) {
                const idx = local.findIndex(s => String(s.timestamp) === key);
                if (idx !== -1) local[idx] = fromFirestoreDoc(data);
            }
        }
    });

    if (added > 0) {
        // Keep only 50 most recent to match local cap
        const sorted = local.slice().sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        writeLocal(sorted.slice(-50));
    }

    return added;
}

// ─── Public API ───────────────────────────────────────────────────────────────
/**
 * Runs a full bidirectional sync for the authenticated user.
 * Upload unsynced local sessions → then download missing cloud sessions.
 * Shows sync status in the footer indicator.
 *
 * Safe to call multiple times (idempotent).
 * Never throws — all errors are caught and logged.
 *
 * @param {string} uid  Firebase UID of the signed-in user
 * @returns {Promise<void>}
 */
export async function syncSessions(uid) {
    if (!uid) return;

    setSyncing();
    try {
        const [uploaded, downloaded] = await Promise.all([
            uploadSessions(uid),
            downloadSessions(uid),
        ]);

        setSynced();

        if (uploaded > 0 || downloaded > 0) {
            // Notify the app that history changed so it can re-render if needed
            try {
                document.dispatchEvent(new CustomEvent('learntrace:sync-complete', {
                    detail: { uploaded, downloaded },
                }));
            } catch (_) { /* non-critical */ }
        }
    } catch (err) {
        setOffline();
        // Log but never crash — offline or Firestore unavailable is expected
        if (typeof console !== 'undefined') {
            console.warn('[LearnTrace] Cloud sync failed (network or Firestore):', err.message || err);
        }
    }
}
