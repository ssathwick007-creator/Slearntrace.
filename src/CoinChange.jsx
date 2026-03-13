import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const coins = [1, 2, 5];
const target = 11;

const CoinChange = () => {
    const [viewMode, setViewMode] = useState('play'); // 'play' | 'sim'

    // Play State
    const [userCoins, setUserCoins] = useState([]);
    const [playMsg, setPlayMsg] = useState('Drag tokens or click to add coins to the vending machine!');
    const currentSum = userCoins.reduce((a, b) => a + b, 0);

    // Sim State
    const [simRunning, setSimRunning] = useState(false);
    const stopSim = useRef(false);
    const [dpTable, setDpTable] = useState(Array(target + 1).fill('∞'));
    const [activeCol, setActiveCol] = useState(null); // Current amount: yellow
    const [activeCoin, setActiveCoin] = useState(null); // Which coin we are checking
    const [simMsg, setSimMsg] = useState('Click Start to trace the Bottom-Up DP table.');

    // Common
    const [activeLang, setActiveLang] = useState('python');
    const [showQuiz, setShowQuiz] = useState(false);

    // Play Handlers
    const addCoin = (val) => {
        if (currentSum + val > target) {
            setPlayMsg("Oops! That exceeds the target amount.");
            return;
        }
        const newCoins = [...userCoins, val];
        setUserCoins(newCoins);
        const newSum = currentSum + val;

        if (newSum === target) {
            if (newCoins.length === 3) {
                setPlayMsg("Optimal solution found! 3 coins (5, 5, 1).");
            } else {
                setPlayMsg(`Target reached with ${newCoins.length} coins. Can you do it in 3?`);
            }
        } else {
            setPlayMsg(`Added ${val}¢. Current amount: ${newSum}¢`);
        }
    };

    const resetPlay = () => {
        setUserCoins([]);
        setPlayMsg('Drag tokens or click to add coins to the vending machine!');
    };

    // Sim Handlers
    const runSimulation = async () => {
        if (simRunning) return;
        setSimRunning(true);
        stopSim.current = false;

        const dp = Array(target + 1).fill('∞');
        dp[0] = 0;
        setDpTable([...dp]);
        setSimMsg("Base case: dp[0] = 0. Zero coins needed to make amount 0.");
        await sleep(1500);

        for (let i = 1; i <= target; i++) {
            if (stopSim.current) break;
            setActiveCol(i);
            setSimMsg(`Calculating minimum coins for amount ${i}¢...`);
            await sleep(1000);

            for (let c of coins) {
                if (stopSim.current) break;
                if (i - c >= 0) {
                    setActiveCoin(c);
                    setSimMsg(`Checking coin ${c}¢... Can we use it for amount ${i}¢?`);
                    await sleep(1000);

                    const prevRes = dp[i - c];
                    if (prevRes !== '∞') {
                        const potential = prevRes + 1;
                        if (dp[i] === '∞' || potential < dp[i]) {
                            dp[i] = potential;
                            setDpTable([...dp]);
                            setSimMsg(`Updating dp[${i}] to ${potential} coins (dp[${i - c}] + 1).`);
                        } else {
                            setSimMsg(`dp[${i}] is already optimal with ${dp[i]} coins. No update.`);
                        }
                    } else {
                        setSimMsg(`dp[${i - c}] is unreachable. Cannot use ${c}¢ coin.`);
                    }
                    await sleep(1000);
                }
            }
            setActiveCoin(null);
            setSimMsg(`Amount ${i}¢ computed! Optimal is ${dp[i]} coins.`);
            await sleep(1000);
        }

        if (!stopSim.current) {
            setActiveCol(target); // Highlight final
            setSimMsg(`Finished! Minimum coins to make ${target}¢ is ${dp[target]}.`);
            if (window.AppProgress) window.AppProgress.markProblemSolved();
        }

        setSimRunning(false);
    };

    const resetSim = () => {
        stopSim.current = true;
        setSimRunning(false);
        setDpTable(Array(target + 1).fill('∞'));
        setActiveCol(null);
        setActiveCoin(null);
        setSimMsg('Click Start to trace the Bottom-Up DP table.');
    };

    const switchMode = (mode) => {
        if (simRunning) stopSim.current = true;
        setViewMode(mode);
        if (mode === 'play') resetPlay();
        else resetSim();
    };

    // Rendering Helpers
    const getCellColor = (amt) => {
        if (viewMode === 'sim') {
            if (amt === target && dpTable[amt] !== '∞') return '#22C55E'; // Final Green
            if (amt === activeCol) return '#FACC15'; // Current amount Yellow

            // Highlight subproblem check
            if (activeCol !== null && activeCoin !== null && amt === activeCol - activeCoin) {
                return '#A855F7'; // Being read from previous Memoization Purple
            }

            if (dpTable[amt] !== '∞') return '#3B82F6'; // Computed Blue
            return '#F1F5F9'; // Default
        } else {
            if (currentSum === amt) return '#22C55E';
            if (currentSum > amt) return '#E2E8F0';
            return '#F1F5F9';
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.card}>
                <h3 style={styles.title}>Coin Change — Vending Machine Builder</h3>
                <p style={styles.desc}>
                    A vending machine must produce a target amount using the minimum number of coins.
                    Given coins of denominations <strong>[1, 2, 5]</strong> and a <strong>target of {target}</strong>, construct the optimum combination.
                </p>
            </div>

            {/* Mode Selectors */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                <button onClick={() => switchMode('play')} style={{ ...styles.modeBtn, background: viewMode === 'play' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'play' ? 'white' : '#1E293B' }}>Interactive Builder</button>
                <button onClick={() => switchMode('sim')} style={{ ...styles.modeBtn, background: viewMode === 'sim' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'sim' ? 'white' : '#1E293B' }}>Algorithm Visualization</button>
            </div>

            {/* Main Visualizer */}
            <div style={styles.visualizer}>
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '20px', borderRight: '2px dashed #E2E8F0' }}>

                    {/* Vending Machine Display */}
                    <div style={{ background: '#1E293B', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                        <div style={{ color: '#94A3B8', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px' }}>TARGET</div>
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: '#10B981', fontFamily: 'monospace', background: '#0F172A', padding: '10px 30px', borderRadius: '12px', border: '2px solid #334155' }}>
                            {target}¢
                        </div>

                        {/* Meter */}
                        <div style={{ width: '100%', height: '24px', background: '#334155', borderRadius: '12px', marginTop: '20px', overflow: 'hidden', position: 'relative' }}>
                            <motion.div
                                style={{ height: '100%', background: currentSum === target ? '#10B981' : '#3B82F6' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (currentSum / target) * 100)}%` }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            />
                        </div>
                        <div style={{ color: 'white', marginTop: '10px', fontSize: '1.2rem', fontWeight: '600' }}>
                            Current: {currentSum}¢
                        </div>
                    </div>

                    {/* Coins */}
                    {viewMode === 'play' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                            <p style={{ margin: '0 0 16px 0', fontWeight: '600', color: '#64748B' }}>Available Coins (Drag or Click)</p>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {coins.map(c => (
                                    <motion.div
                                        key={c}
                                        onClick={() => addCoin(c)}
                                        drag
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        dragElastic={0.5}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FACC15', border: '4px solid #CA8A04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: '#713F12', cursor: 'grab', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    >
                                        {c}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Selected Coins Display */}
                    {viewMode === 'play' && (
                        <div style={{ minHeight: '80px', display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px', border: '2px dashed #CBD5E1', borderRadius: '12px' }}>
                            <AnimatePresence>
                                {userCoins.map((c, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FDE047', border: '2px solid #CA8A04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#713F12' }}
                                    >
                                        {c}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', paddingLeft: '20px', gap: '20px' }}>

                    <div style={styles.messageBox}>
                        {viewMode === 'play' ? playMsg : simMsg}
                    </div>

                    <div style={styles.controlsRow}>
                        {viewMode === 'play' ? (
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetPlay} style={styles.btn('#EF4444')}>Reset Vending Logic</motion.button>
                        ) : (
                            <>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runSimulation} disabled={simRunning} style={styles.btn('#4F46E5')}>▶ Start Animation</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetSim} style={styles.btn('#EF4444')}>↺ Reset</motion.button>
                            </>
                        )}
                    </div>

                    {/* DP Table */}
                    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', flexGrow: 1 }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#1E293B' }}>DP Table: Amount → Min Coins</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {[...Array(target + 1).keys()].map(i => (
                                <motion.div
                                    key={i}
                                    layout
                                    style={{
                                        width: '45px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        background: getCellColor(i),
                                        borderRadius: '8px',
                                        border: '1px solid #CBD5E1',
                                        padding: '4px',
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 'bold' }}>{i}</span>
                                    <span style={{ fontSize: '1rem', color: getCellColor(i) === '#F1F5F9' ? '#94A3B8' : (getCellColor(i) === '#22C55E' ? 'white' : '#1E293B'), fontWeight: '800' }}>
                                        {viewMode === 'sim' ? dpTable[i] : (i === 0 ? '0' : '?')}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.legend}>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#FACC15' }}></span> Current amount</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#3B82F6' }}></span> Computed amount</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#22C55E' }}></span> Optimal target</div>
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
                        <p style={{ margin: 0, color: '#64748B', fontSize: '0.95rem' }}>Test your understanding of the Coin Change DP algorithm.</p>
                    </div>
                    <button onClick={() => setShowQuiz(!showQuiz)} style={{ ...styles.langBtn, background: showQuiz ? '#64748B' : '#4F46E5', color: 'white' }}>
                        {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                    </button>
                </div>

                <AnimatePresence>
                    {showQuiz && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <QuizQuestion q="1. Why do we initialize the DP array to Infinity (or a large number) except for dp[0]?" o={['Because we do not know the answer strictly yet', 'To represent amount 0 needing 0 coins, while setting other amounts to an unachieved high bounds for minimum comparisons', 'To avoid index out of bounds errors during coin deduction', 'To save memory space']} a={1} />
                                <QuizQuestion q="2. During tabulation, for a given amount i and coin c, what is the recursive relation?" o={['dp[i] = dp[i] + c', 'dp[i] = min(dp[i], dp[i-c] + 1)', 'dp[i] = dp[i-1] + c', 'dp[i] = min(dp[i-c], 1)']} a={1} />
                                <QuizQuestion q="3. Is Coin Change a variation of the Knapsack problem?" o={['Yes, it is closely related to the Unbounded Knapsack problem since coins can be used infinitely', 'No, they have no relation', 'Yes, it is the exact same as 0/1 Knapsack', 'No, it is a greedy-only problem']} a={0} />
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
    python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
                
    return dp[amount] if dp[amount] != float('inf') else -1`,
    javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let c of coins) {
            if (i - c >= 0) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) {
                dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}`
};

export default CoinChange;
