import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const BubbleSort = () => {
    const [array, setArray] = useState([5, 3, 8, 2, 6, 4, 7, 1]);
    const [comparing, setComparing] = useState([]);
    const [swapped, setSwapped] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [message, setMessage] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const [stepDone, setStepDone] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const stopRef = useRef(false);

    const maxVal = Math.max(...array);

    const resetAll = () => {
        stopRef.current = true;
        setArray([5, 3, 8, 2, 6, 4, 7, 1]);
        setComparing([]); setSwapped([]); setSorted([]);
        setMessage(''); setIsRunning(false); setStepDone(false);
        setTimeout(() => { stopRef.current = false; }, 100);
    };

    const runBubbleSort = async () => {
        stopRef.current = false;
        setIsRunning(true);
        setStepDone(false);
        let arr = [5, 3, 8, 2, 6, 4, 7, 1];
        const sortedSet = new Set();
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (stopRef.current) return;
                setComparing([j, j + 1]);
                setMessage(`Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`);
                await sleep(700);

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setSwapped([j, j + 1]);
                    setArray([...arr]);
                    setMessage(`Swapped! ${arr[j]} ↔ ${arr[j + 1]}`);
                    await sleep(700);
                    setSwapped([]);
                }
                setComparing([]);
            }
            sortedSet.add(n - 1 - i);
            setSorted(new Set([...sortedSet]));
            if (window.AppProgress) window.AppProgress.markMetaphorCompleted('BubbleSort');
        }
        sortedSet.add(0);
        setSorted(new Set([...sortedSet]));
        setComparing([]);
        setMessage('✓ Array is sorted!');
        showFeedback('Success! Well done 🚀', 'success');
        setIsRunning(false);
        setStepDone(true);
    };

    // Manual step state
    const stRef = useRef({ arr: [5, 3, 8, 2, 6, 4, 7, 1], i: 0, j: 0 });

    const handleNextStep = () => {
        if (stepDone || isRunning) return;
        const st = stRef.current;
        const n = st.arr.length;

        if (st.i >= n - 1) {
            setMessage('✓ Array is sorted!');
            setStepDone(true);
            setComparing([]);
            setSorted(new Set(Array.from({ length: n }, (_, i) => i)));
            if (window.AppProgress) window.AppProgress.markMetaphorCompleted('BubbleSort');
            return;
        }

        const j = st.j;
        setComparing([j, j + 1]);
        setMessage(`Comparing arr[${j}]=${st.arr[j]} and arr[${j + 1}]=${st.arr[j + 1]}`);

        if (st.arr[j] > st.arr[j + 1]) {
            [st.arr[j], st.arr[j + 1]] = [st.arr[j + 1], st.arr[j]];
            setSwapped([j, j + 1]);
            setTimeout(() => setSwapped([]), 500);
        }
        setArray([...st.arr]);

        st.j++;
        if (st.j >= n - 1 - st.i) {
            const newSorted = new Set([...sorted, n - 1 - st.i]);
            setSorted(newSorted);
            st.i++;
            st.j = 0;
        }
    };

    return (
        <div style={s.container}>
            {/* Header */}
            <div style={s.header}>
                <h2 style={s.title}>Bubble Sort — Rising Bubbles 🫧</h2>
                <div style={s.desc}>
                    <p>Think of it like bubbles in a soda: the lighter (smaller) ones stay down, while the heavy (larger) ones float to the top!</p>
                    <p>We'll <strong>swap neighbors</strong> until everything is in its perfect place.</p>
                </div>
            </div>

            {/* Visualizer */}
            <div style={s.visualizer}>
                <div style={s.barsContainer}>
                    {array.map((val, idx) => {
                        let bg = '#e2e8f0';
                        if (sorted.has && sorted.has(idx)) bg = '#4ade80';
                        if (swapped.includes(idx)) bg = '#ef4444';
                        if (comparing.includes(idx)) bg = '#fbbf24';

                        return (
                            <motion.div
                                key={idx}
                                style={{ ...s.barWrap }}
                                layout
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className={comparing.includes(idx) ? 'pulse-glow' : ''}
                            >
                                <div style={{ 
                                    ...s.bar, 
                                    height: `${(val / maxVal) * 160 + 20}px`, 
                                    backgroundColor: bg,
                                    boxShadow: comparing.includes(idx) ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
                                }} />
                                <span style={s.barLabel}>{val}</span>
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={s.messageBox}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Legend */}
                <div style={s.legend}>
                    {[['#fbbf24', 'Comparing'], ['#ef4444', 'Swapping'], ['#4ade80', 'Sorted']].map(([color, label]) => (
                        <div key={label} style={s.legendItem}>
                            <div style={{ ...s.dot, backgroundColor: color }} />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <div style={{ position: 'relative' }}>
                    <button onClick={() => { runBubbleSort(); setShowHint(false); }} disabled={isRunning} style={{ ...s.btn, backgroundColor: '#4f46e5' }}>
                        ▶ Let's Sort it! 🫧
                    </button>
                    {showHint && !isRunning && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Try clicking 'Start' to see the magic ✨
                        </div>
                    )}
                </div>
                <button onClick={() => { handleNextStep(); setShowHint(false); }} disabled={isRunning || stepDone} style={{ ...s.btn, backgroundColor: '#0891b2' }}>
                    ⏭ Take a Step
                </button>
                <button onClick={resetAll} style={{ ...s.btn, backgroundColor: '#ef4444' }}>
                    ↺ Reset Everything
                </button>
            </div>

            {/* Code Section */}
            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Bubble Sort Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Time:  O(n²)
# Space: O(1)`}</code>}
                    {activeLang === 'javascript' && <code>{`function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Time:  O(n²)
// Space: O(1)`}</code>}
                    {activeLang === 'cpp' && <code>{`#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// Time:  O(n²)
// Space: O(1)`}</code>}
                </pre>
            </div>

            {/* Knowledge Check */}
            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What is Bubble Sort?', a: 'A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order.' },
                        { q: 'What is the time complexity of Bubble Sort?', a: 'O(n²) in the worst and average case. O(n) in the best case (already sorted, with early exit optimization).' },
                        { q: 'Why is it called Bubble Sort?', a: 'Because larger elements "bubble up" to the end of the array with each pass, just like bubbles rising in water.' },
                        { q: 'When is Bubble Sort inefficient?', a: 'For large datasets. Its O(n²) complexity makes it significantly slower than algorithms like Merge Sort or Quick Sort on real-world data.' }
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
    visualizer: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2rem', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
    barsContainer: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', padding: '0 1rem' },
    barWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
    bar: { width: '40px', borderRadius: '6px 6px 0 0', transition: 'background-color 0.3s', minHeight: '20px' },
    barLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#475569' },
    messageBox: { backgroundColor: '#1e293b', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700' },
    legend: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
    dot: { width: '12px', height: '12px', borderRadius: '50%' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    btn: { padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', transition: 'opacity 0.2s', opacity: 0.9 },
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

export default BubbleSort;
