import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AirportPriorityQueue = () => {
    const [line, setLine] = useState([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [animationStep, setAnimationStep] = useState(0);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);
    const [activeSecurity, setActiveSecurity] = useState(false);

    const priorities = [
        { level: 1, label: 'Gold (VIP)', icon: '🥇', color: '#fbbf24' },
        { level: 2, label: 'Silver (Business)', icon: '🥈', color: '#94a3b8' },
        { level: 3, label: 'Bronze (Regular)', icon: '🥉', color: '#b45309' }
    ];

    const people = ['👨‍💼', '👩‍💼', '👨‍🚀', '👩‍🔬', '👨‍🎨', '👩‍🎓', '👨‍🔧', '👩‍🍳'];

    // Auto-play logic (10-12 seconds cycle)
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // 0-4s: Normal passengers join
                const p1 = { id: 1, icon: '👨‍💼', priority: priorities[2] };
                const p2 = { id: 2, icon: '👩‍💼', priority: priorities[2] };
                setLine([p1, p2]);
                setTimeout(() => setAnimationStep(1), 2000);
            } else if (animationStep === 1) {
                // 4-8s: VIP passenger arrives and jumps ahead
                const vip = { id: 3, icon: '👑', priority: priorities[0] };
                setLine(prev => {
                    const newLine = [...prev, vip];
                    return newLine.sort((a, b) => a.priority.level - b.priority.level);
                });
                setTimeout(() => setAnimationStep(2), 3000);
            } else if (animationStep === 2) {
                // 8-12s: Server highest priority
                setActiveSecurity(true);
                setTimeout(() => {
                    setLine(prev => prev.slice(1));
                    setActiveSecurity(false);
                    setTimeout(() => {
                        setLine([]);
                        setAnimationStep(0);
                    }, 1500);
                }, 1000);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying]);

    const handleAddPassenger = (priorityLevel) => {
        setIsAutoPlaying(false);
        const priority = priorities.find(p => p.level === priorityLevel);
        const newPassenger = {
            id: Date.now(),
            icon: people[Math.floor(Math.random() * people.length)],
            priority
        };
        setLine(prev => {
            const newLine = [...prev, newPassenger];
            return newLine.sort((a, b) => a.priority.level - b.priority.level);
        });
    };

    const handleServe = () => {
        setIsAutoPlaying(false);
        if (line.length === 0) return;
        setActiveSecurity(true);
        setTimeout(() => {
            setLine(prev => prev.slice(1));
            setActiveSecurity(false);
        }, 1000);
    };

    const handleClear = () => {
        setIsAutoPlaying(false);
        setLine([]);
        setAnimationStep(0);
        setActiveSecurity(false);
    };

    const questions = [
        {
            id: 1,
            q: "Add Low, Medium, High priority passengers → who gets served first?",
            a: "High priority! In a priority queue, elements are removed based on their priority level, not their arrival time.",
            options: ["Low", "Medium", "High", "First to arrive"]
        },
        {
            id: 2,
            q: "Serve twice in a line [Gold, Gold, Bronze] → who is now at the front?",
            a: "Bronze! Both Gold (High) passengers are served before the Bronze (Low) passenger.",
            options: ["Gold", "Silver", "Bronze", "Empty"]
        },
        {
            id: 3,
            q: "Why is a priority queue used in Dijkstra's shortest path algorithm?",
            a: "To always extract the node with the current minimum distance, ensuring we find the shortest path efficiently.",
            options: ["It's faster to code", "Min distance priority", "Uses less memory", "Saves battery"]
        },
        {
            id: 4,
            q: "How is a priority queue different from a normal queue?",
            a: "Normal queues are FIFO (First-In-First-Out). Priority queues are PIPO (Priority-In-Priority-Out).",
            options: ["No difference", "LIFO vs FIFO", "FIFO vs Priority", "Only used in Java"]
        },
        {
            id: 5,
            q: "What data structure usually implements a priority queue for O(log n) performance?",
            a: "A Binary Heap! It allows for efficient insertion and extraction of the highest-priority element.",
            options: ["Linked List", "Array", "Binary Heap", "Hash Map"]
        }
    ];

    const codeSnippets = {
        python: `import heapq

# Python uses a min-heap by default
pq = []

# (priority, value)
heapq.heappush(pq, (3, "Bronze Passenger"))
heapq.heappush(pq, (1, "Gold Passenger")) # 1 is higher priority

# Always pops the lowest priority number
next_p = heapq.heappop(pq)
print(next_p[1]) # Gold Passenger`,
        cpp: `#include <queue>
#include <vector>

std::priority_queue<int> pq;

pq.push(10); // Normal push
pq.push(50); // High priority

// Top is always the highest value by default
int top = pq.top(); 
pq.pop();`,
        java: `import java.util.PriorityQueue;

PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.add(30);
pq.add(10); // Highest priority in min-heap

// Poll returns the head (smallest element)
int head = pq.poll();`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Priority Queue – Airport Security Fast-Track</h2>
                <p style={styles.intro}>
                    Priority queues are like airport security: passengers with fast-track passes (high priority) jump ahead of regular lines — highest priority always goes next!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.airportArea}>
                    {/* Security Gate */}
                    <div style={{
                        ...styles.securityGate,
                        borderColor: activeSecurity ? '#10b981' : '#475569',
                        boxShadow: activeSecurity ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none'
                    }}>
                        <div style={styles.gateLabel}>SECURITY GATE</div>
                        <div style={styles.scannerLine}></div>
                        {activeSecurity && <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} style={styles.scanBeam}>⚡</motion.div>}
                        <div style={styles.gateIcon}>🛂</div>
                    </div>

                    {/* Waiting Area */}
                    <div style={styles.waitingArea}>
                        <div style={styles.laneLabel}>PRIORITY PIPELINE</div>
                        <div style={styles.passengerLine}>
                            <AnimatePresence>
                                {line.map((p, idx) => (
                                    <motion.div
                                        key={p.id}
                                        layout
                                        initial={{ opacity: 0, x: 200, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -100, scale: 0.5 }}
                                        style={{
                                            ...styles.passenger,
                                            backgroundColor: p.priority.color + '15',
                                            border: `2px solid ${p.priority.color}`
                                        }}
                                    >
                                        <div style={styles.pIcon}>{p.icon}</div>
                                        <div style={{ ...styles.pBadge, backgroundColor: p.priority.color }}>
                                            {p.priority.icon} {p.priority.level}
                                        </div>
                                        {idx === 0 && <div style={styles.frontTag}>NEXT</div>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {line.length === 0 && <div style={styles.emptyMsg}>Waiting for passengers...</div>}
                        </div>
                    </div>

                    {/* Check-in */}
                    <div style={styles.checkInArea}>
                        <div style={styles.nodeIcon}>🏢</div>
                        <div style={styles.nodeLabel}>CHECK-IN</div>
                    </div>
                </div>

                <div style={styles.controls}>
                    <div style={styles.btnGroup}>
                        {priorities.map(p => (
                            <button
                                key={p.level}
                                onClick={() => handleAddPassenger(p.level)}
                                style={{ ...styles.btnAdd, backgroundColor: p.color }}
                            >
                                Add {p.label}
                            </button>
                        ))}
                    </div>
                    <div style={styles.btnGroup}>
                        <button onClick={handleServe} style={styles.btnAction} disabled={line.length === 0}>Serve Next</button>
                        <button onClick={handleClear} style={styles.btnSecondary}>Clear Line</button>
                    </div>
                </div>
            </div>

            <div style={styles.monitorSection}>
                <h4 style={styles.monitorTitle}>Security Queue Monitor</h4>
                <div style={styles.monitorContent}>
                    {line.length === 0 ? (
                        <div style={styles.monitorEmpty}>Station Offline</div>
                    ) : (
                        <div style={styles.monitorList}>
                            {line.map((p, i) => (
                                <div key={p.id} style={styles.monitorNode}>
                                    <span style={{ color: p.priority.color }}>{p.priority.icon} {p.priority.level}</span>
                                    <span style={styles.monitorSeparator}>⎯</span>
                                    <span style={styles.monitorPos}>Pos: {i}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div style={styles.quizSection}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.questionText}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.optionsFlex}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.optBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.answerBox}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3 style={styles.codeTitle}>Priority Queue Operations</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#6366f1' : 'transparent',
                                    color: language === lang ? 'white' : '#94a3b8'
                                }}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.codeBlock}>
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
    intro: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
    },
    airportArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '300px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #f1f5f9',
        overflow: 'hidden',
        position: 'relative'
    },
    securityGate: {
        width: '120px',
        height: '180px',
        border: '4px solid',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f8fafc',
        zIndex: 10
    },
    gateLabel: { fontSize: '0.6rem', fontWeight: '900', color: '#64748b', position: 'absolute', top: '10px' },
    scannerLine: { width: '80%', height: '2px', backgroundColor: '#e2e8f0', position: 'absolute', top: '40%' },
    scanBeam: { position: 'absolute', top: '35%', fontSize: '1.5rem' },
    gateIcon: { fontSize: '3rem', marginTop: '20px' },
    waitingArea: {
        flex: 1,
        height: '100%',
        margin: '0 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    laneLabel: { position: 'absolute', top: '10px', fontSize: '0.7rem', fontWeight: 'bold', color: '#cbd5e1', letterSpacing: '1px' },
    passengerLine: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        padding: '20px',
        flexWrap: 'wrap'
    },
    passenger: {
        width: '70px',
        height: '90px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.3s'
    },
    pIcon: { fontSize: '2rem' },
    pBadge: {
        fontSize: '0.6rem',
        color: 'white',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '10px',
        marginTop: '5px'
    },
    frontTag: { position: 'absolute', top: '-25px', color: '#10b981', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px' },
    emptyMsg: { color: '#cbd5e1', fontStyle: 'italic', fontSize: '0.9rem' },
    checkInArea: { textAlign: 'center' },
    nodeIcon: { fontSize: '3rem', color: '#64748b' },
    nodeLabel: { fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', marginTop: '5px' },
    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' },
    btnGroup: { display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' },
    btnAdd: { border: 'none', color: 'white', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' },
    btnAction: { border: 'none', backgroundColor: '#1e293b', color: 'white', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' },
    btnSecondary: { border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#64748b', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer' },
    monitorSection: { marginBottom: '3rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' },
    monitorTitle: { textAlign: 'center', margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' },
    monitorContent: { display: 'flex', justifyContent: 'center' },
    monitorList: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
    monitorNode: { backgroundColor: '#f8fafc', padding: '8px 16px', borderRadius: '10px', border: '1px solid #f1f5f9', fontSize: '0.75rem', fontWeight: 'bold' },
    monitorSeparator: { margin: '0 8px', color: '#e2e8f0' },
    monitorPos: { color: '#94a3b8' },
    monitorEmpty: { color: '#cbd5e1', fontStyle: 'italic' },
    quizSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    questionText: { fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' },
    optionsFlex: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', background: '#f8fafc', cursor: 'pointer', fontSize: '0.8rem' },
    answerBox: { marginTop: '1rem', padding: '10px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '12px', fontSize: '0.85rem', lineHeight: '1.5' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2.5rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' },
    codeBlock: { background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', overflowX: 'auto', fontSize: '0.85rem', color: '#e0e7ff', lineHeight: '1.6' }
};

export default AirportPriorityQueue;
