import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const SlidingWindowSearch = () => {
    // Shared State Structure for Algorithm Visualization
    const [searchState, setSearchState] = useState({
        array: [2, 1, 5, 1, 3, 2], // Array for max subarray sum
        k: 3, // Window size
        windowStart: 0,
        windowEnd: 2,
        currentSum: 0,
        maxSum: 0,
        status: 'idle', // 'idle' | 'running' | 'completed'
        phase: 'idle',   // 'init-window' | 'slide-window' | 'completed'
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
        if (state.status === 'idle') {
            const initialSum = state.array.slice(0, state.k).reduce((a, b) => a + b, 0);
            return {
                ...state,
                status: 'running',
                phase: 'init-window',
                windowStart: 0,
                windowEnd: state.k - 1,
                currentSum: initialSum,
                maxSum: initialSum,
                message: `Window covering indexes 0–${state.k - 1}. Current sum is ${initialSum}. Max sum is ${initialSum}.`
            };
        }

        if (state.status === 'running') {
            if (state.windowEnd >= state.array.length - 1) {
                return {
                    ...state,
                    status: 'completed',
                    phase: 'completed',
                    message: `Reached the end of the array. The maximum sum of any window of size ${state.k} is ${state.maxSum}.`
                };
            }

            if (state.phase === 'init-window' || state.phase === 'slide-window') {
                const nextStart = state.windowStart + 1;
                const nextEnd = state.windowEnd + 1;
                const removedVal = state.array[state.windowStart];
                const addedVal = state.array[nextEnd];
                const nextSum = state.currentSum - removedVal + addedVal;
                const nextMax = Math.max(state.maxSum, nextSum);

                return {
                    ...state,
                    phase: 'slide-window',
                    windowStart: nextStart,
                    windowEnd: nextEnd,
                    currentSum: nextSum,
                    maxSum: nextMax,
                    message: `Sliding window forward. Removing index ${state.windowStart} (Value: ${removedVal}), adding index ${nextEnd} (Value: ${addedVal}). Updating window sum to ${nextSum}.`
                };
            }
        }

        return state;
    };

    const stepWithFeedback = (state) => {
        const next = calculateNextStep(state);
        if (next.status === 'completed' && state.status !== 'completed') {
            showFeedback(`Maximum sum of ${next.maxSum} found! 🏆`, "success");
        } else if (next.phase === 'slide-window' && state.phase !== 'slide-window') {
            showFeedback("Slide! 📷 New data captured.");
        }
        return next;
    };

    // UI Handlers
    const startSearch = () => {
        if (searchState.k > searchState.array.length || searchState.k <= 0) {
            setSearchState(prev => ({ ...prev, message: 'Invalid window size.' }));
            return;
        }
        resetSearch();
        autoRunRef.current = true;
        setSearchState(prev => stepWithFeedback({ ...prev, status: 'idle' }));
        setShowHint(false);
    };

    const nextStep = () => {
        if (searchState.k > searchState.array.length || searchState.k <= 0) {
            setSearchState(prev => ({ ...prev, message: 'Invalid window size.' }));
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
            windowStart: 0,
            windowEnd: prev.k - 1,
            currentSum: 0,
            maxSum: 0,
            status: 'idle',
            phase: 'idle',
            message: 'Ready to search.',
        }));
    };

    return (
        <div style={s.container}>
            {/* Header */}
            <div style={s.header}>
                <h2 style={s.title}>Sliding Window — The Moving Camera 📷</h2>
                <div style={s.desc}>
                    <p>The Sliding Window is like a camera frame. Instead of looking at everything, we focus on a small part and slide it across!</p>
                </div>
            </div>

            {/* Input Section */}
            <div style={s.inputSection}>
                <label style={s.inputLabel}>Window Size (k):</label>
                <input
                    type="number"
                    value={searchState.k}
                    onChange={e => { setSearchState(prev => ({ ...prev, k: parseInt(e.target.value) || 0 })); resetSearch(); }}
                    style={s.inputBox}
                    min="1"
                    max={searchState.array.length}
                />
            </div>

            {/* Visualizer */}
            <div style={s.visualizer}>
                <div style={{ position: 'relative', paddingBottom: '30px' }}>
                    <div style={s.arrayContainer}>
                        {searchState.array.map((val, idx) => {
                            let bg = '#F1F5F9'; // default
                            let textColor = '#1E293B';

                            const inWindow = searchState.status !== 'idle' && idx >= searchState.windowStart && idx <= searchState.windowEnd;
                            const isOldRemoval = searchState.status !== 'idle' && idx === searchState.windowStart - 1;
                            const isNewAddition = searchState.status !== 'idle' && idx === searchState.windowEnd;

                            if (searchState.status === 'completed' && inWindow) {
                                bg = '#22C55E'; // Green when complete
                                textColor = 'white';
                            } else if (inWindow && searchState.phase !== 'calc-sum') {
                                if (isNewAddition && searchState.phase === 'slide-window') {
                                    bg = '#3B82F6'; // Blue for newly added
                                    textColor = 'white';
                                } else {
                                    bg = '#FACC15'; // Yellow for standard window
                                    textColor = '#1E293B';
                                }
                            } else if (isOldRemoval && searchState.phase === 'slide-window') {
                                bg = '#EF4444'; // Red for newly removed
                                textColor = 'white';
                            }

                            return (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <motion.div
                                        style={{ ...s.box, backgroundColor: bg, color: textColor }}
                                        animate={{ 
                                            scale: inWindow ? 1.08 : 1,
                                            boxShadow: inWindow ? '0 0 15px rgba(250, 204, 21, 0.4)' : 'none'
                                        }}
                                        className={inWindow ? 'pulse-glow' : ''}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        layout
                                    >
                                        <span style={s.boxIndex}>{idx}</span>
                                        <span style={s.boxValue}>{val}</span>
                                    </motion.div>

                                    {/* Window Brackets */}
                                    <div style={{ height: '20px', marginTop: '8px', fontSize: '0.9rem', fontWeight: 'bold', color: '#1E293B', display: 'flex', gap: '4px' }}>
                                        {searchState.status !== 'idle' && searchState.windowStart === idx && <span>[</span>}
                                        {searchState.status !== 'idle' && searchState.windowEnd === idx && <span>]</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* State Displays */}
                {searchState.status !== 'idle' && (
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                        <div style={s.stateBox}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>Current Window Sum</div>
                            <div style={{ fontSize: '1.4rem', color: '#eab308', fontWeight: '900' }}>{searchState.currentSum}</div>
                        </div>
                        <div style={s.stateBox}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>Maximum Sum Found</div>
                            <div style={{ fontSize: '1.4rem', color: '#22c55e', fontWeight: '900' }}>{searchState.maxSum}</div>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={searchState.message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ ...s.messageBox, backgroundColor: searchState.status === 'completed' ? '#166534' : '#1e293b' }}
                    >
                        {searchState.message}
                    </motion.div>
                </AnimatePresence>

                {/* Legend */}
                <div style={s.legend}>
                    {[['#FACC15', 'In Window'], ['#3B82F6', 'Newly Added'], ['#EF4444', 'Just Removed']].map(([color, label]) => (
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
                    {searchState.status === 'completed'
                        ? <span style={{ color: '#16a34a' }}>Result: Max Sum is {searchState.maxSum}</span>
                        : <span style={{ color: '#64748b' }}>Waiting for sliding window to complete...</span>
                    }
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={startSearch}
                        disabled={searchState.status === 'running' || searchState.status === 'completed'}
                        style={s.btn}
                    >
                        ▶ Slide the Frame! 📷
                    </button>
                    {showHint && searchState.status === 'idle' && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Start the camera! ✨
                        </div>
                    )}
                </div>
                <button
                    onClick={nextStep}
                    disabled={searchState.status === 'completed'}
                    style={s.btn}
                >
                    ⏭ Next Slide
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
                <h3 style={s.subTitle}>Sliding Window Implementation (Max Sum Array)</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def max_sub_array_of_size_k(k, arr):
    max_sum = 0
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end]  # Add the next element
        
        # Slide the window if we've hit size k
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start]  # Subtract element going out
            window_start += 1  # Slide the window ahead
            
    return max_sum

# Time:  O(n)
# Space: O(1)`}</code>}
                    {activeLang === 'javascript' && <code>{`function maxSubArrayOfSizeK(k, arr) {
    let maxSum = 0;
    let windowSum = 0;
    let windowStart = 0;

    for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        windowSum += arr[windowEnd]; // Add the next element
        
        // Slide the window if we've hit size k
        if (windowEnd >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[windowStart]; // Subtract element going out
            windowStart++; // Slide the window ahead
        }
    }
    return maxSum;
}

// Time:  O(n)
// Space: O(1)`}</code>}
                    {activeLang === 'cpp' && <code>{`#include <vector>
#include <algorithm>
using namespace std;

int maxSubArrayOfSizeK(int k, const vector<int>& arr) {
    int maxSum = 0;
    int windowSum = 0;
    int windowStart = 0;

    for (int windowEnd = 0; windowEnd < arr.size(); windowEnd++) {
        windowSum += arr[windowEnd]; // Add the next element
        
        // Slide the window if we've hit size k
        if (windowEnd >= k - 1) {
            maxSum = max(maxSum, windowSum);
            windowSum -= arr[windowStart]; // Subtract element going out
            windowStart++; // Slide the window ahead
        }
    }
    return maxSum;
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
                        { q: 'What problems does Sliding Window solve?', a: 'Problems asking to find or calculate something among all contiguous subarrays (or sublists) of a given size.' },
                        { q: 'Why is it more efficient than brute force?', a: 'Because instead of recalculating the sum (or product, etc.) of the entire sub-array from scratch, we only calculate the difference between the old and new edges.' },
                        { q: 'What is the standard time complexity jump?', a: 'It often reduces O(n²) nested loop problems down to O(n) single pass loops.' },
                        { q: 'What happens to the window edges?', a: 'When the leading edge expands to encompass the target size `k`, the trailing edge begins sliding forward by subtracting its element from the total tracking score.' }
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
    stateBox: { padding: '0.75rem 1.5rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', minWidth: '150px' },
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

export default SlidingWindowSearch;
