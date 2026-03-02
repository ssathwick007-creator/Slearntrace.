/**
 * src/multiDeviceInsight.js — cross-device learning intelligence
 *
 * Produces ONE short insight sentence that spans sessions from multiple devices.
 * Uses the same rule-based deterministic approach as computeComparisonSentence
 * in script.js — no AI, no ML, fully offline-capable.
 *
 * Call this after a cloud sync when downloaded sessions may include data
 * from other devices. Results are displayed in the existing Insights panel.
 *
 * Returns null when:
 *  - fewer than 3 sessions exist
 *  - sessions are only from one device
 *  - data is insufficient for a meaningful trend
 */

/**
 * @param {{ timestamp:number, deviceId?:string, metrics?:object }[]} sessions
 * @returns {string|null}
 */
export function getMultiDeviceInsight(sessions) {
    try {
        if (!Array.isArray(sessions) || sessions.length < 3) return null;

        // Check how many distinct devices contributed sessions
        const deviceIds = new Set(sessions.map(s => s.deviceId || 'unknown').filter(Boolean));
        if (deviceIds.size < 2) return null;

        // Sort oldest → newest
        const sorted = sessions
            .slice()
            .filter(s => s && typeof s.timestamp === 'number')
            .sort((a, b) => a.timestamp - b.timestamp);

        if (sorted.length < 3) return null;

        function metricOf(s) {
            const m = s.metrics || {};
            return {
                dur: Number(m.durationSeconds) || 0,
                idle: Number(m.idleSeconds) || 0,
                edits: Number(m.edits) || 0,
                ks: Number(m.keystrokes) || 0,
            };
        }

        const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

        // Split into two halves: older vs newer
        const half = Math.floor(sorted.length / 2);
        const older = sorted.slice(0, half);
        const newer = sorted.slice(half);

        const oldDur = avg(older.map(s => metricOf(s).dur));
        const newDur = avg(newer.map(s => metricOf(s).dur));
        const oldIdle = avg(older.map(s => metricOf(s).idle));
        const newIdle = avg(newer.map(s => metricOf(s).idle));
        const oldEdits = avg(older.map(s => metricOf(s).edits));
        const newEdits = avg(newer.map(s => metricOf(s).edits));

        function pct(from, to) {
            if (!from) return null;
            return Math.round(((to - from) / from) * 100);
        }

        const durDelta = pct(oldDur, newDur);
        const idleDelta = pct(oldIdle, newIdle);
        const editsDelta = pct(oldEdits, newEdits);

        // Focus duration improving across devices
        if (durDelta !== null && durDelta >= 15) {
            return `Across devices, your focus duration is improving — sessions are getting longer and more sustained.`;
        }

        // Idle time reducing = better concentration
        if (idleDelta !== null && idleDelta <= -20) {
            return `Across devices, your idle time is decreasing — you're spending more of each session actively writing.`;
        }

        // Revision activity rising = deeper engagement
        if (editsDelta !== null && editsDelta >= 20) {
            return `Across devices, your revision activity is increasing — a sign of deeper engagement with the material.`;
        }

        // Consistent pace across devices
        const allConsistent =
            (durDelta === null || Math.abs(durDelta) < 10) &&
            (idleDelta === null || Math.abs(idleDelta) < 10) &&
            (editsDelta === null || Math.abs(editsDelta) < 15);

        if (allConsistent) {
            return `Your learning pace is consistent across devices — a reliable baseline for tracking real improvement.`;
        }

        return `Your sessions span multiple devices — keep going to build a clearer cross-device learning trend.`;
    } catch (_) {
        return null;
    }
}
