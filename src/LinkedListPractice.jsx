import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LinkedListPractice = () => {
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [step, setStep] = useState(0);

    const navigateToPractice = () => {
        const practiceBtn = document.querySelector('button[data-target="codingPracticeSection"]');
        if (practiceBtn) {
            practiceBtn.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.hash = '#/coding-practice';
        }
    };

    const problems = [
        {
            id: 1,
            title: "Reverse Linked List",
            description: "Reverse the link direction of all nodes in the list.",
            input: "1→2→3→4→5",
            output: "5→4→3→2→1",
            nodes: [1, 2, 3, 4, 5],
            steps: [
                { nodes: [1, 2, 3, 4, 5], msg: "Start from head (1)", highlights: [0], reversed: [] },
                { nodes: [1, 2, 3, 4, 5], msg: "Reverse 1 → 2 to 2 → 1", highlights: [0, 1], reversed: [0] },
                { nodes: [1, 2, 3, 4, 5], msg: "Reverse 2 → 3 to 3 → 2", highlights: [1, 2], reversed: [0, 1] },
                { nodes: [1, 2, 3, 4, 5], msg: "Reverse 3 → 4 to 4 → 3", highlights: [2, 3], reversed: [0, 1, 2] },
                { nodes: [1, 2, 3, 4, 5], msg: "Reverse 4 → 5 to 5 → 4", highlights: [3, 4], reversed: [0, 1, 2, 3] },
                { nodes: [5, 4, 3, 2, 1], msg: "New List reversed!", highlights: [], reversed: [0, 1, 2, 3, 4] }
            ]
        },
        {
            id: 2,
            title: "Find Middle of List",
            description: "Find the middle node using slow and fast pointers.",
            input: "10→20→30→40→50→60",
            output: "40",
            nodes: [10, 20, 30, 40, 50, 60],
            steps: [
                { nodes: [10, 20, 30, 40, 50, 60], msg: "Slow & Fast start at 10", highlights: [0] },
                { nodes: [10, 20, 30, 40, 50, 60], msg: "Slow: 20, Fast: 30", highlights: [1, 2] },
                { nodes: [10, 20, 30, 40, 50, 60], msg: "Slow: 30, Fast: 50", highlights: [2, 4] },
                { nodes: [10, 20, 30, 40, 50, 60], msg: "Slow: 40, Fast: null", highlights: [3, 5] },
                { nodes: [10, 20, 30, 40, 50, 60], msg: "Middle node is 40", highlights: [3] }
            ]
        },
        {
            id: 3,
            title: "Detect Cycle",
            description: "Check if node 5 points back to node 3.",
            input: "1→2→3→4→5→3",
            output: "Cycle at 3",
            nodes: [1, 2, 3, 4, 5],
            steps: [
                { nodes: [1, 2, 3, 4, 5], msg: "Fast moves 2x faster", highlights: [0] },
                { nodes: [1, 2, 3, 4, 5], msg: "Slow at 2, Fast at 3", highlights: [1, 2] },
                { nodes: [1, 2, 3, 4, 5], msg: "Slow at 3, Fast at 5", highlights: [2, 4] },
                { nodes: [1, 2, 3, 4, 5], msg: "Fast loops back to 3", highlights: [2, 3] },
                { nodes: [1, 2, 3, 4, 5], msg: "Slow & Fast meet at 3!", highlights: [2] }
            ]
        },
        {
            id: 4,
            title: "Remove N-th from End",
            description: "Remove 2nd node from end (5).",
            input: "1→2→3→4→5→6, n=2",
            output: "1→2→3→4→6",
            nodes: [1, 2, 3, 4, 5, 6],
            steps: [
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Move fast n=2 steps ahead", highlights: [0, 2] },
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Move both until fast hits end", highlights: [3, 5] },
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Slow is before target (5)", highlights: [3, 4] },
                { nodes: [1, 2, 3, 4, 6], msg: "Link 4 directly to 6", highlights: [3, 5] }
            ]
        },
        {
            id: 5,
            title: "Merge Two Sorted",
            description: "Combine [1,3,5] and [2,4,6].",
            input: "[1,3,5], [2,4,6]",
            output: "1→2→3→4→5→6",
            nodes: [1, 2, 3, 4, 5, 6],
            steps: [
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Compare 1 and 2 → Take 1", highlights: [0] },
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Compare 3 and 2 → Take 2", highlights: [1, 2] },
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Compare 3 and 4 → Take 3", highlights: [2, 3] },
                { nodes: [1, 2, 3, 4, 5, 6], msg: "Final Sorted List Result", highlights: [0, 1, 2, 3, 4, 5] }
            ]
        },
        {
            id: 6,
            title: "Find Intersection",
            description: "Find where A and B meet.",
            input: "A:1→2→3... B:6→7→3...",
            output: "Node 3",
            nodes: [1, 2, 6, 7, 3, 4, 5],
            steps: [
                { nodes: [1, 2, 6, 7, 3, 4, 5], msg: "Pointer A starts at 1, B at 6", highlights: [0, 2] },
                { nodes: [1, 2, 6, 7, 3, 4, 5], msg: "Advance until same node", highlights: [1, 3] },
                { nodes: [1, 2, 6, 7, 3, 4, 5], msg: "Meet at node 3!", highlights: [4] }
            ]
        },
        {
            id: 7,
            title: "Add 1 to Number",
            description: "9→9→9→9 + 1.",
            input: "9→9→9→9",
            output: "1→0→0→0→0",
            nodes: [9, 9, 9, 9],
            steps: [
                { nodes: [9, 9, 9, 9], msg: "Add 1 to last 9 → 10", highlights: [3] },
                { nodes: [9, 9, 9, 0], msg: "Carry 1 up to next 9", highlights: [2, 3] },
                { nodes: [9, 9, 0, 0], msg: "Carry ripples through", highlights: [1, 2] },
                { nodes: [1, 0, 0, 0, 0], msg: "New Head created for carry!", highlights: [0] }
            ]
        },
        {
            id: 8,
            title: "Clone with Random",
            description: "A→B→C with random links.",
            input: "Nodes with random pointers",
            output: "Full copy with links",
            nodes: ['A', "A'", 'B', "B'", 'C', "C'"],
            steps: [
                { nodes: ['A', 'B', 'C'], msg: "Map original nodes", highlights: [0, 1, 2] },
                { nodes: ['A', "A'", 'B', "B'", 'C', "C'"], msg: "Insert copies between originals", highlights: [1, 3, 5] },
                { nodes: ['A', "A'", 'B', "B'", 'C', "C'"], msg: "Set random links for copies", highlights: [1, 5] },
                { nodes: ["A'", "B'", "C'"], msg: "Isolate clone list", highlights: [0, 1, 2] }
            ]
        },
        {
            id: 9,
            title: "LRU Cache Move",
            description: "Access node 3 → move to front.",
            input: "1↔2↔3↔4",
            output: "3↔1↔2↔4",
            nodes: [1, 2, 3, 4],
            steps: [
                { nodes: [1, 2, 3, 4], msg: "Find node 3 in middle", highlights: [2] },
                { nodes: [1, 2, 4], msg: "Detach 3 from current spot", highlights: [1, 3] },
                { nodes: [3, 1, 2, 4], msg: "Insert node 3 at MRU (head)", highlights: [0] }
            ]
        },
        {
            id: 10,
            title: "Flatten Multilevel",
            description: "Flatten hierarchy to linear.",
            input: "List with child pointers",
            output: "1→2→4→5→6→3",
            nodes: [1, 2, 3, 4, 5, 6],
            steps: [
                { nodes: [1, 2, 3], msg: "Check node 2, has child 4", highlights: [1, 3] },
                { nodes: [1, 2, 4, 5, 3], msg: "Merge child list into main", highlights: [2, 3, 4] },
                { nodes: [1, 2, 4, 5, 6, 3], msg: "Continue until all flattened", highlights: [5] }
            ]
        },
        {
            id: 11,
            title: "Check Palindrome",
            description: "Is 1→2→2→1 symmetric?",
            input: "1→2→2→1",
            output: "Yes (True)",
            nodes: [1, 2, 2, 1],
            steps: [
                { nodes: [1, 2, 2, 1], msg: "Find middle and reverse half", highlights: [2, 3] },
                { nodes: [1, 2, 2, 1], msg: "Compare front (1) and back (1)", highlights: [0, 3] },
                { nodes: [1, 2, 2, 1], msg: "Compare front (2) and back (2)", highlights: [1, 2] },
                { nodes: [1, 2, 2, 1], msg: "Matches! Palindrome detected", highlights: [] }
            ]
        },
        {
            id: 12,
            title: "Merge Sort List",
            description: "Sort [4, 2, 1, 3].",
            input: "4→2→1→3",
            output: "1→2→3→4",
            nodes: [4, 2, 1, 3],
            steps: [
                { nodes: [4, 2, 1, 3], msg: "Split into [4,2] and [1,3]", highlights: [0, 1, 2, 3] },
                { nodes: [2, 4, 1, 3], msg: "Sort left and right sublists", highlights: [0, 1] },
                { nodes: [1, 2, 3, 4], msg: "Merge sorted sublists", highlights: [0, 1, 2, 3] }
            ]
        }
    ];

    const startAnimation = (prob) => {
        setSelectedProblem(prob);
        setStep(0);
        setAnimating(true);
    };

    useEffect(() => {
        if (animating && selectedProblem) {
            const timer = setInterval(() => {
                setStep(s => {
                    if (s < selectedProblem.steps.length - 1) return s + 1;
                    clearInterval(timer);
                    setAnimating(false);
                    return s;
                });
            }, 2000);
            return () => clearInterval(timer);
        }
    }, [animating, selectedProblem]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Practice Problems – Test Your Understanding</h2>
                <p style={styles.intro}>Solve these linked list problems step by step. Watch the animated solution after trying yourself!</p>
            </div>

            <div style={styles.problemList}>
                {problems.map(p => (
                    <div key={p.id} style={styles.problemCard}>
                        <h3 style={styles.cardTitle}>{p.id}. {p.title}</h3>
                        <p style={styles.cardDesc}>{p.description}</p>
                        <div style={styles.ioBox}>
                            <span style={styles.ioLabel}>Input:</span> <code>{p.input}</code>
                        </div>
                        <div style={styles.tryArea}>
                            <input type="text" placeholder="Your answer here..." style={styles.input} />
                            <button
                                onClick={() => startAnimation(p)}
                                style={styles.solutionBtn}
                            >
                                Show Animated Solution
                            </button>
                        </div>

                        <AnimatePresence>
                            {selectedProblem?.id === p.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={styles.animContainer}
                                >
                                    <div style={styles.visualList}>
                                        {selectedProblem.steps[step].nodes.map((val, idx) => (
                                            <React.Fragment key={idx}>
                                                <motion.div
                                                    layout
                                                    style={{
                                                        ...styles.node,
                                                        backgroundColor: selectedProblem.steps[step].highlights.includes(idx) ? '#4f46e5' : '#f8fafc',
                                                        color: selectedProblem.steps[step].highlights.includes(idx) ? 'white' : '#1e293b'
                                                    }}
                                                >
                                                    {val}
                                                </motion.div>
                                                {idx < selectedProblem.steps[step].nodes.length - 1 && (
                                                    <div style={styles.arrow}>→</div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p style={styles.animMsg}>{selectedProblem.steps[step].msg}</p>
                                    {!animating && step === selectedProblem.steps.length - 1 && (
                                        <div style={styles.finalAnswer}>
                                            Final Output: <strong>{selectedProblem.output}</strong>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div style={styles.footerLink}>
                <p>
                    Want more clarity or want to code these yourself?
                    Go and practice in the <span
                        style={{ cursor: 'pointer', color: '#4f46e5', fontWeight: 'bold' }}
                        onClick={navigateToPractice}
                    >Coding Practice section</span>!
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '32px',
        marginTop: '3rem',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1rem' },
    problemList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    problemCard: {
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    cardTitle: { margin: 0, fontSize: '1.3rem', color: '#1e293b' },
    cardDesc: { color: '#475569', fontSize: '0.9rem', margin: 0 },
    ioBox: { fontSize: '0.85rem', color: '#64748b' },
    ioLabel: { fontWeight: 'bold', marginRight: '5px' },
    tryArea: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
    input: { flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
    solutionBtn: {
        padding: '8px 14px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    animContainer: { overflow: 'hidden', marginTop: '1rem', backgroundColor: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #f1f5f9' },
    visualList: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' },
    node: {
        minWidth: '40px',
        height: '40px',
        padding: '0 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        border: '1px solid #e2e8f0'
    },
    arrow: { color: '#94a3b8', fontWeight: 'bold', fontSize: '1.2rem' },
    animMsg: { textAlign: 'center', fontSize: '0.9rem', color: '#4f46e5', fontWeight: 'bold', margin: '10px 0' },
    finalAnswer: { textAlign: 'center', fontSize: '0.9rem', padding: '8px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '8px', border: '1px solid #bbf7d0' },
    footerLink: {
        marginTop: '4rem',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #e2e8f0'
    }
};

export default LinkedListPractice;
