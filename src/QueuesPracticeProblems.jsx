import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QueuesPracticeProblems = () => {
    const [activeProblemId, setActiveProblemId] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [currentStepIdx, setCurrentStepIdx] = useState(-1);
    const [visualQueue, setVisualQueue] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('');

    const problems = [
        {
            id: 1,
            title: "Implement basic queue using array",
            problem: "Enqueue 1, 2, 3, then dequeue once. What is at the front?",
            input: "Enqueue(1), Enqueue(2), Enqueue(3), Dequeue()",
            output: "Front: 2",
            steps: [
                { op: 'enqueue', val: '1', msg: 'Enqueue 1' },
                { op: 'enqueue', val: '2', msg: 'Enqueue 2' },
                { op: 'enqueue', val: '3', msg: 'Enqueue 3' },
                { op: 'dequeue', val: '1', msg: 'Dequeue 1 (Remove from front)' },
                { op: 'highlight', val: '2', msg: 'Front is now 2' }
            ]
        },
        {
            id: 2,
            title: "Reverse first k elements of queue",
            problem: "Reverse first 3 elements of [1, 2, 3, 4, 5].",
            input: "[1, 2, 3, 4, 5], k=3",
            output: "[3, 2, 1, 4, 5]",
            steps: [
                { op: 'init', val: [1, 2, 3, 4, 5], msg: 'Initial queue' },
                { op: 'highlight', val: '1,2,3', msg: 'Extract first 3 to stack' },
                { op: 'update', val: [3, 2, 1, 4, 5], msg: 'Push back from stack to reverse' }
            ]
        },
        {
            id: 3,
            title: "Generate binary numbers 1 to n",
            problem: "Generate binary numbers from 1 to 3 using a queue.",
            input: "n=3",
            output: "1, 10, 11",
            steps: [
                { op: 'enqueue', val: '1', msg: 'Start with 1' },
                { op: 'dequeue', val: '1', msg: 'Process 1. Append 0 and 1.' },
                { op: 'enqueue', val: '10', msg: 'Enqueue 10' },
                { op: 'enqueue', val: '11', msg: 'Enqueue 11' },
                { op: 'done', val: '1, 10, 11', msg: 'Binary sequence generated!' }
            ]
        },
        {
            id: 4,
            title: "First non-repeating character",
            problem: "Find first non-repeating in 'aabcb'.",
            input: "'aabcb'",
            output: "'c'",
            steps: [
                { op: 'enqueue', val: 'a', msg: 'Found a' },
                { op: 'enqueue', val: 'a', msg: 'Found a (Repeating!)' },
                { op: 'dequeue', val: 'a', msg: 'Remove a' },
                { op: 'enqueue', val: 'b', msg: 'Found b' },
                { op: 'enqueue', val: 'c', msg: 'Found c' },
                { op: 'highlight', val: 'b', msg: 'b is first non-repeating' }
            ]
        },
        {
            id: 5,
            title: "Implement queue using two stacks",
            problem: "Enqueue 1, 2, then Dequeue.",
            input: "Enq(1), Enq(2), Deq()",
            output: "1",
            steps: [
                { op: 'enqueue', val: '1', msg: 'Stack1: [1]' },
                { op: 'enqueue', val: '2', msg: 'Stack1: [1, 2]' },
                { op: 'dequeue', val: '1', msg: 'Move S1 to S2, then Pop from S2: 1' }
            ]
        },
        {
            id: 6,
            title: "Check if queue is palindrome",
            problem: "Check if [1, 2, 2, 1] is palindrome.",
            input: "[1, 2, 2, 1]",
            output: "True",
            steps: [
                { op: 'init', val: [1, 2, 2, 1], msg: 'Queue: [1,2,2,1]' },
                { op: 'compare', val: '1=1', msg: 'Front 1 matches Back 1' },
                { op: 'compare', val: '2=2', msg: 'Middle 2 matches Middle 2' },
                { op: 'done', val: 'Palindrome', msg: 'Queue is a palindrome!' }
            ]
        },
        {
            id: 7,
            title: "Circular tour (Gas Station)",
            problem: "Find starting gas station to complete loop.",
            input: "4 stations",
            output: "Index 3",
            steps: [
                { op: 'try', val: '0', msg: 'Start 0: Stuck' },
                { op: 'try', val: '1', msg: 'Start 1: Stuck' },
                { op: 'try', val: '3', msg: 'Start 3: Sufficient gas!' },
                { op: 'done', val: 'Success', msg: 'Loop completed from index 3' }
            ]
        },
        {
            id: 8,
            title: "Rotten oranges (BFS)",
            problem: "Time to rot all oranges in a grid.",
            input: "Grid 3x3",
            output: "4 Minutes",
            steps: [
                { op: 'enqueue', val: 'R(0,0)', msg: 'Day 0: Initial rotten' },
                { op: 'enqueue', val: 'R(0,1)', msg: 'Day 1: neighbors rot' },
                { op: 'enqueue', val: 'R(1,1)', msg: 'Day 2: spreading' },
                { op: 'done', val: '4 mins', msg: 'All oranges rotten!' }
            ]
        },
        {
            id: 9,
            title: "Implement deque using DLL",
            problem: "Insert at front and rear.",
            input: "addFront(1), addRear(2)",
            output: "[1, 2]",
            steps: [
                { op: 'enqueue', val: '1', msg: 'Head <-> 1 <-> Tail' },
                { op: 'enqueue', val: '2', msg: 'Head <-> 1 <-> 2 <-> Tail' },
                { op: 'done', val: '[1, 2]', msg: 'DLL Deque formed' }
            ]
        },
        {
            id: 10,
            title: "LRU Cache using queue",
            problem: "Recently used elements move to rear.",
            input: "Access(1), Access(2)",
            output: "Rear: 2",
            steps: [
                { op: 'enqueue', val: '1', msg: 'Cache: [1]' },
                { op: 'enqueue', val: '2', msg: 'Cache: [1, 2]' },
                { op: 'init', val: [2, 1], msg: 'Access 1: move to rear' },
                { op: 'done', val: '[2, 1]', msg: '1 is now MRU' }
            ]
        },
        {
            id: 11,
            title: "Sliding window max using deque",
            problem: "Find max in window size 3 for [1, 3, -1, -3, 5].",
            input: "[1, 3, -1, -3, 5], k=3",
            output: "[3, 3, 5]",
            steps: [
                { op: 'init', val: [1, 3, -1], msg: 'Window 1: Max is 3' },
                { op: 'init', val: [3, -1, -3], msg: 'Window 2: Max is 3' },
                { op: 'init', val: [-1, -3, 5], msg: 'Window 3: Max is 5' }
            ]
        },
        {
            id: 12,
            title: "Design bounded blocking queue",
            problem: "Producer-Consumer with capacity 2.",
            input: "Put(1), Put(2), Put(3)",
            output: "Wait(3)",
            steps: [
                { op: 'enqueue', val: '1', msg: 'Placed 1' },
                { op: 'enqueue', val: '2', msg: 'Placed 2 (Full!)' },
                { op: 'highlight', val: '3', msg: 'Put(3) blocks - queue is full' }
            ]
        }
    ];

    const playAnimation = async (problem) => {
        if (animating) return;
        setActiveProblemId(problem.id);
        setAnimating(true);
        setVisualQueue([]);
        setCurrentStepIdx(-1);
        setCurrentStatus('');

        for (let i = 0; i < problem.steps.length; i++) {
            setCurrentStepIdx(i);
            const step = problem.steps[i];
            setCurrentStatus(step.msg);

            if (step.op === 'enqueue' || step.op === 'put') {
                setVisualQueue(prev => [...prev, { id: Math.random(), val: step.val }]);
            } else if (step.op === 'dequeue') {
                setVisualQueue(prev => prev.slice(1));
            } else if (step.op === 'init' || step.op === 'update') {
                setVisualQueue(step.val.map(v => ({ id: Math.random(), val: v })));
            }

            await new Promise(r => setTimeout(r, 1000));
        }

        setAnimating(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Practice Problems – Test Your Understanding</h2>
                <p style={styles.intro}>
                    Solve these queue problems step by step. Watch the animated solution after trying yourself!
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
                                <div style={styles.queueFrame}>
                                    <div style={styles.queueLabel}>FRONT</div>
                                    <div style={styles.queueContainer}>
                                        <AnimatePresence>
                                            {visualQueue.map((item, idx) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ x: 50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1, backgroundColor: idx === 0 ? '#6366f1' : '#fff', color: idx === 0 ? '#fff' : '#1e293b' }}
                                                    exit={{ x: -100, opacity: 0 }}
                                                    style={styles.queueItem}
                                                >
                                                    {item.val}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {visualQueue.length === 0 && !animating && <div style={styles.doneMsg}>Done!</div>}
                                    </div>
                                    <div style={styles.queueLabel}>REAR</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.finalNote}>
                <p>Want more clarity or want to code these yourself? Go and practice in the <strong>Coding Practice</strong> section!</p>
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
        backgroundColor: '#6366f1',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(99,102,241,0.3)',
        transition: 'all 0.2s',
        minHeight: '44px'
    },
    visualizerArea: {
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '16px',
    },
    statusLine: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#6366f1',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    queueFrame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    queueLabel: { fontSize: '0.6rem', fontWeight: 'bold', color: '#94a3b8', margin: '5px' },
    queueContainer: {
        width: '100%',
        minHeight: '60px',
        backgroundColor: '#fff',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        gap: '6px',
        overflow: 'hidden'
    },
    queueItem: {
        minWidth: '40px',
        height: '40px',
        padding: '0 10px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #f1f5f9'
    },
    doneMsg: { textAlign: 'center', width: '100%', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' },
    finalNote: {
        marginTop: '5rem',
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: '#f5f3ff',
        borderRadius: '32px',
        color: '#5b21b6',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    }
};

export default QueuesPracticeProblems;
