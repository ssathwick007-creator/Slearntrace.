/**
 * profile.js — Insight Lens Profile Page Logic
 */

import {
  getUserProfile,
  updateUserDisplayName,
  uploadProfileImage,
  updateUserPhotoURL,
} from './auth.js';
import { getSessions } from './src/storage.js';
import { getUserId, getCurrentUser } from './userContext.js';
import { analyzeSessions } from './src/analytics.js';
import { buildLearnerProfile } from './src/profileSynthesis.js';

let currentUser = null;

// ─── Data Calculation ─────────────────────────────────────────────────────────

function calculateStreak(sessions) {
  if (!sessions || sessions.length === 0) return 0;

  // Get unique dates in YYYY-MM-DD format
  const dates = [...new Set(sessions.map(s => {
    const d = new Date(s.timestamp);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }))].sort((a, b) => new Date(b) - new Date(a));

  if (dates.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;

  // Start checking from the most recent date
  let checkDate = new Date(dates[0]);

  // If the most recent session wasn't today or yesterday, streak is broken
  if (dates[0] !== todayStr && dates[0] !== yesterdayStr) {
    return 0;
  }

  streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);
    const diff = (prevDate - currDate) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function calculateAvgScore(sessions) {
  // LearnTrace doesn't store a 'score' field globally yet,
  // but some sessions might have a 'percentage' or 'sessionLabel'
  let totalScore = 0;
  let scoredCount = 0;

  sessions.forEach(s => {
    // Fallback scoring based on pattern severity
    if (s.pattern === 'Mastery' || s.pattern === 'Excellent') {
      totalScore += 95;
      scoredCount++;
    } else if (s.pattern === 'Good effort' || s.pattern === 'Reflective Thinker') {
      totalScore += 75;
      scoredCount++;
    } else if (s.pattern) {
      totalScore += 60;
      scoredCount++;
    }
  });

  return scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0;
}

// ─── UI Population ───────────────────────────────────────────────────────────

async function populateProfile() {
  const uid = getUserId();
  const allSessions = getSessions();
  const userSessions = allSessions.filter(s => s.userId === uid).sort((a, b) => b.timestamp - a.timestamp);

  // 1. Calculate Stats
  const streak = calculateStreak(userSessions);
  const totalSessions = userSessions.length;
  const avgScore = calculateAvgScore(userSessions);

  // 2. Perform deeper analytics
  const analytics = analyzeSessions(userSessions);
  const learnerProfile = buildLearnerProfile(userSessions, analytics);

  // 3. Update Lens
  const currentStreakEl = document.getElementById('currentStreakValue');
  const totalSessionsEl = document.getElementById('totalSessionsValue');
  const avgScoreEl = document.getElementById('avgCorrectnessValue');

  if (currentStreakEl) currentStreakEl.textContent = streak;
  if (totalSessionsEl) totalSessionsEl.textContent = totalSessions;
  if (avgScoreEl) avgScoreEl.textContent = `${avgScore}%`;

  // 4. Update Ray Badges
  const longestStreakEl = document.getElementById('longestStreakValue');
  const totalActivityEl = document.getElementById('totalActivityValue');
  const patternEl = document.getElementById('patternValue');
  const focusEl = document.getElementById('focusInsightValue');
  const topTaskEl = document.getElementById('topTaskValue');
  const milestoneEl = document.getElementById('milestoneValue');
  const milestoneProgressEl = document.getElementById('milestoneProgress');

  if (longestStreakEl) longestStreakEl.textContent = `${streak} days`; // Simplified for now
  if (totalActivityEl) {
    const edits = userSessions.reduce((sum, s) => sum + (s.metrics?.edits || 0), 0);
    totalActivityEl.textContent = `${edits} edits`;
  }
  if (patternEl && learnerProfile) patternEl.textContent = learnerProfile.dominantLearnerType;
  if (focusEl && analytics.aggregates) {
    const idle = Math.round(analytics.aggregates.avgIdleSec);
    if (idle < 10) focusEl.textContent = 'Laser Focus';
    else if (idle < 30) focusEl.textContent = 'Steady Pacer';
    else focusEl.textContent = 'Deep Thinker';
  }
  if (topTaskEl && learnerProfile) topTaskEl.textContent = learnerProfile.strongestTaskType || 'Thinking';

  if (milestoneEl) {
    const nextMilestone = totalSessions < 10 ? 10 : (totalSessions < 50 ? 50 : 100);
    milestoneEl.textContent = `${nextMilestone} Sessions`;
    if (milestoneProgressEl) milestoneProgressEl.textContent = `${totalSessions}/${nextMilestone} completed`;
  }

  // 5. Update Persona Card
  const personaTextEl = document.getElementById('personaSummaryText');
  if (personaTextEl && analytics.insightText.length > 0) {
    personaTextEl.textContent = analytics.insightText[0];
  } else if (personaTextEl && learnerProfile) {
    personaTextEl.textContent = `You are a ${learnerProfile.dominantLearnerType}. You focus best with ${analytics.aggregates?.avgIdleSec < 20 ? 'continuous action' : 'deep reflection'} and shown ${learnerProfile.improvementTrend} over time.`;
  }

  // 6. Recent Sessions Grid
  const sessionsGrid = document.getElementById('recentSessionsGrid');
  if (sessionsGrid && userSessions.length > 0) {
    sessionsGrid.innerHTML = '';
    userSessions.slice(0, 5).forEach(s => {
      const card = document.createElement('div');
      card.className = 'session-card';
      const date = new Date(s.timestamp).toLocaleDateString();
      card.innerHTML = `
              <div class="session-header">
                  <span class="session-date">${date}</span>
                  <span class="session-type">${s.taskType || 'Session'}</span>
              </div>
              <div style="font-size: 0.95rem; font-weight: 500;">${s.pattern || 'Pattern Unlocked'}</div>
              <div class="session-stats">
                  <div style="font-size: 0.75rem;"><span style="color:var(--text-muted)">Time:</span> ${s.metrics?.durationSeconds}s</div>
                  <div style="font-size: 0.75rem;"><span style="color:var(--text-muted)">Edits:</span> ${s.metrics?.edits}</div>
              </div>
          `;
      sessionsGrid.appendChild(card);
    });
  }

  // 7. Achievements Unlocking
  if (totalSessions >= 10) document.getElementById('badge-10sessions')?.classList.add('unlocked');
  if (streak >= 5) document.getElementById('badge-streak5')?.classList.add('unlocked');
  if (avgScore >= 90) document.getElementById('badge-topscore')?.classList.add('unlocked');
  const totalEdits = userSessions.reduce((sum, s) => sum + (s.metrics?.edits || 0), 0);
  if (totalEdits >= 1000) document.getElementById('badge-editor')?.classList.add('unlocked');
  const avgIdle = analytics.aggregates?.avgIdleSec || 100;
  if (avgIdle < 2 && totalSessions > 0) document.getElementById('badge-focusmax')?.classList.add('unlocked');
}

// ─── Legacy Settings Logic ───────────────────────────────────────────────────

async function loadSettings(user) {
  currentUser = user;
  const profile = await getUserProfile(user.uid);
  const data = profile || {};

  const nameInput = document.getElementById('displayNameInput');
  if (nameInput) nameInput.value = data.displayName || user.displayName || '';

  const letterEl = document.getElementById('avatarLetter');
  const imgEl = document.getElementById('avatarImg');
  const name = data.displayName || user.displayName || 'Learner';

  if (data.photoURL || user.photoURL) {
    const url = data.photoURL || user.photoURL;
    if (imgEl) { imgEl.src = url; imgEl.hidden = false; }
    if (letterEl) letterEl.hidden = true;
  } else {
    const initial = name.charAt(0).toUpperCase();
    if (letterEl) { letterEl.textContent = initial; letterEl.hidden = false; }
    if (imgEl) imgEl.hidden = true;
  }
}

// ─── Interaction Handlers ─────────────────────────────────────────────────────

document.getElementById('toggleEditBtn')?.addEventListener('click', () => {
  const section = document.getElementById('editProfileSection');
  if (section) {
    const isHidden = section.style.display === 'none';
    section.style.display = isHidden ? 'block' : 'none';
    document.getElementById('toggleEditBtn').textContent = isHidden ? 'Hide Settings' : 'Edit Profile Info';
    if (isHidden) section.scrollIntoView({ behavior: 'smooth' });
  }
});

const saveBtn = document.getElementById('saveProfileBtn');
saveBtn?.addEventListener('click', async () => {
  if (!currentUser) return;
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';
  const newName = document.getElementById('displayNameInput').value.trim();
  try {
    await updateUserDisplayName(currentUser.uid, newName);
    document.getElementById('profileSuccess').style.display = 'block';
    document.getElementById('profileSuccess').textContent = 'Profile saved!';
    setTimeout(() => populateProfile(), 1000);
  } catch (e) {
    document.getElementById('profileError').style.display = 'block';
    document.getElementById('profileError').textContent = 'Failed to save.';
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save Changes';
  }
});

document.getElementById('uploadBtn')?.addEventListener('click', () => {
  document.getElementById('photoInput')?.click();
});

document.getElementById('photoInput')?.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file || !currentUser) return;
  try {
    const url = await uploadProfileImage(currentUser.uid, file);
    await updateUserPhotoURL(currentUser.uid, url);
    window.location.reload();
  } catch (err) {
    alert('Upload failed');
  }
});

// ─── Initialization ──────────────────────────────────────────────────────────

function onAuthReady(e) {
  const user = e?.detail?.user;
  if (user) {
    loadSettings(user);
    populateProfile();
  }
}

if (window.__authState?.ready) {
  onAuthReady({ detail: { user: window.__authState.user } });
} else {
  window.addEventListener('auth-ready', onAuthReady, { once: true });
}
