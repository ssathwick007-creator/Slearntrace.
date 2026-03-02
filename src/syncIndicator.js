/**
 * src/syncIndicator.js — sync status DOM driver
 *
 * Controls the #syncStatus element in index.html footer.
 * Three states: syncing / synced / offline.
 * Hidden when the element doesn't exist (anonymous mode / other pages).
 *
 * All functions are safe to call at any time — they never throw.
 */

const EL_ID = 'syncStatus';

/** @returns {HTMLElement|null} */
function getEl() {
    try { return document.getElementById(EL_ID); } catch (_) { return null; }
}

function setState(className, text) {
    try {
        const el = getEl();
        if (!el) return;
        el.className = `sync-status ${className}`;
        el.textContent = text;
        el.hidden = false;
    } catch (_) { /* non-critical */ }
}

/** Shows "⟳ Syncing…" */
export function setSyncing() {
    setState('sync-status--syncing', '⟳ Syncing…');
}

/** Shows "☁ Synced" (auto-hides after 4 s) */
export function setSynced() {
    setState('sync-status--synced', '☁ Synced');
    try {
        setTimeout(() => {
            const el = getEl();
            if (el && el.textContent === '☁ Synced') el.hidden = true;
        }, 4000);
    } catch (_) { /* non-critical */ }
}

/** Shows "○ Offline" */
export function setOffline() {
    setState('sync-status--offline', '○ Offline');
}

/** Hides the indicator entirely (call on sign-out). */
export function hideSyncStatus() {
    try {
        const el = getEl();
        if (el) el.hidden = true;
    } catch (_) { /* non-critical */ }
}
