import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const INIT = [8, 3, 5, 2, 7, 4, 6, 1];

const InsertionSort = () => {
    const [array, setArray] = useState([...INIT]);
    const [current, setCurrent] = useState(null);   // yellow
    const [comparing, setComparing] = useState(null); // blue
    const [shifting, setShifting] = useState([]);   // red
    const [sorted, setSorted] = useState(new Set([0])); // green
    const [message, setMessage] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const [stepDone, setStepDone] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const stopRef = useRef(false);

    const maxVal = Math.max(...INIT);

    const resetAll = () => {
        stopRef.current = true;
        setTimeout(() => { stopRef.current = false; }, 100);
        setArray([...INIT]); setCurrent(null); setComparing(null);
        setShifting([]); setSorted(new Set([0])); setMessage('');
        setIsRunning(false); setStepDone(false);
        stepState.current = { arr: [...INIT], i: 1 };
    };

    const runSort = async () => {
        stopRef.current = false;
        setIsRunning(true); setStepDone(false);
        let arr = [...INIT];
        const sortedSet = new Set([0]);

        for (let i = 1; i < arr.length; i++) {
            if (stopRef.current) return;
            const key = arr[i];
            setCurrent(i);
            setMessage(`Taking element ${key} at index ${i}`);
            await sleep(600);

            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                if (stopRef.current) return;
                setComparing(j);
                setShifting([j + 1]);
                setMessage(`${arr[j]} > ${key}, shift ${arr[j]} right`);
                arr[j + 1] = arr[j];
                setArray([...arr]);
                await sleep(500);
                j--;
            }
            arr[j + 1] = key;
            setArray([...arr]);
            sortedSet.add(i);
            setSorted(new Set([...sortedSet]));
            setCurrent(null); setComparing(null); setShifting([]);
            setMessage(`Inserted ${key} at index ${j + 1}`);
            await sleep(400);
            if (window.AppProgress) window.AppProgress.markMetaphorCompleted('InsertionSort');
        }
        setMessage('✓ Array is sorted!');
        showFeedback('Success! You nailed it 🚀', 'success');
        setIsRunning(false); setStepDone(true);
    };

    const stepState = useRef({ arr: [...INIT], i: 1 });
    const handleNextStep = () => {
        if (stepDone || isRunning) return;
        const st = stepState.current;
        if (st.i >= st.arr.length) {
            setMessage('✓ Array is sorted!');
            setStepDone(true);
            if (window.AppProgress) window.AppProgress.markMetaphorCompleted('InsertionSort');
            return;
        }
        const key = st.arr[st.i];
        let j = st.i - 1;
        setCurrent(st.i);
        setMessage(`Inserting ${key} into sorted portion`);
        while (j >= 0 && st.arr[j] > key) {
            st.arr[j + 1] = st.arr[j];
            j--;
        }
        st.arr[j + 1] = key;
        setArray([...st.arr]);
        setSorted(prev => new Set([...prev, st.i]));
        st.i++;
        setCurrent(null); setComparing(null); setShifting([]);
    };

    const barColor = idx => {
        if (shifting.includes(idx)) return '#ef4444';
        if (idx === comparing) return '#3b82f6';
        if (idx === current) return '#fbbf24';
        if (sorted.has(idx)) return '#4ade80';
        return '#e2e8f0';
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <h2 style={s.title}>Insertion Sort — Organizing Your Hand 🃏</h2>
                <div style={s.desc}>
                    <p>Insertion Sort is exactly like sorting playing cards. You pick one card and slide it into its perfect spot in your sorted row!</p>
                </div>
            </div>

            <div style={s.visualizer}>
                <div style={s.sortedPillWrap}>
                    {sorted.size > 1 && <span style={s.sortedPill}>✓ Sorted: first {sorted.size} element{sorted.size > 1 ? 's' : ''}</span>}
                </div>
                <div style={s.barsContainer}>
                    {array.map((val, idx) => (
                        <motion.div 
                            key={idx} 
                            style={s.barWrap} 
                            layout 
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={idx === current ? 'pulse-glow' : ''}
                        >
                            <div style={{ 
                                ...s.bar, 
                                height: `${(val / maxVal) * 160 + 20}px`, 
                                backgroundColor: barColor(idx),
                                boxShadow: idx === current ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
                            }} />
                            <span style={s.barLabel}>{val}</span>
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence>
                    {message && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.messageBox}>{message}</motion.div>}
                </AnimatePresence>
                <div style={s.legend}>
                    {[['#fbbf24', 'Current'], ['#3b82f6', 'Comparing'], ['#ef4444', 'Shifting'], ['#4ade80', 'Sorted']].map(([c, l]) => (
                        <div key={l} style={s.legendItem}><div style={{ ...s.dot, backgroundColor: c }} /><span>{l}</span></div>
                    ))}
                </div>
            </div>

            <div style={s.controls}>
                <div style={{ position: 'relative' }}>
                    <button onClick={() => { runSort(); setShowHint(false); }} disabled={isRunning} style={{ ...s.btn, backgroundColor: '#4f46e5' }}>
                        ▶ Let's Sort it! 🃏
                    </button>
                    {showHint && !isRunning && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Pick a card to start sorting ✨
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

            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Insertion Sort Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Time:  O(n²) worst/avg, O(n) best
# Space: O(1) — in-place`}</code>}
                    {activeLang === 'javascript' && <code>{`function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Time:  O(n²) worst/avg, O(n) best
// Space: O(1)`}</code>}
                    {activeLang === 'cpp' && <code>{`void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Time:  O(n²) worst, O(n) best
// Space: O(1)`}</code>}
                </pre>
            </div>

            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What idea does Insertion Sort follow?', a: 'It builds the sorted array one element at a time by inserting each new element into its correct position among already-sorted elements.' },
                        { q: 'Why is it efficient for nearly sorted arrays?', a: 'Because only a few elements need to shift per insertion. In the best case (already sorted), it runs in O(n) with no shifts at all.' },
                        { q: 'What is its worst-case time complexity?', a: 'O(n²) — when the array is in reverse order, every element must be compared with and shifted past all sorted elements.' },
                        { q: 'When is Insertion Sort preferred?', a: 'For small datasets, nearly-sorted data, and online algorithms where elements arrive one at a time (since it sorts incrementally).' },
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
    sortedPillWrap: { height: '28px', display: 'flex', alignItems: 'center' },
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

export default InsertionSort;
