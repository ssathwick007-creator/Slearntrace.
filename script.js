/**
 * LearnTrace — core session logic
 *
 * Architecture: single IIFE wrapping all session state.
 * The module pattern (no global leakage) keeps the app safe for
 * future ES-module migration or auth layering.
 *
 * AUTH EXTENSION POINT — see userContext.js.
 * When auth is ready, only userContext.js needs to change.
 */
import { getUserId as _getUserIdFromContext, getUserRole } from './userContext.js';
(function () {
  "use strict";

  // Prevent double-initialization (guards against Vite HMR double-register)
  try {
    if (window.__learnTraceInitialized) return;
    window.__learnTraceInitialized = true;
  } catch (e) { /* ignore */ }

  // Prevent all zoom gestures (pinch-zoom and double-tap zoom)
  (function preventZoom() {
    const stopper = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', stopper, { passive: false });
    document.addEventListener('touchmove', stopper, { passive: false });
  })();

  // ─── DOM refs ─────────────────────────────────────────────────────────────
  const responseInput = document.getElementById("responseInput");
  const startBtn = document.getElementById("startBtn");
  const submitBtn = document.getElementById("submitBtn");
  const timeSpentDisplay = document.getElementById("timeSpentDisplay");
  const keystrokesDisplay = document.getElementById("keystrokesDisplay");
  const editsDisplay = document.getElementById("editsDisplay");
  const idleTimeDisplay = document.getElementById("idleTimeDisplay");
  const retriesDisplay = document.getElementById("retriesDisplay");
  const classificationDisplay = document.getElementById("classificationDisplay");
  const feedbackDisplay = document.getElementById("feedbackDisplay");
  const insightDisplay = document.getElementById("insightDisplay");
  const historyList = document.getElementById("historyList");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const sessionStatusPill = document.getElementById("sessionStatusPill");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const miniTimerEl = document.getElementById("miniTimer");
  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  const prevQuestionBtn = document.getElementById("prevQuestionBtn");

  const STORAGE_KEY = "learnTraceAttempts";
  const THEME_STORAGE_KEY = "learnTraceTheme";
  const FALLBACK_QUESTIONS = [
    { id: "q1", questionText: "If all roses are flowers and some flowers fade quickly, can we say some roses fade quickly? Explain." },
    { id: "q2", questionText: "A bat and ball cost $1.10. Bat costs $1 more than ball. How much is the ball?" },
    { id: "q3", questionText: "Three people pay $30 for room, manager refunds $5, bellboy keeps $2 — where is the missing dollar?" }
  ];

  // ─── Task pool ────────────────────────────────────────────────────────────
  // (Obsolete - Tasks now loaded from backend)



  // Current task for this page load — set once in init(), read in submit handler
  let currentTask = null;
  let nextQuestionId = null;
  let prevQuestionId = null;

  // ─── Session state ────────────────────────────────────────────────────────
  let sessionActive = false;
  let startTimeMs = 0;
  let keystrokes = 0;
  let edits = 0;
  let totalIdleSeconds = 0;
  let retries = 0;
  let lastTypeTimeMs = 0;
  let lastIdleTickMs = 0;
  let timerIntervalId = null;
  // Tracks whether the tab is currently visible; used to pause idle on blur
  let tabVisible = true;
  // Double-click / rapid-click guards — prevent duplicate session start/submit
  let _startLocked = false;
  let _submitLocked = false;
  // Idempotency flag: prevents endSession running twice in the same tick
  let _sessionEnding = false;

  // Configuration — tweak these thresholds without touching logic
  const IDLE_THRESHOLD_MS = 3000; // user is "idle" after 3 s of no typing
  const TIMER_TICK_MS = 1000; // UI update interval

  // ─── Debug logging ────────────────────────────────────────────────────────
  // Set window.__LEARNTRACE_DEBUG = true in the console to re-enable logs.
  function dbg(...args) {
    try { if (window.__LEARNTRACE_DEBUG) console.log('[LearnTrace]', ...args); } catch (e) { }
  }

  function safeLog(err, ctx) {
    try { if (window.__LEARNTRACE_DEBUG && console.error) console.error('[LearnTrace]', ctx || '', err); } catch (e) { }
  }

  // ─── Utilities ────────────────────────────────────────────────────────────
  function nowMs() { return Date.now(); }

  function formatSeconds(sec) {
    sec = Math.max(0, Math.round(sec));
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return s === 0 ? `${m}m` : `${m}m ${s}s`;
  }

  const BACKEND_URL = import.meta.env?.VITE_BACKEND_URL || (['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? 'http://localhost:5000'
    : 'https://learntrace-backend.onrender.com');

  // ─── Backend Integration ──────────────────────────────────────────────────
  async function fetchReflectionQuestion(id = null) {
    if (getUserRole() === 'anonymous') {
      const taskTextEl = document.getElementById('taskText');
      if (taskTextEl) taskTextEl.textContent = "Please sign in to view and practice reflection questions.";
      return;
    }
    try {
      const url = id
        ? `${BACKEND_URL}/api/reflection?currentId=${id}`
        : `${BACKEND_URL}/api/reflection`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch question');

      const data = await response.json();

      // If we asked for a specific ID, the backend returns { current, next, prev }
      if (id && data.current) {
        currentTask = {
          id: data.current.id,
          type: 'Logical Reasoning',
          text: data.current.questionText
        };
        nextQuestionId = data.next ? data.next.id : null;
        prevQuestionId = data.prev ? data.prev.id : null;
      } else if (Array.isArray(data) && data.length > 0) {
        // First load: pick the first one and fetch its full details (next/prev)
        const first = data[0];
        return fetchReflectionQuestion(first.id);
      } else if (data.current) {
        // Fallback for when backend might return a single object as default
        currentTask = {
          id: data.current.id,
          type: 'Logical Reasoning',
          text: data.current.questionText
        };
        nextQuestionId = data.next ? data.next.id : null;
        prevQuestionId = data.prev ? data.prev.id : null;
      }

      updateTaskUI();
    } catch (e) {
      safeLog(e, 'fetchReflectionQuestion');

      // FALLBACK LOGIC: Use hardcoded array if backend fails
      const fallbackList = FALLBACK_QUESTIONS;
      let q;
      if (id) {
        const idx = fallbackList.findIndex(item => item.id === id);
        if (idx !== -1) {
          q = fallbackList[idx];
          nextQuestionId = fallbackList[idx + 1] ? fallbackList[idx + 1].id : null;
          prevQuestionId = fallbackList[idx - 1] ? fallbackList[idx - 1].id : null;
        }
      }

      if (!q && fallbackList.length > 0) {
        q = fallbackList[0];
        nextQuestionId = fallbackList[1] ? fallbackList[1].id : null;
        prevQuestionId = null;
      }

      if (q) {
        currentTask = { id: q.id, type: 'Logical Reasoning', text: q.questionText };
        updateTaskUI();
      } else {
        const taskTextEl = document.getElementById('taskText');
        if (taskTextEl) taskTextEl.textContent = "Unable to load questions. Please check your connection.";
      }
    }
  }

  function updateTaskUI() {
    if (!currentTask) return;
    const taskTextEl = document.getElementById('taskText');
    const taskTypeEl = document.getElementById('taskType');
    if (taskTextEl) taskTextEl.textContent = currentTask.text;
    if (taskTypeEl) taskTypeEl.textContent = currentTask.type;

    // Toggle navigation buttons visibility
    if (nextQuestionBtn) {
      nextQuestionBtn.style.display = nextQuestionId ? 'flex' : 'none';
    }
    if (prevQuestionBtn) {
      prevQuestionBtn.style.display = prevQuestionId ? 'flex' : 'none';
    }
  }

  // ─── Live metrics (shared with chatbot.js via window) ─────────────────────
  // chatbot.js reads window.__learnTraceLiveMetrics to give context-aware hints
  try { if (typeof window !== 'undefined') window.__learnTraceLiveMetrics = null; } catch (e) { }

  function exposeLiveMetrics() {
    try {
      window.__learnTraceLiveMetrics = {
        durationSeconds: sessionActive && startTimeMs ? Math.round((nowMs() - startTimeMs) / 1000) : 0,
        keystrokes: keystrokes || 0,
        edits: edits || 0,
        idleSeconds: totalIdleSeconds || 0,
        startTimeMs: startTimeMs || null,
      };
    } catch (e) { /* non-critical */ }
  }

  // ─── Auth abstraction ─────────────────────────────────────────────────────
  // Delegates to userContext.js — that is the ONLY file to edit when adding auth.
  // Do NOT change any call sites; getUserId() is used consistently below.
  function getUserId() {
    try {
      return _getUserIdFromContext();
    } catch (e) { return 'anonymous'; }
  }

  // ─── Storage (lazy-loaded module, localStorage fallback) ──────────────────
  let storageModule = null;
  async function getStorageModule() {
    if (storageModule) return storageModule;
    try {
      storageModule = await import('./src/storage.js');
      return storageModule;
    } catch (e) {
      storageModule = null;
      return null;
    }
  }

  async function readAttemptsFromStorage() {
    const m = await getStorageModule();
    if (m && typeof m.getSessions === 'function') return m.getSessions();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }

  async function writeAttemptsToStorage(attempts) {
    const m = await getStorageModule();
    if (m && typeof m.saveSessions === 'function') return m.saveSessions(attempts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
      return true;
    } catch (e) {
      // QuotaExceededError: drop oldest session and retry once
      if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
        try {
          const trimmed = attempts.slice(-40); // keep 40 most recent
          localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
          return true;
        } catch (_) { return false; }
      }
      return false;
    }
  }

  async function clearAllSessions() {
    const m = await getStorageModule();
    if (m && typeof m.clearSessions === 'function') return m.clearSessions();
    try { localStorage.removeItem(STORAGE_KEY); return true; } catch (e) { return false; }
  }

  // ─── Tracker module (optional, adds richer classification) ────────────────
  let trackerModule = null;
  async function getTrackerModule() {
    if (trackerModule) return trackerModule;
    try {
      trackerModule = await import('./src/tracker.js');
      return trackerModule;
    } catch (e) { trackerModule = null; return null; }
  }

  // ─── Session control ──────────────────────────────────────────────────────

  function resetMetricsDisplay() {
    if (timeSpentDisplay) timeSpentDisplay.textContent = "0s";
    if (keystrokesDisplay) keystrokesDisplay.textContent = "0";
    if (editsDisplay) editsDisplay.textContent = "0";
    if (idleTimeDisplay) idleTimeDisplay.textContent = "0s";
    if (retriesDisplay) retriesDisplay.textContent = "0";
  }

  function resetSessionState() {
    sessionActive = false;
    _sessionEnding = false;
    startTimeMs = 0;
    keystrokes = 0;
    edits = 0;
    totalIdleSeconds = 0;
    lastTypeTimeMs = 0;
    lastIdleTickMs = 0;
    retries = 0;
    // Always clear the interval, even if we think it's null (defensive)
    try {
      if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
    } catch (e) { safeLog(e, 'resetSessionState clearing timer'); }
    // Remove in-progress session flag from storage
    try { localStorage.removeItem("learnTrace.sessionActive"); } catch (e) { }
    try { exposeLiveMetrics(); } catch (e) { }
    // Hide mini timer in the corner
    try {
      if (miniTimerEl) {
        miniTimerEl.classList.remove('visible');
        miniTimerEl.setAttribute('aria-hidden', 'true');
        miniTimerEl.textContent = '0s';
      }
    } catch (e) { }
  }

  function setSessionStatus(text, status) {
    if (!sessionStatusPill) return;
    sessionStatusPill.textContent = text;
    sessionStatusPill.classList.remove("pill--active", "pill--ended");
    if (status === "active") sessionStatusPill.classList.add("pill--active");
    if (status === "ended") sessionStatusPill.classList.add("pill--ended");
  }

  function applyAuthGating() {
    const isAnon = getUserRole() === 'anonymous';
    const practiceButtons = [startBtn, submitBtn, nextQuestionBtn, prevQuestionBtn, clearHistoryBtn];

    practiceButtons.forEach(btn => {
      if (btn) {
        btn.disabled = isAnon;
        btn.style.opacity = isAnon ? "0.5" : "1";
        btn.style.cursor = isAnon ? "not-allowed" : "";
      }
    });

    if (responseInput) {
      responseInput.disabled = isAnon;
      responseInput.placeholder = isAnon ? "Sign in to start a session." : "Press 'Start Session' to begin.";
    }

    if (isAnon) {
      if (classificationDisplay) classificationDisplay.textContent = "Sign in required";
      if (feedbackDisplay) feedbackDisplay.textContent = "Please sign in to see behavioral insights.";
      if (insightDisplay) insightDisplay.textContent = "";
      const taskTextEl = document.getElementById('taskText');
      if (taskTextEl) taskTextEl.textContent = "Please sign in to access practice features.";
    } else {
      // If we just signed in, load the question
      if (!currentTask) fetchReflectionQuestion();
    }
  }

  window.addEventListener('auth-ready', () => {
    applyAuthGating();
    renderHistory();
  });

  function startSession() {
    // Guard: do nothing if already active (prevents double-start on rapid clicks)
    if (sessionActive) return;

    // Clear any orphan interval before creating a new one
    if (timerIntervalId !== null) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }

    resetSessionState();
    sessionActive = true;
    startTimeMs = nowMs();
    lastTypeTimeMs = startTimeMs;
    lastIdleTickMs = startTimeMs;
    retries = 0;

    try { exposeLiveMetrics(); } catch (e) { }

    // Show mini floating timer
    try {
      if (miniTimerEl) {
        miniTimerEl.classList.add('visible');
        miniTimerEl.setAttribute('aria-hidden', 'false');
        miniTimerEl.textContent = '0s';
      }
    } catch (e) { }

    // Flag an in-progress session so a refresh can detect the stale state
    try { localStorage.setItem("learnTrace.sessionActive", String(startTimeMs)); } catch (e) { }

    // Disable Start while session is live; enable Submit once user types
    if (startBtn) startBtn.disabled = true;
    if (submitBtn) submitBtn.disabled = true;
    if (responseInput) {
      responseInput.value = "";
      responseInput.disabled = false;
      try { responseInput.focus(); } catch (e) { }
    }

    resetMetricsDisplay();
    setSessionStatus("Session: In progress", "active");

    // ── Timer tick — runs every second ──────────────────────────────────────
    timerIntervalId = setInterval(() => {
      try {
        if (!sessionActive) return; // guard: session may have ended between ticks

        const now = nowMs();
        const elapsedSec = (now - startTimeMs) / 1000;

        // Update elapsed time display and mini timer
        if (timeSpentDisplay) timeSpentDisplay.textContent = formatSeconds(elapsedSec);
        try { if (miniTimerEl) miniTimerEl.textContent = formatSeconds(elapsedSec); } catch (e) { }

        // Idle detection: only count idle when tab is visible
        // (prevents runaway idle accumulation when user switches tabs)
        if (tabVisible) {
          const msSinceLastIdleTick = now - lastIdleTickMs;
          if (msSinceLastIdleTick >= TIMER_TICK_MS) {
            const msSinceType = now - lastTypeTimeMs;
            if (msSinceType >= IDLE_THRESHOLD_MS) {
              // Add full seconds elapsed since last tick to idle counter
              const idleIncrement = Math.floor(msSinceLastIdleTick / 1000);
              if (idleIncrement > 0) {
                totalIdleSeconds += idleIncrement;
                if (idleTimeDisplay) idleTimeDisplay.textContent = formatSeconds(totalIdleSeconds);
              }
            }
            lastIdleTickMs = now;
          }
        } else {
          // Tab hidden → reset lastIdleTickMs so we don't count hidden time as idle
          lastIdleTickMs = now;
        }

        try { exposeLiveMetrics(); } catch (e) { }
      } catch (e) {
        safeLog(e, 'session timer tick');
      }
    }, TIMER_TICK_MS);
  }

  function endSession() {
    if (!sessionActive || _sessionEnding) return; // idempotency guard
    _sessionEnding = true;
    sessionActive = false;
    // Stop the interval immediately to prevent further ticks
    if (timerIntervalId !== null) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
    if (submitBtn) submitBtn.disabled = true;
    if (responseInput) responseInput.disabled = true;
    setSessionStatus("Session: Completed", "ended");
    if (startBtn) startBtn.disabled = false;
    _startLocked = false; // ensure start is re-enabled after session ends
    try { localStorage.removeItem("learnTrace.sessionActive"); } catch (e) { }
    try { exposeLiveMetrics(); } catch (e) { }
    // Hide mini timer
    try {
      if (miniTimerEl) {
        miniTimerEl.classList.remove('visible');
        miniTimerEl.setAttribute('aria-hidden', 'true');
        miniTimerEl.textContent = '0s';
      }
    } catch (e) { }
    _sessionEnding = false;
  }

  // ─── Classification (rule-based, deterministic, no API) ───────────────────
  /**
   * Returns { label: string, tone: string } from raw session metrics.
   * Rules are intentionally simple and explainable — no ML.
   * Priority order matters: more specific checks appear first.
   */
  function classifyAttempt({ durationSeconds, totalEdits, totalKeystrokes, idleSeconds, submitAttempts }) {
    const longTime = durationSeconds >= 90;
    const mediumTime = durationSeconds >= 30 && durationSeconds < 90;
    const shortTime = durationSeconds < 30;

    const manyEdits = totalEdits >= 25;
    const highEdits = totalEdits >= 15;
    const fewEdits = totalEdits < 8;
    const steadyEdits = totalEdits >= 8 && totalEdits <= 30;
    const veryFewKeys = totalKeystrokes < 40;

    const highIdle = idleSeconds >= 30;
    const someIdle = idleSeconds >= 10;
    const manyRetries = submitAttempts >= 2;

    // Priority 1 — Reflective: pauses deeply and resubmits
    if ((highIdle || (someIdle && steadyEdits)) && manyRetries)
      return { label: "Reflective Learner", tone: "reflective" };

    // Priority 2 — Revising: actively self-correcting
    if (highEdits && !shortTime)
      return { label: "Revising Learner", tone: "revising" };

    // Priority 3 — Quick Submitter: very fast with minimal effort (checked BEFORE Fast Responder)
    if (shortTime && fewEdits && veryFewKeys)
      return { label: "Quick Submitter", tone: "ai_dependency" };

    // Priority 4 — Fast Responder: quick but genuine (has edits)
    if (shortTime && !fewEdits)
      return { label: "Fast Responder", tone: "fast_responder" };

    // Priority 5 — Balanced: healthy rhythm
    if (mediumTime && steadyEdits)
      return { label: "Balanced Learner", tone: "balanced" };

    // Priority 6 — Persistent: long session with many revisions
    if (longTime && manyEdits)
      return { label: "Persistent Learner", tone: "persistent" };

    // Fallback A — slow but thorough
    if (longTime && !manyEdits)
      return { label: "Slow but Careful Learner", tone: "slow_careful" };

    // Fallback B — pauses without retrying
    if (someIdle && !manyRetries)
      return { label: "Pause-and-Plan Learner", tone: "reflective" };

    return { label: "Emerging Pattern", tone: "neutral" };
  }

  /**
   * Generates mentor-style paragraph feedback from a classification + metrics.
   * Deterministic: same inputs always produce the same output.
   */
  function generateFeedback(classification, metrics) {
    const { tone } = classification;
    const { durationSeconds, totalEdits, idleSeconds, submitAttempts } = metrics;

    const dStr = formatSeconds(durationSeconds);
    const iStr = formatSeconds(idleSeconds);
    const base = `You spent ${dStr}, made ${totalEdits} edit${totalEdits === 1 ? '' : 's'}, and paused for ${iStr}.`;

    const toneMap = {
      revising: 'You revised actively — this is where real understanding is built. Notice what you changed each time: that awareness is more valuable than the final wording.',
      fast_responder: 'You answered quickly and with confidence. Great! Make sure it came from your own thinking — try re-explaining it in one minute without looking back.',
      persistent: 'You stayed with it through many revisions. That persistence builds deep understanding — keep refining rather than aiming for perfection on the first try.',
      ai_dependency: 'This session was very brief with minimal revision. Try slowing down to put ideas into your own words and make at least one or two genuine revisions.',
      balanced: 'Good pacing — you gave yourself time to think, revised a few times, then committed. This is a healthy learning rhythm. Keep building on it.',
      reflective: 'Your pauses and resubmissions suggest thoughtful reflection. Make sure that reflection is about your own understanding, not just searching for the right phrasing.',
      slow_careful: 'You took your time carefully. Try adding more small revisions — rewriting is often where deeper understanding surfaces.',
      neutral: "Your pattern is still forming — that's perfectly normal. Each session adds a data point. Keep going and patterns will emerge.",
    };

    const mentor = toneMap[tone] || toneMap.neutral;
    const retryNote = submitAttempts > 1
      ? ` You submitted ${submitAttempts} times — try noticing what changed between each attempt.`
      : ' You submitted once — good confidence. Give yourself space to revise in future sessions.';

    return `${base} ${mentor}${retryNote}`;
  }

  /**
   * Generates ONE short, supportive insight sentence from session metrics.
   * Stored with the session record and displayed in the Insights panel.
   * Deterministic: same inputs → same sentence.
   */
  function generateInsight(metrics, classificationLabel) {
    const { durationSeconds, totalEdits, totalKeystrokes, idleSeconds, submitAttempts } = metrics;

    // Metric-first checks (most salient signal wins)
    if (totalEdits >= 20 && idleSeconds >= 20)
      return "You paused frequently and revised many times — a strong sign of active, reflective learning.";
    if (totalEdits >= 15)
      return "High revision count this session — you're actively shaping and refining your thinking.";
    if (idleSeconds >= 40)
      return "Extended pauses suggest deep thinking; try writing down what you were considering during those moments.";
    if (durationSeconds < 20 && totalKeystrokes < 40)
      return "Very quick session — challenge yourself to slow down and put more of your thinking on the page.";
    if (submitAttempts >= 3)
      return "Multiple submissions show persistence — notice what changed between each attempt.";
    if (durationSeconds >= 90 && totalEdits < 10)
      return "Long session with few edits suggests careful deliberation — consider externalizing more of that thinking.";

    // Label-based fallbacks — use exact string matching for determinism
    const lbl = classificationLabel || "";
    if (lbl === "Balanced Learner")
      return "Balanced effort this session — a healthy mix of writing, pausing, and revising.";
    if (lbl === "Fast Responder")
      return "Quick and confident — make sure the response truly came from your own understanding.";
    if (lbl === "Quick Submitter")
      return "Very short session with little revision — try spending more time putting ideas in your own words.";
    if (lbl === "Reflective Learner" || lbl === "Pause-and-Plan Learner")
      return "Thoughtful pacing — your pauses and revisions reveal genuine engagement with the material.";
    if (lbl === "Revising Learner")
      return "Active revision is where real understanding forms — keep refining your explanations.";
    if (lbl === "Persistent Learner")
      return "Staying with a task through many revisions builds lasting understanding.";
    if (lbl === "Slow but Careful Learner")
      return "Careful and deliberate — try writing smaller ideas as you go to capture your thinking process.";

    return "Each session teaches you something about how you think — keep going and patterns will emerge.";
  }

  // ─── Session auto-label (Task 2) ──────────────────────────────────────────
  /**
   * Derives a concise, human-friendly session label from existing metrics.
   * Uses no new tracking — only the same values already captured.
   * Priority order: more specific conditions appear first.
   *
   * @param {{ durationSeconds:number, totalEdits:number,
   *            totalKeystrokes:number, idleSeconds:number }} metrics
   * @returns {string}
   */
  function deriveSessionLabel(metrics) {
    const { durationSeconds, totalEdits, totalKeystrokes, idleSeconds } = metrics;

    // "Fast typing, low idle" — high keystroke rate AND minimal idle
    const keystrokesPerSec = durationSeconds > 0 ? totalKeystrokes / durationSeconds : 0;
    if (keystrokesPerSec > 3 && idleSeconds < 10)
      return 'Fast typing, low idle';

    // "High revision session" — many deletions / corrections
    if (totalEdits >= 15)
      return 'High revision session';

    // "Deep focus session" — long session with minimal idle
    if (durationSeconds >= 90 && idleSeconds < 20)
      return 'Deep focus session';

    // "Quick reflection" — short and not heavily idle
    if (durationSeconds < 30 && idleSeconds < 5)
      return 'Quick reflection';

    return 'General session';
  }

  // ─── Multi-session comparison (Task 3) ────────────────────────────────────
  /**
   * Compares the two most recent sessions and returns ONE concise sentence
   * describing the most notable change, or null when fewer than 2 sessions exist.
   *
   * Reuses already-stored metrics — no new data collection.
   *
   * @param {Array} attempts   Raw session records from storage
   * @returns {string|null}
   */
  function computeComparisonSentence(attempts) {
    if (!Array.isArray(attempts) || attempts.length < 2) return null;
    try {
      // Sort oldest → newest, take the last two
      const sorted = attempts.slice().sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      const prev = sorted[sorted.length - 2];
      const curr = sorted[sorted.length - 1];

      function getM(s) {
        const m = s.metrics || {};
        return {
          dur: Number(m.durationSeconds) || 0,
          idle: Number(m.idleSeconds) || 0,
          edits: Number(m.edits) || 0,
          ks: Number(m.keystrokes) || 0,
        };
      }

      const p = getM(prev);
      const c = getM(curr);

      // Helper: percent change, capped to avoid wild numbers on tiny denominators
      function pct(from, to) {
        if (from === 0) return null;
        return Math.round(((to - from) / from) * 100);
      }

      const idleDelta = pct(p.idle, c.idle);
      const focusDelta = pct(p.dur, c.dur);
      const editsDelta = pct(p.edits, c.edits);

      // Pick the most notable signal (largest absolute %)
      const candidates = [
        { key: 'idle', delta: idleDelta, label: 'idle time' },
        { key: 'focus', delta: focusDelta, label: 'focus duration' },
        { key: 'edits', delta: editsDelta, label: 'editing activity' },
      ].filter(x => x.delta !== null);

      if (!candidates.length) return null;

      candidates.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
      const best = candidates[0];

      // Only surface if change is meaningful (≥ 5%)
      if (Math.abs(best.delta) < 5) {
        return 'Your session was similar in pace and effort to the previous one.';
      }

      const direction = best.delta > 0 ? 'increased' : 'decreased';
      const absPct = Math.abs(best.delta);

      return `Compared to your previous session, ${best.label} ${direction} by ${absPct}%.`;
    } catch (e) {
      return null;
    }
  }

  // ─── History rendering ────────────────────────────────────────────────────
  function truncateText(text, maxLen) {
    if (!text) return "";
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen - 1) + "…";
  }

  async function renderHistory() {
    if (getUserRole() === 'anonymous') {
      if (historyList) {
        historyList.classList.add("empty");
        historyList.innerHTML = `<p class="empty-text">Sign in to view your learning history.</p>`;
      }
      return;
    }
    const attempts = await readAttemptsFromStorage();

    // ── Trend badge (above the history list) ──────────────────────────────
    (function computeAndRenderTrend() {
      try {
        const container = historyList ? historyList.parentElement : null;
        if (!attempts || !attempts.length) {
          if (container) { const b = container.querySelector('#historyTrendBadge'); if (b) b.remove(); }
          return;
        }

        // Sort oldest → newest, take up to last 6 sessions
        const chrono = attempts.slice().sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        const recent = chrono.slice(-6);

        function metricOf(s) {
          const m = s.metrics || { durationSeconds: s.durationSeconds || 0, keystrokes: s.keystrokes || 0, edits: s.edits || 0 };
          return { dur: m.durationSeconds || 0, ks: m.keystrokes || 0, edits: m.edits || 0 };
        }

        const cpms = recent.map(s => { const m = metricOf(s); return m.dur > 0 ? (m.ks / m.dur) * 60 : 0; });
        const editsArr = recent.map(s => metricOf(s).edits);
        const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

        const avgCPM = Math.round(avg(cpms));
        const half = Math.floor(recent.length / 2) || 1;
        const oldCPM = avg(cpms.slice(0, half));
        const newCPM = avg(cpms.slice(half));
        const oldEdits = avg(editsArr.slice(0, half));
        const newEdits = avg(editsArr.slice(half));

        let trend = 'Consistent';
        if (oldCPM > 0 && newCPM >= oldCPM * 1.05 && newEdits <= oldEdits + 0.5) trend = 'Improving';
        else if (Math.abs(newCPM - oldCPM) > Math.max(1, oldCPM * 0.05) || Math.abs(newEdits - oldEdits) > 2) trend = 'Needs more focus';

        if (container) {
          let badge = container.querySelector('#historyTrendBadge');
          if (!badge) {
            badge = document.createElement('div');
            badge.id = 'historyTrendBadge';
            badge.className = 'trend-badge';
            container.insertBefore(badge, historyList);
          }
          badge.textContent = `${trend} • ${avgCPM} CPM`;
        }
      } catch (e) { /* non-critical */ }
    })();

    if (!attempts || !attempts.length) {
      if (historyList) {
        historyList.classList.add("empty");
        historyList.innerHTML = `<p class="empty-text">No past sessions yet. Your next submission will appear here.</p>`;
      }
      return;
    }

    if (!historyList) return;
    historyList.classList.remove("empty");
    historyList.innerHTML = "";

    // Newest first
    attempts.slice().reverse().forEach((attempt) => {
      const item = document.createElement("div");
      item.className = "history-item";

      // Header: date + pattern tag
      const header = document.createElement("div");
      header.className = "history-header";

      const dateEl = new Date(attempt.timestamp);
      const dateLabel = `${dateEl.toLocaleDateString()} • ${dateEl.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

      const title = document.createElement("div");
      title.className = "history-title";
      title.textContent = dateLabel;

      const tag = document.createElement("div");
      tag.className = "history-tag";
      tag.textContent = attempt.pattern || attempt.classification || "Session";

      header.appendChild(title);
      header.appendChild(tag);

      // Session auto-label (Task 2) — shown as a subtitle below the header row
      if (attempt.sessionLabel) {
        const labelEl = document.createElement("div");
        labelEl.className = "history-session-label";
        labelEl.textContent = attempt.sessionLabel;
        item.appendChild(header);
        item.appendChild(labelEl);
      } else {
        item.appendChild(header);
      }

      // Metrics row
      const meta = document.createElement("div");
      meta.className = "history-meta";
      const m = attempt.metrics || {
        durationSeconds: attempt.durationSeconds || 0,
        keystrokes: attempt.keystrokes || 0,
        edits: attempt.edits || 0,
        idleSeconds: attempt.idleSeconds || 0,
        retries: attempt.retries || attempt.submitCount || 0,
      };
      const taskLabel = attempt.taskType ? ` • ${attempt.taskType}` : '';
      meta.textContent = `Duration: ${formatSeconds(m.durationSeconds)} • Keystrokes: ${m.keystrokes} • Edits: ${m.edits} • Idle: ${formatSeconds(m.idleSeconds)} • Submits: ${m.retries}${taskLabel}`;

      // Response snippet
      const snippet = document.createElement("p");
      snippet.className = "history-snippet";
      snippet.textContent = truncateText(attempt.response, 160);

      item.appendChild(meta);
      item.appendChild(snippet);

      if (attempt.insight) {
        const insightEl = document.createElement("p");
        insightEl.className = "history-insight";
        insightEl.textContent = `💡 ${attempt.insight}`;
        item.appendChild(insightEl);
      }

      historyList.appendChild(item);
    });
  }

  // ─── Event: Start ─────────────────────────────────────────────────────────
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (getUserRole() === 'anonymous') return;
      if (sessionActive || _startLocked) return; // guard against double-start
      _startLocked = true;
      setTimeout(() => { _startLocked = false; }, 300); // 300ms debounce
      try { localStorage.removeItem("learnTrace.sessionActive"); } catch (e) { }
      startSession();
    });
  }

  // ─── Event: Next Question ─────────────────────────────────────────────────
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", () => {
      if (nextQuestionId) {
        fetchReflectionQuestion(nextQuestionId);
        resetSessionState();
        resetMetricsDisplay();
        if (responseInput) responseInput.value = "";
        if (feedbackDisplay) feedbackDisplay.textContent = "";
        if (classificationDisplay) classificationDisplay.textContent = "No session yet";
      }
    });
  }

  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener("click", () => {
      if (prevQuestionId) {
        fetchReflectionQuestion(prevQuestionId);
        resetSessionState();
        resetMetricsDisplay();
        if (responseInput) responseInput.value = "";
        if (feedbackDisplay) feedbackDisplay.textContent = "";
        if (classificationDisplay) classificationDisplay.textContent = "No session yet";
      }
    });
  }

  // ─── Event: Submit ────────────────────────────────────────────────────────
  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      if (getUserRole() === 'anonymous') return;
      if (!sessionActive || _submitLocked) return; // guard: session must be active
      _submitLocked = true;
      setTimeout(() => { _submitLocked = false; }, 800); // 800ms debounce
      const response = responseInput ? responseInput.value.trim() : "";
      if (!response) return; // guard: no empty submissions

      retries += 1;
      if (retriesDisplay) retriesDisplay.textContent = retries.toString();

      const endTimeMs = nowMs();
      // Guard: startTimeMs must be positive (protects against any edge-case NaN)
      const durationSeconds = startTimeMs > 0 ? (endTimeMs - startTimeMs) / 1000 : 0;

      const metrics = {
        durationSeconds,
        totalEdits: edits,
        totalKeystrokes: keystrokes,
        idleSeconds: totalIdleSeconds,
        submitAttempts: retries,
      };

      try { exposeLiveMetrics(); } catch (e) { }

      // Use tracker module if available, else fall back to built-in classifier
      const tracker = await getTrackerModule();
      let classification;
      if (tracker && typeof tracker.classifySession === 'function') {
        classification = tracker.classifySession({
          durationSeconds: metrics.durationSeconds,
          keystrokes: metrics.totalKeystrokes,
          edits: metrics.totalEdits,
          idleSeconds: metrics.idleSeconds,
          submitCount: metrics.submitAttempts,
        });
      } else {
        classification = classifyAttempt(metrics);
      }

      // Submit to backend for logical reasoning scoring
      if (currentTask && currentTask.id.startsWith('q')) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/reflection/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: currentTask.id,
              userAnswer: response
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (feedbackDisplay) {
              feedbackDisplay.innerHTML = `<strong>Score: ${data.percentage}%</strong><br>${data.feedback}<br><br><strong>Model Answer:</strong><br>${data.modelAnswer}`;
            }
            if (classificationDisplay) classificationDisplay.textContent = "Logic Evaluated";
          }
        } catch (e) {
          safeLog(e, 'submit reflection to backend');
        }
      }

      const feedback = (tracker && typeof tracker.generateFeedback === 'function')
        ? tracker.generateFeedback(classification, {
          durationSeconds: metrics.durationSeconds,
          edits: metrics.totalEdits,
          keystrokes: metrics.totalKeystrokes,
          idleSeconds: metrics.idleSeconds,
          submitCount: metrics.submitAttempts,
        })
        : generateFeedback(classification, metrics);

      // Generate ONE insight sentence + auto-label for this session
      const insight = generateInsight(metrics, classification.label);
      const sessionLabel = deriveSessionLabel(metrics);

      // Update Insights panel
      if (classificationDisplay) {
        // If reflection, we already set it to "Logic Evaluated"
        if (!currentTask || !currentTask.id.startsWith('q')) {
          classificationDisplay.textContent = classification.label;
        }
      }

      if (feedbackDisplay) {
        // Only override if NOT a reflection question
        if (!currentTask || !currentTask.id.startsWith('q')) {
          feedbackDisplay.textContent = feedback;
        }
      }

      // Persist session record to localStorage (cap at 50 to prevent unbounded growth)
      const attempts = await readAttemptsFromStorage();
      const metricsSnapshot = {
        durationSeconds: Math.max(0, Math.round(durationSeconds)),
        keystrokes,
        edits,
        idleSeconds: totalIdleSeconds,
        retries,
      };

      // Build the session record (includes new sessionLabel field)
      const newRecord = {
        timestamp: endTimeMs,
        pattern: classification.label,
        sessionLabel,
        metrics: metricsSnapshot,
        response,
        insight,
        taskId: currentTask ? currentTask.id : 'unknown',
        taskType: currentTask ? currentTask.type : '',
        // AUTH EXTENSION POINT — userId is always 'anonymous' until auth is wired up
        userId: getUserId(),
      };
      attempts.push(newRecord);

      // Keep only the 50 most recent sessions to prevent unbounded localStorage growth
      const capped = attempts.length > 50 ? attempts.slice(-50) : attempts;
      await writeAttemptsToStorage(capped);

      // Notify cloud sync layer that a new session was saved.
      // auth-check.js listens for this and triggers cloud upload when signed in.
      // script.js has no auth/database dependency — the event is the decoupling point.
      try {
        document.dispatchEvent(new CustomEvent('learntrace:session-saved', {
          detail: { timestamp: endTimeMs },
        }));
      } catch (_) { /* non-critical */ }

      // ── Insight display (insight sentence + multi-session comparison sentence) ──
      try {
        const compSentence = computeComparisonSentence(capped);

        // Phase 5: Learning Analytics
        let analyticsText = '';
        try {
          const { analyzeSessions } = await import('./src/analytics.js');
          const analyticsResult = analyzeSessions(capped);
          if (analyticsResult && analyticsResult.insightText.length > 0) {
            analyticsText = analyticsResult.insightText.join('\n\n📈 ');
          }
        } catch (_) { /* non-critical fallback */ }

        if (insightDisplay) {
          let insightText = `💡 ${insight}`;
          if (compSentence) insightText += `\n\n📊 ${compSentence}`;

          if (analyticsText && !insightText.includes(analyticsText)) {
            insightText += `\n\n📈 ${analyticsText}`;
          }

          insightDisplay.textContent = insightText;
        }
      } catch (e) {
        // Fallback: just show the insight
        if (insightDisplay) insightDisplay.textContent = `💡 ${insight}`;
      }

      await renderHistory();

      // Notify chatbot of the submission so it can post personalized feedback
      try {
        document.dispatchEvent(new CustomEvent('learntrace:submission', {
          detail: {
            metrics: {
              timeSpent: metrics.durationSeconds,
              keystrokes: metrics.totalKeystrokes,
              edits: metrics.totalEdits,
              idleTime: metrics.idleSeconds,
            },
            response,
            classification: classification.label,
            insight,
            taskId: currentTask ? currentTask.id : 'unknown',
            taskType: currentTask ? currentTask.type : '',
          },
        }));
      } catch (e) { safeLog(e, 'dispatch submission event'); }

      // End the session (clears timer, flags, mini-timer)
      endSession();

      // Auto-switch to Insights tab so user sees their feedback immediately
      try {
        const insightsTab = document.getElementById('tab-insights');
        if (insightsTab) insightsTab.click();
      } catch (e) { /* non-critical */ }

      // Reset UI for next session
      resetMetricsDisplay();
      setSessionStatus("Session: Not started", null);
      if (responseInput) { responseInput.disabled = true; try { responseInput.blur(); } catch (e) { } }
      if (submitBtn) submitBtn.disabled = true;
      if (startBtn) startBtn.disabled = false;
    });
  }

  // ─── Event: Typing ────────────────────────────────────────────────────────
  if (responseInput) {
    // Enable/disable Submit based on content (input = all text changes incl. paste)
    responseInput.addEventListener("input", () => {
      try {
        const hasText = responseInput.value && responseInput.value.trim().length > 0;
        if (submitBtn) submitBtn.disabled = !(sessionActive && hasText);
      } catch (e) { }
    });

    // Keydown: count keystrokes and edits while session is active
    responseInput.addEventListener("keydown", (e) => {
      if (!sessionActive) return;
      const key = e.key || "";

      // Printable character, space, enter, or tab = one keystroke
      if (key.length === 1 || key === "Enter" || key === "Tab" || key === " ") {
        keystrokes += 1;
        if (keystrokesDisplay) keystrokesDisplay.textContent = keystrokes.toString();
      }

      // Backspace / Delete = one edit (deletion-type correction)
      if (key === "Backspace" || key === "Delete") {
        edits += 1;
        if (editsDisplay) editsDisplay.textContent = edits.toString();
      }

      lastTypeTimeMs = nowMs();
      try { exposeLiveMetrics(); } catch (e) { }
    });

    // Paste: count pasted characters as keystrokes so bulk-paste is captured
    responseInput.addEventListener("paste", (e) => {
      if (!sessionActive) return;
      try {
        const text = (e.clipboardData || window.clipboardData || {}).getData('text') || '';
        if (text.length > 0) {
          keystrokes += text.length;
          if (keystrokesDisplay) keystrokesDisplay.textContent = keystrokes.toString();
          lastTypeTimeMs = nowMs();
          try { exposeLiveMetrics(); } catch (e) { }
        }
      } catch (e) { /* non-critical */ }
    });
  }

  // ─── Export helpers ───────────────────────────────────────────────────────

  /**
   * Returns a YYYY-MM-DD date string for use in export filenames.
   * Uses the local date so filenames match what the user sees in their OS.
   */
  function exportDateStamp() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  /**
   * Sanitizes the attempts array: filters out any records that are not plain
   * objects with at least a numeric timestamp (guards against corrupt storage).
   * Returns a new array — never mutates the input.
   */
  function sanitizeAttempts(attempts) {
    if (!Array.isArray(attempts)) return [];
    return attempts.filter(s => {
      try { return s && typeof s === 'object' && typeof s.timestamp === 'number'; }
      catch (e) { return false; }
    });
  }

  /**
   * Builds a downloadable payload from all stored session attempts.
   *
   * format: 'text' → clean human-readable learning report (no raw JSON, clear headings)
   *         'json' → structured JSON envelope suitable for cloud sync / analysis
   *
   * Never mutates `attempts`.  `trend` is the optional multi-session trend badge text.
   */
  function buildExportPayload(attempts, format, trend) {
    const clean = sanitizeAttempts(attempts);
    if (!clean.length) return '';

    // ── Structured JSON export ────────────────────────────────────────────────
    if (format === 'json') {
      const sessions = clean.map((s, i) => {
        const m = s.metrics || {};
        const taskObj = s.taskId ? TASK_POOL.find(t => t.id === s.taskId) : null;
        return {
          sessionId: s.timestamp ? String(s.timestamp) : `session-${i + 1}`,
          timestamp: s.timestamp || null,
          task: {
            id: s.taskId || 'unknown',
            type: s.taskType || (taskObj ? taskObj.type : 'Unknown'),
            prompt: taskObj ? taskObj.text : (s.taskType || 'Unknown task'),
          },
          metrics: {
            durationSeconds: Number(m.durationSeconds) || 0,
            keystrokes: Number(m.keystrokes) || 0,
            edits: Number(m.edits) || 0,
            idleSeconds: Number(m.idleSeconds) || 0,
            submits: Number(m.retries) || 0,
          },
          derived: {
            patternLabel: s.pattern || s.classification || 'Unknown',
            sessionLabel: s.sessionLabel || null,
            insight: s.insight || null,
          },
          userResponse: s.response || '',
          userId: s.userId || 'anonymous',
        };
      });

      const envelope = {
        schemaVersion: '1.0',
        exportedAt: new Date().toISOString(),
        userId: getUserId(),
        sessionCount: sessions.length,
        sessions,
      };
      return JSON.stringify(envelope, null, 2);
    }

    // ── Plain-text learning report ────────────────────────────────────────────
    const DIVIDER = '='.repeat(52);
    const MINOR = '-'.repeat(52);
    const lines = [];

    lines.push('LearnTrace — Learning Report');
    lines.push(`Exported:    ${new Date().toLocaleString()}`);
    lines.push(`User ID:     ${getUserId()}`);
    lines.push(`Sessions:    ${clean.length}`);
    if (trend) lines.push(`Trend:       ${trend}`);
    lines.push('');
    lines.push(DIVIDER);
    lines.push('');

    // Newest first (matches History panel order)
    clean.slice().reverse().forEach((s, i) => {
      const m = s.metrics || {};
      const taskObj = s.taskId ? TASK_POOL.find(t => t.id === s.taskId) : null;
      const taskPrompt = taskObj
        ? taskObj.text
        : (s.taskType || 'Unknown task');
      const dateStr = s.timestamp
        ? new Date(s.timestamp).toLocaleString()
        : '(no date)';
      const durationSec = Number(m.durationSeconds) || 0;
      const idleSec = Number(m.idleSeconds) || 0;

      lines.push(`Session ${i + 1} of ${clean.length}`);
      lines.push(MINOR);
      lines.push('');

      lines.push('TASK');
      lines.push(`  Type:      ${s.taskType || (taskObj ? taskObj.type : 'Unknown')}`);
      lines.push(`  Prompt:    ${taskPrompt}`);
      lines.push('');

      lines.push('DATE & TIME');
      lines.push(`  ${dateStr}`);
      lines.push('');

      lines.push('SESSION METRICS');
      lines.push(`  Duration:  ${formatSeconds(durationSec)}`);
      lines.push(`  Keystrokes:${Number(m.keystrokes) || 0}`);
      lines.push(`  Edits:     ${Number(m.edits) || 0}`);
      lines.push(`  Idle time: ${formatSeconds(idleSec)}`);
      lines.push(`  Submits:   ${Number(m.retries) || 0}`);
      lines.push('');

      lines.push('LEARNER PROFILE');
      lines.push(`  Pattern:   ${s.pattern || s.classification || 'Unknown'}`);
      if (s.sessionLabel) lines.push(`  Label:     ${s.sessionLabel}`);
      lines.push('');

      if (s.insight) {
        lines.push('INSIGHT');
        lines.push(`  ${s.insight}`);
        lines.push('');
      }

      if (s.response) {
        lines.push('FULL EXPLANATION');
        // Indent each line for readability; preserve paragraph breaks
        String(s.response).split('\n').forEach(l => lines.push(`  ${l}`));
        lines.push('');
      }

      lines.push(DIVIDER);
      lines.push('');
    });

    return lines.join('\n');
  }

  /**
   * Triggers a file download in the browser — no server, no libs.
   * Creates a Blob URL, clicks a hidden anchor, then immediately revokes to
   * avoid memory leaks.  Read-only: never touches stored data.
   */
  function triggerDownload(content, filename, mimeType) {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try { document.body.removeChild(a); } catch (_) { /* ignore */ }
        try { URL.revokeObjectURL(url); } catch (_) { /* ignore */ }
      }, 300);
    } catch (e) {
      safeLog(e, 'triggerDownload');
    }
  }

  /**
   * Returns the current trend string from the badge DOM element (if rendered).
   * Gracefully returns '' if the element doesn't exist or throws.
   */
  function getRenderedTrend() {
    try {
      const badge = document.getElementById('historyTrendBadge');
      return badge ? badge.textContent.trim() : '';
    } catch (e) { return ''; }
  }

  // ─── Event: Export history (TXT) ──────────────────────────────────────────
  const exportHistoryBtn = document.getElementById('exportHistoryBtn');
  if (exportHistoryBtn) {
    exportHistoryBtn.addEventListener('click', async () => {
      try {
        const attempts = await readAttemptsFromStorage();
        const clean = sanitizeAttempts(attempts);
        if (!clean.length) {
          alert('No sessions to export yet. Complete a session first.');
          return;
        }

        let content = '';
        try {
          const { buildLearningReport, buildTextReportFromObject } = await import('./src/reportBuilder.js');
          const reportObj = buildLearningReport(clean);
          content = buildTextReportFromObject(reportObj);
        } catch (e) {
          safeLog(e, 'reportBuilder TXT fallback');
          const trend = getRenderedTrend();
          content = buildExportPayload(clean, 'text', trend);
        }
        const filename = `learntrace_sessions_${exportDateStamp()}.txt`;

        // Mirror export to cloud if authenticated
        const uid = getUserId();
        if (uid && uid !== 'anonymous') {
          import('./src/services/database/index.js').then(({ saveCloudExport }) => {
            saveCloudExport(uid, 'text', content);
          }).catch(() => { });
        }

        triggerDownload(content, filename, 'text/plain;charset=utf-8');
      } catch (e) { safeLog(e, 'export TXT'); }
    });
  }

  // ─── Event: Export history (JSON) ─────────────────────────────────────────
  const exportHistoryJsonBtn = document.getElementById('exportHistoryJsonBtn');
  if (exportHistoryJsonBtn) {
    exportHistoryJsonBtn.addEventListener('click', async () => {
      try {
        const attempts = await readAttemptsFromStorage();
        const clean = sanitizeAttempts(attempts);
        if (!clean.length) {
          alert('No sessions to export yet. Complete a session first.');
          return;
        }

        let content = '';
        try {
          const { buildLearningReport, buildJsonReportFromObject } = await import('./src/reportBuilder.js');
          const reportObj = buildLearningReport(clean);
          content = buildJsonReportFromObject(reportObj, clean);
        } catch (e) {
          safeLog(e, 'reportBuilder JSON fallback');
          content = buildExportPayload(clean, 'json', '');
        }
        const filename = `learntrace_sessions_${exportDateStamp()}.json`;

        // Mirror export to cloud if authenticated
        const uid = getUserId();
        if (uid && uid !== 'anonymous') {
          import('./src/services/database/index.js').then(({ saveCloudExport }) => {
            saveCloudExport(uid, 'json', content);
          }).catch(() => { });
        }

        triggerDownload(content, filename, 'application/json');
      } catch (e) { safeLog(e, 'export JSON'); }
    });
  }

  // ─── Event: Clear history ─────────────────────────────────────────────────
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", async () => {
      if (!confirm("Clear all local LearnTrace history? This cannot be undone.")) return;
      await clearAllSessions();
      await renderHistory();
    });
  }

  // ─── Tab visibility — pause idle counting when tab is backgrounded ─────────
  document.addEventListener('visibilitychange', () => {
    tabVisible = document.visibilityState === 'visible';
    if (tabVisible && sessionActive) {
      // Reset lastIdleTickMs so we don't count the hidden period as idle time
      lastIdleTickMs = nowMs();
      lastTypeTimeMs = nowMs();
    }
  });

  // ─── Before unload — clean up timers and flags ───────────────────────────
  window.addEventListener('beforeunload', () => {
    try { if (timerIntervalId !== null) { clearInterval(timerIntervalId); timerIntervalId = null; } } catch (e) { }
    // Clear session-active flag so refresh doesn't show stale state
    try { localStorage.removeItem("learnTrace.sessionActive"); } catch (e) { }
  });

  // ─── Theme management ─────────────────────────────────────────────────────
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) { }
    return null;
  }

  function setTheme(theme) {
    if (theme !== "dark" && theme !== "light") theme = "light";
    document.body.setAttribute("data-theme", theme);
    
    if (themeToggle) {
      if (theme === "dark") {
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        themeToggle.title = "Switch to light mode";
        if (themeIcon) {
          themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
        }
      } else {
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        themeToggle.title = "Switch to dark mode";
        if (themeIcon) {
          themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
        }
      }
    }

    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (e) { }
  }

  function initTheme() {
    setTheme(getSavedTheme() || getSystemTheme());
    // Auto-follow system theme only when user hasn't manually overridden
    if (window.matchMedia && !getSavedTheme()) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!getSavedTheme()) setTheme(e.matches ? "dark" : "light");
      });
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const cur = document.body.getAttribute("data-theme") || "light";
      setTheme(cur === "dark" ? "light" : "dark");
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  async function init() {
    initTheme();
    resetSessionState();
    resetMetricsDisplay();

    if (responseInput) responseInput.disabled = true;
    if (submitBtn) submitBtn.disabled = true;

    // Clean up any stale session flag left by a mid-session refresh
    try {
      localStorage.removeItem("learnTrace.sessionActive");
    } catch (e) { }
    setSessionStatus("Session: Not started", null);

    // Pick and display reflection task from backend
    try {
      await fetchReflectionQuestion();
    } catch (e) { safeLog(e, 'init: reflection task selection'); }

    await renderHistory();

    // Subtle fade-in on cards after load
    try {
      const cards = Array.from(document.querySelectorAll('.card'));
      setTimeout(() => { cards.forEach(c => c.classList.add('show')); }, 60);
    } catch (e) { }
  }

  // Run init immediately if DOM is ready (handles Vite HMR and late script loads)
  // Final check after all scripts load
  setTimeout(applyAuthGating, 500);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();