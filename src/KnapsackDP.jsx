import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const items = [
    { id: 1, name: 'Compass', weight: 1, value: 15 },
    { id: 2, name: 'Tent', weight: 3, value: 20 },
    { id: 3, name: 'Rations', weight: 4, value: 30 }
];
const W = 5; // Capacity

const KnapsackDP = () => {
    const [viewMode, setViewMode] = useState('play'); // 'play' | 'sim'

    // Play State
    const [bagItems, setBagItems] = useState([]);
    const currentWeight = bagItems.reduce((acc, item) => acc + item.weight, 0);
    const currentValue = bagItems.reduce((acc, item) => acc + item.value, 0);
    const [playMsg, setPlayMsg] = useState('Pack your bag! Maximize the value without exceeding capacity 5.');

    // Sim State
    const numItems = items.length;
    // DP array: (numItems + 1) x (W + 1)
    const [dpTable, setDpTable] = useState(
        Array.from({ length: numItems + 1 }, () => Array(W + 1).fill('?'))
    );
    const [simRunning, setSimRunning] = useState(false);
    const [activeCell, setActiveCell] = useState({ r: null, c: null });
    const [checkCell, setCheckCell] = useState(null);
    const [simMsg, setSimMsg] = useState('Click Start to trace the Bottom-Up DP table.');
    const stopSim = useRef(false);

    // Common
    const [activeLang, setActiveLang] = useState('python');
    const [showQuiz, setShowQuiz] = useState(false);

    const toggleItem = (item) => {
        const inBag = bagItems.some(b => b.id === item.id);
        if (inBag) {
            setBagItems(bagItems.filter(b => b.id !== item.id));
            setPlayMsg(`Removed ${item.name}.`);
        } else {
            if (currentWeight + item.weight > W) {
                setPlayMsg(`Cannot add ${item.name}. Exceeds capacity!`);
            } else {
                const newItems = [...bagItems, item];
                setBagItems(newItems);
                const newVal = newItems.reduce((acc, it) => acc + it.value, 0);
                if (newVal === 45) {
                    setPlayMsg("Amazing! You found the optimal packing: Value 45.");
                } else {
                    setPlayMsg(`Added ${item.name}. Value is now ${newVal}.`);
                }
            }
        }
    };

    const resetPlay = () => {
        setBagItems([]);
        setPlayMsg('Pack your bag! Maximize the value without exceeding capacity 5.');
    };

    const runSimulation = async () => {
        if (simRunning) return;
        setSimRunning(true);
        stopSim.current = false;

        const dp = Array.from({ length: numItems + 1 }, () => Array(W + 1).fill('?'));
        setDpTable([...dp.map(r => [...r])]);

        // Init base cases
        setSimMsg("Initialize 0th row and 0th column with 0 (Base Cases).");
        for (let i = 0; i <= numItems; i++) dp[i][0] = 0;
        for (let w = 0; w <= W; w++) dp[0][w] = 0;
        setDpTable([...dp.map(r => [...r])]);
        await sleep(1500);

        for (let i = 1; i <= numItems; i++) {
            if (stopSim.current) break;
            const item = items[i - 1];

            for (let w = 1; w <= W; w++) {
                if (stopSim.current) break;

                setActiveCell({ r: i, c: w });

                if (item.weight <= w) {
                    setSimMsg(`Item ${item.name} (w:${item.weight}, v:${item.value}) fits in capacity ${w}.`);
                    await sleep(1000);
                    if (stopSim.current) break;

                    const takeVal = item.value + dp[i - 1][w - item.weight];
                    const leaveVal = dp[i - 1][w];

                    setCheckCell({ r1: i - 1, c1: w - item.weight, r2: i - 1, c2: w });
                    setSimMsg(`Check best: Take item = ${item.value} + dp[${i - 1}][${w - item.weight}] (${dp[i - 1][w - item.weight]}) = ${takeVal}. OR Leave = dp[${i - 1}][${w}] (${leaveVal}).`);
                    await sleep(2000);
                    if (stopSim.current) break;

                    dp[i][w] = Math.max(takeVal, leaveVal);
                } else {
                    setCheckCell({ r2: i - 1, c2: w });
                    setSimMsg(`Item ${item.name} (w:${item.weight}) DOES NOT fit in capacity ${w}. Leave it: dp[${i - 1}][${w}] (${dp[i - 1][w]}).`);
                    await sleep(1500);
                    if (stopSim.current) break;

                    dp[i][w] = dp[i - 1][w];
                }

                setCheckCell(null);
                setDpTable([...dp.map(r => [...r])]);
                setSimMsg(`Computed dp[${i}][${w}] = ${dp[i][w]}.`);
                await sleep(500);
            }
        }

        if (!stopSim.current) {
            setActiveCell({ r: numItems, c: W });
            setSimMsg(`Finished! The maximum value possible is ${dp[numItems][W]}.`);
            if (window.AppProgress) window.AppProgress.markProblemSolved();
        }

        setSimRunning(false);
    };

    const resetSim = () => {
        stopSim.current = true;
        setSimRunning(false);
        setDpTable(Array.from({ length: numItems + 1 }, () => Array(W + 1).fill('?')));
        setActiveCell({ r: null, c: null });
        setCheckCell(null);
        setSimMsg('Click Start to trace the Bottom-Up DP table.');
    };

    const switchMode = (mode) => {
        if (simRunning) stopSim.current = true;
        setViewMode(mode);
        if (mode === 'play') resetPlay();
        else resetSim();
    };

    const getCellColor = (r, c) => {
        if (viewMode === 'sim') {
            if (r === numItems && c === W && dpTable[r][c] !== '?' && !simRunning) return '#22C55E'; // Final goal
            if (activeCell.r === r && activeCell.c === c) return '#FACC15'; // Currently computing
            if (checkCell) {
                if ((checkCell.r1 === r && checkCell.c1 === c) || (checkCell.r2 === r && checkCell.c2 === c)) return '#A855F7'; // Referencing dependencies
            }
            if (dpTable[r][c] !== '?') return '#3B82F6'; // Computed
            return '#F1F5F9'; // Unknown
        }
        return '#F1F5F9';
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.title}>0/1 Knapsack — Backpack Packing</h3>
                <p style={styles.desc}>
                    You have a backpack with a limited capacity of <strong>{W} lbs</strong>.
                    Choose items to maximize the total value. You can either take an item (1) or leave it (0).
                </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                <button onClick={() => switchMode('play')} style={{ ...styles.modeBtn, background: viewMode === 'play' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'play' ? 'white' : '#1E293B' }}>Interactive Packing</button>
                <button onClick={() => switchMode('sim')} style={{ ...styles.modeBtn, background: viewMode === 'sim' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'sim' ? 'white' : '#1E293B' }}>Algorithm Visualization</button>
            </div>

            <div style={styles.visualizer}>
                {/* Left Panel */}
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '20px', borderRight: '2px dashed #E2E8F0' }}>

                    {/* Backpack Display */}
                    <div style={{ background: '#1E293B', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '3rem', position: 'relative' }}>
                            🎒
                            <div style={{ position: 'absolute', top: '-10px', right: '-15px', background: '#EF4444', color: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
                                {currentWeight}/{W}
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '20px', background: '#334155', borderRadius: '10px', marginTop: '15px', overflow: 'hidden' }}>
                            <motion.div
                                style={{ height: '100%', background: currentWeight > W ? '#EF4444' : '#10B981' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (currentWeight / W) * 100)}%` }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            />
                        </div>
                        <div style={{ color: '#FACC15', marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            Total Value: {currentValue}
                        </div>
                    </div>

                    {/* Available Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h4 style={{ margin: '0', color: '#64748B', fontSize: '1rem' }}>Available Items</h4>
                        {items.map(item => {
                            const inBag = bagItems.some(b => b.id === item.id);
                            return (
                                <motion.div
                                    key={item.id}
                                    onClick={() => viewMode === 'play' && toggleItem(item)}
                                    whileHover={viewMode === 'play' ? { scale: 1.02, backgroundColor: '#F8FAFC' } : {}}
                                    whileTap={viewMode === 'play' ? { scale: 0.98 } : {}}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        background: inBag ? '#DCFCE7' : 'white',
                                        border: inBag ? '2px solid #22C55E' : '2px solid #E2E8F0',
                                        borderRadius: '12px',
                                        cursor: viewMode === 'play' ? 'pointer' : 'default',
                                        transition: 'all 0.2s',
                                        opacity: viewMode === 'sim' && activeCell.r !== null && activeCell.r > 0 && activeCell.r !== item.id ? 0.3 : 1
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 'bold', color: '#1E293B' }}>{item.name}</span>
                                        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Weight: {item.weight} lbs</span>
                                    </div>
                                    <div style={{ fontWeight: '800', color: '#F59E0B', fontSize: '1.1rem' }}>
                                        Value: {item.value}
                                    </div>
                                    {inBag && <div style={{ color: '#22C55E', fontWeight: 'bold' }}>In Bag ✓</div>}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel */}
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', paddingLeft: '20px', gap: '20px' }}>

                    <div style={styles.messageBox}>
                        {viewMode === 'play' ? playMsg : simMsg}
                    </div>

                    <div style={styles.controlsRow}>
                        {viewMode === 'play' ? (
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetPlay} style={styles.btn('#EF4444')}>Empty Backpack</motion.button>
                        ) : (
                            <>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runSimulation} disabled={simRunning} style={styles.btn('#4F46E5')}>▶ Start Animation</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetSim} style={styles.btn('#EF4444')}>↺ Reset</motion.button>
                            </>
                        )}
                    </div>

                    {/* DP Table */}
                    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', flexGrow: 1, overflowX: 'auto' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#1E293B' }}>DP Table: Items (Rows) × Capacity (Cols)</h4>

                        <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '8px', borderBottom: '2px solid #CBD5E1', color: '#64748B' }}>Item \ Cap</th>
                                    {[...Array(W + 1).keys()].map(w => (
                                        <th key={w} style={{ padding: '8px', borderBottom: '2px solid #CBD5E1', color: '#1E293B' }}>{w}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(numItems + 1).keys()].map(r => (
                                    <tr key={r}>
                                        <td style={{ padding: '8px', borderRight: '2px solid #CBD5E1', fontWeight: 'bold', color: '#1E293B' }}>
                                            {r === 0 ? '0 (None)' : `${items[r - 1].name} (v${items[r - 1].value})`}
                                        </td>
                                        {[...Array(W + 1).keys()].map(c => (
                                            <td key={c} style={{ padding: '4px' }}>
                                                <motion.div
                                                    layout
                                                    style={{
                                                        width: '100%',
                                                        height: '35px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        background: getCellColor(r, c),
                                                        borderRadius: '6px',
                                                        border: '1px solid #CBD5E1',
                                                        fontWeight: '800',
                                                        color: dpTable[r][c] === '?' ? '#94A3B8' : (getCellColor(r, c) === '#22C55E' ? 'white' : '#1E293B'),
                                                        transition: 'background-color 0.3s'
                                                    }}
                                                >
                                                    {dpTable[r][c]}
                                                </motion.div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={styles.legend}>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#FACC15' }}></span> Current cell calculating</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#A855F7' }}></span> Depending subproblem</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#3B82F6' }}></span> Computed</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#22C55E' }}></span> Optimal Maximum</div>
                    </div>

                </div>
            </div>

            {/* Code Section */}
            <div style={styles.codeSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1E293B', fontWeight: '800' }}>Algorithm Implementation</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {['python', 'javascript', 'cpp'].map(l => (
                            <button
                                key={l}
                                onClick={() => setActiveLang(l)}
                                style={{ ...styles.langBtn, background: activeLang === l ? '#4F46E5' : '#F1F5F9', color: activeLang === l ? 'white' : '#64748B' }}
                            >
                                {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.codeBlock}>
                    <code>{codeSnippets[activeLang]}</code>
                </pre>
            </div>

            <div style={{ ...styles.card, marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: '0 0 8px 0', color: '#1E293B' }}>Knowledge Check</h3>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '0.95rem' }}>Test your understanding of the 0/1 Knapsack problem.</p>
                    </div>
                    <button onClick={() => setShowQuiz(!showQuiz)} style={{ ...styles.langBtn, background: showQuiz ? '#64748B' : '#4F46E5', color: 'white' }}>
                        {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                    </button>
                </div>

                <AnimatePresence>
                    {showQuiz && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <QuizQuestion q="1. What does the '0/1' in 0/1 Knapsack mean?" o={['You can either have 0 pounds or 1 pound of weight', 'You can either completely exclude (0) or completely include (1) an item, no fractions allowed', 'The matrix dimensions start at 0 and end at 1', 'The items have values of 0 or 1']} a={1} />
                                <QuizQuestion q="2. Why is a 2D array typically used for this DP solution instead of a 1D array?" o={['Because the problem is too complex', 'Because we must track two varying state parameters: the subset of items considered so far, and the remaining capacity', 'Just to match the math formula visualization', 'Because JavaScript needs 2D arrays to be fast']} a={1} />
                                <QuizQuestion q="3. In the recurrence relation: Math.max(takeVal, leaveVal), what does leaveVal represent?" o={['dp[i][w-1] (previous capacity)', 'dp[i-1][w] (the optimal value using previous items at the same capacity)', 'dp[i-1][w-weight] (the value without capacity limit)', '0']} a={1} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const QuizQuestion = ({ q, o, a }) => {
    const [selected, setSelected] = useState(null);
    return (
        <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#1E293B', fontSize: '1rem' }}>{q}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {o.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        style={{ padding: '10px 16px', textAlign: 'left', borderRadius: '8px', border: selected === i ? (i === a ? '2px solid #22C55E' : '2px solid #EF4444') : '2px solid transparent', background: selected === i ? (i === a ? '#DCFCE7' : '#FEE2E2') : '#FFF', color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                    >
                        {opt}
                        {selected === i && i === a && <span style={{ float: 'right' }}>✅ Correct</span>}
                        {selected === i && i !== a && <span style={{ float: 'right' }}>❌ Incorrect</span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { fontFamily: 'system-ui, sans-serif' },
    card: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', marginBottom: '24px' },
    title: { fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', margin: '0 0 12px 0' },
    desc: { fontSize: '1rem', color: '#64748B', lineHeight: '1.6', margin: 0 },
    modeBtn: { padding: '10px 20px', borderRadius: '999px', border: 'none', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.95rem' },
    visualizer: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '20px' },
    messageBox: { background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', marginBottom: '10px', textAlign: 'center', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    controlsRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
    btn: (bg) => ({ background: bg, color: 'white', border: 'none', borderRadius: '8px', padding: '12px 18px', fontWeight: '700', cursor: 'pointer', opacity: 0.95, fontSize: '0.95rem' }),
    legend: { display: 'flex', gap: '16px', flexWrap: 'wrap', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '10px', justifyContent: 'center' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748B', fontWeight: '600' },
    dot: { width: '12px', height: '12px', borderRadius: '4px' },
    codeSection: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 16px rgba(0,0,0,0.06)' },
    langBtn: { padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem' },
    codeBlock: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, fontFamily: 'monospace' }
};

const codeSnippets = {
    python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                take = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                leave = dp[i - 1][w]
                dp[i][w] = max(take, leave)
            else:
                dp[i][w] = dp[i - 1][w]
                
    return dp[n][capacity]`,
    javascript: `function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                const take = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                const leave = dp[i - 1][w];
                dp[i][w] = Math.max(take, leave);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`,
    cpp: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                int take = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                int leave = dp[i - 1][w];
                dp[i][w] = max(take, leave);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`
};

export default KnapsackDP;
