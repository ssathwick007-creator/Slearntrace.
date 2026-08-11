import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const LinearSearch = () => {
    // Shared State Structure for Algorithm Visualization
    const [searchState, setSearchState] = useState({
        array: [12, 7, 19, 4, 15],
        target: '4',
        currentIndex: -1,
        checkedIndices: [],
        foundIndex: -1,
        status: 'idle', // 'idle' | 'running' | 'found' | 'not-found'
        phase: 'idle',   // 'compare' | 'move' | 'found' | 'not-found'
        message: 'Ready to search.',
    });

    const [activeLang, setActiveLang] = useState('python');
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const autoRunRef = useRef(false);

    // Auto Play Effect
    useEffect(() => {
        let isMounted = true;
        let timeoutId;

        const runAutoStep = async () => {
            if (searchState.status !== 'running' || !autoRunRef.current || !isMounted) return;

            await sleep(1000); // 1 sec between auto steps
            if (!autoRunRef.current || !isMounted) return;

            // Need latest state from functional update to safely step
            setSearchState(prev => {
                if (prev.status !== 'running') return prev;
                const nextState = calculateNextStep(prev);
                if (nextState.status !== 'running') {
                    autoRunRef.current = false;
                }
                return nextState;
            });

            // Trigger next tick
            if (autoRunRef.current) {
                timeoutId = setTimeout(runAutoStep, 100);
            }
        };

        if (searchState.status === 'running' && autoRunRef.current) {
            runAutoStep();
        }

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [searchState.status]);

    // Core Logic: Calculates the exact next state given the previous state
    const calculateNextStep = (state) => {
        const targetNum = parseInt(state.target);

        if (state.status === 'idle') {
            return {
                ...state,
                status: 'running',
                phase: 'compare',
                currentIndex: 0,
                message: `Checking index 0. Compare ${state.array[0]} with ${targetNum}.`
            };
        }

        if (state.status === 'running') {
            if (state.phase === 'compare') {
                const currentVal = state.array[state.currentIndex];
                if (currentVal === targetNum) {
                    return {
                        ...state,
                        status: 'found',
                        phase: 'found',
                        foundIndex: state.currentIndex,
                        message: `Element found at index ${state.currentIndex}!`
                    };
                } else {
                    return {
                        ...state,
                        phase: 'move',
                        message: `${currentVal} is not equal to ${targetNum}.`
                    };
                }
            } else if (state.phase === 'move') {
                const nextIndex = state.currentIndex + 1;
                const newChecked = [...state.checkedIndices, state.currentIndex];

                if (nextIndex >= state.array.length) {
                    return {
                        ...state,
                        status: 'not-found',
                        phase: 'not-found',
                        checkedIndices: newChecked,
                        currentIndex: -1,
                        message: `Target not found.`
                    };
                } else {
                    return {
                        ...state,
                        phase: 'compare',
                        checkedIndices: newChecked,
                        currentIndex: nextIndex,
                        message: `Moving to next element. Checking index ${nextIndex}. Compare ${state.array[nextIndex]} with ${targetNum}.`
                    };
                }
            }
        }

        return state;
    };

    const stepWithFeedback = (state) => {
        const next = calculateNextStep(state);
        if (next.status === 'found' && state.status !== 'found') {
            showFeedback("Target found! Linear search never misses 🔍", "success");
        } else if (next.status === 'not-found' && state.status !== 'not-found') {
            showFeedback("Reached the end... target wasn't there ❌", "info");
        }
        return next;
    };

    // UI Handlers
    const startSearch = () => {
        if (!searchState.target || isNaN(parseInt(searchState.target))) {
            setSearchState(prev => ({ ...prev, message: 'Please enter a valid number to search.' }));
            return;
        }
        resetSearch();
        autoRunRef.current = true;
        setSearchState(prev => stepWithFeedback({ ...prev, status: 'idle' }));
        setShowHint(false);
    };

    const nextStep = () => {
        if (!searchState.target || isNaN(parseInt(searchState.target))) {
            setSearchState(prev => ({ ...prev, message: 'Please enter a valid number to search.' }));
            return;
        }
        autoRunRef.current = false; // Pause any active auto-run
        setSearchState(prev => stepWithFeedback(prev));
        setShowHint(false);
    };

    const resetSearch = () => {
        autoRunRef.current = false;
        setSearchState(prev => ({
            ...prev,
            currentIndex: -1,
            checkedIndices: [],
            foundIndex: -1,
            status: 'idle',
            phase: 'idle',
            message: 'Ready to search.',
        }));
    };

    return (
        <div style={s.container}>
            {/* Header */}
            <div style={s.header}>
                <h2 style={s.title}>Linear Search — Finding a Book on a Shelf 📚</h2>
                <div style={s.desc}>
                    <p>Imagine searching for a specific book on a shelf.</p>
                    <p>You check each book one by one until you find the correct one.</p>
                    <p><strong>Linear Search</strong> works the same way by scanning the array sequentially from start to finish.</p>
                </div>
            </div>

            {/* Input Section */}
            <div style={s.inputSection}>
                <label style={s.inputLabel}>Search Target:</label>
                <input
                    type="number"
                    value={searchState.target}
                    onChange={e => { setSearchState(prev => ({ ...prev, target: e.target.value })); resetSearch(); }}
                    style={s.inputBox}
                />
            </div>

            {/* Visualizer */}
            <div style={s.visualizer}>
                <div style={s.arrayContainer}>
                    {searchState.array.map((val, idx) => {
                        let bg = '#F1F5F9'; // default
                        let textColor = '#1E293B';

                        // Derived strictly from centralized state
                        if (searchState.foundIndex === idx) {
                            bg = '#22C55E'; // Green
                            textColor = 'white';
                        } else if (searchState.status === 'not-found' && searchState.foundIndex === -1 && searchState.checkedIndices.includes(idx)) {
                            bg = '#EF4444'; // Red
                            textColor = 'white';
                        } else if (searchState.currentIndex === idx) {
                            bg = '#FACC15'; // Yellow
                            textColor = '#1E293B';
                        } else if (searchState.checkedIndices.includes(idx)) {
                            bg = '#3B82F6'; // Blue
                            textColor = 'white';
                        }

                        return (
                            <motion.div
                                key={idx}
                                style={{ ...s.box, backgroundColor: bg, color: textColor }}
                                animate={{ 
                                    scale: searchState.currentIndex === idx ? 1.08 : 1,
                                    boxShadow: searchState.currentIndex === idx ? '0 0 15px rgba(250, 204, 21, 0.4)' : 'none'
                                }}
                                className={searchState.currentIndex === idx ? 'pulse-glow' : ''}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                layout
                            >
                                <span style={s.boxIndex}>{idx}</span>
                                <span style={s.boxValue}>{val}</span>
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={searchState.message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ ...s.messageBox, backgroundColor: searchState.status === 'not-found' ? '#ef4444' : '#1e293b' }}
                    >
                        {searchState.message}
                    </motion.div>
                </AnimatePresence>

                {/* Legend */}
                <div style={s.legend}>
                    {[['#FACC15', 'Current (Yellow)'], ['#3B82F6', 'Checked (Blue)'], ['#22C55E', 'Found (Green)'], ['#EF4444', 'Not Found (Red)']].map(([color, label]) => (
                        <div key={label} style={s.legendItem}>
                            <div style={{ ...s.dot, backgroundColor: color }} />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Result Panel */}
            <div style={s.resultPanel}>
                <div style={s.resultText}>
                    {searchState.status === 'found'
                        ? <span style={{ color: '#16a34a' }}>Result: Target found at index {searchState.foundIndex}</span>
                        : (searchState.status === 'not-found' ? <span style={{ color: '#dc2626' }}>Result: Target not found</span> : <span style={{ color: '#64748b' }}>Waiting for search to complete...</span>)
                    }
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={startSearch}
                        disabled={searchState.status === 'running' || searchState.status === 'found' || searchState.status === 'not-found'}
                        style={s.btn}
                    >
                        ▶ Search One-by-One 🔍
                    </button>
                    {showHint && searchState.status === 'idle' && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Start scanning the shelf! ✨
                        </div>
                    )}
                </div>
                <button
                    onClick={nextStep}
                    disabled={searchState.status === 'found' || searchState.status === 'not-found'}
                    style={s.btn}
                >
                    ⏭ Check Next
                </button>
                <button
                    onClick={resetSearch}
                    style={s.btn}
                >
                    ↺ Reset 
                </button>
            </div>

            {/* Code Section */}
            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Linear Search Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Target found
    return -1  # Target not found

# Time:  O(n)
# Space: O(1)`}</code>}
                    {activeLang === 'javascript' && <code>{`function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Target found
        }
    }
    return -1; // Target not found
}

// Time:  O(n)
// Space: O(1)`}</code>}
                    {activeLang === 'cpp' && <code>{`#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Target found
        }
    }
    return -1; // Target not found
}

// Time:  O(n)
// Space: O(1)`}</code>}
                </pre>
            </div>

            {/* Knowledge Check */}
            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What is Linear Search?', a: 'A searching algorithm that checks every element in a data structure sequentially until the target is found.' },
                        { q: 'What is the time complexity of Linear Search?', a: 'O(n) in the worst and average cases, since it may have to scan the entire array. O(1) in the best case if the target is the first element.' },
                        { q: 'When is Linear Search useful?', a: 'When the dataset is small, or when the data is unsorted and cannot be sorted beforehand.' },
                        { q: 'Why is Linear Search inefficient for large datasets?', a: 'Because it checks elements one by one, scaling linearly. For an array of 1 million elements, it might take 1 million comparisons, whereas Binary Search would take at most ~20.' }
                    ].map((item, i) => (
                        <div key={i} style={s.quizCard}>
                            <p style={s.question}><strong>Q{i + 1}:</strong> {item.q}</p>
                            <p style={s.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const s = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em', marginBottom: '1rem' },
    desc: { color: '#64748b', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto' },
    inputSection: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
    inputLabel: { fontWeight: '700', color: '#1e293b', fontSize: '1.1rem' },
    inputBox: { padding: '0.5rem 1rem', fontSize: '1.1rem', borderRadius: '8px', border: '2px solid #cbd5e1', outline: 'none', width: '100px', textAlign: 'center', fontWeight: '600', color: '#0f172a' },
    visualizer: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', marginTop: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' },
    arrayContainer: { display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' },
    box: { width: '64px', height: '64px', borderRadius: '10px', background: '#F1F5F9', fontWeight: '600', fontSize: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s, color 0.3s' },
    boxIndex: { fontSize: '0.7rem', opacity: 0.7, marginBottom: '2px' },
    boxValue: { fontSize: '18px', fontWeight: '600' },
    messageBox: { color: '#fff', padding: '0.7rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', textAlign: 'center', minWidth: '300px' },
    legend: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
    dot: { width: '12px', height: '12px', borderRadius: '50%' },
    resultPanel: { background: '#F8FAFC', borderRadius: '12px', padding: '14px', marginTop: '16px', border: '1px solid #E2E8F0', textAlign: 'center', width: '100%', maxWidth: '400px' },
    resultTitle: { margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.1rem' },
    resultText: { fontSize: '1.2rem', fontWeight: 'bold' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    btn: { background: '#4F46E5', color: 'white', borderRadius: '10px', padding: '10px 18px', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '1rem' },
    codeSection: { marginBottom: '3rem' },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '20px', overflowX: 'auto', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'monospace', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' },
    quizSection: { marginTop: '2rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: { backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9' },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem', fontSize: '1rem' },
    answer: { color: '#10b981', fontWeight: '600', lineHeight: '1.5', fontSize: '0.95rem' },
};

export default LinearSearch;
