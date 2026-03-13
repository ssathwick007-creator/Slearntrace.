import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TowerOfHanoi = () => {
    const [numDisks, setNumDisks] = useState(3);
    const [pegs, setPegs] = useState({ A: [], B: [], C: [] });
    const [callStack, setCallStack] = useState([]);
    const [moves, setMoves] = useState([]);
    const [isSolving, setIsSolving] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [currentStepInfo, setCurrentStepInfo] = useState("Press Solve to watch recursion in action!");

    const PEG_LABELS = ['A', 'B', 'C'];
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

    // Initialize pegs
    useEffect(() => {
        resetPuzzle(numDisks);
    }, [numDisks]);

    const resetPuzzle = (count) => {
        const initialPegA = [];
        for (let i = count; i >= 1; i--) {
            initialPegA.push({ size: i, color: colors[i - 1] });
        }
        setPegs({ A: initialPegA, B: [], C: [] });
        setCallStack([]);
        setMoves([]);
        setIsSolving(false);
        setStepIndex(-1);
        setCurrentStepInfo(`Ready to solve for ${count} disks!`);
    };

    // Recursive logic to generate moves and stack frames
    const generateHanoiMoves = (n, source, target, aux, currentMoves, currentStack) => {
        // Push call to stack
        const frame = { n, source, target, aux, id: Math.random() };

        if (n === 1) {
            currentMoves.push({
                disk: 1,
                from: source,
                to: target,
                stackFrame: frame,
                msg: `Move disk 1 from ${source} to ${target}`
            });
            return;
        }

        generateHanoiMoves(n - 1, source, aux, target, currentMoves, currentStack);

        currentMoves.push({
            disk: n,
            from: source,
            to: target,
            stackFrame: frame,
            msg: `Move disk ${n} from ${source} to ${target}`
        });

        generateHanoiMoves(n - 1, aux, target, source, currentMoves, currentStack);
    };

    const startSolving = async (count) => {
        if (isSolving) return;
        setIsSolving(true);
        resetPuzzle(count);

        const allMoves = [];
        generateHanoiMoves(count, 'A', 'C', 'B', allMoves, []);
        setMoves(allMoves);

        let currentPegs = { A: [], B: [], C: [] };
        for (let i = count; i >= 1; i--) {
            currentPegs.A.push({ size: i, color: colors[i - 1] });
        }

        for (let i = 0; i < allMoves.length; i++) {
            const move = allMoves[i];
            setStepIndex(i);
            setCurrentStepInfo(move.msg);

            // Manage Call Stack Visualization (simplified for clarity)
            // We simulate the stack depth: depth is approx proportional to disk size hierarchy
            const mockStack = [];
            let tempN = count;
            // This is a visual heuristic: smaller n means deeper stack in Hanoi recursion
            for (let j = count; j >= move.stackFrame.n; j--) {
                mockStack.push({ n: j, id: Math.random() });
            }
            setCallStack(mockStack);

            // Execute move
            const diskToMove = currentPegs[move.from].pop();
            currentPegs[move.to].push(diskToMove);
            setPegs({ ...currentPegs });

            await new Promise(r => setTimeout(r, 600));
        }

        setCallStack([]);
        setCurrentStepInfo("Solved! The stack has unwound.");
        setIsSolving(false);
        setStepIndex(-1);
    };

    const questions = [
        {
            id: 1,
            q: "How many moves are needed to solve a 3-disk Tower of Hanoi?",
            a: "7 moves! The formula is 2^n - 1, so 2^3 - 1 = 7.",
            options: ["3", "7", "8", "15"]
        },
        {
            id: 2,
            q: "What is the maximum depth of the call stack for 'n' disks?",
            a: "n! Each recursive call processes one disk level deeper until it reaches disk 1.",
            options: ["1", "n", "2^n", "n^2"]
        },
        {
            id: 3,
            q: "Why is a stack essential for recursion in this puzzle?",
            a: "To 'remember' the pending moves (the auxiliary peg state) after solving the smaller sub-problems.",
            options: ["To store disks", "To track history", "To save return state", "It isn't"]
        },
        {
            id: 4,
            q: "If you try to solve for 20 disks manually, what is the biggest risk?",
            a: "Stack Overflow! Modern computers handle 20 fine, but 10,000 might crash the stack memory.",
            options: ["Disk loss", "Memory leak", "Stack Overflow", "None"]
        },
        {
            id: 5,
            q: "In postfix (RPN), numbers push. In Hanoi, what pushes onto the stack?",
            a: "The return addresses and local variables (n, source, target) of the function calls.",
            options: ["Disks", "Operators", "Function Frames", "Poles"]
        }
    ];

    const codeSnippets = {
        python: `def hanoi(n, source, target, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    # Recursive step 1: Push hanoi(n-1) to Auxiliary
    hanoi(n-1, source, auxiliary, target)
    
    # Base move
    print(f"Move disk {n} from {source} to {target}")
    
    # Recursive step 2: Push hanoi(n-1) to Target
    hanoi(n-1, auxiliary, target, source)`,
        cpp: `void hanoi(int n, char src, char dest, char aux) {
    if (n == 0) return;
    
    hanoi(n - 1, src, aux, dest);
    cout << "Move disk " << n << " from " << src << " to " << dest << endl;
    hanoi(n - 1, aux, dest, src);
}`,
        java: `public static void solveHanoi(int n, char fromPeg, char toPeg, char auxPeg) {
    if (n == 1) {
        System.out.println("Move disk 1 from " + fromPeg + " to " + toPeg);
        return;
    }
    solveHanoi(n - 1, fromPeg, auxPeg, toPeg);
    System.out.println("Move disk " + n + " from " + fromPeg + " to " + toPeg);
    solveHanoi(n - 1, auxPeg, toPeg, fromPeg);
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Tower of Hanoi Puzzle – Recursive Stack Power</h2>
                <p style={styles.intro}>
                    The Tower of Hanoi puzzle uses recursion — each move pushes a new sub-problem onto the stack until the smallest disk is moved, then everything unwinds!
                </p>
            </div>

            <div style={styles.visualLayout}>
                {/* Call Stack Side Panel */}
                <div style={styles.stackPanel}>
                    <div style={styles.panelTitle}>CALL STACK (RECURSION)</div>
                    <div style={styles.stackContainer}>
                        <AnimatePresence>
                            {callStack.map((frame, idx) => (
                                <motion.div
                                    key={frame.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    style={{
                                        ...styles.stackFrame,
                                        backgroundColor: `rgba(79, 70, 229, ${1 - idx * 0.15})`
                                    }}
                                >
                                    hanoi(n={frame.n})
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {callStack.length === 0 && <div style={styles.emptyStack}>Stack Empty</div>}
                    </div>
                    <div style={styles.recursionLabel}>
                        Recursion = push sub-problems → solve smallest → pop & combine
                    </div>
                </div>

                {/* Main Puzzle Area */}
                <div style={styles.puzzleArea}>
                    <div style={styles.statusBanner}>
                        {currentStepInfo}
                    </div>

                    <div style={styles.polesContainer}>
                        {PEG_LABELS.map(pegId => (
                            <div key={pegId} style={styles.pegWrapper}>
                                <div style={styles.pegBase}></div>
                                <div style={styles.pegPole}></div>
                                <div style={styles.disksColumn}>
                                    <AnimatePresence>
                                        {pegs[pegId].map((disk, idx) => (
                                            <motion.div
                                                key={`disk-${disk.size}`}
                                                layout
                                                initial={{ y: -100 }}
                                                animate={{ y: 0 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                                style={{
                                                    ...styles.disk,
                                                    width: `${40 + disk.size * 25}px`,
                                                    backgroundColor: disk.color,
                                                    bottom: `${idx * 24}px`
                                                }}
                                            >
                                                {disk.size}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div style={styles.pegLabel}>{pegId}</div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.controls}>
                        <button
                            onClick={() => startSolving(3)}
                            style={styles.solveBtn}
                            disabled={isSolving}
                        >
                            Solve for 3 disks
                        </button>
                        <button
                            onClick={() => startSolving(5)}
                            style={styles.solveBtn}
                            disabled={isSolving}
                        >
                            Solve for 5 disks
                        </button>
                        <button
                            onClick={() => resetPuzzle(numDisks)}
                            style={styles.resetBtn}
                            disabled={isSolving}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.quizGrid}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.questionText}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.options}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.optBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.answer}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3 style={styles.codeTitle}>Recursive Tower of Hanoi</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#4f46e5' : 'transparent',
                                    color: language === lang ? 'white' : '#64748b'
                                }}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.pre}>
                    <code>{codeSnippets[language]}</code>
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2.4rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.2rem', marginTop: '12px' },
    visualLayout: {
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        minHeight: '600px'
    },
    stackPanel: {
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
    },
    panelTitle: { fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', marginBottom: '1rem', textAlign: 'center' },
    stackContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '8px',
        padding: '10px',
        backgroundColor: '#f1f5f9',
        borderRadius: '16px',
        overflowY: 'auto'
    },
    stackFrame: {
        padding: '12px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    emptyStack: { textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: '20px' },
    recursionLabel: { fontSize: '0.7rem', color: '#4f46e5', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center', lineHeight: '1.4' },
    puzzleArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusBanner: {
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '30px',
        fontWeight: 'bold',
        marginBottom: '3rem',
        fontSize: '1.1rem',
        boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)'
    },
    polesContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        height: '250px',
        alignItems: 'flex-end',
        paddingBottom: '20px'
    },
    pegWrapper: {
        position: 'relative',
        width: '180px',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    pegBase: {
        width: '160px',
        height: '12px',
        backgroundColor: '#475569',
        borderRadius: '6px',
        position: 'absolute',
        bottom: '0'
    },
    pegPole: {
        width: '12px',
        height: '180px',
        backgroundColor: '#94a3b8',
        borderRadius: '6px',
        position: 'absolute',
        bottom: '12px'
    },
    disksColumn: {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        position: 'absolute',
        bottom: '12px',
        width: '100%'
    },
    disk: {
        height: '22px',
        borderRadius: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        margin: '1px 0'
    },
    pegLabel: {
        position: 'absolute',
        bottom: '-35px',
        fontWeight: '900',
        fontSize: '1.5rem',
        color: '#cbd5e1'
    },
    controls: {
        marginTop: '5rem',
        display: 'flex',
        gap: '1.5rem'
    },
    solveBtn: {
        minHeight: '48px',
        padding: '12px 20px',
        backgroundColor: '#78350f',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(120, 53, 15, 0.3)',
        fontSize: '0.9rem'
    },
    resetBtn: {
        minHeight: '48px',
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        fontWeight: 'bold',
        color: '#64748b',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '1rem', color: '#1e293b', marginBottom: '1rem', fontWeight: '700' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.85rem' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#eef2ff', borderRadius: '12px', color: '#4338ca', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#a5b4fc', overflowX: 'auto' }
};

export default TowerOfHanoi;
