/**
 * src/services/database/userService.js — Supabase User Data Access Layer
 *
 * Provides reusable query functions for user-specific tables:
 * profiles, learning_progress, coding_submissions,
 * coding_problem_progress, thinktrace_sessions.
 *
 * All user data tables are protected by RLS (auth.uid() = profile_id),
 * so queries automatically scope to the authenticated user.
 */
import { supabase } from '../config/index.js';

// ─── Profiles ─────────────────────────────────────────────────────────────────

/**
 * Fetch the current user's profile.
 * @param {string} userId
 * @returns {Promise<object|null>}
 */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('[UserService] getProfile error:', error.message);
    return null;
  }
  return data;
}

/**
 * Update the current user's profile.
 * @param {string} userId
 * @param {object} updates - { display_name, photo_url }
 * @returns {Promise<object|null>}
 */
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('[UserService] updateProfile error:', error.message);
    return null;
  }
  return data;
}

// ─── Learning Progress ────────────────────────────────────────────────────────

/**
 * Fetch learning progress for a specific topic.
 * @param {string} profileId
 * @param {string} topicId
 * @returns {Promise<object|null>}
 */
export async function getLearningProgress(profileId, topicId) {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('profile_id', profileId)
    .eq('topic_id', topicId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('[UserService] getLearningProgress error:', error.message);
  }
  return data || null;
}

/**
 * Fetch all learning progress for the user.
 * @param {string} profileId
 * @returns {Promise<Array>}
 */
export async function getAllLearningProgress(profileId) {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('profile_id', profileId);

  if (error) {
    console.error('[UserService] getAllLearningProgress error:', error.message);
    return [];
  }
  return data;
}

/**
 * Upsert learning progress for a topic (mark metaphors/problems completed).
 * @param {string} profileId
 * @param {string} topicId
 * @param {object} progress - { metaphors_completed, problems_completed }
 * @returns {Promise<object|null>}
 */
export async function upsertLearningProgress(profileId, topicId, progress) {
  const { data, error } = await supabase
    .from('learning_progress')
    .upsert({
      profile_id: profileId,
      topic_id: topicId,
      ...progress,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'profile_id,topic_id'
    })
    .select()
    .single();

  if (error) {
    console.error('[UserService] upsertLearningProgress error:', error.message);
    return null;
  }
  return data;
}

// ─── Coding Submissions ───────────────────────────────────────────────────────

/**
 * Save a coding submission.
 * @param {object} submission
 * @returns {Promise<object|null>}
 */
export async function saveCodingSubmission(submission) {
  const { data, error } = await supabase
    .from('coding_submissions')
    .insert(submission)
    .select()
    .single();

  if (error) {
    console.error('[UserService] saveCodingSubmission error:', error.message);
    return null;
  }
  return data;
}

/**
 * Fetch coding submissions for a problem.
 * @param {string} profileId
 * @param {string} problemId
 * @returns {Promise<Array>}
 */
export async function getCodingSubmissions(profileId, problemId) {
  const { data, error } = await supabase
    .from('coding_submissions')
    .select('*')
    .eq('profile_id', profileId)
    .eq('problem_id', problemId)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('[UserService] getCodingSubmissions error:', error.message);
    return [];
  }
  return data;
}

// ─── Coding Problem Progress ──────────────────────────────────────────────────

/**
 * Upsert coding problem progress (attempts, solved status).
 * @param {string} profileId
 * @param {string} problemId
 * @param {object} progress - { solved, attempts_count }
 * @returns {Promise<object|null>}
 */
export async function upsertCodingProgress(profileId, problemId, progress) {
  const { data, error } = await supabase
    .from('coding_problem_progress')
    .upsert({
      profile_id: profileId,
      problem_id: problemId,
      ...progress,
      last_attempt_at: new Date().toISOString(),
      ...(progress.solved ? { completed_at: new Date().toISOString() } : {})
    }, {
      onConflict: 'profile_id,problem_id'
    })
    .select()
    .single();

  if (error) {
    console.error('[UserService] upsertCodingProgress error:', error.message);
    return null;
  }
  return data;
}

/**
 * Get all coding problem progress for the user.
 * @param {string} profileId
 * @returns {Promise<Array>}
 */
export async function getAllCodingProgress(profileId) {
  const { data, error } = await supabase
    .from('coding_problem_progress')
    .select('*')
    .eq('profile_id', profileId);

  if (error) {
    console.error('[UserService] getAllCodingProgress error:', error.message);
    return [];
  }
  return data;
}

// ─── ThinkTrace Sessions ──────────────────────────────────────────────────────

/**
 * Save a ThinkTrace session.
 * @param {object} session
 * @returns {Promise<object|null>}
 */
export async function saveThinkTraceSession(session) {
  const { data, error } = await supabase
    .from('thinktrace_sessions')
    .insert(session)
    .select()
    .single();

  if (error) {
    console.error('[UserService] saveThinkTraceSession error:', error.message);
    return null;
  }
  return data;
}

/**
 * Fetch ThinkTrace sessions for the user.
 * @param {string} profileId
 * @returns {Promise<Array>}
 */
export async function getThinkTraceSessions(profileId) {
  const { data, error } = await supabase
    .from('thinktrace_sessions')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[UserService] getThinkTraceSessions error:', error.message);
    return [];
  }
  return data;
}
