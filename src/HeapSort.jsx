import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const INIT = [6, 3, 8, 2, 7, 1, 5, 4];

const HeapSort = () => {
    const [array, setArray] = useState([...INIT]);
    const [rootIdx, setRootIdx] = useState(null);   // purple
    const [heapNodes, setHeapNodes] = useState([]);  // blue
    const [swapping, setSwapping] = useState([]);    // red
    const [sorted, setSorted] = useState(new Set()); // green
    const [message, setMessage] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [stepDone, setStepDone] = useState(false);
    const [activeLang, setActiveLang] = useState('python');
    const stopRef = useRef(false);
    const maxVal = Math.max(...INIT);

    const resetAll = () => {
        stopRef.current = true;
        setTimeout(() => { stopRef.current = false; }, 100);
        setArray([...INIT]); setRootIdx(null); setHeapNodes([]);
        setSwapping([]); setSorted(new Set()); setMessage('');
        setIsRunning(false); setStepDone(false);
    };

    const heapify = async (arr, n, i) => {
        if (stopRef.current) return;
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        setRootIdx(i);
        setHeapNodes(Array.from({ length: n }, (_, k) => k));

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest !== i) {
            setSwapping([i, largest]);
            setMessage(`Heapify: swap arr[${i}]=${arr[i]} ↔ arr[${largest}]=${arr[largest]}`);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            await sleep(500);
            setSwapping([]);
            await heapify(arr, n, largest);
        }
    };

    const runSort = async () => {
        stopRef.current = false;
        setIsRunning(true); setStepDone(false); setSorted(new Set());
        const arr = [...INIT]; setArray([...arr]);
        const n = arr.length;

        // Build max heap
        setMessage('Building max heap...');
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            if (stopRef.current) return;
            await heapify(arr, n, i);
            await sleep(300);
        }
        setMessage('Max heap built! Now extracting elements...');
        await sleep(500);

        const sortedSet = new Set();
        for (let i = n - 1; i > 0; i--) {
            if (stopRef.current) return;
            setRootIdx(0);
            setSwapping([0, i]);
            setMessage(`Swap root (${arr[0]}) with last heap element (${arr[i]})`);
            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            await sleep(500);
            setSwapping([]);
            sortedSet.add(i);
            setSorted(new Set([...sortedSet]));
            await heapify(arr, i, 0);
            await sleep(200);
            if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HeapSort');
        }
        sortedSet.add(0);
        setSorted(new Set([...sortedSet]));
        setRootIdx(null); setHeapNodes([]); setSwapping([]);
        setMessage('✓ Array is sorted!');
        setIsRunning(false); setStepDone(true);
    };

    const barColor = idx => {
        if (swapping.includes(idx)) return '#ef4444';
        if (idx === rootIdx) return '#a855f7';
        if (sorted.has(idx)) return '#4ade80';
        if (heapNodes.includes(idx)) return '#3b82f6';
        return '#e2e8f0';
    };

    // Simplified tree display (first 7 nodes)
    const treeNodes = array.slice(0, 7);
    const sortedCount = sorted.size;

    return (
        <div style={s.container}>
            <div style={s.header}>
                <h2 style={s.title}>Heap Sort — Priority Heap Organizer 🏔</h2>
                <div style={s.desc}>
                    <p>Heap Sort uses a <strong>binary max heap</strong> to repeatedly extract the largest element and place it at the end of the array, building a sorted result.</p>
                </div>
            </div>

            {/* Tree Visualization */}
            <div style={s.treeSection}>
                <div style={s.treeLabel}>Binary Heap Tree (first 7 nodes)</div>
                <div style={s.treeWrap}>
                    {/* Level 0 */}
                    <div style={s.treeRow}>
                        <div style={{ ...s.treeNode, background: barColor(0) }}>{array[0]}</div>
                    </div>
                    {/* Level 1 */}
                    <div style={s.treeRow}>
                        {[1, 2].map(idx => (
                            <div key={idx} style={{ ...s.treeNode, background: idx < array.length ? barColor(idx) : '#f1f5f9', opacity: idx < array.length ? 1 : 0.3 }}>
                                {idx < array.length ? array[idx] : ''}
                            </div>
                        ))}
                    </div>
                    {/* Level 2 */}
                    <div style={s.treeRow}>
                        {[3, 4, 5, 6].map(idx => (
                            <div key={idx} style={{ ...s.treeNode, background: idx < array.length ? barColor(idx) : '#f1f5f9', opacity: idx < array.length ? 1 : 0.3 }}>
                                {idx < array.length ? array[idx] : ''}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bar Visualization */}
            <div style={s.visualizer}>
                <div style={s.vizLabel}>Array Representation</div>
                <div style={s.barsContainer}>
                    {array.map((val, idx) => (
                        <motion.div key={idx} style={s.barWrap} layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                            <div style={{ ...s.bar, height: `${(val / maxVal) * 140 + 20}px`, backgroundColor: barColor(idx) }} />
                            <span style={s.barLabel}>{val}</span>
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence>
                    {message && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={s.messageBox}>{message}</motion.div>}
                </AnimatePresence>
                <div style={s.legend}>
                    {[['#a855f7', 'Root'], ['#3b82f6', 'Heap'], ['#ef4444', 'Swapping'], ['#4ade80', 'Sorted']].map(([c, l]) => (
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
                <h3 style={s.subTitle}>Heap Sort Implementation</h3>
                <div style={s.langSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button key={lang} onClick={() => setActiveLang(lang)} style={{ ...s.langBtn, backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9', color: activeLang === lang ? '#fff' : '#64748b', border: activeLang === lang ? 'none' : '1px solid #e2e8f0' }}>
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre style={s.codeBox}>
                    {activeLang === 'python' && <code>{`def heap_sort(arr):
    n = len(arr)
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    l, r = 2*i+1, 2*i+2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Time:  O(n log n) — all cases
# Space: O(1) — in-place`}</code>}
                    {activeLang === 'javascript' && <code>{`function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n/2)-1; i >= 0; i--)
        heapify(arr, n, i);
    for (let i = n-1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}
function heapify(arr, n, i) {
    let largest = i, l=2*i+1, r=2*i+2;
    if (l<n && arr[l]>arr[largest]) largest=l;
    if (r<n && arr[r]>arr[largest]) largest=r;
    if (largest!==i) {
        [arr[i],arr[largest]]=[arr[largest],arr[i]];
        heapify(arr,n,largest);
    }
}
// Time: O(n log n)  Space: O(1)`}</code>}
                    {activeLang === 'cpp' && <code>{`void heapify(vector<int>&arr,int n,int i){
    int largest=i,l=2*i+1,r=2*i+2;
    if(l<n&&arr[l]>arr[largest])largest=l;
    if(r<n&&arr[r]>arr[largest])largest=r;
    if(largest!=i){
        swap(arr[i],arr[largest]);
        heapify(arr,n,largest);
    }
}
void heapSort(vector<int>&arr){
    int n=arr.size();
    for(int i=n/2-1;i>=0;i--)
        heapify(arr,n,i);
    for(int i=n-1;i>0;i--){
        swap(arr[0],arr[i]);
        heapify(arr,i,0);
    }
}
// Time: O(n log n)  Space: O(1)`}</code>}
                </pre>
            </div>

            <div style={s.quizSection}>
                <h3 style={s.subTitle}>Knowledge Check</h3>
                <div style={s.quizGrid}>
                    {[
                        { q: 'What data structure does Heap Sort rely on?', a: 'A binary max heap — a complete binary tree where each parent node is greater than or equal to its children.' },
                        { q: 'What are the two main phases of Heap Sort?', a: 'Build max heap (O(n)), then repeatedly extract the maximum element and heapify the remaining heap (O(n log n) total).' },
                        { q: 'What is the time complexity of Heap Sort?', a: 'O(n log n) in all cases — best, average, and worst. It never degrades unlike Quick Sort.' },
                        { q: 'Why is Heap Sort not cache-friendly?', a: 'It accesses elements far apart in memory (parent/child in a heap array), causing more cache misses than algorithms like Insertion Sort on small data.' },
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
    treeSection: { backgroundColor: '#f8fafc', borderRadius: '20px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    treeLabel: { fontSize: '0.9rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
    treeWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
    treeRow: { display: 'flex', gap: '16px', justifyContent: 'center' },
    treeNode: { width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', color: '#1e293b', border: '2px solid rgba(0,0,0,0.08)', transition: 'background-color 0.3s' },
    visualizer: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2rem', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
    vizLabel: { fontSize: '0.9rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
    barsContainer: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '180px', padding: '0 1rem' },
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

export default HeapSort;
