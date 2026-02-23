/**
 * LearnTrace — core session logic
 *
 * Architecture: single IIFE wrapping all session state.
 * The module pattern (no global leakage) keeps the app safe for
 * future ES-module migration or auth layering.
 *
 * AUTH EXTENSION POINT — see getUserId() near bottom of file.
 * When auth is ready, replace the stub there without touching anything else.
 */
(function () {
  "use strict";

  // Prevent double-initialization (guards against Vite HMR double-register)
  try {
    if (window.__learnTraceInitialized) return;
    window.__learnTraceInitialized = true;
  } catch (e) { /* ignore */ }

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

  const STORAGE_KEY = "learnTraceAttempts";
  const THEME_STORAGE_KEY = "learnTraceTheme";

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

  // ─── Auth abstraction (Phase 10 hook) ─────────────────────────────────────
  // AUTH EXTENSION POINT — replace body with real auth lookup when ready.
  // Do NOT change any call sites; getUserId() is used consistently below.
  function getUserId() {
    try {
      // Future: return firebase.auth().currentUser?.uid ?? 'anonymous';
      return 'anonymous';
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
    } catch (e) { return false; }
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
    if (!sessionActive) return;
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
  }

  // ─── Classification (rule-based, deterministic, no API) ───────────────────
  /**
   * Returns { label: string, tone: string } from raw session metrics.
   * Rules are intentionally simple and explainable — no ML.
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

    // Priority 3 — Fast Responder: quick and confident
    if (shortTime && !fewEdits)
      return { label: "Fast Responder", tone: "fast_responder" };

    // Priority 4 — Possible AI Dependency: suspiciously fast with minimal effort
    if (shortTime && fewEdits && veryFewKeys)
      return { label: "Possible AI Dependency", tone: "ai_dependency" };

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
      ai_dependency: 'This came together very quickly with minimal revision. Try slowing down to put ideas into your own words and make at least one or two genuine revisions.',
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

    // Use the most salient metric to craft the insight
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
    if (/balanced/i.test(classificationLabel))
      return "Balanced effort this session — a healthy mix of writing, pausing, and revising.";
    if (/fast/i.test(classificationLabel))
      return "Quick and confident — make sure the response truly came from your own understanding.";
    if (/reflective/i.test(classificationLabel))
      return "Thoughtful pacing — your pauses and revisions reveal genuine engagement with the material.";

    return "Each session teaches you something about how you think — keep going and patterns will emerge.";
  }

  // ─── History rendering ────────────────────────────────────────────────────
  function truncateText(text, maxLen) {
    if (!text) return "";
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen - 1) + "…";
  }

  async function renderHistory() {
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
      meta.textContent = `Duration: ${formatSeconds(m.durationSeconds)} • Keystrokes: ${m.keystrokes} • Edits: ${m.edits} • Idle: ${formatSeconds(m.idleSeconds)} • Submits: ${m.retries}`;

      // Response snippet
      const snippet = document.createElement("p");
      snippet.className = "history-snippet";
      snippet.textContent = truncateText(attempt.response, 160);

      // Insight sentence (if stored)
      item.appendChild(header);
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
      if (sessionActive) return; // guard against double-start
      try { localStorage.removeItem("learnTrace.sessionActive"); } catch (e) { }
      startSession();
    });
  }

  // ─── Event: Submit ────────────────────────────────────────────────────────
  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      if (!sessionActive) return; // guard: session must be active
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

      const feedback = (tracker && typeof tracker.generateFeedback === 'function')
        ? tracker.generateFeedback(classification, {
          durationSeconds: metrics.durationSeconds,
          edits: metrics.totalEdits,
          keystrokes: metrics.totalKeystrokes,
          idleSeconds: metrics.idleSeconds,
          submitCount: metrics.submitAttempts,
        })
        : generateFeedback(classification, metrics);

      // Generate ONE insight sentence for this session
      const insight = generateInsight(metrics, classification.label);

      // Update Insights panel
      if (classificationDisplay) classificationDisplay.textContent = classification.label;
      if (feedbackDisplay) feedbackDisplay.textContent = feedback;
      if (insightDisplay) insightDisplay.textContent = `💡 ${insight}`;

      // Persist session record to localStorage
      const attempts = await readAttemptsFromStorage();
      const metricsSnapshot = {
        durationSeconds: Math.max(0, Math.round(durationSeconds)),
        keystrokes,
        edits,
        idleSeconds: totalIdleSeconds,
        retries,
      };

      attempts.push({
        timestamp: endTimeMs,
        pattern: classification.label,
        metrics: metricsSnapshot,
        response,
        insight,
        // AUTH EXTENSION POINT — userId is always 'anonymous' until auth is wired up
        userId: getUserId(),
      });

      await writeAttemptsToStorage(attempts);
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
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
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

    await renderHistory();

    // Subtle fade-in on cards after load
    try {
      const cards = Array.from(document.querySelectorAll('.card'));
      setTimeout(() => { cards.forEach(c => c.classList.add('show')); }, 60);
    } catch (e) { }
  }

  // Run init immediately if DOM is ready (handles Vite HMR and late script loads)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();