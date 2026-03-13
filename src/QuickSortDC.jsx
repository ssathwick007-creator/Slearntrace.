import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const INITIAL_ARR = [9, 4, 7, 3, 8, 2, 6];

const QuickSortDC = () => {
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Quick Sort organizes data by selecting a pivot and partitioning around it.');
    const [activeLang, setActiveLang] = useState('javascript');
    const stopRef = useRef(false);

    const buildSteps = () => {
        const result = [];
        const arr = [...INITIAL_ARR];

        const partition = (a, lo, hi) => {
            const pivot = a[hi];
            result.push({ arr: [...a], pivot: hi, range: [lo, hi], comparing: -1, sorted: [], msg: `Pivot = ${pivot} (index ${hi}). Partition [${a.slice(lo, hi + 1)}].` });
            let i = lo;
            for (let j = lo; j < hi; j++) {
                result.push({ arr: [...a], pivot: hi, range: [lo, hi], comparing: j, sorted: [], msg: `Compare ${a[j]} with pivot ${pivot}.` });
                if (a[j] < pivot) {
                    [a[i], a[j]] = [a[j], a[i]];
                    if (i !== j) result.push({ arr: [...a], pivot: hi, range: [lo, hi], comparing: -1, swapped: [i, j], sorted: [], msg: `Swap ${a[j]} ↔ ${a[i]}.` });
                    i++;
                }
            }
            [a[i], a[hi]] = [a[hi], a[i]];
            result.push({ arr: [...a], pivot: i, range: [lo, hi], comparing: -1, sorted: [i], msg: `✅ Pivot ${pivot} placed at index ${i}.` });
            return i;
        };

        const sort = (a, lo, hi, sortedSet) => {
            if (lo >= hi) {
                if (lo === hi) sortedSet.add(lo);
                return;
            }
            const p = partition(a, lo, hi);
            sortedSet.add(p);
            sort(a, lo, p - 1, sortedSet);
            sort(a, p + 1, hi, sortedSet);
        };

        const sortedSet = new Set();
        sort(arr, 0, arr.length - 1, sortedSet);
        result.push({ arr: [...arr], pivot: -1, range: [0, arr.length - 1], comparing: -1, sorted: Array.from({ length: arr.length }, (_, i) => i), msg: '🎉 Array fully sorted!' });
        return result;
    };

    const startSimulation = () => {
        stopRef.current = false;
        const s = buildSteps();
        setSteps(s);
        setStepIdx(0);
        setIsRunning(true);
    };

    useEffect(() => {
        if (!isRunning || stepIdx < 0) return;
        if (stepIdx >= steps.length - 1) { setIsRunning(false); return; }
        const timer = setTimeout(() => {
            if (stopRef.current) return;
            setStepIdx(prev => {
                const next = prev + 1;
                if (next >= steps.length - 1) setIsRunning(false);
                return next;
            });
        }, 800);
        return () => clearTimeout(timer);
    }, [isRunning, stepIdx, steps.length]);

    useEffect(() => {
        if (stepIdx >= 0 && steps[stepIdx]) setMessage(steps[stepIdx].msg);
    }, [stepIdx]);

    const nextStep = () => {
        if (steps.length === 0) {
            const s = buildSteps();
            setSteps(s);
            setStepIdx(0);
            return;
        }
        if (stepIdx < steps.length - 1) setStepIdx(prev => prev + 1);
    };

    const reset = () => {
        stopRef.current = true;
        setSteps([]);
        setStepIdx(-1);
        setIsRunning(false);
        setMessage('Quick Sort organizes data by selecting a pivot and partitioning around it.');
    };

    const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;
    const displayArr = currentStep ? currentStep.arr : INITIAL_ARR;
    const maxVal = Math.max(...INITIAL_ARR);

    const getBarColor = (idx) => {
        if (!currentStep) return { bg: '#94A3B8', border: '#64748B' };
        const { pivot, comparing, sorted, swapped } = currentStep;
        if (sorted && sorted.includes(idx)) return { bg: '#22C55E', border: '#16A34A' };
        if (idx === pivot) return { bg: '#A855F7', border: '#7C3AED' };
        if (swapped && swapped.includes(idx)) return { bg: '#EF4444', border: '#DC2626' };
        if (idx === comparing) return { bg: '#FACC15', border: '#EAB308' };
        return { bg: '#94A3B8', border: '#64748B' };
    };

    const codeSnippets = {
        python: `def quick_sort(arr, lo, hi):
    if lo >= hi:
        return
    pivot_idx = partition(arr, lo, hi)
    quick_sort(arr, lo, pivot_idx - 1)
    quick_sort(arr, pivot_idx + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo
    for j in range(lo, hi):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[hi] = arr[hi], arr[i]
    return i`,
        javascript: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
    if (lo >= hi) return;
    const pivotIdx = partition(arr, lo, hi);
    quickSort(arr, lo, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, hi);
}

function partition(arr, lo, hi) {
    const pivot = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    return i;
}`,
        cpp: `int partition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[i], arr[hi]);
    return i;
}

void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Quick Sort — Pivot Organizer</h3>
                <p style={styles.cardDesc}>
                    Quick Sort organizes data by selecting a pivot element and placing smaller elements to its left
                    and larger elements to its right, recursively sorting both partitions.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* Bar Chart Visualization */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '10px', marginBottom: '24px', minHeight: '180px', padding: '0 20px' }}>
                    {displayArr.map((val, idx) => {
                        const c = getBarColor(idx);
                        const height = (val / maxVal) * 150;
                        return (
                            <motion.div
                                key={idx}
                                animate={{ height, backgroundColor: c.bg }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    width: 44,
                                    borderRadius: '8px 8px 4px 4px',
                                    border: `2px solid ${c.border}`,
                                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                                    paddingTop: '6px',
                                    fontSize: '0.9rem', fontWeight: '900', color: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                {val}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#A855F7', border: '2px solid #7C3AED' }} /> Pivot</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FACC15', border: '2px solid #EAB308' }} /> Comparing</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#EF4444', border: '2px solid #DC2626' }} /> Swapped</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#22C55E', border: '2px solid #16A34A' }} /> Sorted</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <button onClick={startSimulation} disabled={isRunning} style={styles.primaryBtn}>Start Simulation</button>
                    <button onClick={nextStep} disabled={isRunning} style={styles.secondaryBtn}>Next Step</button>
                    <button onClick={reset} style={styles.dangerBtn}>Reset</button>
                </div>
            </div>

            {/* Code Section */}
            <div style={styles.card}>
                <div style={styles.codeHeader}>
                    <h3 style={{ margin: 0 }}>Solution Code</h3>
                    <div style={styles.langSelector}>
                        {['python', 'javascript', 'cpp'].map(l => (
                            <button key={l} onClick={() => setActiveLang(l)} style={{
                                ...styles.langBtn,
                                background: activeLang === l ? '#4F46E5' : 'transparent',
                                color: activeLang === l ? '#fff' : '#64748B'
                            }}>
                                {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.pre}><code>{codeSnippets[activeLang]}</code></pre>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' },
    card: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 6px 16px rgba(0,0,0,0.06)' },
    cardTitle: { margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' },
    cardDesc: { margin: '0 0 20px 0', color: '#64748B', lineHeight: '1.6' },
    messageBox: { background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', marginBottom: '24px', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.5' },
    legend: { display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748B' },
    colorBox: { width: '16px', height: '16px', borderRadius: '4px' },
    controls: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
    primaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' },
    secondaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' },
    dangerBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' },
    langSelector: { display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' },
    langBtn: { border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    pre: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace', margin: 0 }
};

export default QuickSortDC;
