/**
 * src/profileSynthesis.js — Phase 6 Learning Profile Synthesis
 * 
 * Provides deterministic mapping from raw session analytics to a semantic
 * learner identity/profile. Pure functions only; no side effects.
 */

export function buildLearnerProfile(sessions, analyticsResult) {
    if (!sessions || sessions.length === 0) return null;

    const profile = {
        dominantLearnerType: 'Unknown',
        focusScore: 0,
        consistencyScore: 0,
        improvementTrend: 'neutral',
        strongestTaskType: null,
        weakestTaskType: null,
        totalSessions: sessions.length,
        lastUpdated: Date.now()
    };

    if (!analyticsResult || !analyticsResult.aggregates) return profile;

    const ag = analyticsResult.aggregates;

    // 1. Dominant Learner Type
    // Threshold heuristics based on Phase 5 analytics.
    const avgEdits = ag.avgEdits || 0;
    const avgIdle = ag.avgIdleSec || 0;
    const avgCpm = ag.avgCpm || 0;

    if (avgEdits >= 12) {
        profile.dominantLearnerType = 'Meticulous Editor';
    } else if (avgIdle > 25) {
        profile.dominantLearnerType = 'Reflective Thinker';
    } else if (avgCpm >= 180) {
        profile.dominantLearnerType = 'Rapid Drafter';
    } else if (avgCpm >= 90 && avgIdle < 15) {
        profile.dominantLearnerType = 'Fluent Writer';
    } else {
        profile.dominantLearnerType = 'Steady Pacer';
    }

    // 2. Focus Score (0 - 100)
    // Scale: 0 idle = 100 score, ~80s idle = 0 score
    profile.focusScore = Math.max(0, Math.min(100, Math.round(100 - (avgIdle * 1.25))));

    // 3. Consistency Score (0 - 100)
    // A simple programmatic scale: hitting 15+ sessions gets you close to 100
    // but the curve slows down after 5 sessions.
    const sessionScore = Math.min(60, sessions.length * 6);
    // If variance is low, we could add points. Let's stick to session volume & steady focus
    const focusBonus = Math.round(profile.focusScore * 0.4);
    profile.consistencyScore = Math.min(100, sessionScore + focusBonus);

    // 4. Improvement Trend
    // Extract multi-session signals from Phase 5 analytics.
    if (analyticsResult.trends) {
        const { focusTrend, fluencyTrend, refinementTrend } = analyticsResult.trends;
        if (focusTrend === 'improving' || fluencyTrend === 'improving' || refinementTrend === 'improving') {
            profile.improvementTrend = 'improving';
        } else if (focusTrend === 'declining' && fluencyTrend === 'declining') {
            profile.improvementTrend = 'declining';
        }
    }

    // 5. Task Types Analytics
    // Finds the best and worst performing tasks by writing speed (CPM)
    if (analyticsResult.taskPatterns) {
        const types = Object.keys(analyticsResult.taskPatterns)
            .filter(t => t !== 'Unknown' && t !== '')
            .map(t => ({
                id: t,
                cpm: analyticsResult.taskPatterns[t].avgCpm || 0
            }))
            .sort((a, b) => b.cpm - a.cpm);

        if (types.length > 0) {
            profile.strongestTaskType = types[0].id;
            profile.weakestTaskType = types[types.length - 1].id;
        }
    }

    return profile;
}
