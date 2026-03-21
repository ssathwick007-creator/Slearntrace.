import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const problems = [
    {
        id: 1,
        title: "Process Scheduling Order",
        difficulty: "Easy",
        icon: "🍳",
        time: "2 min",
        description: "Given processes P1 (5ms), P2 (2ms), P3 (4ms) arriving at t=0, what is the completion order in FCFS?",
        input: "Processes: P1:5, P2:2, P3:4",
        output: "Order: P1 → P2 → P3",
        type: "scheduling",
        steps: [
            "P1 arrives first and starts cooking for 5ms.",
            "P2 arrives but waits until P1 is finished.",
            "P3 finishes last after P2, following the arrival order."
        ]
    },
    {
        id: 2,
        title: "Round Robin Simulation",
        difficulty: "Easy",
        icon: "⏲️",
        time: "3 min",
        description: "P1 (6ms) and P2 (4ms) arrive at t=0. Quantum = 3ms. Show the execution steps.",
        input: "P1:6, P2:4 | Q:3",
        output: "P1(3) → P2(3) → P1(3) → P2(1)",
        type: "rr",
        steps: [
            "P1 runs for 3ms (quantum), then context switches.",
            "P2 runs for 3ms, then context switches.",
            "P1 finishes its remaining 3ms.",
            "P2 finishes its last 1ms."
        ]
    },
    {
        id: 3,
        title: "Identify Deadlock Condition",
        difficulty: "Medium",
        icon: "🚗",
        time: "2 min",
        description: "Which of the 4 conditions is missing if resources can be forcibly taken from a process?",
        input: "Can forcibly take resources",
        output: "No Preemption is missing",
        type: "deadlock",
        steps: [
            "Identify the four conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
            "Forcible removal of resources means we CAN preempt.",
            "Therefore, the 'No Preemption' condition is not met."
        ]
    },
    {
        id: 4,
        title: "Memory Fragmentation",
        difficulty: "Medium",
        icon: "🏨",
        time: "4 min",
        description: "A 10KB hole is available. A 4KB block is allocated. What is the resulting internal fragmentation?",
        input: "Hole: 10KB, Req: 4KB (Fixed Partitioning)",
        output: "6KB Internal Fragmentation",
        type: "memory",
        steps: [
            "Fixed partitioning allocates a set block size (10KB).",
            "The process only uses 4KB of that 10KB block.",
            "10KB - 4KB = 6KB of wasted space inside the block."
        ]
    },
    {
        id: 5,
        title: "Paging Calculation",
        difficulty: "Medium",
        icon: "📚",
        time: "3 min",
        description: "Page size 4KB. Logical Address 13000. What is the Page Number and Offset?",
        input: "LA: 13000, PS: 4096",
        output: "Page: 3, Offset: 712",
        type: "paging",
        steps: [
            "Calculate Page Number: 13000 / 4096 = 3.17 -> Page 3.",
            "Calculate Offset: 13000 % 4096 = 712.",
            "Logical Address = (Page 3, Offset 712)."
        ]
    },
    {
        id: 6,
        title: "Race Condition Check",
        difficulty: "Medium",
        icon: "👨‍🍳",
        time: "5 min",
        description: "Two threads T1 and T2 increment a global variable X=0 without sync. What is a possible final value of X?",
        input: "X = 0; T1: X++; T2: X++",
        output: "Final X: 1 (Race Condition)",
        type: "threads",
        steps: [
            "T1 reads X=0.",
            "T2 reads X=0 before T1 writes back.",
            "T1 writes X=1. T2 writes X=1. (X should have been 2)."
        ]
    },
    {
        id: 7,
        title: "Producer-Consumer",
        difficulty: "Hard",
        icon: "📦",
        time: "6 min",
        description: "Buffer size 2. Producer adds A, then B. Consumer tries to take 3 items. What happens?",
        input: "Size: 2, Prod: 2, Cons: 3",
        output: "Consumer blocks on empty buffer",
        type: "pc",
        steps: [
            "Producer fills buffer with A and B (Size 2).",
            "Consumer takes A and B. Buffer is now empty.",
            "Consumer tries to take 3rd item and enters 'Blocked' state."
        ]
    },
    {
        id: 8,
        title: "Banker's Algorithm",
        difficulty: "Hard",
        icon: "🏦",
        time: "8 min",
        description: "Is it a safe state to grant (1,0,2) to P1 with Avail: (3,3,2)?",
        input: "Avail: 332, Need: 753, Alloc: 010, Req: 102",
        output: "Yes, Safe State",
        type: "banker",
        steps: [
            "P1 requests (1,0,2). Subtract from Available: (3,3,2)-(1,0,2) = (2,3,0).",
            "Update P1's allocation: (0,1,0)+(1,0,2) = (1,1,2).",
            "Find a safe sequence where all needs can be met. (Success)."
        ]
    }
];

