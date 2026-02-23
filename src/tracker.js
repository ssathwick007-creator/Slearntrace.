/**
 * LearnTrace — Tracker module (optional)
 *
 * Provides a self-contained tracker object (createTracker) that can be
 * embedded in any session. The main app (script.js) handles its own
 * tracking directly; this module is imported as an optional upgrade.
 *
 * Also exports classifySession() and generateFeedback() used by script.js
 * as richer alternatives to the built-in classifiers.
 */

/**
 * Creates a stateful tracker object for a single session.
 * Call start() when the session begins, recordKey() on each keydown,
 * tick() every second, submit() on each submit, and getMetrics() at the end.
 */
export function createTracker(opts = {}) {
	// Idle threshold in ms — user is considered idle after this silence duration
	const IDLE_THRESHOLD_MS = opts.idleThresholdMs || 2000;
	let startTime = null;
	let lastType = null;
	let keystrokes = 0;
	let edits = 0;
	let idleMs = 0;
	let submitCount = 0;

	return {
		start() {
			startTime = Date.now();
			lastType = startTime;
			keystrokes = 0;
			edits = 0;
			idleMs = 0;
			submitCount = 0;
		},
		recordKey(key) {
			if (!startTime) return;
			if (key === "Backspace" || key === "Delete") edits += 1;
			else if (key && key.length === 1) keystrokes += 1;
			lastType = Date.now();
		},
		/** Call once per second from setInterval to accumulate idle time. */
		tick() {
			if (!startTime) return;
			const now = Date.now();
			if (now - lastType >= IDLE_THRESHOLD_MS) {
				idleMs += 1000;
			}
		},
		submit() {
			submitCount += 1;
		},
		getMetrics() {
			const now = startTime ? Date.now() : startTime;
			return {
				durationSeconds: startTime ? Math.round((now - startTime) / 1000) : 0,
				keystrokes,
				edits,
				idleSeconds: Math.round(idleMs / 1000),
				submitCount,
			};
		},
	};
}

/**
 * Deterministic rule-based learner classification.
 * Same inputs always produce the same label — no randomness or ML.
 */
export function classifySession(metrics = {}) {
	// Deterministic rule-based classification per requirements.
	const {
		durationSeconds = 0,
		keystrokes = 0,
		edits = 0,
		idleSeconds = 0,
		submitCount = 0,
	} = metrics;

	// Tunable thresholds (conservative defaults)
	const HIGH_IDLE = 30; // seconds
	const MANY_EDITS = 15; // edits
	const MANY_RETRIES = 2; // submits
	const FAST_TYPING_RATE = 3; // keystrokes per second
	const FEW_EDITS = 3; // edits considered "few"

	const typingRate = durationSeconds > 0 ? keystrokes / durationSeconds : 0;

	// 1) Reflective Thinker: high idle + many edits
	if (idleSeconds >= HIGH_IDLE && edits >= MANY_EDITS) {
		return { label: 'Reflective Thinker', reason: 'reflective_thinker' };
	}

	// 2) Struggling Learner: many edits + many retries
	if (edits >= MANY_EDITS && submitCount >= MANY_RETRIES) {
		return { label: 'Struggling Learner', reason: 'struggling_learner' };
	}

	// 3) Fast Executor: very fast typing and few edits
	if (typingRate >= FAST_TYPING_RATE && edits <= FEW_EDITS) {
		return { label: 'Fast Executor', reason: 'fast_executor' };
	}

	// 4) Default
	return { label: 'Balanced Learner', reason: 'balanced' };
}

export function generateFeedback(classification, metrics = {}) {
	const { label, reason } = classification || {};
	const {
		durationSeconds = 0,
		keystrokes = 0,
		edits = 0,
		idleSeconds = 0,
		submitCount = 0,
	} = metrics;

	const summary = `This session took ${Math.max(0, Math.round(durationSeconds))}s, with ${keystrokes} keystrokes, ${edits} edits, and ${Math.round(idleSeconds)}s idle.`;
	let advice = '';

	if (reason === 'reflective_thinker') {
		advice = 'You showed extended pauses alongside many edits — this often means you are reflecting deeply and iterating on your understanding. Try summarizing key takeaways after each pause to lock in progress.';
	} else if (reason === 'struggling_learner') {
		advice = 'Multiple edits combined with repeated submissions suggests you may be struggling to settle on an explanation. Slow down, break the task into parts, and write one short summary before revising.';
	} else if (reason === 'fast_executor') {
		advice = 'You typed quickly with few revisions. That can be efficient, but adding a quick review pass can help catch misunderstandings and strengthen learning.';
	} else {
		advice = 'Your pattern looks balanced — a mix of writing and brief reflection. Keep alternating focused attempts with short reviews to reinforce learning.';
	}

	return `${summary} ${advice}`;
}

/**
 * Reads live session metrics that script.js exposes on window.
 * Returns { timeSpent, keystrokes, edits, idleTime } or null if unavailable.
 */
export function readCurrentSessionMetrics() {
	try {
		if (typeof window === 'undefined') return null;
		const live = window.__learnTraceLiveMetrics || null;
		if (!live) return null;

		// Normalise field names across versions
		const timeSpent = live.durationSeconds || live.timeSpent || 0;
		const keystrokes = live.keystrokes != null ? live.keystrokes : (live.totalKeystrokes != null ? live.totalKeystrokes : 0);
		const edits = live.edits != null ? live.edits : (live.totalEdits != null ? live.totalEdits : 0);
		const idleTime = live.idleSeconds != null ? live.idleSeconds : (live.idleTime != null ? live.idleTime : 0);

		return { timeSpent, keystrokes, edits, idleTime };
	} catch (e) {
		return null;
	}
}
