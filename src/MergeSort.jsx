import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const INIT = [8, 3, 5, 2, 7, 4, 6, 1];

const MergeSort = () => {
    const [array, setArray] = useState([...INIT]);
    const [dividing, setDividing] = useState([]);   // yellow
    const [merging, setMerging] = useState([]);     // blue
    const [sorted, setSorted] = useState(new Set()); // green
    const [message, setMessage] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [stepDone, setStepDone] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const [splitView, setSplitView] = useState(null); // show divide step
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const stopRef = useRef(false);

    const maxVal = Math.max(...INIT);

    const resetAll = () => {
        stopRef.current = true;
        setTimeout(() => { stopRef.current = false; }, 100);
        setArray([...INIT]); setDividing([]); setMerging([]);
        setSorted(new Set()); setMessage(''); setIsRunning(false);
        setStepDone(false); setSplitView(null);
    };

    const mergeArr = async (arr, left, mid, right) => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        setMerging(Array.from({ length: right - left + 1 }, (_, x) => left + x));
        setDividing([]);
        setMessage(`Merging [${leftArr.join(',')}] + [${rightArr.join(',')}]`);
        await sleep(700);

        while (i < leftArr.length && j < rightArr.length) {
            if (stopRef.current) return;
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
            setArray([...arr]);
            await sleep(300);
        }
        while (i < leftArr.length) { arr[k++] = leftArr[i++]; setArray([...arr]); await sleep(200); }
        while (j < rightArr.length) { arr[k++] = rightArr[j++]; setArray([...arr]); await sleep(200); }

        const newSorted = Array.from({ length: right - left + 1 }, (_, x) => left + x);
        setSorted(prev => new Set([...prev, ...newSorted]));
        setMerging([]);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('MergeSort');
    };

    const mergeSortHelper = async (arr, left, right) => {
        if (left >= right) return;
        if (stopRef.current) return;
        const mid = Math.floor((left + right) / 2);

        setDividing(Array.from({ length: right - left + 1 }, (_, x) => left + x));
        setMessage(`Dividing: indices ${left} to ${right}, mid at ${mid}`);
        await sleep(600);

        await mergeSortHelper(arr, left, mid);
        if (stopRef.current) return;
        await mergeSortHelper(arr, mid + 1, right);
        if (stopRef.current) return;
        await mergeArr(arr, left, mid, right);
    };

    const runSort = async () => {
        stopRef.current = false;
        setIsRunning(true); setStepDone(false); setSorted(new Set());
        const arr = [...INIT];
        setArray([...arr]);
        await mergeSortHelper(arr, 0, arr.length - 1);
        if (!stopRef.current) {
            setSorted(new Set(Array.from({ length: arr.length }, (_, i) => i)));
            setDividing([]); setMerging([]);
            setMessage('✓ Array is sorted!');
            showFeedback("Merge Sort complete! Divided and Conquered 🏗️", "success");
            setIsRunning(false); setStepDone(true);
        }
    };

    const handleNextStep = () => {
        if (!stepDone) {
            setMessage('Use Start Sorting for full animation. Merge Sort is recursive — step mode runs the full sort.');
            runSort();
        }
    };

    const barColor = idx => {
        if (sorted.has(idx)) return '#4ade80';
        if (merging.includes(idx)) return '#3b82f6';
        if (dividing.includes(idx)) return '#fbbf24';
        return '#e2e8f0';
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <h2 style={s.title}>Merge Sort — Divide and Combine 🏗️</h2>
                <div style={s.desc}>
                    <p>Merge Sort is like a giant puzzle: we <strong>divide</strong> the pieces until they are tiny, sort them, and then <strong>merge</strong> them back into a perfect picture!</p>
                </div>
            </div>

            {/* Split conceptual view */}
            <div style={s.splitDiagram}>
                <div style={s.splitRow}><span style={s.splitBox}>[8, 3, 5, 2, 7, 4, 6, 1]</span></div>
                <div style={s.splitArrow}>↓ divide</div>
                <div style={s.splitRow}>
                    <span style={s.splitBox}>[8, 3, 5, 2]</span>
                    <span style={s.splitBox}>[7, 4, 6, 1]</span>
                </div>
                <div style={s.splitArrow}>↓ divide</div>
                <div style={s.splitRow}>
                    <span style={s.splitBox}>[8, 3]</span><span style={s.splitBox}>[5, 2]</span>
                    <span style={s.splitBox}>[7, 4]</span><span style={s.splitBox}>[6, 1]</span>
                </div>
                <div style={s.splitArrow}>↑ merge sorted halves</div>
            </div>

            <div style={s.visualizer}>
                <div style={s.barsContainer}>
                    {array.map((val, idx) => (
                        <motion.div 
                            key={idx} 
                            style={s.barWrap} 
                            layout 
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={merging.includes(idx) ? 'pulse-glow' : ''}
                        >
                            <div style={{ 
                                ...s.bar, 
                                height: `${(val / maxVal) * 160 + 20}px`, 
                                backgroundColor: barColor(idx),
                                boxShadow: merging.includes(idx) ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none'
                            }} />
                            <span style={s.barLabel}>{val}</span>
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence>
                    {message && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.messageBox}>{message}</motion.div>}
                </AnimatePresence>
                <div style={s.legend}>
                    {[['#fbbf24', 'Dividing'], ['#3b82f6', 'Merging'], ['#4ade80', 'Sorted']].map(([c, l]) => (
                        <div key={l} style={s.legendItem}><div style={{ ...s.dot, backgroundColor: c }} /><span>{l}</span></div>
                    ))}
                </div>
            </div>

            <div style={s.controls}>
                <div style={{ position: 'relative' }}>
                    <button onClick={() => { runSort(); setShowHint(false); }} disabled={isRunning} style={{ ...s.btn, backgroundColor: '#4f46e5' }}>
                        ▶ Divide & Conquer! 🏗️
                    </button>
                    {showHint && !isRunning && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Let's split this array! ✨
                        </div>
                    )}
                </div>
                <button onClick={() => { handleNextStep(); setShowHint(false); }} disabled={isRunning || stepDone} style={{ ...s.btn, backgroundColor: '#0891b2' }}>
                    ⏭ Take a Step
                </button>
                <button onClick={resetAll} style={{ ...s.btn, backgroundColor: '#ef4444' }}>
                    ↺ Reset All
                </button>
            </div>

            <div style={s.codeSection}>
                <h3 style={s.subTitle}>Merge Sort Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Time:  O(n log n) — all cases
# Space: O(n)      — requires extra space`}</code>}
                    {activeLang === 'javascript' && <code>{`function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Time:  O(n log n)
// Space: O(n)`}</code>}
                    {activeLang === 'cpp' && <code>{`void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size())
        arr[k++] = (left[i]<=right[j]) ? left[i++] : right[j++];
    while (i<left.size()) arr[k++]=left[i++];
    while (j<right.size()) arr[k++]=right[j++];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l>=r) return;
    int m = (l+r)/2;
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
}

// Time:  O(n log n)
// Space: O(n)`}</code>}
                </pre>
            </div>

            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What strategy does Merge Sort use?', a: 'Divide and Conquer — recursively divide the array into halves, sort each, then merge them back together.' },
                        { q: 'Why is Merge Sort efficient for large datasets?', a: 'Its O(n log n) time complexity even in the worst case makes it much faster than O(n²) algorithms for large inputs.' },
                        { q: 'What is its time complexity?', a: 'O(n log n) in all cases — best, average, and worst. The log n factor comes from the number of divide levels.' },
                        { q: 'Why does Merge Sort require extra space?', a: 'The merge step creates temporary arrays to hold left and right halves during merging, requiring O(n) additional space.' },
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
    header: { textAlign: 'center', marginBottom: '1.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em', marginBottom: '1rem' },
    desc: { color: '#64748b', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto' },
    splitDiagram: { backgroundColor: '#f1f5f9', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.95rem', color: '#334155' },
    splitRow: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4px', flexWrap: 'wrap' },
    splitBox: { backgroundColor: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '8px', padding: '4px 10px', color: '#1e40af', fontWeight: '700' },
    splitArrow: { color: '#64748b', fontSize: '0.9rem', margin: '6px 0' },
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

export default MergeSort;
