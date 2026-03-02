/**
 * LearnTrace — Study Assistant (offline, rule-based, no external API)
 *
 * Responsibilities:
 *  1. Receive student questions and return Socratic / mentor-style responses
 *  2. Detect intent (confusion, example request, simpler explanation, topic)
 *  3. Listen for session submission events and post one personalized insight
 *
 * This file is intentionally self-contained — it reads live metrics from
 * window.__learnTraceLiveMetrics (written by script.js) but has no other
 * coupling to the rest of the app.
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

  // ─── Text normalization ───────────────────────────────────────────────────
  function normalize(q) {
    return (q || "").toLowerCase().trim().replace(/[?!.,;:]/g, "");
  }

  // ─── Intent detection ─────────────────────────────────────────────────────
  /**
   * Returns one of: 'confusion' | 'example_request' | 'simpler_request' |
   *                 'study_advice' | 'topic' | null
   * Intent is detected before (and takes priority over) topic detection.
   */
  function detectIntent(q) {
    // Confusion / struggle signals
    if (/i (don'?t|do not|cant|can'?t) (get|understand|follow|see)|confused|confusing|lost|unclear|not sure|don'?t get it|what does that mean|makes no sense/.test(q))
      return 'confusion';

    // Request for a concrete example
    if (/(give|show|can you give|can you show|need|want|any) (me )?(an? )?(example|instance|sample|illustration)|for instance|e\.?g\.?/.test(q))
      return 'example_request';

    // Request for a simpler / plain-English explanation
    if (/simpler|simplify|easier|eli5|explain (simply|plainly|in plain|in simple)|plain english|layman|dumb it down|break it down/.test(q))
      return 'simpler_request';

    // General study / learning advice
    if (/study tip|how to study|learning tip|how do i learn|memorize|remember|retain|focus|concentrate|revision/.test(q))
      return 'study_advice';

    return null;
  }

  // ─── Topic detection ──────────────────────────────────────────────────────
  function detectTopic(q) {
    if (/\brecursion\b|\brecursive\b/.test(q)) return 'recursion';
    if (/\bbase[- ]?case\b/.test(q)) return 'base_case';
    if (/\bloop(s|ing)?\b|\bfor[- ]loop\b|\bwhile[- ]loop\b|\biterat(e|ion)\b/.test(q)) return 'loops';
    if (/\bfunction(s|al)?\b|\bmethod(s)?\b|\bparameter(s)?\b|\breturn[- ]value\b/.test(q)) return 'functions';
    if (/\btime[- ]complexity\b|\bbig[- ]o\b|\bo\(n\)/.test(q) || /\balgorithm[- ]analysis\b|\bspace[- ]complexity\b/.test(q)) return 'time_complexity';
    if (/\bvariable(s)?\b|\bdata[- ]type(s)?\b/.test(q)) return 'variables';
    if (/\barray(s)?\b|\blist(s)?\b/.test(q)) return 'arrays';
    if (/\bpointer(s)?\b|\bmemory\b|\bstack\b|\bheap\b/.test(q)) return 'memory';
    if (/\bclass(es)?\b|\bobject(s)?\b|\boop\b|\binheritance\b/.test(q)) return 'oop';
    if (/\bsort(ing)?\b|\bsearch(ing)?\b/.test(q)) return 'sorting_searching';
    if (/\bif[- ]else\b|\bcondition(al)?s?\b|\bswitch[- ]case\b|\bboolean\b|\btrue|false\b/.test(q)) return 'conditionals';
    if (/\bdebug(ging)?\b|\berror(s)?\b|\bconsole\.log\b|\bbreakpoint\b|\bbug(s)?\b/.test(q)) return 'debugging';
    if (/\bstring(s)?\b|\btext\b|\bcharacter(s)?\b|\bconcaten|\bsubstr/.test(q)) return 'strings';
    return null;
  }

  // ─── Intent response library ──────────────────────────────────────────────
  const intentResponses = {
    confusion: [
      "That's completely okay — confusion is the beginning of understanding. Can you tell me *exactly* which part is tripping you up? Is it the idea itself, how it works in code, or when you'd use it?",
      "Let's untangle this. In your own words, what do you think it *might* mean, even if you're guessing? Sometimes a half-right answer reveals where the gap actually is.",
      "When you say you're confused, is it more like 'I've never seen this before' or 'I kind of get it but something doesn't click'? That difference helps me know where to start.",
    ],
    example_request: [
      "Great instinct — examples anchor abstract ideas. Before I offer one, try this: describe the concept in one sentence as you understand it now. Then I can build an example around *your* mental model.",
      "I'd love to give you an example, but first — what context are you working in? (e.g., what language, or what kind of problem are you solving?) That way the example will actually stick.",
      "Examples work best when you generate them first! Try writing a tiny, broken attempt at one. Even wrong examples teach you something — then we can refine it together.",
    ],
    simpler_request: [
      "Let's strip it all the way down. Forget the technical terms for a moment — what would you call this thing if you were explaining it to a friend who doesn't code?",
      "Here's the simplest frame: think of it like a recipe. There's an input, a process, and an output. Where does the concept you're asking about fit in that picture?",
      "Imagine you had to explain this using only everyday objects — no code at all. What physical object or situation would you use? That analogy is usually the clearest starting point.",
    ],
    study_advice: [
      "The most effective study habit for technical topics: try to *recall* the concept from scratch before re-reading. Even if you get it wrong, the attempt strengthens the memory trace.",
      "After each study session, write one sentence: 'Today I learned that…' It forces active processing and gives you a quick-review trail over time.",
      "Spaced repetition beats cramming every time. Revisit concepts after 1 day, 3 days, then a week. LearnTrace is built around exactly this idea — use your session history to spot what needs revisiting.",
    ],
  };

  // ─── Topic response library ────────────────────────────────────────────────
  const topicResponses = {
    recursion: [
      "Before I explain — what's your current guess about how recursion works? Even a rough idea helps me guide you better.",
      "Think of it like this: a function that calls a smaller version of *itself*. Ask yourself — what stops it from calling forever?",
      "Try to answer: 'What is the smallest input where I'd solve this directly?' That's your base case — the anchor of recursion.",
    ],
    base_case: [
      "A base case is your *exit condition* — the simplest input you can solve directly without calling the function again.",
      "Think of it like a ladder: you climb down step by step (recursive calls) until you hit the ground (base case). What's your 'ground'?",
    ],
    loops: [
      "Loops repeat an action while a condition is true. Before I dive in — can you tell me which type you're working with? (for, while, do-while)",
      "Ask yourself: what changes each time the loop runs? And what condition makes it stop? Those two things define every loop.",
      "A common pitfall: forgetting to update the loop variable. Walk through your loop *manually* for 2–3 iterations and see if it behaves as expected.",
    ],
    functions: [
      "Functions are reusable blocks of logic. What part are you unsure about — defining them, calling them, or understanding return values?",
      "Think of a function as a recipe: inputs (parameters) go in, something happens, and a result (return value) comes out. What part feels fuzzy?",
      "Try to describe in one sentence what your function *does*, not how. If you struggle, that often reveals a design issue.",
    ],
    time_complexity: [
      "Big-O describes how your algorithm *scales* — not how fast it is right now, but how much slower it gets as input grows. Sound familiar?",
      "Start simple: how many times does your *innermost* operation run? Express it in terms of the input size n.",
      "An O(n²) algorithm might be fine for 10 items but painful for 10,000. Think about the worst case — what's your algorithm doing when input is largest?",
    ],
    variables: [
      "A variable is a named slot in memory that holds a value. The key questions: what *type* of value, and what is its *scope*?",
      "Try tracing your code line by line and writing down what each variable holds at every step. This catches most variable-related bugs.",
    ],
    arrays: [
      "Arrays store multiple items in order, each accessible by index (starting at 0). What operation are you trying to perform on the array?",
      "Common pitfall: off-by-one errors (using length instead of length-1 as the last index). Walk through the edge cases manually.",
    ],
    memory: [
      "Stack memory is for local variables and function calls (fast, auto-managed). Heap is for dynamic allocation. Which context are you working in?",
      "Pointers hold the *address* of a value, not the value itself. Ask: am I dereferencing the pointer before or after I intend to?",
    ],
    oop: [
      "Think of a class as a *blueprint* and an object as the *actual thing* built from it. What part — encapsulation, inheritance, or polymorphism — feels unclear?",
      "Inheritance lets a child class reuse parent behaviour. Ask: does the 'is-a' relationship truly hold here? (Dog *is-a* Animal ✓, Engine *is-a* Car ✗)",
    ],
    sorting_searching: [
      "Before choosing a sort, ask: how large is the input? Is it nearly sorted already? Is memory a concern? Different answers point to different algorithms.",
      "Binary search requires *sorted* data and cuts the search space in half each step — O(log n). Can you apply that halving idea here?",
    ],
    conditionals: [
      "Conditionals let your program make decisions. What part feels unclear: the condition itself, the branching, or how else-if chains work?",
      "Try tracing through your if/else with concrete values. What inputs make each branch run? Walking through real examples reveals logic bugs immediately.",
      "A common pitfall: nesting too many conditions. Ask: can this be simplified with an early return or a switch statement?",
    ],
    debugging: [
      "Debugging is a skill, not a chore. Start by asking: what *exactly* did I expect, and what *actually* happened? That gap is your bug.",
      "Add a console.log right before the suspicious line and print the actual values. Often seeing the real value is the 'aha' moment.",
      "Work backwards: where is the last point in the code where things were *correct*? Narrow the suspect zone step by step.",
    ],
    strings: [
      "Strings are sequences of characters — most languages index from 0. What operation are you trying to perform: search, slice, replace, or combine?",
      "Common pitfall: strings are immutable in many languages (JavaScript included). Methods like .slice() return *new* strings — they don't change the original.",
      "Try printing the string's length and a few characters at specific indexes. That grounding step prevents most off-by-one errors with strings.",
    ],
    study_tips: [
      "Try the Feynman Technique: explain the concept in plain English as if teaching a 10-year-old. Where you stumble is exactly where to review.",
      "Spaced repetition beats cramming. Instead of re-reading, try to *recall* the concept from scratch first — then check your notes.",
      "After solving a problem, ask: 'What's the *core idea* I just used?' Naming the pattern helps you recognize it next time.",
    ],
  };

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

  // ─── Build response ────────────────────────────────────────────────────────
  function getAnswer(question, metrics) {
    const q = normalize(question);
    const intent = detectIntent(q);
    const topic = detectTopic(q);
    const hint = getToneHint(metrics);

    // Count how many assistant replies are already in the chat (for cycling)
    const assistantCount = chat.filter(m => m.role === 'assistant').length;

    let reply;

    if (intent && intentResponses[intent]) {
      // Intent takes priority over topic
      const pool = intentResponses[intent];
      reply = pool[assistantCount % pool.length];

      // If we additionally know the topic, append a topic-level follow-up
      if (topic && topicResponses[topic]) {
        const topicPool = topicResponses[topic];
        reply += `\n\n${topicPool[assistantCount % topicPool.length]}`;
      }
    } else if (topic && topicResponses[topic]) {
      const pool = topicResponses[topic];
      reply = pool[assistantCount % pool.length];
    } else {
      // General reflective fallbacks
      const fallbacks = [
        "That's a thoughtful question. What have you already tried or looked up? Sharing your current understanding helps me ask better guiding questions.",
        "I want to help you get there yourself. What part of this concept feels most uncertain right now — the idea, how it works, or when to use it?",
        "Good question! Break it down: what do you *know* for sure, and what's the uncertain part? Let's start with what you know.",
      ];
      reply = fallbacks[assistantCount % fallbacks.length];
    }

    return hint ? `${reply}\n\n💡 ${hint}` : reply;
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

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });

      if (!response.ok) throw new Error(`Backend Error: ${response.status}`);

      const data = await response.json();
      let ans = data.reply || "Sorry, I received an empty response.";

      hideTypingIndicator();
      chat.push({ role: 'assistant', text: ans });
      renderFull(); // Forces a clean syncing of state to fix vanishing history bugs
    } catch (e) {
      // Don't use safeLog here to avoid breaking if it's not universally available
      console.error('AI Chat Error:', e);
      hideTypingIndicator();
      chat.push({ role: 'assistant', text: "Sorry, I had trouble connecting to the AI." });
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
