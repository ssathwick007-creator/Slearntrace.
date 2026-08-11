import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const N = 5; // Top step

const ClimbingStairs = () => {
    const [viewMode, setViewMode] = useState('play');
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);

    // Play State
    const [currStep, setCurrStep] = useState(0);
    const [playMsg, setPlayMsg] = useState('Climb the stairs! Find the optimal paths.');
    const [solvedSteps, setSolvedSteps] = useState(new Set());
    const [dpTable, setDpTable] = useState(Array(N + 1).fill('?'));

    // Simulation State
    const [simStep, setSimStep] = useState(-1);
    const [simRunning, setSimRunning] = useState(false);
    const [activeNode, setActiveNode] = useState(null);
    const stopSim = useRef(false);

    // Common State
    const [activeLang, setActiveLang] = useState('python');
    const [showQuiz, setShowQuiz] = useState(false);

    // Helper to calculate exact ways up to N
    const calculateDP = () => {
        const dp = [1, 1];
        for (let i = 2; i <= N; i++) dp[i] = dp[i - 1] + dp[i - 2];
        return dp;
    };
    const truthDP = calculateDP();

    const resetPlay = () => {
        setCurrStep(0);
        setPlayMsg('Climb the stairs! Find the optimal paths.');
    };

    const hardResetPlay = () => {
        resetPlay();
        setSolvedSteps(new Set());
        setDpTable(Array(N + 1).fill('?'));
    };

    const handleClimb = (stepSize) => {
        if (currStep === N) return;
        const next = currStep + stepSize;
        if (next > N) {
            setPlayMsg("Oops! You overshoot the top step.");
            return;
        }

        setCurrStep(next);

        if (next === N) {
            newSolved.add(next);
            setSolvedSteps(newSolved);
            showFeedback("Success! You reached the top step. 🚀", "success");

            // Mark DP table
            const newDp = [...dpTable];
            newDp[next] = truthDP[next];
            setDpTable(newDp);
        } else {
            if (solvedSteps.has(next)) {
                setPlayMsg("This subproblem was already solved.");
            } else {
                setPlayMsg(`Climbed to step ${next}.`);
                const newSolved = new Set(solvedSteps);
                newSolved.add(next);
                setSolvedSteps(newSolved);

                const newDp = [...dpTable];
                newDp[next] = truthDP[next];
                setDpTable(newDp);
            }
        }
    };

    const generateMemoSteps = () => {
        const steps = [];
        const memo = {};
        const getWays = (i) => {
            steps.push({ node: i, msg: `Calculating f(${i})...`, memo: { ...memo } });
            if (i === 0 || i === 1) {
                memo[i] = 1;
                steps.push({ node: i, msg: `Base case: f(${i}) = 1`, memo: { ...memo } });
                return 1;
            }
            if (memo[i] !== undefined) {
                steps.push({ node: i, msg: "This subproblem was already solved.", memo: { ...memo }, hit: true });
                return memo[i];
            }
            const res = getWays(i - 1) + getWays(i - 2);
            memo[i] = res;
            steps.push({ node: i, msg: `Stored result: f(${i}) = ${res}`, memo: { ...memo } });
            return res;
        };
        getWays(N);
        steps.push({ node: N, msg: `Finished! ${memo[N]} ways to reach top.`, memo: { ...memo }, done: true });
        return steps;
    };

    const generateTabSteps = () => {
        const steps = [];
        const dp = Array(N + 1).fill('?');
        dp[0] = 1;
        steps.push({ node: 0, msg: "Base case: dp[0] = 1", dp: [...dp] });
        dp[1] = 1;
        steps.push({ node: 1, msg: "Base case: dp[1] = 1", dp: [...dp] });

        for (let i = 2; i <= N; i++) {
            steps.push({ node: i, msg: `Calculating dp[${i}] = dp[${i - 1}] + dp[${i - 2}]`, dp: [...dp] });
            dp[i] = dp[i - 1] + dp[i - 2];
            steps.push({ node: i, msg: `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`, dp: [...dp] });
        }
        steps.push({ node: N, msg: `Finished Table Construction!`, dp: [...dp], done: true });
        return steps;
    };

    const runSimulation = async (type) => {
        if (simRunning) return;
        setSimRunning(true);
        stopSim.current = false;
        setSimStep(-1);

        const steps = type === 'memo' ? generateMemoSteps() : generateTabSteps();

        for (let i = 0; i < steps.length; i++) {
            if (stopSim.current) break;
            setSimStep(i);
            const s = steps[i];
            setActiveNode(s.node);
            setPlayMsg(s.msg);
            if (s.done) showFeedback("Success! Simulation complete. 🎓", "success");
            else if (s.hit) showFeedback("Hitting the memo! 🧠");

            if (type === 'memo') {
                const newDp = Array(N + 1).fill('?');
                Object.keys(s.memo).forEach(k => {
                    newDp[k] = s.memo[k] + (s.hit && parseInt(k) === s.node ? ' (Mem)' : '');
                });
                setDpTable(newDp);
            } else {
                setDpTable(s.dp);
            }
            await sleep(1000);
        }
        setSimRunning(false);
        setActiveNode(null);
    };

    const stopSimulation = () => {
        stopSim.current = true;
        setSimRunning(false);
    };

    const switchMode = (mode) => {
        stopSimulation();
        setViewMode(mode);
        hardResetPlay();
        // Give base case DP manually for Tab view before starting
        if (mode === 'tab' || mode === 'memo') {
            setPlayMsg(mode === 'tab' ? 'Click Start to build the DP table Bottom-Up.' : 'Click Start to trace Top-Down Memoization.');
            setDpTable(Array(N + 1).fill('?'));
        }
    };

    const getStairColor = (i) => {
        // Evaluate active node
        const isCurrent = viewMode === 'play' ? currStep === i : activeNode === i;
        if (isCurrent && i === N) return '#22C55E'; // Final step -> Green
        if (isCurrent) return '#FACC15'; // Current step -> Yellow

        // Evaluate memory/table
        const val = dpTable[i];
        if (val !== '?' && typeof val === 'string' && val.includes('(Mem)')) return '#A855F7'; // Memoized -> Purple
        if (val !== '?') return '#3B82F6'; // Computed -> Blue

        return '#F1F5F9'; // Default
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.card}>
                <h3 style={styles.title}>Climbing Stairs — Infinite Tower Challenge</h3>
                <p style={styles.desc}>
                    Imagine a tower with {N} steps. You can climb either <strong>1 step</strong> or <strong>2 steps</strong> at a time.
                    The challenge is to find how many different ways you can reach each step all the way to the top.
                </p>
            </div>

            {/* Mode Selectors */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => switchMode('play')} style={{ ...styles.modeBtn, background: viewMode === 'play' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'play' ? 'white' : '#1E293B' }}>Interactive Gameplay</button>
                <button onClick={() => switchMode('memo')} style={{ ...styles.modeBtn, background: viewMode === 'memo' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'memo' ? 'white' : '#1E293B' }}>Enable Memoization</button>
                <button onClick={() => switchMode('tab')} style={{ ...styles.modeBtn, background: viewMode === 'tab' ? '#4F46E5' : '#F1F5F9', color: viewMode === 'tab' ? 'white' : '#1E293B' }}>Bottom-Up Mode</button>
            </div>

            {/* Main Visualizer Split Layout */}
            <div style={styles.visualizer}>
                {/* Left Panel: Staircase */}
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', paddingRight: '20px', borderRight: '2px dashed #E2E8F0', justifyContent: 'flex-end', minHeight: '400px', position: 'relative' }}>
                    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start' }}>
                        {[...Array(N + 1).keys()].map(i => (
                            <div key={i} style={{
                                width: '120px',
                                height: '60px',
                                borderRadius: '10px',
                                background: getStairColor(i),
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: `${i * 45}px`,
                                marginBottom: '5px',
                                transition: 'background-color 0.3s, transform 0.2s',
                                className: getStairColor(i) === '#FACC15' || getStairColor(i) === '#22C55E' ? 'pulse-glow' : '',
                                boxShadow: getStairColor(i) === '#FACC15' ? '0 0 15px rgba(250, 204, 21, 0.5)' : '0 4px 10px rgba(0,0,0,0.05)',
                                color: getStairColor(i) === '#F1F5F9' ? '#1E293B' : 'white',
                                position: 'relative'
                            }}>
                                Step {i}
                                {getStairColor(i) === '#FACC15' && (
                                    <motion.span
                                        layoutId="climber"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: -45 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                        style={{ position: 'absolute', fontSize: '2.5rem', zIndex: 10 }}
                                    >
                                        🧗
                                    </motion.span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Game Controls and Results */}
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}>

                    {/* Message Box */}
                    <div style={styles.messageBox}>
                        {playMsg}
                    </div>

                    {/* Controls */}
                    <div style={styles.controlsRow}>
                        {viewMode === 'play' && (
                            <>
                                <div style={{ position: 'relative' }}>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { handleClimb(1); setShowHint(false); }} disabled={currStep >= N} style={styles.btn('#3B82F6')}>🏃 Take 1 Step</motion.button>
                                    {showHint && (
                                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                            Climb towards the top! ✨
                                        </div>
                                    )}
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { handleClimb(2); setShowHint(false); }} disabled={currStep >= N - 1} style={styles.btn('#10B981')}>🏃 Take 2 Steps</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetPlay} style={styles.btn('#64748B')}>↺ Restart Run</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={hardResetPlay} style={styles.btn('#EF4444')}>🗑 Reset Game</motion.button>
                            </>
                        )}
                        {viewMode !== 'play' && (
                            <>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => runSimulation(viewMode)} disabled={simRunning} style={styles.btn('#4F46E5')}>▶ Start Animation 🎬</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={hardResetPlay} style={styles.btn('#EF4444')}>↺ Reset</motion.button>
                            </>
                        )}
                    </div>

                    {/* DP Table Display */}
                    <div style={{ marginTop: '20px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#1E293B', display: 'flex', justifyContent: 'space-between' }}>
                            DP Table Formulation
                            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 'normal' }}>Amount → Minimum coins... wait, Ways → Steps</span>
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <AnimatePresence>
                                {[...Array(N + 1).keys()].filter(i => dpTable[i] !== '?').map(i => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', background: typeof dpTable[i] === 'string' && dpTable[i].includes('(Mem)') ? '#F3E8FF' : '#DBEAFE', borderRadius: '8px', borderLeft: `4px solid ${typeof dpTable[i] === 'string' && dpTable[i].includes('(Mem)') ? '#A855F7' : '#3B82F6'}` }}
                                    >
                                        <span style={{ fontWeight: 600, color: '#1E293B' }}>Step {i}</span>
                                        <span style={{ fontWeight: 800, color: typeof dpTable[i] === 'string' && dpTable[i].includes('(Mem)') ? '#7E22CE' : '#1D4ED8' }}>
                                            {typeof dpTable[i] === 'string' ? dpTable[i].replace('(Mem)', '') : dpTable[i]} ways
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {dpTable.every(x => x === '?') && (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#94A3B8', fontStyle: 'italic' }}>Table is empty. Start solving!</div>
                            )}
                        </div>
                    </div>

                    <div style={styles.legend}>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#FACC15' }}></span> Current step</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#3B82F6' }}></span> Computed step</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#A855F7' }}></span> Memoized value</div>
                        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#22C55E' }}></span> Final step</div>
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

            {/* Knowledge Check */}
            <div style={{ ...styles.card, marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: '0 0 8px 0', color: '#1E293B' }}>Knowledge Check</h3>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '0.95rem' }}>Test your understanding of Dynamic Programming concepts.</p>
                    </div>
                    <button onClick={() => setShowQuiz(!showQuiz)} style={{ ...styles.langBtn, background: showQuiz ? '#64748B' : '#4F46E5', color: 'white' }}>
                        {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                    </button>
                </div>

                <AnimatePresence>
                    {showQuiz && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <QuizQuestion q="1. What is Dynamic Programming?" o={['An iterative looping technique', 'A method for solving complex problems by breaking them down into simpler overlapping subproblems', 'A way to sort arrays quickly', 'Programming websites dynamically']} a={1} />
                                <QuizQuestion q="2. What are overlapping subproblems?" o={['Functions that infinitely loop', 'Subproblems that are completely independent', 'Subproblems that share exactly the same inputs and are solved multiple times recursively', 'Code conflicts when merging']} a={2} />
                                <QuizQuestion q="3. What is memoization?" o={['Writing comments to remember what code does', 'Storing the results of expensive function calls and returning the cached result when the same inputs occur again', 'Converting a program into memory blocks', 'Building a table bottom-up']} a={1} />
                                <QuizQuestion q="4. What is the difference between memoization and tabulation?" o={['Memoization is Top-Down caching; Tabulation is Bottom-Up table building', 'They are exactly the same thing', 'Memoization is iterative; Tabulation is recursive', 'Tabulation uses less memory than iterative approaches']} a={0} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div >
        </div >
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
    messageBox: { background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    controlsRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
    btn: (bg) => ({ background: bg, color: 'white', border: 'none', borderRadius: '8px', padding: '12px 18px', fontWeight: '700', cursor: 'pointer', opacity: 0.95, fontSize: '0.95rem' }),
    legend: { display: 'flex', gap: '16px', flexWrap: 'wrap', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '20px', justifyContent: 'center' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748B', fontWeight: '600' },
    dot: { width: '12px', height: '12px', borderRadius: '4px' },
    codeSection: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 6px 16px rgba(0,0,0,0.06)' },
    langBtn: { padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem' },
    codeBlock: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, fontFamily: 'monospace' }
};

const codeSnippets = {
    python: `def climbStairs(n: int) -> int:
    if n <= 2: return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        
    return dp[n]`,
    javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`,
    cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    
    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`
};

export default ClimbingStairs;
