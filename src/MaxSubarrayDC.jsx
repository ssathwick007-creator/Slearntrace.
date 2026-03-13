import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const INITIAL_ARR = [2, -3, 4, -1, 5, -2, 3, -4, 6];

const MaxSubarrayDC = () => {
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Track daily profit/loss. Find consecutive days that produce maximum total profit using divide-and-conquer.');
    const [activeLang, setActiveLang] = useState('javascript');
    const stopRef = useRef(false);

    const buildSteps = () => {
        const result = [];
        const arr = [...INITIAL_ARR];

        const maxCrossing = (a, lo, mid, hi) => {
            let leftSum = -Infinity, sum = 0, maxLeft = mid;
            for (let i = mid; i >= lo; i--) {
                sum += a[i];
                if (sum > leftSum) { leftSum = sum; maxLeft = i; }
            }
            let rightSum = -Infinity; sum = 0; let maxRight = mid + 1;
            for (let i = mid + 1; i <= hi; i++) {
                sum += a[i];
                if (sum > rightSum) { rightSum = sum; maxRight = i; }
            }
            return { sum: leftSum + rightSum, lo: maxLeft, hi: maxRight };
        };

        const solve = (a, lo, hi, depth) => {
            if (lo === hi) {
                result.push({ highlight: [lo], best: [lo, lo], bestVal: a[lo], phase: 'base', msg: `Base case: arr[${lo}] = ${a[lo]}` });
                return { sum: a[lo], lo, hi: lo };
            }

            const mid = Math.floor((lo + hi) / 2);
            result.push({ highlight: Array.from({ length: hi - lo + 1 }, (_, i) => lo + i), divLine: mid, best: null, bestVal: null, phase: 'divide', msg: `Divide [${lo}..${hi}] at mid=${mid}` });

            const left = solve(a, lo, mid, depth + 1);
            const right = solve(a, mid + 1, hi, depth + 1);
            const cross = maxCrossing(a, lo, mid, hi);

            result.push({ highlight: Array.from({ length: cross.hi - cross.lo + 1 }, (_, i) => cross.lo + i), best: null, bestVal: cross.sum, phase: 'crossing', msg: `Crossing subarray [${cross.lo}..${cross.hi}] sum = ${cross.sum}` });

            let best;
            if (left.sum >= right.sum && left.sum >= cross.sum) best = left;
            else if (right.sum >= left.sum && right.sum >= cross.sum) best = right;
            else best = cross;

            result.push({ highlight: Array.from({ length: best.hi - best.lo + 1 }, (_, i) => best.lo + i), best: [best.lo, best.hi], bestVal: best.sum, phase: 'combine', msg: `✅ Best in [${lo}..${hi}]: sum = ${best.sum} at [${best.lo}..${best.hi}]` });

            return best;
        };

        solve(arr, 0, arr.length - 1, 0);
        const final = solve(arr, 0, arr.length - 1, 0);
        // Replace last step with final
        result.push({ highlight: Array.from({ length: final.hi - final.lo + 1 }, (_, i) => final.lo + i), best: [final.lo, final.hi], bestVal: final.sum, phase: 'done', msg: `🎉 Maximum subarray sum = ${final.sum}!` });

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
        }, 900);
        return () => clearTimeout(timer);
    }, [isRunning, stepIdx, steps.length]);

    useEffect(() => {
        if (stepIdx >= 0 && steps[stepIdx]) setMessage(steps[stepIdx].msg);
    }, [stepIdx]);

    const nextStep = () => {
        if (steps.length === 0) { startSimulation(); setIsRunning(false); return; }
        if (stepIdx < steps.length - 1) setStepIdx(prev => prev + 1);
    };

    const reset = () => {
        stopRef.current = true;
        setSteps([]);
        setStepIdx(-1);
        setIsRunning(false);
        setMessage('Track daily profit/loss. Find consecutive days that produce maximum total profit using divide-and-conquer.');
    };

    const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;
    const maxAbs = Math.max(...INITIAL_ARR.map(Math.abs));

    const getBarColor = (idx) => {
        if (!currentStep) return { bg: INITIAL_ARR[idx] >= 0 ? '#94A3B8' : '#F87171', border: '#64748B' };
        const { highlight, best, phase } = currentStep;
        if (phase === 'done' && best && idx >= best[0] && idx <= best[1]) return { bg: '#22C55E', border: '#16A34A' };
        if (phase === 'combine' && best && idx >= best[0] && idx <= best[1]) return { bg: '#22C55E', border: '#16A34A' };
        if (phase === 'crossing' && highlight && highlight.includes(idx)) return { bg: '#3B82F6', border: '#2563EB' };
        if (highlight && highlight.includes(idx)) return { bg: '#FACC15', border: '#EAB308' };
        return { bg: INITIAL_ARR[idx] >= 0 ? '#CBD5E1' : '#FECACA', border: '#94A3B8' };
    };

    const codeSnippets = {
        python: `def maxSubArray(nums):
    def helper(lo, hi):
        if lo == hi:
            return nums[lo]
        mid = (lo + hi) // 2
        
        left_max = helper(lo, mid)
        right_max = helper(mid + 1, hi)
        
        # Max crossing subarray
        left_sum = float('-inf')
        s = 0
        for i in range(mid, lo - 1, -1):
            s += nums[i]
            left_sum = max(left_sum, s)
        
        right_sum = float('-inf')
        s = 0
        for i in range(mid + 1, hi + 1):
            s += nums[i]
            right_sum = max(right_sum, s)
        
        cross = left_sum + right_sum
        return max(left_max, right_max, cross)
    
    return helper(0, len(nums) - 1)`,
        javascript: `function maxSubArray(nums) {
    function helper(lo, hi) {
        if (lo === hi) return nums[lo];
        const mid = Math.floor((lo + hi) / 2);
        
        const leftMax = helper(lo, mid);
        const rightMax = helper(mid + 1, hi);
        
        // Max crossing subarray
        let leftSum = -Infinity, s = 0;
        for (let i = mid; i >= lo; i--) {
            s += nums[i];
            leftSum = Math.max(leftSum, s);
        }
        
        let rightSum = -Infinity;
        s = 0;
        for (let i = mid + 1; i <= hi; i++) {
            s += nums[i];
            rightSum = Math.max(rightSum, s);
        }
        
        const cross = leftSum + rightSum;
        return Math.max(leftMax, rightMax, cross);
    }
    return helper(0, nums.length - 1);
}`,
        cpp: `int maxCrossing(vector<int>& a, int lo, int mid, int hi) {
    int leftSum = INT_MIN, s = 0;
    for (int i = mid; i >= lo; i--) {
        s += a[i];
        leftSum = max(leftSum, s);
    }
    int rightSum = INT_MIN;
    s = 0;
    for (int i = mid+1; i <= hi; i++) {
        s += a[i];
        rightSum = max(rightSum, s);
    }
    return leftSum + rightSum;
}

int maxSubArray(vector<int>& a, int lo, int hi) {
    if (lo == hi) return a[lo];
    int mid = (lo + hi) / 2;
    int left = maxSubArray(a, lo, mid);
    int right = maxSubArray(a, mid+1, hi);
    int cross = maxCrossing(a, lo, mid, hi);
    return max({left, right, cross});
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Maximum Subarray — Profit Analyzer</h3>
                <p style={styles.cardDesc}>
                    Imagine tracking daily profit and loss for a business. The goal is to find the consecutive days
                    that produce the maximum total profit using the divide-and-conquer approach.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* Bar Chart */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '24px', minHeight: '200px', padding: '0 10px' }}>
                    {INITIAL_ARR.map((val, idx) => {
                        const c = getBarColor(idx);
                        const barH = Math.max(8, (Math.abs(val) / maxAbs) * 80);
                        const isNeg = val < 0;
                        return (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                {!isNeg && (
                                    <motion.div
                                        animate={{ height: barH, backgroundColor: c.bg }}
                                        transition={{ duration: 0.3 }}
                                        style={{ width: 36, borderRadius: '6px 6px 2px 2px', border: `2px solid ${c.border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4px', fontSize: '0.8rem', fontWeight: '900', color: '#1E293B' }}
                                    >
                                        +{val}
                                    </motion.div>
                                )}
                                <div style={{ width: 36, height: '2px', background: '#64748B' }} />
                                {isNeg && (
                                    <motion.div
                                        animate={{ height: barH, backgroundColor: c.bg }}
                                        transition={{ duration: 0.3 }}
                                        style={{ width: 36, borderRadius: '2px 2px 6px 6px', border: `2px solid ${c.border}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '4px', fontSize: '0.8rem', fontWeight: '900', color: '#991B1B' }}
                                    >
                                        {val}
                                    </motion.div>
                                )}
                                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '700' }}>Day {idx + 1}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Best subarray indicator */}
                {currentStep?.bestVal != null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', marginBottom: '16px', padding: '10px', background: '#EEF2FF', borderRadius: '10px', fontWeight: '700', color: '#4F46E5' }}
                    >
                        Current best sum: {currentStep.bestVal}
                    </motion.div>
                )}

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FACC15', border: '2px solid #EAB308' }} /> Current Segment</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#3B82F6', border: '2px solid #2563EB' }} /> Crossing</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#22C55E', border: '2px solid #16A34A' }} /> Best Subarray</div>
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

export default MaxSubarrayDC;
