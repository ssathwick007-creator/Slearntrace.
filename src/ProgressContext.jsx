import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSubjects, getTopicsBySubject } from './services/database/contentService.js';

// ── Static topic config (FALLBACK): total metaphors & problems per topic ────
export const FALLBACK_TOPICS_META = {
    'arrays': { title: 'Arrays', icon: '📦', description: 'Arrays are contiguous blocks of memory used to store elements of the same type. Ideal for fast lookups.', totalMetaphors: 5, totalProblems: 10, difficulty: 'Beginner' },
    'linked-lists': { title: 'Linked Lists', icon: '🔗', description: 'Linked lists consist of nodes where each node points to the next, allowing for efficient insertions and deletions.', totalMetaphors: 5, totalProblems: 8, difficulty: 'Beginner' },
    'stacks': { title: 'Stacks', icon: '🥞', description: 'Stacks follow the Last-In-First-Out (LIFO) principle, useful for managing function calls and undo operations.', totalMetaphors: 4, totalProblems: 5, difficulty: 'Beginner' },
    'queues': { title: 'Queues', icon: '🚶', description: 'Queues operate on a First-In-First-Out (FIFO) basis, perfect for task scheduling and asynchronous data transfer.', totalMetaphors: 4, totalProblems: 5, difficulty: 'Beginner' },
    'trees': { title: 'Trees', icon: '🌳', description: 'Trees represent hierarchical data structures with a root node and child nodes, essential for fast searching and sorting.', totalMetaphors: 8, totalProblems: 8, difficulty: 'Intermediate' },
    'graphs': { title: 'Graphs', icon: '🌐', description: 'Graphs represent networks of connected nodes and are used in navigation systems, social networks, and recommendation engines.', totalMetaphors: 9, totalProblems: 8, difficulty: 'Intermediate' },
    'hash-tables': { title: 'Hash Tables', icon: '🗂️', description: 'Hash tables map keys to values for highly efficient data retrieval, powering databases and associative arrays.', totalMetaphors: 7, totalProblems: 8, difficulty: 'Advanced' },
};

// Mutable reference that starts with fallback, gets updated after DB fetch
export let topicsMeta = { ...FALLBACK_TOPICS_META };

// ── Defaults ────────────────────────────────────────────────────────────────
const buildDefault = () =>
    Object.fromEntries(Object.keys(topicsMeta).map(k => [k, { metaphorsDone: new Set(), problemsDone: new Set() }]));

const STORAGE_KEY = 'lt_ds_progress_v1';

const serialize = progress =>
    Object.fromEntries(Object.entries(progress).map(([k, v]) => [k, { metaphorsDone: [...v.metaphorsDone], problemsDone: [...v.problemsDone] }]));

const deserialize = raw =>
    Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, { metaphorsDone: new Set(v.metaphorsDone || []), problemsDone: new Set(v.problemsDone || []) }]));

const load = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return buildDefault();
        const parsed = JSON.parse(raw);
        const base = buildDefault();
        // Merge with base so newly added topics always exist
        return Object.fromEntries(Object.keys(base).map(k => [k, parsed[k] ? deserialize({ [k]: parsed[k] })[k] : base[k]]));
    } catch { return buildDefault(); }
};

