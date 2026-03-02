/**
 * src/reportBuilder.js
 * Phase 8 - Research-Grade Learning Reports
 * Generates structured learning reports from raw sessions, analytics, and profile.
 */

import { analyzeSessions } from './analytics.js';
import { buildLearnerProfile } from './profileSynthesis.js';

/**
 * Builds a structured learning report object.
 * @param {Array} sessions - Array of session objects
 * @returns {Object} Extracted data: { report, profile, analytics }
 */
export function buildLearningReport(sessions) {
    if (!sessions || sessions.length === 0) {
        return null;
    }

    // Step 1: Pass data through existing local intelligence layers
    const analytics = analyzeSessions(sessions);
    const profile = buildLearnerProfile(sessions, analytics);

    const report = {
        summaryText: "",
        sections: [],
        evidence: [],
        recommendations: []
    };

    // 1. Overview
    report.sections.push({
        title: "Overview",
        content: `User presents as a ${profile.dominantLearnerType} with a focus score of ${profile.focusScore}/100 and a consistency score of ${profile.consistencyScore}/100. Total learning sessions tracked: ${sessions.length}.`
    });

    // 2. Behavioral Evidence
    const evidenceList = [];
    if (analytics.aggregates) {
        evidenceList.push(`Average Duration: ${Math.round(analytics.aggregates.avgDurationSec)}s per session`);
        evidenceList.push(`Average Speed: ${Math.round(analytics.aggregates.avgCpm)} CPM`);
        evidenceList.push(`Average Idle Time: ${Math.round(analytics.aggregates.avgIdleSec)}s`);
        evidenceList.push(`Average Edits: ${Math.round(analytics.aggregates.avgEdits)}`);
    }
    report.evidence = evidenceList;
    report.sections.push({
        title: "Behavioral Evidence",
        content: "Metrics driving these conclusions:\n- " + evidenceList.join("\n- ")
    });

    // 3. Learning Trajectory
    const trajectoryFactors = [];
    if (analytics.trends) {
        trajectoryFactors.push(`Focus trend is ${analytics.trends.focusTrend}`);
        trajectoryFactors.push(`Fluency trend is ${analytics.trends.fluencyTrend}`);
        trajectoryFactors.push(`Refinement trend is ${analytics.trends.refinementTrend}`);
    }
    report.sections.push({
        title: "Learning Trajectory",
        content: `Overall improvement trend: ${profile.improvementTrend}.\n` + trajectoryFactors.map(f => `- ${f}`).join('\n')
    });

    // 4. Strengths
    const strengths = [];
    if (profile.focusScore >= 70) strengths.push("Maintains high focus during active learning phases (Supported by low average idle time).");
    if (profile.improvementTrend === 'improving') strengths.push("Shows consistent improvement across recent sessions (Supported by positive multi-session trends).");
    if (profile.strongestTaskType) strengths.push(`Excels at '${profile.strongestTaskType}' tasks (Supported by highest CPM).`);
    if (analytics.comparisons && analytics.comparisons.refinement === 'more_than_avg') strengths.push("Exhibits deep refinement of thought (Supported by above-average edit counts).");
    if (strengths.length === 0) strengths.push("Developing baseline learning patterns.");

    report.sections.push({
        title: "Strengths",
        content: strengths.map(s => `- ${s}`).join('\n')
    });

    // 5. Areas for Growth
    const areasForGrowth = [];
    if (profile.focusScore < 50) areasForGrowth.push("Focus frequently breaks during active tasks (Evidence: High average idle time).");
    if (profile.weakestTaskType) areasForGrowth.push(`Encounters highest friction during '${profile.weakestTaskType}' tasks (Evidence: Lowest CPM).`);
    if (analytics.trends && analytics.trends.fluencyTrend === 'declining') areasForGrowth.push("Writing fluency has dropped recently (Evidence: Declining CPM in last 3 sessions).");
    if (areasForGrowth.length === 0) areasForGrowth.push("No critical growth areas identified currently.");

    report.sections.push({
        title: "Areas for Growth",
        content: areasForGrowth.map(a => `- ${a}`).join('\n')
    });

    // 6. Suggested Next Focus
    const recommendations = [];
    if (profile.weakestTaskType) {
        recommendations.push(`Assign more '${profile.weakestTaskType}' tasks to build familiarity.`);
    }
    if (profile.focusScore < 50) {
        recommendations.push("Implement shorter, higher-intensity sessions to build focus stamina.");
    }
    if (analytics.trends && analytics.trends.refinementTrend === 'declining') {
        recommendations.push("Encourage more active revision rather than first-draft submissions.");
    }
    if (recommendations.length === 0) {
        recommendations.push("Continue current varied task assignments to maintain steady growth.");
    }
    report.recommendations = recommendations;
    report.sections.push({
        title: "Suggested Next Focus",
        content: recommendations.map(r => `- ${r}`).join('\n')
    });

    report.summaryText = "A detailed analysis of learning patterns, behaviors, and progress trajectories, derived purely from client-side interaction metrics.";

    return { report, profile, analytics };
}

/**
 * Generates a human-readable text report.
 */
export function buildTextReportFromObject(reportObj) {
    if (!reportObj) return "No sufficient data to generate report.";
    const { report } = reportObj;

    const divider = '='.repeat(60);
    const minorDivider = '-'.repeat(60);

    const lines = [];
    lines.push("LEARNTRACE RESEARCH-GRADE LEARNING REPORT");
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push(divider);
    lines.push(report.summaryText);
    lines.push("");

    report.sections.forEach(sec => {
        lines.push(sec.title.toUpperCase());
        lines.push(minorDivider);
        lines.push(sec.content);
        lines.push("");
    });

    lines.push(divider);
    lines.push("Report generated deterministically via local client-side analysis. No external data mutation.");
    return lines.join('\n');
}

/**
 * Generates a structured JSON report format.
 */
export function buildJsonReportFromObject(reportObj, rawSessions) {
    if (!reportObj) return JSON.stringify({ error: "No sessions available" }, null, 2);

    return JSON.stringify({
        schemaVersion: "1.1",
        exportedAt: new Date().toISOString(),
        report: reportObj.report,
        profile: reportObj.profile,
        analytics: reportObj.analytics,
        rawSessions: rawSessions.map((s, i) => ({
            sessionId: s.timestamp ? String(s.timestamp) : `session-${i + 1}`,
            timestamp: s.timestamp || null,
            taskType: s.taskType || 'Unknown',
            metrics: {
                durationSeconds: Number(s.metrics?.durationSeconds) || 0,
                keystrokes: Number(s.metrics?.keystrokes) || 0,
                edits: Number(s.metrics?.edits) || 0,
                idleSeconds: Number(s.metrics?.idleSeconds) || 0,
                submits: Number(s.metrics?.retries || s.metrics?.submitAttempts) || 0,
            },
            derived: {
                patternLabel: s.pattern || s.classification || 'Unknown',
                sessionLabel: s.sessionLabel || null,
                insight: s.insight || null,
            },
            userResponse: s.response || '',
        }))
    }, null, 2);
}
