import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const INITIAL_POINTS = [
    { x: 50, y: 180 }, { x: 120, y: 60 }, { x: 180, y: 200 },
    { x: 250, y: 90 }, { x: 300, y: 160 }, { x: 80, y: 120 },
    { x: 220, y: 130 }, { x: 340, y: 50 }, { x: 160, y: 30 },
    { x: 280, y: 220 },
];

const dist = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const ClosestPairPoints = () => {
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('A radar system scanning aircraft positions. Find the closest pair using divide-and-conquer.');
    const [activeLang, setActiveLang] = useState('javascript');
    const stopRef = useRef(false);

    const W = 400, H = 260;

    const buildSteps = () => {
        const result = [];
        const pts = [...INITIAL_POINTS].sort((a, b) => a.x - b.x);

        const closestPair = (points, depth) => {
            const n = points.length;
            if (n <= 3) {
                let best = Infinity, bestPair = null;
                for (let i = 0; i < n; i++) {
                    for (let j = i + 1; j < n; j++) {
                        const d = dist(points[i], points[j]);
                        result.push({ points: pts, checking: [points[i], points[j]], divLine: null, closest: bestPair, depth, msg: `Brute force: dist(${i},${j}) = ${d.toFixed(1)}` });
                        if (d < best) { best = d; bestPair = [points[i], points[j]]; }
                    }
                }
                return { dist: best, pair: bestPair };
            }

            const mid = Math.floor(n / 2);
            const midX = points[mid].x;
            result.push({ points: pts, checking: null, divLine: midX, closest: null, depth, msg: `Divide at x = ${midX}. Left: ${mid} points, Right: ${n - mid} points.` });

            const leftResult = closestPair(points.slice(0, mid), depth + 1);
            const rightResult = closestPair(points.slice(mid), depth + 1);

            let best = leftResult.dist < rightResult.dist ? leftResult : rightResult;
            result.push({ points: pts, checking: null, divLine: midX, closest: best.pair, depth, msg: `Best so far: ${best.dist.toFixed(1)}. Now check strip near dividing line.` });

            const strip = points.filter(p => Math.abs(p.x - midX) < best.dist);
            strip.sort((a, b) => a.y - b.y);

            for (let i = 0; i < strip.length; i++) {
                for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < best.dist; j++) {
                    const d = dist(strip[i], strip[j]);
                    result.push({ points: pts, checking: [strip[i], strip[j]], divLine: midX, closest: best.pair, depth, msg: `Strip check: dist = ${d.toFixed(1)}` });
                    if (d < best.dist) {
                        best = { dist: d, pair: [strip[i], strip[j]] };
                    }
                }
            }

            return best;
        };

        const answer = closestPair(pts, 0);
        result.push({ points: pts, checking: null, divLine: null, closest: answer.pair, depth: 0, msg: `🎉 Closest pair found! Distance = ${answer.dist.toFixed(2)}` });
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
        }, 700);
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
        setMessage('A radar system scanning aircraft positions. Find the closest pair using divide-and-conquer.');
    };

    const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;

    const isInPair = (pt, pair) => pair && pair.some(p => p.x === pt.x && p.y === pt.y);

    const codeSnippets = {
        python: `import math

def closest_pair(points):
    points.sort()
    return _closest(points)

def _closest(pts):
    n = len(pts)
    if n <= 3:
        return brute_force(pts)
    
    mid = n // 2
    mid_x = pts[mid][0]
    
    dl = _closest(pts[:mid])
    dr = _closest(pts[mid:])
    d = min(dl, dr)
    
    strip = [p for p in pts
             if abs(p[0] - mid_x) < d]
    strip.sort(key=lambda p: p[1])
    
    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and \\
              strip[j][1] - strip[i][1] < d:
            d = min(d, dist(strip[i], strip[j]))
            j += 1
    return d`,
        javascript: `function closestPair(points) {
    points.sort((a, b) => a[0] - b[0]);
    return closest(points);
}

function closest(pts) {
    const n = pts.length;
    if (n <= 3) return bruteForce(pts);
    
    const mid = Math.floor(n / 2);
    const midX = pts[mid][0];
    
    const dl = closest(pts.slice(0, mid));
    const dr = closest(pts.slice(mid));
    let d = Math.min(dl, dr);
    
    const strip = pts
        .filter(p => Math.abs(p[0] - midX) < d)
        .sort((a, b) => a[1] - b[1]);
    
    for (let i = 0; i < strip.length; i++) {
        for (let j = i+1; j < strip.length &&
             strip[j][1] - strip[i][1] < d; j++) {
            d = Math.min(d, dist(strip[i], strip[j]));
        }
    }
    return d;
}`,
        cpp: `double closestPair(vector<pair<int,int>>& pts) {
    sort(pts.begin(), pts.end());
    return closest(pts, 0, pts.size()-1);
}

double closest(vector<pair<int,int>>& pts,
    int l, int r) {
    if (r - l < 3) return bruteForce(pts, l, r);
    
    int mid = (l + r) / 2;
    int midX = pts[mid].first;
    
    double dl = closest(pts, l, mid);
    double dr = closest(pts, mid+1, r);
    double d = min(dl, dr);
    
    vector<pair<int,int>> strip;
    for (int i = l; i <= r; i++)
        if (abs(pts[i].first - midX) < d)
            strip.push_back(pts[i]);
    
    sort(strip.begin(), strip.end(),
        [](auto& a, auto& b) {
            return a.second < b.second;
        });
    
    for (int i = 0; i < strip.size(); i++)
        for (int j = i+1; j < strip.size() &&
             strip[j].second-strip[i].second < d; j++)
            d = min(d, dist(strip[i], strip[j]));
    return d;
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Closest Pair of Points — Radar Detection System</h3>
                <p style={styles.cardDesc}>
                    Imagine a radar system scanning aircraft positions.
                    The goal is to find the closest pair of aircraft in the sky using an efficient divide-and-conquer strategy.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* 2D Coordinate Plane */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width={W} height={H} style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map(i => (
                            <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={H} stroke="#E2E8F0" strokeDasharray="4,4" />
                        ))}
                        {[0, 1, 2].map(i => (
                            <line key={`h${i}`} x1={0} y1={i * 100} x2={W} y2={i * 100} stroke="#E2E8F0" strokeDasharray="4,4" />
                        ))}

                        {/* Dividing line */}
                        {currentStep?.divLine != null && (
                            <line x1={currentStep.divLine} y1={0} x2={currentStep.divLine} y2={H} stroke="#EF4444" strokeWidth={2} strokeDasharray="6,4" />
                        )}

                        {/* Line between checking pair */}
                        {currentStep?.checking && (
                            <line
                                x1={currentStep.checking[0].x} y1={currentStep.checking[0].y}
                                x2={currentStep.checking[1].x} y2={currentStep.checking[1].y}
                                stroke="#FACC15" strokeWidth={2} strokeDasharray="4,4"
                            />
                        )}

                        {/* Line between closest pair */}
                        {currentStep?.closest && (
                            <line
                                x1={currentStep.closest[0].x} y1={currentStep.closest[0].y}
                                x2={currentStep.closest[1].x} y2={currentStep.closest[1].y}
                                stroke="#22C55E" strokeWidth={3}
                            />
                        )}

                        {/* Points */}
                        {INITIAL_POINTS.map((pt, i) => {
                            let fill = '#3B82F6';
                            let r = 6;
                            if (currentStep) {
                                if (isInPair(pt, currentStep.checking)) { fill = '#FACC15'; r = 8; }
                                else if (isInPair(pt, currentStep.closest)) { fill = '#22C55E'; r = 8; }
                            }
                            return (
                                <circle key={i} cx={pt.x} cy={pt.y} r={r} fill={fill} stroke="white" strokeWidth={2}>
                                    <animate attributeName="r" from={r + 2} to={r} dur="0.3s" />
                                </circle>
                            );
                        })}
                    </svg>
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FACC15', border: '2px solid #EAB308' }} /> Current Pair</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#22C55E', border: '2px solid #16A34A' }} /> Closest Pair</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#3B82F6', border: '2px solid #2563EB' }} /> Checked</div>
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

export default ClosestPairPoints;
