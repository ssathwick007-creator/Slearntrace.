import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TicketCounterQueue = () => {
    const [queue, setQueue] = useState([]);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');

    const MAX_QUEUE_SIZE = 10;
    const people = [
        { icon: '👦', name: 'Alex' },
        { icon: '👧', name: 'Bella' },
        { icon: '👨', name: 'Chris' },
        { icon: '👩', name: 'Diana' },
        { icon: '👴', name: 'Evan' },
        { icon: '👵', name: 'Fiona' },
        { icon: '👱', name: 'Gabe' },
        { icon: '👸', name: 'Hana' },
        { icon: '👮', name: 'Ian' },
        { icon: '👷', name: 'Jack' }
    ];

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // Enqueue people
                if (queue.length < 3) {
                    const nextPerson = people[queue.length];
                    const newEntry = { id: Date.now(), ...nextPerson };
                    setQueue(prev => [...prev, newEntry]);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Dequeue front person
                if (queue.length > 0) {
                    setQueue(prev => prev.slice(1));
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Underflow
                setError('Underflow! No one in line');
                setAnimationStep(3);
            } else if (animationStep === 3) {
                // Overflow
                setError(null);
                const fullQueue = Array.from({ length: 10 }, (_, i) => ({
                    id: i,
                    ...people[i]
                }));
                setQueue(fullQueue);
                setTimeout(() => {
                    setError('Overflow! Queue full');
                    setTimeout(() => {
                        setError(null);
                        setQueue([]);
                        setAnimationStep(0);
                    }, 2000);
                }, 800);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, queue.length]);

    const enqueue = () => {
        setIsAutoPlaying(false);
        if (queue.length >= MAX_QUEUE_SIZE) {
            setError('Queue full! Overflow');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const nextPerson = people[Math.floor(Math.random() * people.length)];
        const newEntry = { id: Date.now(), ...nextPerson };
        setQueue([...queue, newEntry]);
        setError(null);
    };

    const dequeue = () => {
        setIsAutoPlaying(false);
        if (queue.length === 0) {
            setError('No one in line! Underflow');
            setTimeout(() => setError(null), 2000);
            return;
        }
        setQueue(queue.slice(1));
        setError(null);
    };

    const emptyQueue = () => {
        setIsAutoPlaying(false);
        setQueue([]);
        setError(null);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "3 people join (A, B, C) → who is served first?",
            a: "Person A! Queues are FIFO (First In, First Out). The first one to join is the first one served.",
            options: ["Person A", "Person B", "Person C", "No one"]
        },
        {
            id: 2,
            q: "Serve twice in a queue [Alex, Bella, Chris] → who is now at the front?",
            a: "Chris! Alex is served 1st, Bella 2nd, leaving Chris at the front.",
            options: ["Alex", "Bella", "Chris", "Empty"]
        },
        {
            id: 3,
            q: "Fill queue with 10 people → try join 11th → what happens?",
            a: "Overflow! A fixed-size queue cannot accept new entries once it's full.",
            options: ["Successful", "Underflow", "Overflow", "App crashes"]
        },
        {
            id: 4,
            q: "Why is queue perfect for printer job queue or BFS traversal?",
            a: "Because it ensures tasks or nodes are processed in the EXACT order they were received.",
            options: ["Memory saving", "FIFO order", "LIFO order", "It's faster"]
        },
        {
            id: 5,
            q: "Compare: dequeue from queue vs pop from stack — which removes the OLDEST item?",
            a: "Dequeue! It removes from the front (oldest), while pop removes from the top (newest).",
            options: ["Dequeue", "Pop", "Both", "Neither"]
        }
    ];

    const codeSnippets = {
        python: `from collections import deque

queue = deque()
queue.append("Person A")   # enqueue (add to back)
queue.append("Person B")
first = queue.popleft()    # dequeue (remove from front)

# Overflow check
if len(queue) >= max_size:
    print("Queue Overflow")`,
        cpp: `#include <queue>
std::queue<string> q;

q.push("Person A");   // enqueue
q.push("Person B");
string front = q.front();
q.pop();              // dequeue (void in C++)

// Overflow check
if (q.size() >= max_size) {
    // throw overflow
}`,
        java: `import java.util.LinkedList;
import java.util.Queue;

Queue<String> queue = new LinkedList<>();
queue.add("Person A");    // enqueue
queue.add("Person B");
String front = queue.poll(); // dequeue

// Overflow check
if (queue.size() >= maxSize) {
    // throw overflow
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Queues – Ticket Counter Queue</h2>
                <p style={styles.intro}>
                    Queues are like people standing in line at a ticket counter — first person to join is the first to get served (First In, First Out)!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.counterArea}>
                    {/* Ticket Window */}
                    <div style={styles.ticketWindow}>
                        <div style={styles.windowFrame}>
                            <div style={styles.windowGlass}>
                                <span style={{ fontSize: '2rem' }}>🎟️</span>
                                <div style={styles.clerk}>💁</div>
                            </div>
                        </div>
                        <div style={styles.counterBase}>TICKETS</div>
                    </div>

                    {/* Queue Line */}
                    <div style={styles.queueLine}>
                        <AnimatePresence>
                            {queue.map((person, idx) => (
                                <motion.div
                                    key={person.id}
                                    layout
                                    initial={{ x: 500, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -200, opacity: 0, y: -50 }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                    style={{
                                        ...styles.person,
                                        zIndex: MAX_QUEUE_SIZE - idx
                                    }}
                                >
                                    <div style={styles.avatar}>{person.icon}</div>
                                    <div style={styles.nameTag}>{person.name}</div>
                                    {idx === 0 && <div style={styles.frontBadge}>FRONT</div>}
                                    {idx === queue.length - 1 && <div style={styles.backBadge}>BACK</div>}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={styles.errorBanner}
                        >
                            {error.includes('Underflow') ? '😢' : '⚠️'} {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <button onClick={enqueue} style={styles.btnPrimary}>Join queue (Enqueue)</button>
                    <button onClick={dequeue} style={styles.btnPrimary}>Serve next (Dequeue)</button>
                    <button onClick={emptyQueue} style={styles.btnSecondary}>Empty queue</button>
                </div>
            </div>

            <div style={styles.realtimeViz}>
                <h4 style={styles.vizTitle}>Real-time Queue (FIFO Order)</h4>
                <div style={styles.vizLine}>
                    {queue.length === 0 && <div style={styles.emptyMsg}>Queue is Empty</div>}
                    <div style={styles.nodesWrapper}>
                        {queue.map((p, i) => (
                            <motion.div
                                key={p.id}
                                layout
                                style={{
                                    ...styles.vizNode,
                                    borderBottom: i === 0 ? '4px solid #10b981' : '1px solid #e2e8f0'
                                }}
                            >
                                <span style={styles.vizEmoji}>{p.icon}</span>
                                <span style={styles.vizName}>{p.name}</span>
                                {i === 0 && <span style={styles.nodeLabel}>FRONT</span>}
                                {i === queue.length - 1 && i !== 0 && <span style={styles.nodeLabel}>BACK</span>}
                            </motion.div>
                        ))}
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
                    <h3 style={styles.codeTitle}>Queue Operations</h3>
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
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px' },
    visualCard: {
        backgroundColor: '#f1f5f9',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
    },
    counterArea: {
        height: '300px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
    },
    ticketWindow: {
        width: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 20
    },
    windowFrame: {
        width: '100px',
        height: '120px',
        border: '6px solid #475569',
        borderRadius: '12px 12px 0 0',
        backgroundColor: '#cbd5e1',
        position: 'relative'
    },
    windowGlass: {
        width: '100%',
        height: '80%',
        backgroundColor: '#94a3b8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    clerk: { fontSize: '1.5rem' },
    counterBase: {
        width: '120px',
        height: '30px',
        backgroundColor: '#1e293b',
        color: 'white',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px'
    },
    queueLine: {
        flex: 1,
        display: 'flex',
        gap: '15px',
        alignItems: 'flex-end',
        paddingBottom: '10px',
        minWidth: '600px'
    },
    person: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        position: 'relative'
    },
    avatar: {
        fontSize: '3rem',
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
    },
    nameTag: {
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: '#475569',
        backgroundColor: 'white',
        padding: '2px 8px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0'
    },
    frontBadge: {
        position: 'absolute',
        top: '-20px',
        backgroundColor: '#10b981',
        color: 'white',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '4px'
    },
    backBadge: {
        position: 'absolute',
        top: '-20px',
        backgroundColor: '#3b82f6',
        color: 'white',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '4px'
    },
    errorBanner: {
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        padding: '10px 20px',
        borderRadius: '12px',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid #fca5a5',
        zIndex: 50
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' },
    btnPrimary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(79, 70, 229, 0.3)' },
    btnSecondary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    realtimeViz: {
        marginBottom: '3rem',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '24px',
        border: '1px solid #e2e8f0'
    },
    vizTitle: { margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'center' },
    vizLine: {
        overflowX: 'auto',
        padding: '10px 0'
    },
    nodesWrapper: {
        display: 'flex',
        gap: '4px'
    },
    vizNode: {
        minWidth: '100px',
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        position: 'relative'
    },
    vizEmoji: { fontSize: '1.2rem' },
    vizName: { fontSize: '0.8rem', fontWeight: 'bold', color: '#1e293b' },
    nodeLabel: { fontSize: '0.6rem', fontWeight: '900', color: '#94a3b8' },
    emptyMsg: { textAlign: 'center', color: '#94a3b8', padding: '20px' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem', fontWeight: '600' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.85rem' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '12px', color: '#15803d', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#a5b4fc', overflowX: 'auto' }
};

export default TicketCounterQueue;
