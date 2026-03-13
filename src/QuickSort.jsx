import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const INIT = [9, 4, 7, 3, 8, 2, 6, 5];

const QuickSort = () => {
    const [array, setArray] = useState([...INIT]);
    const [pivot, setPivot] = useState(null);
    const [comparing, setComparing] = useState([]);
    const [swapping, setSwapping] = useState([]);
    const [sorted, setSorted] = useState(new Set());
    const [message, setMessage] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [stepDone, setStepDone] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const stopRef = useRef(false);
    const maxVal = Math.max(...INIT);

    const resetAll = () => {
        stopRef.current = true;
        setTimeout(() => { stopRef.current = false; }, 100);
        setArray([...INIT]); setPivot(null); setComparing([]);
        setSwapping([]); setSorted(new Set()); setMessage('');
        setIsRunning(false); setStepDone(false);
    };

    const partition = async (arr, low, high) => {
        const pivotVal = arr[high];
        setPivot(high);
        setMessage(`Pivot: ${pivotVal} at index ${high}`);
        await sleep(600);
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (stopRef.current) return i;
            setComparing([j, high]);
            setMessage(`Comparing ${arr[j]} with pivot ${pivotVal}`);
            await sleep(400);
            if (arr[j] <= pivotVal) {
                i++;
                if (i !== j) {
                    setSwapping([i, j]);
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setArray([...arr]);
                    await sleep(350);
                    setSwapping([]);
                }
            }
        }
        i++;
        [arr[i], arr[high]] = [arr[high], arr[i]];
        setArray([...arr]);
        setPivot(null); setComparing([]);
        setSorted(prev => new Set([...prev, i]));
        setMessage(`Pivot ${pivotVal} placed at index ${i}`);
        await sleep(400);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('QuickSort');
        return i;
    };

    const quickHelper = async (arr, low, high) => {
        if (low >= high || stopRef.current) return;
        const pi = await partition(arr, low, high);
        await quickHelper(arr, low, pi - 1);
        await quickHelper(arr, pi + 1, high);
    };

    const runSort = async () => {
        stopRef.current = false;
        setIsRunning(true); setStepDone(false); setSorted(new Set());
        const arr = [...INIT]; setArray([...arr]);
        await quickHelper(arr, 0, arr.length - 1);
        if (!stopRef.current) {
            setSorted(new Set(Array.from({ length: arr.length }, (_, i) => i)));
            setMessage('✓ Array is sorted!');
            setIsRunning(false); setStepDone(true);
        }
    };

    const barColor = idx => {
        if (swapping.includes(idx)) return '#ef4444';
        if (idx === pivot) return '#a855f7';
        if (comparing.includes(idx)) return '#fbbf24';
        if (sorted.has(idx)) return '#4ade80';
        return '#e2e8f0';
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <h2 style={s.title}>Quick Sort — Pivot Organizer ⚡</h2>
                <div style={s.desc}>
                    <p>Quick Sort selects a <strong>pivot element</strong> and partitions the array so smaller elements go left and larger go right, then recursively sorts each side.</p>
                </div>
            </div>
            <div style={s.visualizer}>
                <div style={s.barsContainer}>
                    {array.map((val, idx) => (
                        <motion.div key={idx} style={s.barWrap} layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                            <div style={{ ...s.bar, height: `${(val / maxVal) * 160 + 20}px`, backgroundColor: barColor(idx) }} />
                            <span style={s.barLabel}>{val}</span>
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence>
                    {message && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.messageBox}>{message}</motion.div>}
                </AnimatePresence>
                <div style={s.legend}>
                    {[['#a855f7', 'Pivot'], ['#fbbf24', 'Comparing'], ['#ef4444', 'Swapping'], ['#4ade80', 'Sorted']].map(([c, l]) => (
                        <div key={l} style={s.legendItem}><div style={{ ...s.dot, backgroundColor: c }} /><span>{l}</span></div>
                    ))}
                </div>
            </div>
            <div style={s.controls}>
                <button onClick={runSort} disabled={isRunning} style={{ ...s.btn, backgroundColor: '#4f46e5' }}>▶ Start Sorting</button>
                <button onClick={() => { if (!stepDone) runSort(); }} disabled={isRunning || stepDone} style={{ ...s.btn, backgroundColor: '#0891b2' }}>⏭ Next Step</button>
                <button onClick={resetAll} style={{ ...s.btn, backgroundColor: '#ef4444' }}>↺ Reset</button>
            </div>
            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Quick Sort Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1

# Time:  O(n log n) avg, O(n²) worst
# Space: O(log n)`}</code>}
                    {activeLang === 'javascript' && <code>{`function quickSort(arr, low=0, high=arr.length-1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
    return i + 1;
}
// Time: O(n log n) avg  Space: O(log n)`}</code>}
                    {activeLang === 'cpp' && <code>{`int partition(vector<int>& arr, int low, int high){
    int pivot=arr[high], i=low-1;
    for(int j=low;j<high;j++)
        if(arr[j]<=pivot) swap(arr[++i],arr[j]);
    swap(arr[i+1],arr[high]);
    return i+1;
}
void quickSort(vector<int>&arr,int low,int high){
    if(low<high){
        int pi=partition(arr,low,high);
        quickSort(arr,low,pi-1);
        quickSort(arr,pi+1,high);
    }
}
// Time: O(n log n) avg  Space: O(log n)`}</code>}
                </pre>
            </div>
            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What is a pivot in Quick Sort?', a: 'An element chosen from the array that partitions it — all smaller elements go left, all larger go right.' },
                        { q: 'What is the average time complexity?', a: 'O(n log n) — each partition splits the array roughly in half over log n levels, each with O(n) work.' },
                        { q: 'Why is Quick Sort usually faster in practice?', a: 'Excellent cache locality, in-place partitioning, and low constant factors make it the fastest general-purpose sort in real scenarios.' },
                        { q: 'What happens in the worst case?', a: 'O(n²) when the pivot is always the min or max element. Randomized pivot selection prevents this.' },
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
    visualizer: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', border: '1px solid #f1f5f9' },
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

export default QuickSort;
