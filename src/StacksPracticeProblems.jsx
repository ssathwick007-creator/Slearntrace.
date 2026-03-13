import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StacksPracticeProblems = () => {
    const [activeProblemId, setActiveProblemId] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [animationSteps, setAnimationSteps] = useState([]);
    const [currentStepIdx, setCurrentStepIdx] = useState(-1);
    const [visualStack, setVisualStack] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('');

    const problems = [
        {
            id: 1,
            title: "Reverse a string using stack",
            problem: "Reverse the string 'hello' using a stack.",
            input: "'hello'",
            output: "'olleh'",
            steps: [
                { op: 'push', val: 'h', msg: 'Push h' },
                { op: 'push', val: 'e', msg: 'Push e' },
                { op: 'push', val: 'l', msg: 'Push l' },
                { op: 'push', val: 'l', msg: 'Push l' },
                { op: 'push', val: 'o', msg: 'Push o' },
                { op: 'pop', val: 'o', msg: 'Pop o (Start of reversed string)' },
                { op: 'pop', val: 'l', msg: 'Pop l' },
                { op: 'pop', val: 'l', msg: 'Pop l' },
                { op: 'pop', val: 'e', msg: 'Pop e' },
                { op: 'pop', val: 'h', msg: 'Pop h (Reversed result: olleh)' }
            ]
        },
        {
            id: 2,
            title: "Check balanced parentheses",
            problem: "Check if '()[]{}' is valid.",
            input: "'()[]{}'",
            output: "Valid",
            steps: [
                { op: 'push', val: '(', msg: 'Found ( - push to stack' },
                { op: 'pop', val: '(', msg: 'Found ) - matches top ( - pop' },
                { op: 'push', val: '[', msg: 'Found [ - push' },
                { op: 'pop', val: '[', msg: 'Found ] - matches top [ - pop' },
                { op: 'push', val: '{', msg: 'Found { - push' },
                { op: 'pop', val: '{', msg: 'Found } - matches top { - pop' },
                { op: 'done', val: 'Valid', msg: 'Stack empty - Expression is valid!' }
            ]
        },
        {
            id: 3,
            title: "Next greater element",
            problem: "Find next greater for [4, 5, 2, 25].",
            input: "[4, 5, 2, 25]",
            output: "[5, 25, 25, -1]",
            steps: [
                { op: 'push', val: '4', msg: 'Push 4' },
                { op: 'pop', val: '4', msg: 'Next is 5 > 4. Result for 4 is 5. Pop 4.' },
                { op: 'push', val: '5', msg: 'Push 5' },
                { op: 'push', val: '2', msg: '2 < 5. Push 2.' },
                { op: 'pop', val: '2', msg: 'Next is 25 > 2. Result for 2 is 25. Pop 2.' },
                { op: 'pop', val: '5', msg: 'Next is 25 > 5. Result for 5 is 25. Pop 5.' },
                { op: 'push', val: '25', msg: 'Push 25' },
                { op: 'done', val: '-1', msg: 'No elements left for 25. Result is -1.' }
            ]
        },
        {
            id: 4,
            title: "Implement min-stack",
            problem: "Keep track of minimum element in O(1).",
            input: "Push 10, 5, 12; getMin()",
            output: "Min: 5",
            steps: [
                { op: 'push', val: '10 (min:10)', msg: 'Push 10' },
                { op: 'push', val: '5 (min:5)', msg: 'Push 5 (New Min!)' },
                { op: 'push', val: '12 (min:5)', msg: 'Push 12' },
                { op: 'highlight', val: 'Min: 5', msg: 'getMin() returns 5 instantly from stack state.' }
            ]
        },
        {
            id: 5,
            title: "Evaluate postfix",
            problem: "Evaluate '2 3 + 4 *'.",
            input: "'2 3 + 4 *'",
            output: "20",
            steps: [
                { op: 'push', val: '2', msg: 'Push 2' },
                { op: 'push', val: '3', msg: 'Push 3' },
                { op: 'pop', val: '2,3', msg: 'Hit +. Pop 2 and 3. Add.' },
                { op: 'push', val: '5', msg: 'Push 5' },
                { op: 'push', val: '4', msg: 'Push 4' },
                { op: 'pop', val: '5,4', msg: 'Hit *. Pop 5 and 4. Multiply.' },
                { op: 'push', val: '20', msg: 'Push result: 20' }
            ]
        },
        {
            id: 6,
            title: "Sort a stack using temp stack",
            problem: "Sort [3, 1, 4, 2] to [1, 2, 3, 4].",
            input: "[3, 1, 4, 2]",
            output: "[1, 2, 3, 4]",
            steps: [
                { op: 'push', val: '3', msg: 'Push 3 to Main' },
                { op: 'push', val: '1', msg: 'Push 1 to Main' },
                { op: 'pop', val: '1', msg: 'Temp stack logic: move 1 safely.' },
                { op: 'push', val: '2', msg: 'Push 2 to Main' },
                { op: 'push', val: '4', msg: 'Push 4 to Main' },
                { op: 'done', val: 'Sorted', msg: 'Using a second stack, we can sort LIFO elements.' }
            ]
        },
        {
            id: 7,
            title: "Stock span problem",
            problem: "Prices: [100, 80, 60, 70, 60, 75, 85].",
            input: "[100, 80, 60, 70, 60, 75, 85]",
            output: "[1, 1, 1, 2, 1, 4, 6]",
            steps: [
                { op: 'push', val: '100', msg: 'Day 1: 100. Span 1.' },
                { op: 'push', val: '80', msg: 'Day 2: 80 < 100. Span 1.' },
                { op: 'push', val: '70', msg: 'Day 4: 70 > 60. Pop 60. Span 2.' },
                { op: 'push', val: '85', msg: 'Day 7: 85 > all except 100. Pop back to 100. Span 6.' }
            ]
        },
        {
            id: 8,
            title: "Largest rectangle in histogram",
            problem: "Heights [2, 1, 5, 6, 2, 3].",
            input: "[2,1,5,6,2,3]",
            output: "Area: 10",
            steps: [
                { op: 'push', val: '2 (idx:0)', msg: 'Increasing heights - push' },
                { op: 'pop', val: '2', msg: 'Decr. height 1 - calculate area for 2' },
                { op: 'push', val: '5', msg: 'Push 5' },
                { op: 'push', val: '6', msg: 'Push 6' },
                { op: 'pop', val: '6', msg: 'Calculate width for bar 6 x height 5 = Area 10' }
            ]
        },
        {
            id: 9,
            title: "Implement two stacks in one array",
            problem: "Store two stacks efficiently in a single fixed array.",
            input: "Array Size 10",
            output: "Symmetry",
            steps: [
                { op: 'push', val: 'S1 Item (idx 0)', msg: 'Stack 1 grows from left' },
                { op: 'push', val: 'S2 Item (idx 9)', msg: 'Stack 2 grows from right' },
                { op: 'push', val: 'S1 Item (idx 1)', msg: 'Towards each other' },
                { op: 'done', val: 'Efficient', msg: 'Space shared until they meet in the middle!' }
            ]
        },
        {
            id: 10,
            title: "Check redundant brackets",
            problem: "Expression '((a+b)+c)' vs '((a+b))'.",
            input: "'((a+b))'",
            output: "Redundant",
            steps: [
                { op: 'push', val: '(', msg: 'Push (' },
                { op: 'push', val: '(', msg: 'Push (' },
                { op: 'push', val: 'a+b', msg: 'Push operands' },
                { op: 'pop', val: 'a+b', msg: 'Pop a+b' },
                { op: 'pop', val: '(', msg: 'Matched ( - No operator between! Redundant.' }
            ]
        },
        {
            id: 11,
            title: "Design stack with increment",
            problem: "Custom stack: push, pop, increment(k, val).",
            input: "inc(3, 100)",
            output: "Updated",
            steps: [
                { op: 'push', val: '1', msg: 'Push 1' },
                { op: 'push', val: '2', msg: 'Push 2' },
                { op: 'push', val: '3', msg: 'Push 3' },
                { op: 'highlight', val: '+100', msg: 'inc(3, 100) added 100 to bottom 3 elements.' }
            ]
        },
        {
            id: 12,
            title: "Celebrity problem",
            problem: "Find a person everyone knows, but they know no one.",
            input: "4 People Matrix",
            output: "Person 2",
            steps: [
                { op: 'push', val: 'P0,P1,P2,P3', msg: 'Push all candidates to stack' },
                { op: 'pop', val: 'P0,P1', msg: 'Compare P0 & P1 -> keep candidate' },
                { op: 'pop', val: 'P2,P3', msg: 'Compare till 1 remains' },
                { op: 'done', val: 'Found Celebrity', msg: 'Final candidate is the celebrity!' }
            ]
        }
    ];

    const playAnimation = async (problem) => {
        if (animating) return;
        setActiveProblemId(problem.id);
        setAnimating(true);
        setVisualStack([]);
        setCurrentStepIdx(-1);
        setCurrentStatus('');

        for (let i = 0; i < problem.steps.length; i++) {
            setCurrentStepIdx(i);
            const step = problem.steps[i];
            setCurrentStatus(step.msg);

            if (step.op === 'push') {
                setVisualStack(prev => [{ id: Math.random(), val: step.val }, ...prev]);
            } else if (step.op === 'pop') {
                setVisualStack(prev => prev.slice(1));
            } else if (step.op === 'highlight') {
                // Just flash
            }

            await new Promise(r => setTimeout(r, 800));
        }

        setAnimating(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Practice Problems – Test Your Understanding</h2>
                <p style={styles.intro}>
                    Solve these stack problems step by step. Watch the animated solution after trying yourself!
                </p>
            </div>

            <div style={styles.problemGrid}>
                {problems.map((p) => (
                    <div key={p.id} style={styles.card}>
                        <h4 style={styles.problemTitle}>{p.id}. {p.title}</h4>
                        <p style={styles.desc}>{p.problem}</p>
                        <div style={styles.ioBox}>
                            <div><strong>Input:</strong> {p.input}</div>
                            <div><strong>Output:</strong> {p.output}</div>
                        </div>

                        <button
                            onClick={() => playAnimation(p)}
                            style={styles.actionBtn}
                            disabled={animating}
                        >
                            {activeProblemId === p.id && animating ? "Animating..." : "Show Animated Solution"}
                        </button>

                        {activeProblemId === p.id && (
                            <div style={styles.visualizerArea}>
                                <div style={styles.statusLine}>{currentStatus}</div>
                                <div style={styles.stackFrame}>
                                    <div style={styles.stackLabel}>STACK</div>
                                    <div style={styles.stackColumn}>
                                        <AnimatePresence>
                                            {visualStack.map((item, idx) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ y: -50, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1, backgroundColor: idx === 0 ? '#4f46e5' : '#fff', color: idx === 0 ? '#fff' : '#1e293b' }}
                                                    exit={{ x: 50, opacity: 0 }}
                                                    style={styles.stackItem}
                                                >
                                                    {item.val}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {visualStack.length === 0 && !animating && <div style={styles.doneMsg}>Solution Complete!</div>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.finalNote}>
                <p>Want more clarity or want to code these yourself? Go and practice in the **Coding Practice** section!</p>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', marginTop: '4rem' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', marginTop: '10px' },
    problemGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column'
    },
    problemTitle: { margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.2rem', fontWeight: '800' },
    desc: { color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' },
    ioBox: {
        backgroundColor: '#f8fafc',
        padding: '1rem',
        borderRadius: '12px',
        fontSize: '0.85rem',
        color: '#475569',
        marginBottom: '1.5rem',
        border: '1px solid #f1f5f9'
    },
    actionBtn: {
        padding: '12px',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(79,70,229,0.3)',
        transition: 'all 0.2s',
        minHeight: '44px'
    },
    visualizerArea: {
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '16px',
        animation: 'fadeIn 0.3s ease'
    },
    statusLine: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#4f46e5',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    stackFrame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    stackLabel: { fontSize: '0.6rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '8px' },
    stackColumn: {
        width: '100%',
        maxWidth: '200px',
        minHeight: '150px',
        backgroundColor: '#fff',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '8px',
        gap: '6px'
    },
    stackItem: {
        padding: '8px',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #f1f5f9'
    },
    doneMsg: { textAlign: 'center', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' },
    finalNote: {
        marginTop: '5rem',
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: '#eef2ff',
        borderRadius: '32px',
        color: '#4338ca',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    }
};

export default StacksPracticeProblems;
