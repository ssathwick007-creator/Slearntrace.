/**
 * LearnTrace — Study Assistant (AI-powered)
 *
 * Responsibilities:
 *  1. Receive student questions and send them to the AI proxy.
 *  2. Listen for session submission events and post one personalized insight.
 */
(function () {
  "use strict";

  // ─── DOM refs ─────────────────────────────────────────────────────────────
  const assistantMessages = document.getElementById("assistantMessages");
  const assistantInput = document.getElementById("assistantInput");
  const assistantSendBtn = document.getElementById("assistantSendBtn");
  const assistantClearBtn = document.getElementById("assistantClearBtn");

  if (!assistantMessages || !assistantInput || !assistantSendBtn) return;

  // ─── In-memory chat history ───────────────────────────────────────────────
  // Persists for the lifetime of the page; cleared by the user via Clear btn.
  const chat = [];

  // ─── Tone hint from live metrics ──────────────────────────────────────────
  /** Returns a one-line behavioral nudge based on the student's live session data. */
  function getToneHint(metrics) {
    try {
      if (!metrics) return null;
      if (metrics.idleSeconds >= 30)
        return "I notice you've been taking pauses — that often signals deep thinking. Try naming each step you're considering out loud (or in writing).";
      if (metrics.edits >= 25)
        return "You're revising a lot — excellent. That's active learning in action. Try noting what changed with each revision and why.";
      if (metrics.durationSeconds > 0 && (metrics.keystrokes / metrics.durationSeconds) > 3.5)
        return "You're typing quickly — slow down slightly and narrate each step. Articulating your reasoning reinforces understanding.";
    } catch (e) { /* non-critical */ }
    return null;
  }

  // ─── Incremental DOM rendering ────────────────────────────────────────────
  /**
   * Appends ONLY new messages to the DOM instead of wiping innerHTML.
   * This eliminates any visual flicker and preserves scroll position.
   * _renderedCount tracks how many messages have been painted so far.
   */
  let _renderedCount = 0;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      try { assistantMessages.scrollTop = assistantMessages.scrollHeight; } catch (e) { }
    });
  }

  function buildMessageEl(entry) {
    const wrapper = document.createElement('div');
    wrapper.className = entry.role === 'user' ? 'msg user-msg' : 'msg assistant-msg';
    wrapper.style.marginBottom = '6px';

    const bubble = document.createElement('div');
    bubble.style.whiteSpace = 'pre-wrap'; // preserve line breaks in multi-line replies
    bubble.textContent = entry.text;

    wrapper.appendChild(bubble);
    // Slide-in animation; fill-mode:both ensures element stays visible after animation
    requestAnimationFrame(() => { wrapper.classList.add('enter'); });
    return wrapper;
  }

  /** Full re-render (used only on clear). */
  function renderFull() {
    assistantMessages.innerHTML = "";
    _renderedCount = 0;

    if (!chat.length) {
      const p = document.createElement('p');
      p.className = 'assistant-empty';
      p.textContent = 'Ask a short question like "What is recursion?" or "Explain loops"';
      assistantMessages.appendChild(p);
      return;
    }

    chat.forEach(entry => {
      assistantMessages.appendChild(buildMessageEl(entry));
    });
    _renderedCount = chat.length;
    scrollToBottom();
  }

  /** Appends any messages in chat[] beyond _renderedCount. No flicker. */
  function renderAppend() {
    // If lengths match, nothing to do
    if (_renderedCount === chat.length) return;

    // Remove empty-state placeholder when first real message arrives
    if (_renderedCount === 0 && chat.length > 0) {
      const emptyEl = assistantMessages.querySelector('.assistant-empty');
      if (emptyEl) emptyEl.remove();
    }

    for (let i = _renderedCount; i < chat.length; i++) {
      assistantMessages.appendChild(buildMessageEl(chat[i]));
    }
    _renderedCount = chat.length;
    scrollToBottom();
  }

  // ─── Typing indicator ────────────────────────────────────────────────────
  let _typingEl = null;

  function showTypingIndicator() {
    if (_typingEl) return; // already showing
    _typingEl = document.createElement('div');
    _typingEl.className = 'msg assistant-msg typing-indicator';
    _typingEl.setAttribute('aria-label', 'Assistant is typing');
    _typingEl.innerHTML = '<div><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
    assistantMessages.appendChild(_typingEl);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    if (_typingEl) {
      try { assistantMessages.removeChild(_typingEl); } catch (e) { }
      _typingEl = null;
    }
  }

  // ─── Send logic ────────────────────────────────────────────────────────────
  // Race-condition guard: if the user sends again before the reply fires,
  // the stale timeout is cancelled. Only the most recent question gets replied to.
  let _pendingReplyTimeout = null;

  function setSendDisabled(disabled) {
    try { assistantSendBtn.disabled = disabled; } catch (e) { }
  }

  async function sendQuestion() {
    const q = assistantInput.value && assistantInput.value.trim();
    if (!q) return;

    // Cancel any in-flight static reply (kept for safety with submission events)
    if (_pendingReplyTimeout !== null) {
      clearTimeout(_pendingReplyTimeout);
      _pendingReplyTimeout = null;
      hideTypingIndicator();
    }

    chat.push({ role: 'user', text: q });
    renderAppend();
    assistantInput.value = '';

    // Disable send button while reply is pending
    setSendDisabled(true);
    showTypingIndicator();

    const BACKEND_URL = import.meta.env?.VITE_BACKEND_URL || (['localhost', '127.0.0.1'].includes(window.location.hostname)
      ? 'http://localhost:5000'
      : 'https://learntrace-backend.onrender.com');

    // Use the AI proxy instead of the old rule-based system
    try {
      const historyToSend = chat.slice(0, -1);
      const response = await fetch(`${BACKEND_URL}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history: historyToSend })
      });

      if (!response.ok) throw new Error(`Backend Error: ${response.status}`);

      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.error || "Study Assistant is temporarily unavailable.");
      }
      
      let ans = data.reply || "Sorry, I received an empty response.";

      // Append tone hint if available
      const hint = getToneHint(window.__learnTraceLiveMetrics);
      if (hint) {
        ans += `\n\n💡 ${hint}`;
      }

      hideTypingIndicator();
      chat.push({ role: 'assistant', text: ans });
      renderAppend();
    } catch (e) {
      console.error('AI Chat Error:', e);
      hideTypingIndicator();
      chat.push({ role: 'assistant', text: "Sorry, the Study Assistant is temporarily unavailable. Please try again." });
      renderFull();
    } finally {
      setSendDisabled(false);
      try { assistantInput.focus(); } catch (e) { }
    }
  }

  // ─── Event listeners ──────────────────────────────────────────────────────
  assistantSendBtn.addEventListener('click', (e) => { e.preventDefault(); sendQuestion(); });
  assistantInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendQuestion(); }
  });

  if (assistantClearBtn) {
    assistantClearBtn.addEventListener('click', () => {
      // Cancel any pending reply before clearing
      if (_pendingReplyTimeout !== null) { clearTimeout(_pendingReplyTimeout); _pendingReplyTimeout = null; }
      hideTypingIndicator();
      setSendDisabled(false);
      chat.length = 0;
      renderFull();
    });
  }

  // Initial empty state
  renderFull();

  // ─── Post-submission personalized feedback ────────────────────────────────
  /**
   * Composes a one-line supportive message based on behavioral metrics and
   * the learner pattern classification produced by script.js.
   */
  function composePersonalizedFeedback(metrics, classification, insight) {
    // If script.js already generated an insight, use it directly for consistency
    if (insight) return `${insight} The Study Assistant is here whenever you want to explore further.`;

    if (!metrics) return "Good attempt! Reflect on what felt easiest and hardest — that contrast shows you where to focus next.";

    const edits = metrics.edits != null ? metrics.edits : (metrics.totalEdits || 0);
    const idle = metrics.idleTime != null ? metrics.idleTime : (metrics.idleSeconds || 0);
    const keystrokes = metrics.keystrokes || 0;
    const timeSpent = metrics.timeSpent || metrics.durationSeconds || 0;

    if (classification) {
      if (/reflective/i.test(classification))
        return "Your pauses and revisions suggest deep thinking. 🌱 Try capturing *why* you changed your wording — that metacognition is powerful.";
      if (/revising|persistent/i.test(classification))
        return "Lots of edits — you're actively shaping your understanding. 🔧 Notice what made you revise: confusion, or improving precision?";
      if (/quick submitter|fast|ai.depend/i.test(classification))
        return "Quick response! 🏃 Make sure the answer came from *your* thinking. Try explaining it again in one minute without looking.";
      if (/balanced/i.test(classification))
        return "Solid, balanced session. ⚖️ Keep this rhythm — thoughtful pace + steady revisions is what healthy learning looks like.";
    }

    if (edits >= 15) return "You're refining your thinking — that's exactly right. 🔧 What prompted each revision?";
    if (idle >= 30) return "Those pauses matter. 🧠 Try writing a one-line summary of what you were thinking during the longest pause.";
    if (keystrokes < 40) return "Short response this time. Try expanding — an example or analogy almost always deepens understanding.";
    if (timeSpent >= 90) return "You stayed with it. 💪 Long sessions build stamina — the next one might feel more fluid.";

    return "Nice work! Briefly summarize your answer out loud after closing the app — that final retrieval step is surprisingly effective.";
  }

  // Listen for submission events dispatched by script.js
  document.addEventListener('learntrace:submission', (ev) => {
    try {
      // Cancel any pending question reply and clear typing indicator
      if (_pendingReplyTimeout !== null) { clearTimeout(_pendingReplyTimeout); _pendingReplyTimeout = null; }
      hideTypingIndicator();
      setSendDisabled(false);

      let metrics = null;
      let classification = null;
      let insight = null;

      // Prefer live metrics window object (most up-to-date)
      try { const lm = window.__learnTraceLiveMetrics; if (lm) metrics = lm; } catch (e) { }

      if (!metrics && ev && ev.detail && ev.detail.metrics) {
        metrics = {
          timeSpent: ev.detail.metrics.timeSpent,
          keystrokes: ev.detail.metrics.keystrokes,
          edits: ev.detail.metrics.edits,
          idleTime: ev.detail.metrics.idleTime,
        };
      }

      if (ev && ev.detail) {
        classification = ev.detail.classification || null;
        insight = ev.detail.insight || null;
      }

      const feedback = composePersonalizedFeedback(metrics, classification, insight);
      chat.push({ role: 'assistant', text: feedback });
      renderAppend();
    } catch (e) {
      // Swallow silently — chatbot feedback is non-critical to the core app
    }
  });
})();
