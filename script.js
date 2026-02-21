(function () {
    "use strict";
  
    // DOM elements
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
    const historyList = document.getElementById("historyList");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const sessionStatusPill = document.getElementById("sessionStatusPill");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const STORAGE_KEY = "learnTraceAttempts";
    const THEME_STORAGE_KEY = "learnTraceTheme";
  
    // Session state
    let sessionActive = false;
    let startTimeMs = 0;
    let keystrokes = 0;
    let edits = 0;
    let totalIdleSeconds = 0;
    let retries = 0;
    let lastTypeTimeMs = 0;
    let lastIdleTickMs = 0;
    let timerIntervalId = null;
  
    // --- Utility functions ---
  
    function formatSeconds(sec) {
      sec = Math.max(0, Math.round(sec));
      if (sec < 60) return `${sec}s`;
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return s === 0 ? `${m}m` : `${m}m ${s}s`;
    }
  
    function nowMs() {
      return Date.now();
    }
  
    function readAttemptsFromStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
      } catch (e) {
        console.warn("Failed to read LearnTrace storage", e);
        return [];
      }
    }
  
    function writeAttemptsToStorage(attempts) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
      } catch (e) {
        console.warn("Failed to write LearnTrace storage", e);
      }
    }
  
    // --- Session control ---
  
    function resetMetricsDisplay() {
      timeSpentDisplay.textContent = "0s";
      keystrokesDisplay.textContent = "0";
      editsDisplay.textContent = "0";
      idleTimeDisplay.textContent = "0s";
      retriesDisplay.textContent = retries.toString();
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
      if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
    }
  
    function setSessionStatus(text, status) {
      sessionStatusPill.textContent = text;
      sessionStatusPill.classList.remove("pill--active", "pill--ended");
      if (status === "active") {
        sessionStatusPill.classList.add("pill--active");
      } else if (status === "ended") {
        sessionStatusPill.classList.add("pill--ended");
      }
    }
  
    function startSession() {
      resetSessionState();
      sessionActive = true;
      startTimeMs = nowMs();
      lastTypeTimeMs = startTimeMs;
      lastIdleTickMs = startTimeMs;
      retries = 0;
  
      responseInput.value = "";
      responseInput.disabled = false;
      responseInput.focus();
  
      submitBtn.disabled = false;
      resetMetricsDisplay();
      setSessionStatus("Session: In progress", "active");
  
      // Timer: updates elapsed + idle time every second
      timerIntervalId = setInterval(() => {
        if (!sessionActive) return;
  
        const current = nowMs();
        const elapsedSec = (current - startTimeMs) / 1000;
        timeSpentDisplay.textContent = formatSeconds(elapsedSec);
  
        // Idle tracking: if no typing since last tick, count idle seconds
        const msSinceLastIdleTick = current - lastIdleTickMs;
        if (msSinceLastIdleTick >= 1000) {
          const msSinceType = current - lastTypeTimeMs;
          if (msSinceType >= 1000) {
            const idleIncrement = Math.floor(msSinceLastIdleTick / 1000);
            if (idleIncrement > 0) {
              totalIdleSeconds += idleIncrement;
              idleTimeDisplay.textContent = formatSeconds(totalIdleSeconds);
            }
          }
          lastIdleTickMs = current;
        }
      }, 1000);
    }
  
    function endSession() {
      if (!sessionActive) return;
      sessionActive = false;
      if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
      submitBtn.disabled = true;
      responseInput.disabled = true;
      setSessionStatus("Session: Completed", "ended");
    }
  
    // --- Classification & feedback (rule-based, no API) ---
  
    function classifyAttempt({ durationSeconds, totalEdits, totalKeystrokes, idleSeconds, submitAttempts }) {
      const longTime = durationSeconds >= 90;
      const mediumTime = durationSeconds >= 30 && durationSeconds < 90;
      const shortTime = durationSeconds < 30;
  
      const manyEdits = totalEdits >= 25;
      const fewEdits = totalEdits < 8;
      const steadyEdits = totalEdits >= 8 && totalEdits <= 30;
      const veryFewKeystrokes = totalKeystrokes < 40;
  
      const highIdle = idleSeconds >= 30;
      const someIdle = idleSeconds >= 10;
      const manyRetries = submitAttempts >= 2;
  
      // Priority 1: Reflective Learner (many pauses + retries)
      if ((highIdle || (someIdle && steadyEdits)) && manyRetries) {
        return {
          label: "Reflective Learner",
          tone: "reflective",
        };
      }
  
      // Priority 2: Persistent Learner (high time + many edits)
      if (longTime && manyEdits) {
        return {
          label: "Persistent Learner",
          tone: "persistent",
        };
      }
  
      // Priority 3: Possible AI Dependency (low time + very few edits)
      if (shortTime && fewEdits && veryFewKeystrokes) {
        return {
          label: "Possible AI Dependency",
          tone: "ai_dependency",
        };
      }
  
      // Priority 4: Balanced Learner (medium time + steady edits)
      if (mediumTime && steadyEdits) {
        return {
          label: "Balanced Learner",
          tone: "balanced",
        };
      }
  
      // Fallbacks based on nearest pattern
      if (longTime && !manyEdits) {
        return {
          label: "Slow but Careful Learner",
          tone: "slow_careful",
        };
      }
  
      if (someIdle && !manyRetries) {
        return {
          label: "Pause-and-Plan Learner",
          tone: "reflective",
        };
      }
  
      return {
        label: "Emerging Pattern",
        tone: "neutral",
      };
    }
  
    function generateFeedback(classification, metrics) {
      const { label, tone } = classification;
      const { durationSeconds, totalEdits, totalKeystrokes, idleSeconds, submitAttempts } = metrics;
  
      const durationText = formatSeconds(durationSeconds);
      const idleText = formatSeconds(idleSeconds);
  
      const baseSummary = `In this session, you spent about ${durationText} thinking and typing, made ${totalEdits} edit${totalEdits === 1 ? "" : "s"}, and paused for roughly ${idleText}.`;
  
      let mentorComment = "";
  
      switch (tone) {
        case "persistent":
          mentorComment =
            "Your learning pattern shows persistence and a willingness to refine your own explanations. Keep using those edits as a way to clarify your thinking rather than aiming for perfection on the first try.";
          break;
        case "ai_dependency":
          mentorComment =
            "Your response came together very quickly with minimal revision. That can sometimes mean you leaned on a memorized or AI-generated answer. Try slowing down enough to put the idea into your own words and make at least one or two revisions based on your own reflection.";
          break;
        case "balanced":
          mentorComment =
            "Your pacing and revision pattern look balanced. You gave yourself time to think, adjusted your explanation a few times, and then committed to an answer. This is a healthy learning rhythm to keep building on.";
          break;
        case "reflective":
          mentorComment =
            "The combination of pauses and multiple submissions suggests you’re reflecting between attempts. This can be powerful as long as the reflection is about your own understanding, not just searching for the 'right' phrasing.";
          break;
        case "slow_careful":
          mentorComment =
            "You took your time but didn’t rely heavily on editing. Consider using more small revisions to make your mental model explicit — rewriting is often where deeper understanding appears.";
          break;
        case "neutral":
        default:
          mentorComment =
            "Your pattern doesn’t strongly match one specific type yet. That’s normal. As you do more sessions, you’ll start to see clearer trends in how you approach new ideas.";
          break;
      }
  
      const retryNote =
        submitAttempts > 1
          ? ` You submitted this explanation ${submitAttempts} times, which suggests you were revisiting your answer. Try to notice what changes between attempts — that awareness is often more valuable than the final wording.`
          : " You submitted once, which can be a sign of confidence. Just make sure you give yourself enough space to revise if new insights appear.";
  
      return `${baseSummary} ${mentorComment}${retryNote}`;
    }
  
    // --- History rendering ---
  
    function truncateText(text, maxLen) {
      if (!text) return "";
      const clean = text.replace(/\s+/g, " ").trim();
      if (clean.length <= maxLen) return clean;
      return clean.slice(0, maxLen - 1) + "…";
    }
  
    function renderHistory() {
      const attempts = readAttemptsFromStorage();
  
      if (!attempts.length) {
        historyList.classList.add("empty");
        historyList.innerHTML = `<p class="empty-text">No past sessions yet. Your next submission will appear here.</p>`;
        return;
      }
  
      historyList.classList.remove("empty");
      historyList.innerHTML = "";
  
      attempts
        .slice()
        .reverse()
        .forEach((attempt) => {
          const item = document.createElement("div");
          item.className = "history-item";
  
          const header = document.createElement("div");
          header.className = "history-header";
  
          const title = document.createElement("div");
          title.className = "history-title";
  
          const date = new Date(attempt.timestamp);
          const dateLabel = `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
          title.textContent = dateLabel;
  
          const tag = document.createElement("div");
          tag.className = "history-tag";
          tag.textContent = attempt.classification || "Session";
  
          header.appendChild(title);
          header.appendChild(tag);
  
          const meta = document.createElement("div");
          meta.className = "history-meta";
          meta.textContent = `Time: ${formatSeconds(attempt.durationSeconds)}, Keystrokes: ${attempt.keystrokes}, Edits: ${attempt.edits}, Idle: ${formatSeconds(
            attempt.idleSeconds
          )}, Submits: ${attempt.retries}`;
  
          const snippet = document.createElement("p");
          snippet.className = "history-snippet";
          snippet.textContent = truncateText(attempt.response, 160);
  
          item.appendChild(header);
          item.appendChild(meta);
          item.appendChild(snippet);
          historyList.appendChild(item);
        });
    }
  
    // --- Event handlers ---
  
    startBtn.addEventListener("click", () => {
      startSession();
    });
  
    submitBtn.addEventListener("click", () => {
      if (!sessionActive) return;
  
      const response = responseInput.value.trim();
      retries += 1;
      retriesDisplay.textContent = retries.toString();
  
      const endTimeMs = nowMs();
      const durationSeconds = (endTimeMs - startTimeMs) / 1000;
  
      const metrics = {
        durationSeconds,
        totalEdits: edits,
        totalKeystrokes: keystrokes,
        idleSeconds: totalIdleSeconds,
        submitAttempts: retries,
      };
  
      const classification = classifyAttempt(metrics);
      const feedback = generateFeedback(classification, metrics);
  
      classificationDisplay.textContent = classification.label;
      feedbackDisplay.textContent = feedback;
  
      // Persist attempt
      const attempts = readAttemptsFromStorage();
      attempts.push({
        timestamp: endTimeMs,
        durationSeconds: Math.max(0, Math.round(durationSeconds)),
        keystrokes,
        edits,
        idleSeconds: totalIdleSeconds,
        retries,
        classification: classification.label,
        response,
      });
      writeAttemptsToStorage(attempts);
      renderHistory();
  
      endSession();
    });
  
    responseInput.addEventListener("keydown", (event) => {
      if (!sessionActive) return;
  
      const key = event.key;
  
      // Count keystrokes: characters, space, enter, tab
      const printable =
        key.length === 1 || key === "Enter" || key === "Tab" || key === "Spacebar" || key === " ";
  
      if (printable) {
        keystrokes += 1;
        keystrokesDisplay.textContent = keystrokes.toString();
      }
  
      // Count edits: backspace or delete
      if (key === "Backspace" || key === "Delete") {
        edits += 1;
        editsDisplay.textContent = edits.toString();
      }
  
      lastTypeTimeMs = nowMs();
    });
  
    clearHistoryBtn.addEventListener("click", () => {
      if (!confirm("Clear all local LearnTrace history? This cannot be undone.")) {
        return;
      }
      writeAttemptsToStorage([]);
      renderHistory();
    });
  
    // --- Theme management ---

    function getSystemTheme() {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    function getSavedTheme() {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "dark" || saved === "light") {
          return saved;
        }
      } catch (e) {
        console.warn("Failed to read theme preference", e);
      }
      return null;
    }

    function getInitialTheme() {
      const saved = getSavedTheme();
      return saved || getSystemTheme();
    }

    function setTheme(theme) {
      if (theme !== "dark" && theme !== "light") {
        theme = "light";
      }
      document.body.setAttribute("data-theme", theme);
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {
        console.warn("Failed to save theme preference", e);
      }
    }

    function toggleTheme() {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    }

    function initTheme() {
      const initialTheme = getInitialTheme();
      setTheme(initialTheme);

      // Listen for system theme changes (only if no saved preference)
      if (window.matchMedia && !getSavedTheme()) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          if (!getSavedTheme()) {
            setTheme(e.matches ? "dark" : "light");
          }
        });
      }
    }

    // --- Initial load ---

    function init() {
      initTheme();
      resetSessionState();
      resetMetricsDisplay();
      responseInput.disabled = true;
      submitBtn.disabled = true;
      setSessionStatus("Session: Not started", null);
      renderHistory();
    }

    themeToggle.addEventListener("click", toggleTheme);

    document.addEventListener("DOMContentLoaded", init);
  })();