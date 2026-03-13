import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArrayPracticeProblems = () => {
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [step, setStep] = useState(0);

    const navigateToPractice = () => {
        // Find the global navigation button for Coding Practice and click it
        const practiceBtn = document.querySelector('button[data-target="codingPracticeSection"]');
        if (practiceBtn) {
            practiceBtn.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Fallback for direct hash navigation
            window.location.hash = '#/coding-practice';
        }
    };

    const problems = [
        {
            id: 1,
            title: "Reverse an Array",
            description: "Reverse the given array [1, 2, 3, 4, 5] in place.",
            input: [1, 2, 3, 4, 5],
            output: [5, 4, 3, 2, 1],
            steps: [
                { arr: [5, 2, 3, 4, 1], msg: "Swap 1 and 5", highlights: [0, 4] },
                { arr: [5, 4, 3, 2, 1], msg: "Swap 2 and 4", highlights: [1, 3] },
                { arr: [5, 4, 3, 2, 1], msg: "Finished!", highlights: [] }
            ]
        },
        {
            id: 2,
            title: "Find Maximum Element",
            description: "Find the largest number in [7, 2, 9, 4, 1].",
            input: [7, 2, 9, 4, 1],
            output: 9,
            steps: [
                { arr: [7, 2, 9, 4, 1], msg: "Start with 7 as Max", highlights: [0] },
                { arr: [7, 2, 9, 4, 1], msg: "Check 2: 7 is still Max", highlights: [1] },
                { arr: [7, 2, 9, 4, 1], msg: "Check 9: Update Max to 9", highlights: [2] },
                { arr: [7, 2, 9, 4, 1], msg: "Check 4: 9 is still Max", highlights: [3] },
                { arr: [7, 2, 9, 4, 1], msg: "Check 1: 9 is final Max", highlights: [4] }
            ]
        },
        {
            id: 3,
            title: "Rotate Left by 2",
            description: "Shift all elements of [1, 2, 3, 4, 5] left by 2 positions.",
            input: [1, 2, 3, 4, 5],
            output: [3, 4, 5, 1, 2],
            steps: [
                { arr: [1, 2, 3, 4, 5], msg: "Original Array", highlights: [0, 1] },
                { arr: [3, 4, 5, 3, 4, 5], msg: "Shift elements left", highlights: [0, 1, 2] },
                { arr: [3, 4, 5, 1, 2], msg: "Wrap first two to end", highlights: [3, 4] }
            ]
        },
        {
            id: 4,
            title: "Remove Duplicates",
            description: "Remove duplicate values from [1, 2, 2, 3, 1, 4].",
            input: [1, 2, 2, 3, 1, 4],
            output: [1, 2, 3, 4],
            steps: [
                { arr: [1, 2, 2, 3, 1, 4], msg: "Check 1: Unique", highlights: [0] },
                { arr: [1, 2, 2, 3, 1, 4], msg: "Check 2: Unique", highlights: [1] },
                { arr: [1, 2, "X", 3, 1, 4], msg: "Check 2: Duplicate!", highlights: [2] },
                { arr: [1, 2, "X", 3, "X", 4], msg: "Check 1: Duplicate!", highlights: [4] },
                { arr: [1, 2, 3, 4], msg: "Shift unique values", highlights: [0, 1, 2, 3] }
            ]
        },
        {
            id: 5,
            title: "Two Sum (Pair for 10)",
            description: "Find two numbers in [2, 7, 11, 5, 3] that sum to 10.",
            input: [2, 7, 11, 5, 3],
            output: [7, 3],
            steps: [
                { arr: [2, 7, 11, 5, 3], msg: "Check 2 + 7 = 9", highlights: [0, 1] },
                { arr: [2, 7, 11, 5, 3], msg: "Check 2 + 11 = 13", highlights: [0, 2] },
                { arr: [2, 7, 11, 5, 3], msg: "Check 7 + 11 = 18", highlights: [1, 2] },
                { arr: [2, 7, 11, 5, 3], msg: "Check 7 + 3 = 10! Found it", highlights: [1, 4] }
            ]
        },
        {
            id: 6,
            title: "Max Subarray Sum (Kadane)",
            description: "Find the maximum sum of a contiguous subarray in [-2, 1, -3, 4, -1, 2, 1, -5, 4].",
            input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
            output: 6,
            steps: [
                { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4], msg: "Current Sum: -2, Max: -2", highlights: [0] },
                { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4], msg: "Current Sum: 1, Max: 1", highlights: [1] },
                { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4], msg: "Sum becomes -2, Reset to 0", highlights: [2] },
                { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4], msg: "New Start: 4, Max: 4", highlights: [3] },
                { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4], msg: "Window [4, -1, 2, 1]. Max: 6", highlights: [3, 4, 5, 6] }
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
            }, 1800);
            return () => clearInterval(timer);
        }
    }, [animating, selectedProblem]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Practice Problems – Test Your Understanding</h2>
                <p style={styles.intro}>Solve these array problems step by step. Watch the animated solution after trying yourself!</p>
            </div>

            <div style={styles.problemList}>
                {problems.map(p => (
                    <div key={p.id} style={styles.problemCard}>
                        <h3 style={styles.cardTitle}>{p.id}. {p.title}</h3>
                        <p style={styles.cardDesc}>{p.description}</p>
                        <div style={styles.ioBox}>
                            <span style={styles.ioLabel}>Input:</span> <code>{JSON.stringify(p.input)}</code>
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
                                    <div style={styles.visualArray}>
                                        {selectedProblem.steps[step].arr.map((val, idx) => (
                                            <motion.div
                                                key={idx}
                                                layout
                                                style={{
                                                    ...styles.box,
                                                    backgroundColor: selectedProblem.steps[step].highlights.includes(idx) ? '#4f46e5' : '#f8fafc',
                                                    color: selectedProblem.steps[step].highlights.includes(idx) ? 'white' : '#1e293b',
                                                    border: val === 'X' ? '2px solid #ef4444' : '1px solid #e2e8f0',
                                                    opacity: val === 'X' ? 0.3 : 1
                                                }}
                                            >
                                                {val === 'X' ? '🗑️' : val}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <p style={styles.animMsg}>{selectedProblem.steps[step].msg}</p>
                                    {!animating && step === selectedProblem.steps.length - 1 && (
                                        <div style={styles.finalAnswer}>
                                            Final Output: <strong>{JSON.stringify(selectedProblem.output)}</strong>
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
                        style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
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
    visualArray: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '1rem' },
    box: {
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
    },
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

export default ArrayPracticeProblems;
