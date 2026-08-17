/**
 * src/services/database/contentService.js — Supabase Content Data Access Layer
 *
 * Provides reusable query functions for all content tables:
 * subjects, topics, metaphors, metaphor_steps, coding_problems,
 * coding_problem_topics, coding_problem_examples, coding_problem_languages,
 * coding_test_cases.
 *
 * Uses the shared Supabase client from config/index.js (anon key only).
 * Never exposes service-role credentials.
 */
import { supabase } from '../config/index.js';

// ─── In-memory cache to avoid redundant fetches ──────────────────────────────
const cache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const entry = cache[key];
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
  return null;
}

function setCache(key, data) {
  cache[key] = { data, ts: Date.now() };
}

// ─── Subjects ─────────────────────────────────────────────────────────────────

/**
 * Fetch all published subjects, ordered by sort_order.
 * @returns {Promise<Array>}
 */
export async function getSubjects() {
  const cached = getCached('subjects');
  if (cached) return cached;

  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('status', 'published')
    .order('sort_order');

  if (error) {
    console.error('[ContentService] getSubjects error:', error.message);
    return [];
  }

  setCache('subjects', data);
  return data;
}

// ─── Topics ───────────────────────────────────────────────────────────────────

/**
 * Fetch all published topics for a given subject, ordered by sort_order.
 * @param {string} subjectId - UUID of the subject
 * @returns {Promise<Array>}
 */
export async function getTopicsBySubject(subjectId) {
  const key = `topics_${subjectId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('subject_id', subjectId)
    .eq('status', 'published')
    .order('sort_order');

  if (error) {
    console.error('[ContentService] getTopicsBySubject error:', error.message);
    return [];
  }

  setCache(key, data);
  return data;
}

/**
 * Fetch a single topic by its slug.
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function getTopicBySlug(slug) {
  const key = `topic_slug_${slug}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('[ContentService] getTopicBySlug error:', error.message);
    return null;
  }

  setCache(key, data);
  return data;
}

/**
 * Fetch all published topics (across all subjects).
 * @returns {Promise<Array>}
 */
export async function getAllTopics() {
  const cached = getCached('all_topics');
  if (cached) return cached;

  const { data, error } = await supabase
    .from('topics')
    .select('*, subjects(name, slug)')
    .eq('status', 'published')
    .order('sort_order');

  if (error) {
    console.error('[ContentService] getAllTopics error:', error.message);
    return [];
  }

  setCache('all_topics', data);
  return data;
}

// ─── Metaphors ────────────────────────────────────────────────────────────────

/**
 * Fetch all published metaphors for a given topic, ordered by sort_order.
 * @param {string} topicId - UUID of the topic
 * @returns {Promise<Array>}
 */
export async function getMetaphorsByTopic(topicId) {
  const key = `metaphors_${topicId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('metaphors')
    .select('*')
    .eq('topic_id', topicId)
    .eq('status', 'published')
    .order('sort_order');

  if (error) {
    console.error('[ContentService] getMetaphorsByTopic error:', error.message);
    return [];
  }

  setCache(key, data);
  return data;
}

/**
 * Fetch a metaphor by its string ID (e.g., 'ConcertSeating').
 * @param {string} metaphorId
 * @returns {Promise<object|null>}
 */
export async function getMetaphorById(metaphorId) {
  const key = `metaphor_${metaphorId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('metaphors')
    .select('*')
    .eq('id', metaphorId)
    .single();

  if (error) {
    console.error('[ContentService] getMetaphorById error:', error.message);
    return null;
  }

  setCache(key, data);
  return data;
}

// ─── Metaphor Steps ───────────────────────────────────────────────────────────

/**
 * Fetch all steps for a metaphor, ordered by step_number.
 * @param {string} metaphorId - string ID of the metaphor
 * @returns {Promise<Array>}
 */
export async function getMetaphorSteps(metaphorId) {
  const key = `metaphor_steps_${metaphorId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('metaphor_steps')
    .select('*')
    .eq('metaphor_id', metaphorId)
    .order('step_number');

  if (error) {
    console.error('[ContentService] getMetaphorSteps error:', error.message);
    return [];
  }

  setCache(key, data);
  return data;
}

// ─── Coding Problems ──────────────────────────────────────────────────────────

/**
 * Fetch all published coding problems, optionally filtered by topic.
 * @param {string} [topicId] - Optional topic UUID to filter
 * @returns {Promise<Array>}
 */
export async function getCodingProblems(topicId) {
  const key = topicId ? `problems_${topicId}` : 'problems_all';
  const cached = getCached(key);
  if (cached) return cached;

  let query = supabase
    .from('coding_problems')
    .select('*, coding_problem_topics(topic_id)')
    .eq('status', 'published')
    .order('sort_order');

  // If topicId, we do a post-filter (since it's a junction table)
  const { data, error } = await query;

  if (error) {
    console.error('[ContentService] getCodingProblems error:', error.message);
    return [];
  }

  let result = data;
  if (topicId) {
    result = data.filter(p =>
      p.coding_problem_topics?.some(pt => pt.topic_id === topicId)
    );
  }

  setCache(key, result);
  return result;
}

/**
 * Fetch a coding problem by slug with its examples and language templates.
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function getCodingProblemBySlug(slug) {
  const key = `problem_${slug}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('coding_problems')
    .select(`
      *,
      coding_problem_examples(input_data, expected_output, explanation, sort_order),
      coding_problem_languages(language, starter_code),
      coding_test_cases(input_data, expected_output, is_sample, sort_order)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('[ContentService] getCodingProblemBySlug error:', error.message);
    return null;
  }

  setCache(key, data);
  return data;
}

// ─── Coding Problem Examples ──────────────────────────────────────────────────

/**
 * Fetch examples for a coding problem.
 * @param {string} problemId
 * @returns {Promise<Array>}
 */
export async function getCodingProblemExamples(problemId) {
  const key = `examples_${problemId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('coding_problem_examples')
    .select('*')
    .eq('problem_id', problemId)
    .order('sort_order');

  if (error) {
    console.error('[ContentService] getCodingProblemExamples error:', error.message);
    return [];
  }

  setCache(key, data);
  return data;
}

// ─── Coding Problem Languages ─────────────────────────────────────────────────

/**
 * Fetch language starter code templates for a coding problem.
 * @param {string} problemId
 * @returns {Promise<Array>}
 */
export async function getCodingProblemLanguages(problemId) {
  const key = `languages_${problemId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('coding_problem_languages')
    .select('*')
    .eq('problem_id', problemId);

  if (error) {
    console.error('[ContentService] getCodingProblemLanguages error:', error.message);
    return [];
  }

  setCache(key, data);
  return data;
}

// ─── Test Cases (sample only — RLS blocks hidden ones) ────────────────────────

/**
 * Fetch sample test cases for a coding problem.
 * Hidden test cases are blocked by RLS and will not be returned.
 * @param {string} problemId
 * @returns {Promise<Array>}
 */
export async function getSampleTestCases(problemId) {
  const key = `testcases_${problemId}`;
  const cached = getCached(key);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('coding_test_cases')
    .select('*')
    .eq('problem_id', problemId)
    .order('sort_order');

  if (error) {
    console.error('[ContentService] getSampleTestCases error:', error.message);
    return [];
  }

  setCache(key, data);
  return data;
}

// ─── Cache Management ─────────────────────────────────────────────────────────

/**
 * Invalidate all cached data. Useful after content updates.
 */
export function clearContentCache() {
  Object.keys(cache).forEach(k => delete cache[k]);
}
