/**
 * src/adaptiveEngine.js
 * Phase 7: Adaptive Learning Engine
 * 
 * Provides deterministic, client-side logic to select the next task,
 * assign difficulty, and generate a mentor-style nudge based on the
 * user's Learner Profile.
 */

/**
 * Derives a difficulty score (1-3) based on the user's profile.
 * High consistency + positive trend + enough sessions -> Level 3
 * Low consistency / negative trend -> Level 1
 * Default -> Level 2
 */
function computeDifficulty(profile) {
    if (!profile || profile.totalSessions < 3) return 1;

    let score = 2; // base level

    if (profile.consistencyScore >= 80 && profile.improvementTrend === 'improving') {
        score = 3;
    } else if (profile.consistencyScore < 50 || profile.improvementTrend === 'declining') {
        score = 1;
    }

    // Cap between 1 and 3
    return Math.max(1, Math.min(3, score));
}

/**
 * Maps learner patterns to ideal task types to challenge or support them.
 */
const TASK_TYPE_MAP = {
    // Needs to slow down -> Break down algorithms, reason through code
    'Fast Responder': ['Logical Reasoning', 'Problem Breakdown'],
    'Quick Submitter': ['Logical Reasoning', 'Problem Breakdown'],

    // Naturally reflective -> Deeper conceptual teaching
    'Reflective Learner': ['Concept Explanation', 'Teach a Beginner'],
    'Pause-and-Plan Learner': ['Concept Explanation', 'Teach a Beginner'],

    // Engages in heavy revision -> Reflect on the revision process itself
    'Revising Learner': ['Reflective Writing', 'Logical Reasoning'],
    'Persistent Learner': ['Reflective Writing', 'Teach a Beginner'],

    // Balanced or forming -> Spread evenly
    'Balanced Learner': ['Teach a Beginner', 'Logical Reasoning', 'Problem Breakdown'],
    'Slow but Careful Learner': ['Concept Explanation', 'Problem Breakdown'],
};

/**
 * Generates a short micro-feedback nudge based on learner profile state.
 */
function generateNudge(profile, difficulty) {
    if (!profile) return "Welcome. Complete a few sessions to see personalized nudges.";
    if (profile.totalSessions < 3) return "Keep going. Patterns will emerge as you complete more sessions.";

    const type = profile.dominantLearnerType || 'Emerging Pattern';

    if (difficulty === 3) {
        return "You've been highly consistent. You're ready for a challenge.";
    }

    if (profile.consistencyScore < 50) {
        return "Your pacing has varied recently. Focus on a steady rhythm this session.";
    }

    if (type === 'Fast Responder' || type === 'Quick Submitter') {
        return "Take a deep breath. Try to plan your thoughts before typing.";
    }

    if (type === 'Reflective Learner' || type === 'Revising Learner') {
        return "Your careful revisions are building strong understanding. Keep refining.";
    }

    return "Each session builds your learning pattern. Stay focused.";
}

/**
 * Main adaptive entry point.
 * Given a learner profile and a pool of tasks, selects the next task
 * intelligently without using randomization.
 * 
 * @param {Object|null} profile The derived learner profile (can be null for new/anon users)
 * @param {Array} taskPool The full array of available task objects
 * @param {number} fallbackIndex A sequential index to use heavily if profile is missing
 * @returns {Object} { task, difficulty, nudgeText }
 */
export function decideNextTask(profile, taskPool, fallbackIndex = 0) {
    // 1. If no profile, fallback to pure sequential exactly like before
    if (!profile || !profile.dominantLearnerType || taskPool.length === 0) {
        const idx = fallbackIndex % taskPool.length;
        return {
            task: taskPool[idx],
            difficulty: 1,
            nudgeText: "Complete a few sessions to generate your learning profile."
        };
    }

    // 2. Compute variables
    const difficulty = computeDifficulty(profile);
    const nudgeText = generateNudge(profile, difficulty);
    const learnerType = profile.dominantLearnerType;

    // 3. Select matching task category based on profile
    const preferredTypes = TASK_TYPE_MAP[learnerType] || ['Concept Explanation', 'Logical Reasoning'];

    // 4. Find the first task in the pool that matches the preferred types.
    // To ensure rotation, we offset by fallbackIndex.
    let selectedTask = null;
    const offset = fallbackIndex % taskPool.length;

    // Start searching from the offset
    for (let i = 0; i < taskPool.length; i++) {
        const candidateIdx = (offset + i) % taskPool.length;
        const candidate = taskPool[candidateIdx];
        if (preferredTypes.includes(candidate.type)) {
            selectedTask = candidate;
            break;
        }
    }

    // 5. Fallback if no specific type matched (safety net)
    if (!selectedTask) {
        selectedTask = taskPool[offset];
    }

    return {
        task: selectedTask,
        difficulty,
        nudgeText
    };
}