// ── Context ──────────────────────────────────────────────────────────────────
export const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(load);
    const [dbTopicsMeta, setDbTopicsMeta] = useState(null);

    // Fetch topics from Supabase on mount
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                // Find the "Data Structures" subject in Supabase
                const subjects = await getSubjects();
                const dsSubject = subjects.find(s =>
                    s.name === 'Data Structures' || s.slug === 'data-structures'
                );
                if (!dsSubject || cancelled) return;

                const dbTopics = await getTopicsBySubject(dsSubject.id);
                if (!dbTopics || dbTopics.length === 0 || cancelled) return;

                // Build topicsMeta from DB data, merging with fallback for
                // totalMetaphors/totalProblems (these counts aren't stored in the
                // topics table directly — they come from related table counts)
                const merged = { ...FALLBACK_TOPICS_META };
                for (const t of dbTopics) {
                    const slug = t.slug;
                    const existing = FALLBACK_TOPICS_META[slug];
                    merged[slug] = {
                        title: t.name,
                        icon: t.icon || existing?.icon || '📘',
                        description: t.description || existing?.description || '',
                        totalMetaphors: existing?.totalMetaphors || 0,
                        totalProblems: existing?.totalProblems || 0,
                        difficulty: t.difficulty || existing?.difficulty || 'Beginner',
                        dbId: t.id, // Store the Supabase UUID for later queries
                    };
                }

                // Update the mutable export
                topicsMeta = merged;
                setDbTopicsMeta(merged);

                // Rebuild progress to include any new topics from DB
                setProgress(prev => {
                    const newKeys = Object.keys(merged);
                    const updated = { ...prev };
                    for (const k of newKeys) {
                        if (!updated[k]) {
                            updated[k] = { metaphorsDone: new Set(), problemsDone: new Set() };
                        }
                    }
                    return updated;
                });

                console.log('[LearnTrace] Topics loaded from Supabase:', Object.keys(merged).length);
            } catch (err) {
                console.warn('[LearnTrace] Failed to fetch topics from Supabase, using fallback:', err.message);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    // Persist on every change
    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize(progress))); }
        catch { /* ignore quota errors */ }
    }, [progress]);

    const markMetaphorDone = useCallback((topicId, metaphorId) => {
        setProgress(prev => {
            if (!prev[topicId] || prev[topicId].metaphorsDone.has(metaphorId)) return prev;
            const next = { ...prev };
            next[topicId] = { ...prev[topicId], metaphorsDone: new Set([...prev[topicId].metaphorsDone, metaphorId]) };
            return next;
        });
    }, []);

    const markProblemDone = useCallback((topicId, problemId) => {
        setProgress(prev => {
            if (!prev[topicId] || prev[topicId].problemsDone.has(problemId)) return prev;
            const next = { ...prev };
            next[topicId] = { ...prev[topicId], problemsDone: new Set([...prev[topicId].problemsDone, problemId]) };
            return next;
        });
    }, []);

    const resetProgress = useCallback((topicId) => {
        if (topicId) {
            setProgress(prev => ({ ...prev, [topicId]: { metaphorsDone: new Set(), problemsDone: new Set() } }));
        } else {
            setProgress(buildDefault());
        }
    }, []);

    // Use whichever topicsMeta is current (DB-loaded or fallback)
    const currentMeta = dbTopicsMeta || topicsMeta;

    // Derived helpers
    const getTopicProgress = useCallback((topicId) => {
        const meta = currentMeta[topicId];
        if (!meta) return { metaphorsDone: 0, problemsDone: 0, totalMetaphors: 0, totalProblems: 0, pct: 0, completed: false };
        const data = progress[topicId] || { metaphorsDone: new Set(), problemsDone: new Set() };
        const metaphorsDone = data.metaphorsDone.size;
        const problemsDone = data.problemsDone.size;
        const totalMetaphors = meta.totalMetaphors;
        const totalProblems = meta.totalProblems;
        const pct = Math.round(((metaphorsDone + problemsDone) / (totalMetaphors + totalProblems)) * 100);
        const completed = metaphorsDone >= totalMetaphors && problemsDone >= totalProblems;
        return { metaphorsDone, problemsDone, totalMetaphors, totalProblems, pct, completed };
    }, [progress, currentMeta]);

    const getGlobalProgress = useCallback(() => {
        const topicIds = Object.keys(currentMeta);
        const completed = topicIds.filter(id => getTopicProgress(id).completed).length;
        return { completed, total: topicIds.length };
    }, [getTopicProgress, currentMeta]);

    return (
        <ProgressContext.Provider value={{ progress, topicsMeta: currentMeta, markMetaphorDone, markProblemDone, resetProgress, getTopicProgress, getGlobalProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);
