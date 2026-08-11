import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const TwoPointerSearch = () => {
    // Shared State Structure for Algorithm Visualization
    const [searchState, setSearchState] = useState({
        array: [2, 4, 6, 8, 10, 12], // Sorted array for Two Sum
        target: '14',
        left: 0,
        right: 5,
        status: 'idle', // 'idle' | 'running' | 'found' | 'not-found'
        phase: 'idle',   // 'compare' | 'move-left' | 'move-right' | 'found' | 'not-found'
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

            await sleep(1500); // 1.5s between auto steps
            if (!autoRunRef.current || !isMounted) return;

            setSearchState(prev => {
                if (prev.status !== 'running') return prev;
                const nextState = calculateNextStep(prev);
                if (nextState.status !== 'running') {
                    autoRunRef.current = false;
                }
                return nextState;
            });

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
                left: 0,
                right: state.array.length - 1,
                message: `Left pointer at index 0. Right pointer at index ${state.array.length - 1}.`
            };
        }

        if (state.status === 'running') {
            if (state.left >= state.right) {
                return {
                    ...state,
                    status: 'not-found',
                    phase: 'not-found',
                    message: `Pointers crossed without finding a pair. Target not found.`
                };
            }

            if (state.phase === 'compare') {
                const sum = state.array[state.left] + state.array[state.right];
                if (sum === targetNum) {
                    return {
                        ...state,
                        status: 'found',
                        phase: 'found',
                        message: `Sum is ${sum}. Target found!`
                    };
                } else if (sum < targetNum) {
                    return {
                        ...state,
                        phase: 'move-left',
                        message: `Sum is ${sum}. Too small, we need a larger value. Moving left pointer inward.`
                    };
                } else {
                    return {
                        ...state,
                        phase: 'move-right',
                        message: `Sum is ${sum}. Too large, we need a smaller value. Moving right pointer inward.`
                    };
                }
            } else if (state.phase === 'move-left') {
                const newLeft = state.left + 1;
                if (newLeft >= state.right) {
                    return {
                        ...state,
                        left: newLeft,
                        status: 'not-found',
                        phase: 'not-found',
                        message: `Pointers met. Target not found.`
                    };
                }
                return {
                    ...state,
                    left: newLeft,
                    phase: 'compare',
                    message: `Left pointer at index ${newLeft}. Right pointer at index ${state.right}.`
                };
            } else if (state.phase === 'move-right') {
                const newRight = state.right - 1;
                if (state.left >= newRight) {
                    return {
                        ...state,
                        right: newRight,
                        status: 'not-found',
                        phase: 'not-found',
                        message: `Pointers met. Target not found.`
                    };
                }
                return {
                    ...state,
                    right: newRight,
                    phase: 'compare',
                    message: `Left pointer at index ${state.left}. Right pointer at index ${newRight}.`
                };
            }
        }

        return state;
    };

    const stepWithFeedback = (state) => {
        const next = calculateNextStep(state);
        if (next.status === 'found' && state.status !== 'found') {
            showFeedback("Found it! The pair perfectly matches the sum 🎯", "success");
        } else if (next.status === 'not-found' && state.status !== 'not-found') {
            showFeedback("No match found in the hallway 🚶", "info");
        }
        return next;
    };

    // UI Handlers
    const startSearch = () => {
        if (!searchState.target || isNaN(parseInt(searchState.target))) {
            setSearchState(prev => ({ ...prev, message: 'Please enter a valid target sum.' }));
            return;
        }
        resetSearch();
        autoRunRef.current = true;
        setSearchState(prev => stepWithFeedback({ ...prev, status: 'idle' }));
        setShowHint(false);
    };

    const nextStep = () => {
        if (!searchState.target || isNaN(parseInt(searchState.target))) {
            setSearchState(prev => ({ ...prev, message: 'Please enter a valid target sum.' }));
            return;
        }
        autoRunRef.current = false;
        setSearchState(prev => stepWithFeedback(prev));
        setShowHint(false);
    };

    const resetSearch = () => {
        autoRunRef.current = false;
        setSearchState(prev => ({
            ...prev,
            left: 0,
            right: prev.array.length - 1,
            status: 'idle',
            phase: 'idle',
            message: 'Ready to search.',
        }));
    };

    return (
        <div style={s.container}>
            {/* Header */}
            <div style={s.header}>
                <h2 style={s.title}>Two Pointers — Finding a Match 🚶</h2>
                <div style={s.desc}>
                    <p>Two Pointers is like meeting a friend in a long hallway. One starts at each end and you move closer until you find the perfect match!</p>
                </div>
            </div>

            {/* Input Section */}
            <div style={s.inputSection}>
                <label style={s.inputLabel}>Target Pair Sum:</label>
                <input
                    type="number"
                    value={searchState.target}
                    onChange={e => { setSearchState(prev => ({ ...prev, target: e.target.value })); resetSearch(); }}
                    style={s.inputBox}
                />
            </div>

            {/* Visualizer */}
            <div style={s.visualizer}>
                <div style={{ position: 'relative', paddingBottom: '30px' }}>
                    <div style={s.arrayContainer}>
                        {searchState.array.map((val, idx) => {
                            let bg = '#F1F5F9'; // default
                            let textColor = '#1E293B';

                            // Check out of bounds (faded outer elements as pointers move in)
                            const isOutside = searchState.status !== 'idle' && (idx < searchState.left || idx > searchState.right);
                            let opacity = isOutside ? 0.4 : 1;

                            if (searchState.status === 'found' && (idx === searchState.left || idx === searchState.right)) {
                                bg = '#22C55E'; // Green
                                textColor = 'white';
                                opacity = 1;
                            } else if (searchState.status === 'not-found' && !isOutside) {
                                bg = '#EF4444'; // Red
                                textColor = 'white';
                            } else if (searchState.status !== 'idle' && searchState.status !== 'not-found' && idx === searchState.left) {
                                bg = '#FACC15'; // Yellow for Left
                                textColor = '#1E293B';
                            } else if (searchState.status !== 'idle' && searchState.status !== 'not-found' && idx === searchState.right) {
                                bg = '#3B82F6'; // Blue for Right
                                textColor = 'white';
                            }

                            return (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <motion.div
                                        style={{ ...s.box, backgroundColor: bg, color: textColor, opacity }}
                                        animate={{ 
                                            scale: (searchState.left === idx || searchState.right === idx) ? 1.08 : 1, 
                                            opacity,
                                            boxShadow: (searchState.left === idx) ? '0 0 15px rgba(250, 204, 21, 0.4)' : (searchState.right === idx ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none')
                                        }}
                                        className={(searchState.left === idx || searchState.right === idx) ? 'pulse-glow' : ''}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        layout
                                    >
                                        <span style={s.boxIndex}>{idx}</span>
                                        <span style={s.boxValue}>{val}</span>
                                    </motion.div>

                                    {/* Pointers: L, R */}
                                    <div style={{ height: '20px', marginTop: '8px', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', gap: '4px' }}>
                                        {searchState.status !== 'idle' && searchState.left === idx && <span style={{ color: '#eab308' }}>L →</span>}
                                        {searchState.status !== 'idle' && searchState.right === idx && <span style={{ color: '#3b82f6' }}>← R</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Equation Display */}
                {searchState.status !== 'idle' && searchState.left < searchState.array.length && searchState.right >= 0 && searchState.left < searchState.right && (
                    <div style={s.equationBox}>
                        <span style={{ color: '#854d0e', fontWeight: 'bold' }}>{searchState.array[searchState.left]}</span> +
                        <span style={{ color: '#1e3a8a', fontWeight: 'bold' }}>{searchState.array[searchState.right]}</span> =
                        <span style={{ fontWeight: 'bold' }}>{searchState.array[searchState.left] + searchState.array[searchState.right]}</span>
                    </div>
                )}

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
                    {[['#FACC15', 'Left Pointer'], ['#3B82F6', 'Right Pointer'], ['#22C55E', 'Match Found'], ['#cbd5e1', 'Ignored Elements']].map(([color, label]) => (
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
                        ? <span style={{ color: '#16a34a' }}>Result: Pair found at indices {searchState.left} and {searchState.right}</span>
                        : (searchState.status === 'not-found' ? <span style={{ color: '#dc2626' }}>Result: No pair found for given target sum</span> : <span style={{ color: '#64748b' }}>Waiting for search to complete...</span>)
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
                        ▶ Find the Pair! 🚶
                    </button>
                    {showHint && searchState.status === 'idle' && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Step into the hallway! ✨
                        </div>
                    )}
                </div>
                <button
                    onClick={nextStep}
                    disabled={searchState.status === 'found' || searchState.status === 'not-found'}
                    style={s.btn}
                >
                    ⏭ Take a Step
                </button>
                <button
                    onClick={resetSearch}
                    style={s.btn}
                >
                    ↺ Reset All
                </button>
            </div>

            {/* Code Section */}
            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Two Pointers Implementation (Two Sum in Sorted Array)</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def two_sum(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1  # Need a larger sum
        else:
            right -= 1 # Need a smaller sum
            
    return -1

# Time:  O(n)
# Space: O(1)`}</code>}
                    {activeLang === 'javascript' && <code>{`function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++; // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }
    return -1;
}

// Time:  O(n)
// Space: O(1)`}</code>}
                    {activeLang === 'cpp' && <code>{`#include <vector>
using namespace std;

vector<int> twoSum(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++; // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }
    return {-1, -1};
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
                        { q: 'What is the Two Pointer technique?', a: 'An algorithm strategy that uses two different indices to search through an array simultaneously, often starting from opposite ends.' },
                        { q: 'What is a common use case?', a: 'Finding a pair of numbers that add up to a specific target sum in a sorted array.' },
                        { q: 'Why must the array be sorted for the Two Sum problem using this technique?', a: 'Because we decide whether to increment the left pointer or decrement the right pointer based on whether the sum is too small or too large.' },
                        { q: 'What is the time complexity?', a: 'O(n) linear time, because each element is visited at most once as the pointers converge.' }
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
    equationBox: { fontSize: '1.4rem', padding: '0.5rem 1rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '0.5rem', display: 'flex', gap: '10px' },
    arrayContainer: { display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' },
    box: { width: '64px', height: '64px', borderRadius: '10px', background: '#F1F5F9', fontWeight: '600', fontSize: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s, color 0.3s, opacity 0.3s' },
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

export default TwoPointerSearch;
