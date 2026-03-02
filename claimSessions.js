/**
 * claimSessions.js — Anonymous → Authenticated claim bridge
 *
 * Called ONCE when a user signs in for the first time.
 * Re-tags all localStorage sessions that were recorded under the anonymous
 * UUID so they now belong to the Firebase UID.
 *
 * CONTRACT
 * ─────────
 *  - Pure localStorage; no network, no Firestore.
 *  - Safe to call multiple times (idempotent — the mapping check prevents double-runs).
 *  - Does NOT delete any sessions; never loses data.
 *  - Exports a single function: claimAnonymousSessions(anonUid, firebaseUid)
 *
 * FUTURE EXTENSION POINT
 * ───────────────────────
 * When cloud sync is added, extend this function to also push the claimed
 * sessions to Firestore. The call site in auth-check.js does not need to change.
 */

const STORAGE_KEY = 'learnTraceAttempts';
const CLAIM_MAP_KEY = 'learntrace_claim_map';

/**
 * Returns the persisted claim-map object { [anonUid]: firebaseUid }.
 * @returns {Record<string,string>}
 */
function _readClaimMap() {
    try {
        const raw = localStorage.getItem(CLAIM_MAP_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
    } catch (_) { return {}; }
}

/**
 * Persists an updated claim-map.
 * @param {Record<string,string>} map
 */
function _writeClaimMap(map) {
    try { localStorage.setItem(CLAIM_MAP_KEY, JSON.stringify(map)); } catch (_) { /* non-critical */ }
}

/**
 * Loads all sessions from localStorage.
 * @returns {Array}
 */
function _readSessions() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (_) { return []; }
}

/**
 * Writes sessions back to localStorage.
 * @param {Array} sessions
 */
function _writeSessions(sessions) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); } catch (_) { /* non-critical */ }
}

/**
 * Claims all anonymous sessions by re-tagging them with the Firebase UID.
 *
 * Steps:
 *  1. Check the claim-map — if this anonUid was already claimed, skip.
 *  2. Load all sessions and re-tag any whose userId === anonUid.
 *  3. Write sessions back.
 *  4. Persist the claim mapping so future reloads know this was done.
 *
 * @param {string} anonUid     - The localStorage UUID that was active before sign-in.
 * @param {string} firebaseUid - The Firebase Auth UID of the now-signed-in user.
 * @returns {number}           - Number of sessions re-tagged (0 if already claimed).
 */
export function claimAnonymousSessions(anonUid, firebaseUid) {
    try {
        if (!anonUid || !firebaseUid || anonUid === firebaseUid) return 0;

        // Idempotency: skip if this anonymous ID was already claimed
        const claimMap = _readClaimMap();
        if (claimMap[anonUid]) return 0;

        const sessions = _readSessions();
        let count = 0;

        const updated = sessions.map(session => {
            if (session && session.userId === anonUid) {
                count++;
                return { ...session, userId: firebaseUid, _claimedFrom: anonUid };
            }
            return session;
        });

        if (count > 0) {
            _writeSessions(updated);
        }

        // Record the mapping regardless (even if count=0, there may be future sessions)
        claimMap[anonUid] = firebaseUid;
        _writeClaimMap(claimMap);

        return count;
    } catch (e) {
        // Never throw — claim failure must not disrupt the sign-in flow
        if (typeof console !== 'undefined') {
            console.warn('[LearnTrace] claimAnonymousSessions failed silently:', e);
        }
        return 0;
    }
}

/**
 * Looks up whether an anonymous UID was previously claimed, and returns
 * the Firebase UID it was mapped to. Returns null if no mapping exists.
 *
 * Useful for restoring the correct user ID after a page reload when the
 * user is already signed in.
 *
 * @param {string} anonUid
 * @returns {string|null}
 */
export function getClaimedUid(anonUid) {
    try {
        const map = _readClaimMap();
        return map[anonUid] || null;
    } catch (_) { return null; }
}