const OSPracticeArena = () => {
    const [expandedIds, setExpandedIds] = useState([]);
    const [solvedIds, setSolvedIds] = useState([]);

    const toggleExpand = (id) => {
        setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSolved = (id) => {
        setSolvedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const solvedCount = solvedIds.length;
    const progressPct = Math.round((solvedCount / problems.length) * 100);

    return (
        <div style={styles.arenaContainer}>
            <div style={styles.arenaHeader}>
                <h2 style={styles.arenaTitle}>🚀 OS Practice Arena</h2>
                <p style={styles.arenaSubtitle}>"Test your understanding with real OS challenges."</p>
                <div style={styles.motivationText}>Keep going — you're doing great.</div>
                
                <div style={styles.masterProgressOuter}>
                    <div style={styles.progressTop}>
                        <span style={styles.progressLabel}>Progress</span>
                        <span style={styles.progressStats}>{solvedCount} / {problems.length} solved ({progressPct}%)</span>
                    </div>
                    <div style={styles.progressTrack}>
                        <motion.div 
                            style={styles.progressFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                        />
                    </div>
                </div>
            </div>

            <div style={styles.problemList}>
                {problems.map(p => (
                    <ProblemCard 
                        key={p.id} 
                        problem={p} 
                        isExpanded={expandedIds.includes(p.id)}
                        isSolved={solvedIds.includes(p.id)}
                        onToggle={() => toggleExpand(p.id)}
                        onSolve={() => toggleSolved(p.id)}
                    />
                ))}
            </div>
        </div>
    );
};

const ProblemCard = ({ problem, isExpanded, isSolved, onToggle, onSolve }) => {
    return (
        <motion.div 
            layout
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
            style={{
                ...styles.pCard,
                borderLeft: isSolved ? '4px solid #10b981' : '4px solid #f1f5f9',
            }}
        >
            <div style={styles.pCardMain}>
                <div style={styles.pCardContent}>
                    <div style={styles.pTitleRow}>
                        <h3 style={styles.pTitle}>{problem.title}</h3>
                        <span style={{
                            ...styles.pBadge,
                            backgroundColor: problem.difficulty === 'Easy' ? '#f0fdf4' : problem.difficulty === 'Medium' ? '#fefce8' : '#fef2f2',
                            color: problem.difficulty === 'Easy' ? '#16a34a' : problem.difficulty === 'Medium' ? '#ca8a04' : '#dc2626',
                            border: `1px solid ${problem.difficulty === 'Easy' ? '#dcfce7' : problem.difficulty === 'Medium' ? '#fef9c3' : '#fee2e2'}`
                        }}>
                            {problem.difficulty}
                        </span>
                    </div>
                    <p style={styles.pDesc}>{problem.description}</p>
                </div>
                
                <div style={styles.pActions}>
                    {isSolved && <span style={styles.solvedLabel}>Completed ✅</span>}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onToggle}
                        style={{ ...styles.viewBtn, background: isExpanded ? '#475569' : '#1e293b' }}
                    >
                        {isExpanded ? 'Hide Solution' : 'View Solution'}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={styles.expansionBox}
                    >
                        <div style={styles.expansionContent}>
                            <div style={styles.solutionSplit}>
                                <div style={styles.contextPane}>
                                    <div style={styles.contextItem}>
                                        <label style={styles.cLbl}>Problem Scenario</label>
                                        <div style={styles.cCode}>{problem.input}</div>
                                    </div>
                                    <div style={styles.contextItem}>
                                        <label style={styles.cLbl}>Expected Result</label>
                                        <div style={{...styles.cCode, color: '#059669', background: '#ecfdf5'}}>{problem.output}</div>
                                    </div>
                                </div>
                                <div style={styles.interactivePane}>
                                    <SolutionSimulator problem={problem} />
                                </div>
                            </div>

                            <div style={styles.expFooter}>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onSolve}
                                    style={{
                                        ...styles.markBtn,
                                        backgroundColor: isSolved ? '#10b981' : '#1e293b'
                                    }}
                                >
                                    {isSolved ? 'Mark as Incomplete' : 'Mark as Solved'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const SolutionSimulator = ({ problem }) => {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timer;
        if (isPlaying && step < (problem.steps?.length || 0) - 1) {
            timer = setTimeout(() => {
                setStep(s => s + 1);
            }, 1800);
        } else {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, step, problem.steps]);

    return (
        <div style={styles.simBox}>
            <div style={styles.simVisual}>
                <SolutionViz type={problem.type} problem={problem} currentStep={step} />
            </div>
            
            <div style={styles.simControls}>
                <div style={styles.stepInfo}>
                    <div style={styles.stepCounter}>Step {step + 1} / {problem.steps?.length}</div>
                    <div style={styles.stepExplainer}>{problem.steps?.[step]}</div>
                </div>
                
                <div style={styles.playbackRow}>
                    <button onClick={() => setStep(s => Math.max(0, s - 1))} style={styles.pbBtn}>⏮</button>
                    <button onClick={() => setIsPlaying(!isPlaying)} style={{...styles.pbBtn, background: '#1e293b', color: '#fff'}}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button onClick={() => setStep(s => Math.min((problem.steps?.length || 1) - 1, s + 1))} style={styles.pbBtn}>⏭</button>
                </div>
            </div>
        </div>
    );
};

const SolutionViz = ({ type, problem, currentStep }) => {
    switch (type) {
        case 'scheduling':
            return (
                <div style={styles.ganttChart}>
                    <motion.div animate={{ width: currentStep >= 0 ? '45%' : '0%' }} style={{...styles.ganttSeg, background: '#f87171'}}>P1</motion.div>
                    <motion.div animate={{ width: currentStep >= 1 ? '18%' : '0%' }} style={{...styles.ganttSeg, background: '#60a5fa'}}>P2</motion.div>
                    <motion.div animate={{ width: currentStep >= 2 ? '37%' : '0%' }} style={{...styles.ganttSeg, background: '#34d399'}}>P3</motion.div>
                </div>
            );
        case 'rr':
            const rrSteps = ['P1(3)', 'P2(3)', 'P1(3)', 'P2(1)'];
            return (
                <div style={styles.rrStepGrid}>
                    {rrSteps.map((s, i) => (
                        <motion.div 
                            key={i} 
                            animate={{ opacity: currentStep >= i ? 1 : 0.2, scale: currentStep === i ? 1.05 : 1 }}
                            style={{...styles.rrPill, background: i % 2 === 0 ? '#f87171' : '#60a5fa'}}
                        >
                            {s}
                        </motion.div>
                    ))}
                </div>
            );
        case 'deadlock':
            return (
                <div style={styles.dwViz}>
                    <div style={{...styles.dwNode, opacity: currentStep >= 0 ? 1 : 0.2}}>P1</div>
                    <motion.div animate={{ opacity: currentStep >= 1 ? 1 : 0 }} style={styles.dwArrow}>→</motion.div>
                    <div style={{...styles.dwNode, borderColor: '#60a5fa', opacity: currentStep >= 1 ? 1 : 0.2}}>R1</div>
                    <motion.div animate={{ opacity: currentStep >= 2 ? 1 : 0 }} style={styles.dwArrow}>→</motion.div>
                    <div style={{...styles.dwNode, opacity: currentStep >= 2 ? 1 : 0.2}}>P2</div>
                </div>
            );
        case 'memory':
            return (
                <div style={styles.memBox}>
                    <motion.div animate={{ width: '40%' }} style={styles.memPart}>Allocated</motion.div>
                    <motion.div animate={{ opacity: currentStep >= 2 ? 1 : 0 }} style={styles.memFrag}>Frag</motion.div>
                </div>
            );
        case 'paging':
            return (
                <div style={styles.pageGrid}>
                    <div style={{...styles.pTile, border: currentStep >= 1 ? '2px solid #f87171' : '2px solid #f1f5f9'}}>Page 3</div>
                    <div style={{...styles.pTile, border: currentStep >= 2 ? '2px solid #60a5fa' : '2px solid #f1f5f9'}}>Offset 712</div>
                </div>
            );
        case 'threads':
            return (
                <div style={styles.threadRace}>
                    <motion.div animate={{ opacity: currentStep >= 0 ? 1 : 0.2 }} style={styles.tBox}>T1: Read X=0</motion.div>
                    <motion.div animate={{ opacity: currentStep >= 1 ? 1 : 0.2 }} style={styles.tBox}>T2: Read X=0</motion.div>
                    <motion.div animate={{ y: currentStep >= 2 ? 0 : 5, opacity: currentStep >= 2 ? 1 : 0 }} style={{...styles.tBox, color: '#dc2626'}}>Sync Error ⚠️</motion.div>
                </div>
            );
        default:
            return <div style={styles.defaultSim}>{problem.output}</div>;
    }
};

const styles = {
    arenaContainer: { padding: '2rem 1rem', maxWidth: '960px', margin: '0 auto' },
    arenaHeader: { textAlign: 'center', marginBottom: '1.8rem' },
    arenaTitle: { fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.6px' },
    arenaSubtitle: { color: '#64748b', fontSize: '1rem', fontWeight: '500', marginBottom: '0.35rem' },
    motivationText: { fontSize: '0.82rem', color: '#94a3b8', fontWeight: '500', marginBottom: '1.2rem' },
    masterProgressOuter: { maxWidth: '560px', margin: '0 auto', background: '#fff', padding: '1rem 1.2rem', borderRadius: '16px', border: '1px solid #f1f5f9' },
    progressTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    progressLabel: { fontWeight: '700', fontSize: '0.8rem', color: '#0f172a', textTransform: 'uppercase' },
    progressStats: { fontSize: '0.8rem', fontWeight: '600', color: '#64748b' },
    progressTrack: { height: '4px', background: '#f8fafc', borderRadius: '999px', overflow: 'hidden' },
    progressFill: { height: '100%', background: '#0f172a' },
    problemList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    pCard: { background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', transition: 'all 0.3s ease' },
    pCardMain: { padding: '1.2rem 1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    pCardContent: { flex: 1, marginRight: '2rem' },
    pTitleRow: { display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.4rem' },
    pTitle: { fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 },
    pBadge: { fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '999px' },
    pDesc: { fontSize: '0.9rem', color: '#64748b', margin: 0, fontWeight: '500', maxWidth: '500px' },
    pActions: { display: 'flex', alignItems: 'center', gap: '0.9rem', marginLeft: 'auto' },
    solvedLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#10b981' },
    viewBtn: { padding: '0.6rem 1.4rem', borderRadius: '10px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' },
    expansionBox: { overflow: 'hidden' },
    expansionContent: { padding: '0 2rem 2rem 2rem' },
    solutionSplit: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', background: '#f8fafc', borderRadius: '20px', padding: '1.5rem', border: '1px solid #f1f5f9' },
    contextPane: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
    contextItem: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    cLbl: { fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' },
    cCode: { fontSize: '0.85rem', color: '#0f172a', fontWeight: '600', background: '#fff', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid #f1f5f9' },
    interactivePane: { background: '#fff', borderRadius: '15px', padding: '1.2rem', border: '1px solid #f1f5f9' },
    simBox: { height: '100%', display: 'flex', flexDirection: 'column' },
    simVisual: { flex: 1, minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    simControls: { marginTop: '1.2rem', padding: '0.8rem', background: '#f8fafc', borderRadius: '15px' },
    stepInfo: { textAlign: 'center', marginBottom: '0.8rem' },
    stepCounter: { fontSize: '0.65rem', fontWeight: '800', color: '#64748b', marginBottom: '2px' },
    stepExplainer: { fontSize: '0.85rem', color: '#0f172a', fontWeight: '600' },
    playbackRow: { display: 'flex', justifyContent: 'center', gap: '0.8rem' },
    pbBtn: { background: '#fff', border: '1px solid #f1f5f9', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' },
    expFooter: { display: 'flex', justifyContent: 'center', marginTop: '1.5rem' },
    markBtn: { padding: '0.7rem 2rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' },
    ganttChart: { width: '100%', height: '32px', background: '#f8fafc', borderRadius: '6px', overflow: 'hidden', display: 'flex' },
    ganttSeg: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: '800' },
    rrStepGrid: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' },
    rrPill: { padding: '5px 10px', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', fontWeight: '700' },
    dwViz: { display: 'flex', alignItems: 'center', gap: '0.8rem' },
    dwNode: { width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' },
    dwArrow: { fontSize: '1.2rem', color: '#cbd5e1' },
    memBox: { width: '100%', height: '24px', background: '#f8fafc', borderRadius: '6px', overflow: 'hidden', display: 'flex' },
    memPart: { height: '100%', background: '#60a5fa', color: '#fff', fontSize: '0.7rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    memFrag: { height: '100%', background: '#fee2e2', color: '#f87171', flex: 1, fontSize: '0.7rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    pageGrid: { display: 'flex', gap: '0.8rem' },
    pTile: { padding: '0.8rem 1.2rem', background: '#fff', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem' },
    threadRace: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    tBox: { padding: '5px 10px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600' },
    defaultSim: { fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }
};

export default OSPracticeArena;
