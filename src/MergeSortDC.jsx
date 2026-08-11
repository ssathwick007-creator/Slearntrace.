import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const INITIAL_ARR = [8, 3, 5, 2, 7, 4];

const MergeSortDC = () => {
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('A factory that processes tasks by splitting them into smaller ones, solving each, then combining.');
    const [activeLang, setActiveLang] = useState('javascript');
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const stopRef = useRef(false);

    const buildSteps = () => {
        const result = [];
        const arr = [...INITIAL_ARR];

        const merge = (a, l, m, r, depth) => {
            result.push({ type: 'merge-start', arr: [...a], l, m, r, depth, msg: `Merging [${a.slice(l, m + 1)}] and [${a.slice(m + 1, r + 1)}]` });
            const left = a.slice(l, m + 1);
            const right = a.slice(m + 1, r + 1);
            let i = 0, j = 0, k = l;
            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) { a[k++] = left[i++]; }
                else { a[k++] = right[j++]; }
            }
            while (i < left.length) a[k++] = left[i++];
            while (j < right.length) a[k++] = right[j++];
            result.push({ type: 'merge-done', arr: [...a], l, r, depth, msg: `✅ Merged → [${a.slice(l, r + 1)}]`, feedback: { msg: "Successfully combined! 🧩" } });
        };

        const sort = (a, l, r, depth) => {
            if (l >= r) {
                result.push({ type: 'base', arr: [...a], l, r, depth, msg: `Base case: [${a[l]}]` });
                return;
            }
            const m = Math.floor((l + r) / 2);
            result.push({ type: 'divide', arr: [...a], l, m, r, depth, msg: `Divide [${a.slice(l, r + 1)}] → [${a.slice(l, m + 1)}] | [${a.slice(m + 1, r + 1)}]`, feedback: { msg: "Dividing task... ⚔️" } });
            sort(a, l, m, depth + 1);
            sort(a, m + 1, r, depth + 1);
            merge(a, l, m, r, depth);
        };

        sort(arr, 0, arr.length - 1, 0);
        result.push({ type: 'done', arr: [...arr], l: 0, r: arr.length - 1, depth: 0, msg: '🎉 Array fully sorted!', feedback: { msg: "Success! Factory completed all tasks 🚀", type: "success" } });
        return result;
    };

    const applyStep = (idx) => {
        const s = steps[idx];
        if (!s) return;
        setMessage(s.msg);
        if (s.feedback) showFeedback(s.feedback.msg, s.feedback.type || 'info');
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
        }, 900);
        return () => clearTimeout(timer);
    }, [isRunning, stepIdx, steps.length]);

    useEffect(() => {
        if (stepIdx >= 0 && steps[stepIdx]) {
            setMessage(steps[stepIdx].msg);
        }
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
        setMessage('A factory that processes tasks by splitting them into smaller ones, solving each, then combining.');
    };

    const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;
    const displayArr = currentStep ? currentStep.arr : INITIAL_ARR;

    const getCellColor = (idx) => {
        if (!currentStep) return { bg: '#F1F5F9', border: '#CBD5E1' };
        const { type, l, r, m } = currentStep;
        if (type === 'done') return { bg: '#DCFCE7', border: '#22C55E' };
        if (type === 'base' && idx === l) return { bg: '#DCFCE7', border: '#22C55E' };
        if (type === 'divide' && idx >= l && idx <= r) {
            return idx <= m ? { bg: '#FEF9C3', border: '#FACC15' } : { bg: '#FEF9C3', border: '#F59E0B' };
        }
        if (type === 'merge-start' && idx >= l && idx <= r) return { bg: '#DBEAFE', border: '#3B82F6' };
        if (type === 'merge-done' && idx >= l && idx <= r) return { bg: '#DCFCE7', border: '#22C55E' };
        return { bg: '#F1F5F9', border: '#CBD5E1' };
    };

    const codeSnippets = {
        python: `def merge_sort(arr):
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
    return result`,
        javascript: `function mergeSort(arr) {
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
        if (left[i] <= right[j])
            result.push(left[i++]);
        else
            result.push(right[j++]);
    }
    return [...result, ...left.slice(i),
            ...right.slice(j)];
}`,
        cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size()) {
        if (left[i] <= right[j])
            arr[k++] = left[i++];
        else
            arr[k++] = right[j++];
    }
    while (i<left.size()) arr[k++] = left[i++];
    while (j<right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r-l)/2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Merge Sort — Divide and Combine Factory</h3>
                <p style={styles.cardDesc}>
                    A factory that processes large tasks by splitting them into smaller tasks.
                    Each smaller task is solved individually and then combined to produce the final result.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* Array Visualization */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {displayArr.map((val, idx) => {
                        const c = getCellColor(idx);
                        return (
                            <motion.div
                                key={idx}
                                animate={{ backgroundColor: c.bg, borderColor: c.border }}
                                transition={{ duration: 0.3 }}
                                className={currentStep && currentStep.type !== 'done' && idx >= currentStep.l && idx <= currentStep.r ? 'pulse-glow' : ''}
                                style={{
                                    width: 52, height: 52,
                                    borderRadius: '12px',
                                    border: `3px solid ${c.border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem', fontWeight: '900', color: '#1E293B',
                                    boxShadow: c.bg === '#DCFCE7' ? '0 0 10px rgba(34, 197, 94, 0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                                }}
                            >
                                {val}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tree-like split visualization */}
                {currentStep && currentStep.type === 'divide' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '16px' }}
                    >
                        <div style={{ background: '#FEF9C3', padding: '8px 16px', borderRadius: '10px', border: '2px solid #FACC15', fontWeight: '700', fontSize: '0.9rem' }}>
                            Left: [{currentStep.arr.slice(currentStep.l, currentStep.m + 1).join(', ')}]
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', color: '#94A3B8' }}>↔</div>
                        <div style={{ background: '#FEF9C3', padding: '8px 16px', borderRadius: '10px', border: '2px solid #F59E0B', fontWeight: '700', fontSize: '0.9rem' }}>
                            Right: [{currentStep.arr.slice(currentStep.m + 1, currentStep.r + 1).join(', ')}]
                        </div>
                    </motion.div>
                )}

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEF9C3', border: '2px solid #FACC15' }} /> Dividing</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DBEAFE', border: '2px solid #3B82F6' }} /> Merging</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DCFCE7', border: '2px solid #22C55E' }} /> Sorted</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { startSimulation(); setShowHint(false); }} disabled={isRunning} style={styles.primaryBtn}>
                            ▶ Process Tasks! ⚙️
                        </button>
                        {showHint && !isRunning && (
                            <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                Let's divide and conquer! ✨
                            </div>
                        )}
                    </div>
                    <button onClick={() => { nextStep(); setShowHint(false); }} disabled={isRunning} style={styles.secondaryBtn}>⏭ Next Stage</button>
                    <button onClick={reset} style={styles.dangerBtn}>↺ Reset Factory</button>
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

export default MergeSortDC;
