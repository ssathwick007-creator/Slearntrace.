import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const INIT = [7, 3, 5, 2, 8, 4, 6, 1];

const SelectionSort = () => {
    const [array, setArray] = useState([...INIT]);
    const [scanning, setScanning] = useState([]);   // yellow — element being scanned
    const [minIdx, setMinIdx] = useState(null);     // blue — current minimum
    const [swapping, setSwapping] = useState([]);   // red — being swapped
    const [sorted, setSorted] = useState(new Set());// green — sorted boundary
    const [message, setMessage] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [stepDone, setStepDone] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const stopRef = useRef(false);

    const maxVal = Math.max(...array);

    const resetAll = () => {
        stopRef.current = true;
        setTimeout(() => { stopRef.current = false; }, 100);
        setArray([...INIT]);
        setScanning([]); setMinIdx(null); setSwapping([]);
        setSorted(new Set()); setMessage('');
        setIsRunning(false); setStepDone(false);
        stepState.current = { arr: [...INIT], i: 0, j: 1, currentMin: 0 };
    };

    // ── Auto run ──
    const runSort = async () => {
        stopRef.current = false;
        setIsRunning(true); setStepDone(false);
        let arr = [...INIT];
        const sortedSet = new Set();
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            if (stopRef.current) return;
            let minI = i;
            setMinIdx(minI);
            setMessage(`Pass ${i + 1}: Looking for the smallest element from index ${i}`);

            for (let j = i + 1; j < n; j++) {
                if (stopRef.current) return;
                setScanning([j]);
                setMessage(`Comparing arr[${j}]=${arr[j]} with current min arr[${minI}]=${arr[minI]}`);
                await sleep(500);

                if (arr[j] < arr[minI]) {
                    minI = j;
                    setMinIdx(minI);
                    setMessage(`New minimum found: arr[${minI}]=${arr[minI]}`);
                    await sleep(400);
                }
            }
            setScanning([]);

            if (minI !== i) {
                setSwapping([i, minI]);
                setMessage(`Swapping arr[${i}]=${arr[i]} ↔ arr[${minI}]=${arr[minI]}`);
                await sleep(600);
                [arr[i], arr[minI]] = [arr[minI], arr[i]];
                setArray([...arr]);
                setSwapping([]);
            } else {
                setMessage(`arr[${i}]=${arr[i]} is already in the correct position`);
                await sleep(500);
            }

            sortedSet.add(i);
            setSorted(new Set([...sortedSet]));
            setMinIdx(null);
            await sleep(300);
        }

        sortedSet.add(n - 1);
        setSorted(new Set([...sortedSet]));
        setScanning([]); setMinIdx(null); setSwapping([]);
        setMessage('✓ Array is sorted!');
        setIsRunning(false); setStepDone(true);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('SelectionSort');
    };

    // ── Manual step ──
    const stepState = useRef({ arr: [...INIT], i: 0, j: 1, currentMin: 0 });

    const handleNextStep = () => {
        if (stepDone || isRunning) return;
        const st = stepState.current;
        const n = st.arr.length;

        if (st.i >= n - 1) {
            const full = new Set(Array.from({ length: n }, (_, k) => k));
            setSorted(full); setScanning([]); setMinIdx(null);
            setMessage('✓ Array is sorted!');
            setStepDone(true);
            if (window.AppProgress) window.AppProgress.markMetaphorCompleted('SelectionSort');
            return;
        }

        if (st.j < n) {
            // Scanning phase
            setScanning([st.j]);
            setMinIdx(st.currentMin);
            setMessage(`Comparing arr[${st.j}]=${st.arr[st.j]} with min arr[${st.currentMin}]=${st.arr[st.currentMin]}`);

            if (st.arr[st.j] < st.arr[st.currentMin]) {
                st.currentMin = st.j;
                setMinIdx(st.currentMin);
            }
            st.j++;
        } else {
            // Swap phase
            if (st.currentMin !== st.i) {
                setSwapping([st.i, st.currentMin]);
                [st.arr[st.i], st.arr[st.currentMin]] = [st.arr[st.currentMin], st.arr[st.i]];
                setArray([...st.arr]);
                setMessage(`Swapped! arr[${st.i}]=${st.arr[st.i]} placed in sorted position`);
                setTimeout(() => setSwapping([]), 500);
            } else {
                setMessage(`arr[${st.i}]=${st.arr[st.i]} is already minimum, no swap needed`);
            }
            setSorted(prev => new Set([...prev, st.i]));
            setScanning([]); setMinIdx(null);
            st.i++;
            st.j = st.i + 1;
            st.currentMin = st.i;
        }
    };

    // ── Bar color helper ──
    const barColor = (idx) => {
        if (swapping.includes(idx)) return '#ef4444';
        if (idx === minIdx) return '#3b82f6';
        if (scanning.includes(idx)) return '#fbbf24';
        if (sorted.has(idx)) return '#4ade80';
        return '#e2e8f0';
    };

    return (
        <div style={s.container}>
            {/* Header */}
            <div style={s.header}>
                <h2 style={s.title}>Selection Sort — Choosing the Smallest Card 🃏</h2>
                <div style={s.desc}>
                    <p>Imagine sorting playing cards in your hand. You repeatedly look through the unsorted cards, pick the smallest one, and place it at the front.</p>
                    <p>Selection Sort works the same way — it <strong>selects the smallest element</strong> from the unsorted portion and swaps it into position.</p>
                </div>
            </div>

            {/* Visualizer */}
            <div style={s.visualizer}>
                {/* Sorted boundary indicator */}
                <div style={s.sortedLabel}>
                    {sorted.size > 0 && <span style={s.sortedPill}>✓ Sorted: first {sorted.size} element{sorted.size > 1 ? 's' : ''}</span>}
                </div>

                <div style={s.barsContainer}>
                    {array.map((val, idx) => (
                        <motion.div key={idx} style={s.barWrap} layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                            <div style={{ ...s.bar, height: `${(val / maxVal) * 160 + 20}px`, backgroundColor: barColor(idx) }} />
                            <span style={s.barLabel}>{val}</span>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.messageBox}>
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Legend */}
                <div style={s.legend}>
                    {[['#fbbf24', 'Scanning'], ['#3b82f6', 'Current Min'], ['#ef4444', 'Swapping'], ['#4ade80', 'Sorted']].map(([color, label]) => (
                        <div key={label} style={s.legendItem}>
                            <div style={{ ...s.dot, backgroundColor: color }} />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <button onClick={runSort} disabled={isRunning} style={{ ...s.btn, backgroundColor: '#4f46e5' }}>▶ Start Sorting</button>
                <button onClick={handleNextStep} disabled={isRunning || stepDone} style={{ ...s.btn, backgroundColor: '#0891b2' }}>⏭ Next Step</button>
                <button onClick={resetAll} style={{ ...s.btn, backgroundColor: '#ef4444' }}>↺ Reset</button>
            </div>

            {/* Code Section */}
            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Selection Sort Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap the found minimum with arr[i]
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Time:  O(n²) — always
# Space: O(1)  — in-place
# Swaps: O(n)  — at most n-1 swaps`}</code>}
                    {activeLang === 'javascript' && <code>{`function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap the minimum into position
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}

// Time:  O(n²)
// Space: O(1)
// Swaps: O(n)`}</code>}
                    {activeLang === 'cpp' && <code>{`#include <vector>
#include <algorithm>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}

// Time:  O(n²)
// Space: O(1)
// Swaps: O(n)`}</code>}
                </pre>
            </div>

            {/* Knowledge Check */}
            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What is the main idea of Selection Sort?', a: 'Repeatedly find the minimum element from the unsorted portion and place it at the beginning of the sorted portion.' },
                        { q: 'How many swaps occur in Selection Sort?', a: 'At most O(n) swaps — one swap per pass. This makes it more efficient than Bubble Sort in terms of write operations.' },
                        { q: 'What is the time complexity of Selection Sort?', a: 'O(n²) in all cases (best, average, and worst), because it always scans the entire unsorted portion for the minimum element.' },
                        { q: 'Why is Selection Sort called a selection algorithm?', a: 'Because in each pass, it selects (chooses) the smallest element from the remaining unsorted part and moves it to its correct position.' },
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
    sortedLabel: { height: '28px', display: 'flex', alignItems: 'center' },
    sortedPill: { backgroundColor: '#dcfce7', color: '#15803d', fontWeight: '700', fontSize: '0.82rem', padding: '3px 12px', borderRadius: '999px', border: '1px solid #86efac' },
    barsContainer: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', padding: '0 1rem' },
    barWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
    bar: { width: '40px', borderRadius: '6px 6px 0 0', transition: 'background-color 0.3s', minHeight: '20px' },
    barLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#475569' },
    messageBox: { backgroundColor: '#1e293b', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700' },
    legend: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
    dot: { width: '12px', height: '12px', borderRadius: '50%' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    btn: { padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', opacity: 0.9 },
    codeSection: { marginBottom: '3rem' },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '20px', overflowX: 'auto', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'monospace' },
    quizSection: { marginTop: '2rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: { backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9' },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem', fontSize: '1rem' },
    answer: { color: '#10b981', fontWeight: '600', lineHeight: '1.5', fontSize: '0.95rem' },
};

export default SelectionSort;
