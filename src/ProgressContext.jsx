import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Static topic config: total metaphors & problems per topic ──────────────
export const topicsMeta = {
    'arrays': { title: 'Arrays', icon: '📦', description: 'Arrays are contiguous blocks of memory used to store elements of the same type. Ideal for fast lookups.', totalMetaphors: 5, totalProblems: 10, difficulty: 'Beginner' },
    'linked-lists': { title: 'Linked Lists', icon: '🔗', description: 'Linked lists consist of nodes where each node points to the next, allowing for efficient insertions and deletions.', totalMetaphors: 5, totalProblems: 8, difficulty: 'Beginner' },
    'stacks': { title: 'Stacks', icon: '🥞', description: 'Stacks follow the Last-In-First-Out (LIFO) principle, useful for managing function calls and undo operations.', totalMetaphors: 4, totalProblems: 5, difficulty: 'Beginner' },
    'queues': { title: 'Queues', icon: '🚶', description: 'Queues operate on a First-In-First-Out (FIFO) basis, perfect for task scheduling and asynchronous data transfer.', totalMetaphors: 4, totalProblems: 5, difficulty: 'Beginner' },
    'trees': { title: 'Trees', icon: '🌳', description: 'Trees represent hierarchical data structures with a root node and child nodes, essential for fast searching and sorting.', totalMetaphors: 8, totalProblems: 8, difficulty: 'Intermediate' },
    'graphs': { title: 'Graphs', icon: '🌐', description: 'Graphs represent networks of connected nodes and are used in navigation systems, social networks, and recommendation engines.', totalMetaphors: 9, totalProblems: 8, difficulty: 'Intermediate' },
    'hash-tables': { title: 'Hash Tables', icon: '🗂️', description: 'Hash tables map keys to values for highly efficient data retrieval, powering databases and associative arrays.', totalMetaphors: 7, totalProblems: 8, difficulty: 'Advanced' },
};

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

    // Derived helpers
    const getTopicProgress = useCallback((topicId) => {
        const meta = topicsMeta[topicId];
        const data = progress[topicId] || { metaphorsDone: new Set(), problemsDone: new Set() };
        const metaphorsDone = data.metaphorsDone.size;
        const problemsDone = data.problemsDone.size;
        const totalMetaphors = meta.totalMetaphors;
        const totalProblems = meta.totalProblems;
        const pct = Math.round(((metaphorsDone + problemsDone) / (totalMetaphors + totalProblems)) * 100);
        const completed = metaphorsDone >= totalMetaphors && problemsDone >= totalProblems;
        return { metaphorsDone, problemsDone, totalMetaphors, totalProblems, pct, completed };
    }, [progress]);

    const getGlobalProgress = useCallback(() => {
        const topicIds = Object.keys(topicsMeta);
        const completed = topicIds.filter(id => getTopicProgress(id).completed).length;
        return { completed, total: topicIds.length };
    }, [getTopicProgress]);

    return (
        <ProgressContext.Provider value={{ progress, markMetaphorDone, markProblemDone, resetProgress, getTopicProgress, getGlobalProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);
