/**
 * src/analytics.js
 * Learning Analytics Layer (Phase 5)
 * Pure JS module for analyzing user behavior across sessions.
 */

export function analyzeSessions(sessions) {
    if (!sessions || sessions.length === 0) {
        return {
            aggregates: null,
            trends: null,
            comparisons: null,
            taskPatterns: null,
            insightText: []
        };
    }

    // 1. Aggregated Metrics
    let totalDuration = 0, totalKeystrokes = 0, totalIdle = 0, totalEdits = 0;
    const count = sessions.length;

    sessions.forEach(s => {
        const m = s.metrics || {};
        totalDuration += Number(m.durationSeconds) || 0;
        totalKeystrokes += Number(m.keystrokes) || 0;
        totalIdle += Number(m.idleSeconds) || 0;
        totalEdits += Number(m.edits) || 0;
    });

    const aggregates = {
        totalSessions: count,
        avgDurationSec: totalDuration / count,
        avgCpm: totalKeystrokes / Math.max((totalDuration / 60), 0.01),
        avgIdleSec: totalIdle / count,
        avgEdits: totalEdits / count
    };

    // 2. Trend Detection (Session-to-Session)
    const trends = {
        focusTrend: 'neutral',
        fluencyTrend: 'neutral',
        refinementTrend: 'neutral'
    };

    if (count >= 3) {
        const recent = sessions.slice(-3); // Last 3 sessions
        const idles = recent.map(s => Number(s.metrics?.idleSeconds) || 0);
        const cpms = recent.map(s => {
            const durMins = Math.max(Number(s.metrics?.durationSeconds) || 0, 1) / 60;
            return (Number(s.metrics?.keystrokes) || 0) / durMins;
        });
        const edits = recent.map(s => Number(s.metrics?.edits) || 0);

        // Focus: strictly decreasing idle time
        if (idles[2] < idles[1] && idles[1] < idles[0]) trends.focusTrend = 'improving';
        else if (idles[2] > idles[1] && idles[1] > idles[0]) trends.focusTrend = 'declining';

        // Fluency: strict increasing CPM
        if (cpms[2] > cpms[1] && cpms[1] > cpms[0]) trends.fluencyTrend = 'improving';
        else if (cpms[2] < cpms[1] && cpms[1] < cpms[0]) trends.fluencyTrend = 'declining';

        // Refinement: decreasing edits
        if (edits[2] < edits[1] && edits[1] < edits[0]) trends.refinementTrend = 'improving';
        else if (edits[2] > edits[1] && edits[1] > edits[0]) trends.refinementTrend = 'declining';
    }

    // 3. Comparative Feedback (Latest vs Average)
    const comparisons = {};
    const insightText = [];

    const latest = sessions[count - 1];
    const lMetrics = latest.metrics || {};
    const lIdle = Number(lMetrics.idleSeconds) || 0;
    const lEdits = Number(lMetrics.edits) || 0;

    if (count > 1) {
        if (lIdle < aggregates.avgIdleSec * 0.8) {
            comparisons.focus = 'better_than_avg';
            insightText.push("You paused less than usual this session.");
        } else if (lIdle > aggregates.avgIdleSec * 1.2) {
            comparisons.focus = 'worse_than_avg';
            insightText.push("You paused more than your average this session.");
        }

        if (lEdits > aggregates.avgEdits * 1.2) {
            comparisons.refinement = 'more_than_avg';
            insightText.push("You revised more than your average — deeper refinement.");
        } else if (lEdits < aggregates.avgEdits * 0.8) {
            comparisons.refinement = 'less_than_avg';
        }
    }

    // Multi-session trend feedback
    if (trends.focusTrend === 'improving') {
        insightText.push("Your idle time has decreased over the last 3 sessions — focus is improving.");
    }
    if (trends.fluencyTrend === 'improving') {
        insightText.push("Your writing fluency (CPM) is steadily increasing.");
    }
    if (trends.refinementTrend === 'improving') {
        insightText.push("Your edit count is decreasing, showing cognitive refinement.");
    }

    // 4. Task-Aware Analytics
    const taskPatterns = {};
    sessions.forEach(s => {
        const t = s.taskType || 'Unknown';
        if (!taskPatterns[t]) {
            taskPatterns[t] = { count: 0, totalDuration: 0, totalCpm: 0 };
        }
        taskPatterns[t].count++;
        taskPatterns[t].totalDuration += Number(s.metrics?.durationSeconds) || 0;
        const durMins = Math.max(Number(s.metrics?.durationSeconds) || 0, 1) / 60;
        taskPatterns[t].totalCpm += (Number(s.metrics?.keystrokes) || 0) / durMins;
    });

    Object.keys(taskPatterns).forEach(t => {
        const p = taskPatterns[t];
        p.avgDuration = Math.round(p.totalDuration / p.count);
        p.avgCpm = Math.round(p.totalCpm / p.count);
    });

    return { aggregates, trends, comparisons, taskPatterns, insightText };
}
