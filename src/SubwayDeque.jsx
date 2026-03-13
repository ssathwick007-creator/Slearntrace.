import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SubwayDeque = () => {
    const [line, setLine] = useState([]);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [demoLabel, setDemoLabel] = useState('');

    const MAX_CAPACITY = 10;
    const characters = ['👨‍💼', '👩‍🎓', '👨‍🎨', '👩‍🔬', '👨‍🚀', '👩‍🚒', '👨‍🔧', '👩‍🍳', '👨‍🌾', '👩‍💻'];

    // Auto-play logic (8-12 seconds cycle)
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // Joins from right (enqueue back)
                if (line.length < 3) {
                    handleJoinBack(true);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Serve from left (dequeue front)
                if (line.length > 1) {
                    handleLeaveFront(true);
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Demonstrate flexibility
                setDemoLabel('Add/remove from BOTH ends — O(1)!');
                setTimeout(() => {
                    handleJoinFront(true); // Someone joins from left
                    setTimeout(() => {
                        handleLeaveBack(true); // Someone leaves from right
                        setTimeout(() => {
                            setDemoLabel('');
                            setAnimationStep(3);
                        }, 2000);
                    }, 2000);
                }, 1000);
            } else if (animationStep === 3) {
                // Reset cycle
                setTimeout(() => {
                    handleClearLine();
                    setAnimationStep(0);
                }, 2000);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, line.length]);

    const handleJoinBack = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (line.length >= MAX_CAPACITY) {
            setError('Line capacity reached! (Overflow)');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const newPerson = {
            id: Date.now() + Math.random(),
            icon: characters[Math.floor(Math.random() * characters.length)]
        };
        setLine(prev => [...prev, newPerson]);
        setError(null);
    };

    const handleJoinFront = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (line.length >= MAX_CAPACITY) {
            setError('Line capacity reached! (Overflow)');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const newPerson = {
            id: Date.now() + Math.random(),
            icon: characters[Math.floor(Math.random() * characters.length)]
        };
        setLine(prev => [newPerson, ...prev]);
        setError(null);
    };

    const handleLeaveFront = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (line.length === 0) {
            setError('Line is empty! (Underflow)');
            setTimeout(() => setError(null), 2000);
            return;
        }
        setLine(prev => prev.slice(1));
        setError(null);
    };

    const handleLeaveBack = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (line.length === 0) {
            setError('Line is empty! (Underflow)');
            setTimeout(() => setError(null), 2000);
            return;
        }
        setLine(prev => prev.slice(0, -1));
        setError(null);
    };

    const handleClearLine = () => {
        setIsAutoPlaying(false);
        setLine([]);
        setError(null);
        setAnimationStep(0);
        setDemoLabel('');
    };

    const questions = [
        {
            id: 1,
            q: "Join A at back, B at front → what is now at front and back?",
            a: "B is at the front, A is at the back! B was added to the beginning, A to the end.",
            options: ["A-Front, B-Back", "B-Front, A-Back", "Both at Back", "Both at Front"]
        },
        {
            id: 2,
            q: "Leave from front twice in line [1, 2, 3, 4] → who is left?",
            a: "[3, 4] remain! Removing from the front twice removes the first and second elements.",
            options: ["[1, 2]", "[3, 4]", "[2, 3]", "[1, 4]"]
        },
        {
            id: 3,
            q: "Why is deque useful for implementing sliding window maximum?",
            a: "It allows us to store indices and efficiently remove from both ends to maintain the window property in O(n) total time.",
            options: ["Better sorting", "Both ends O(1)", "Uses less memory", "It's simpler"]
        },
        {
            id: 4,
            q: "Compare: deque vs normal queue — when do you need both ends?",
            a: "Deques are needed when you need to insert/delete at both ends, like in task stealing algorithms or undo/redo stacks with limits.",
            options: ["Always better", "Multi-end tasks", "For small data", "Only for stacks"]
        },
        {
            id: 5,
            q: "How can you implement a stack using a deque?",
            a: "By restricting operations to only one end (e.g., only use pushBack and popBack).",
            options: ["Use both ends", "One end only", "Use middle", "Impossible"]
        }
    ];

    const codeSnippets = {
        python: `from collections import deque

dq = deque()
dq.append("A")          # enqueue rear
dq.appendleft("B")      # push front
front = dq.popleft()    # dequeue front
back = dq.pop()         # pop back`,
        cpp: `#include <deque>
#include <string>

std::deque<std::string> dq;
dq.push_back("A");   // enqueue rear
dq.push_front("B");  // push front

std::string front = dq.front();
dq.pop_front();      // dequeue front

std::string back = dq.back();
dq.pop_back();       // pop back`,
        java: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<String> dq = new ArrayDeque<>();
dq.addLast("A");      // enqueue rear
dq.addFirst("B");     // push front

String front = dq.removeFirst(); // dequeue front
String back = dq.removeLast();  // pop back`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Double-Ended Queue (Deque) – Subway Turnstile Line</h2>
                <p style={styles.intro}>
                    A deque (double-ended queue) is like a subway turnstile line — people can join OR leave from either end. Super flexible for many real-world uses!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.subwayArea}>
                    {/* Turnstiles */}
                    <div style={styles.turnstileLeft}>
                        <div style={styles.turnstileLabel}>FRONT / EXIT</div>
                        <div style={styles.turnstileIcon}>🚪</div>
                    </div>

                    {/* Waiting Line */}
                    <div style={styles.lineArea}>
                        <AnimatePresence>
                            {line.map((person, idx) => (
                                <motion.div
                                    key={person.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.5, x: idx === 0 ? -100 : 100 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0, y: 50 }}
                                    style={styles.person}
                                >
                                    <span style={styles.personIcon}>{person.icon}</span>
                                    {idx === 0 && <span style={styles.labelFront}>FRONT</span>}
                                    {idx === line.length - 1 && <span style={styles.labelBack}>BACK</span>}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {line.length === 0 && <div style={styles.emptyLine}>Wait for commuters...</div>}
                    </div>

                    <div style={styles.turnstileRight}>
                        <div style={styles.turnstileLabel}>BACK / ENTRANCE</div>
                        <div style={styles.turnstileIcon}>🚪</div>
                    </div>

                    {demoLabel && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={styles.demoLabel}
                        >
                            {demoLabel}
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={styles.errorText}
                        >
                            {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <div style={styles.controlGroup}>
                        <div style={styles.controlLabel}>FRONT (Left)</div>
                        <div style={styles.buttonRow}>
                            <button onClick={() => handleJoinFront()} style={styles.btnAction} disabled={line.length >= MAX_CAPACITY}>Push Front</button>
                            <button onClick={() => handleLeaveFront()} style={styles.btnAction} disabled={line.length === 0}>Pop Front</button>
                        </div>
                    </div>
                    <div style={styles.controlGroup}>
                        <div style={styles.controlLabel}>BACK (Right)</div>
                        <div style={styles.buttonRow}>
                            <button onClick={() => handleJoinBack()} style={styles.btnAction} disabled={line.length >= MAX_CAPACITY}>Push Back</button>
                            <button onClick={() => handleLeaveBack()} style={styles.btnAction} disabled={line.length === 0}>Pop Back</button>
                        </div>
                    </div>
                    <button onClick={handleClearLine} style={styles.btnSecondary}>Clear Line</button>
                </div>
            </div>

            <div style={styles.monitorSection}>
                <h4 style={styles.sectionTitle}>Commuter Line Monitor</h4>
                <div style={styles.monitorStrip}>
                    <div style={styles.endAnchor}>FRONT</div>
                    {line.map((person, i) => (
                        <div key={person.id} style={styles.monitorNode}>
                            <span style={styles.monitorIcon}>{person.icon}</span>
                            <span style={styles.monitorIndex}>{i}</span>
                        </div>
                    ))}
                    {line.length === 0 && <div style={styles.monitorEmpty}>Station is quiet</div>}
                    <div style={styles.endAnchor}>BACK</div>
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
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.answerText}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3>Implementation</h3>
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
    title: { fontSize: '2rem', fontWeight: '900', color: '#111827' },
    intro: { color: '#4b5563', fontSize: '1.1rem', marginTop: '10px', maxWidth: '800px', margin: '10px auto', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#f9fafb',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e5e7eb',
        marginBottom: '3rem',
        position: 'relative'
    },
    subwayArea: {
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #f3f4f6',
        overflow: 'hidden'
    },
    turnstileLeft: { textAlign: 'center', width: '80px' },
    turnstileRight: { textAlign: 'center', width: '80px' },
    turnstileLabel: { fontSize: '0.6rem', fontWeight: 'bold', color: '#9ca3af', marginBottom: '5px' },
    turnstileIcon: { fontSize: '2.5rem' },
    lineArea: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        position: 'relative',
        minWidth: '0'
    },
    person: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    personIcon: { fontSize: '2.5rem' },
    labelFront: { position: 'absolute', top: '-25px', color: '#10b981', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '1px' },
    labelBack: { position: 'absolute', top: '-25px', color: '#f59e0b', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '1px' },
    emptyLine: { color: '#d1d5db', fontStyle: 'italic', fontSize: '0.9rem' },
    demoLabel: {
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 10
    },
    errorText: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ef4444',
        fontWeight: 'bold',
        fontSize: '0.85rem'
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' },
    controlGroup: { textAlign: 'center' },
    controlLabel: { fontSize: '0.7rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '10px', textTransform: 'uppercase' },
    buttonRow: { display: 'flex', gap: '8px' },
    btnAction: { border: 'none', padding: '10px 16px', backgroundColor: '#374151', color: 'white', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' },
    btnSecondary: { border: '1px solid #d1d5db', padding: '10px 16px', backgroundColor: '#fff', color: '#374151', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', alignSelf: 'flex-end' },
    monitorSection: { marginBottom: '3rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb' },
    sectionTitle: { margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px' },
    monitorStrip: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
    endAnchor: { fontSize: '0.6rem', color: '#d1d5db', fontWeight: 'bold' },
    monitorNode: { width: '50px', height: '60px', backgroundColor: '#f9fafb', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #f3f4f6' },
    monitorIcon: { fontSize: '1.2rem' },
    monitorIndex: { fontSize: '0.6rem', color: '#9ca3af', fontWeight: 'bold' },
    monitorEmpty: { color: '#d1d5db', fontStyle: 'italic', fontSize: '0.85rem' },
    quizSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e5e7eb' },
    questionText: { fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' },
    optionsFlex: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', cursor: 'pointer', fontSize: '0.8rem' },
    answerText: { marginTop: '1.2rem', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '12px', color: '#065f46', fontSize: '0.85rem', lineHeight: '1.5' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2.5rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' },
    codeBlock: { backgroundColor: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', overflowX: 'auto', fontSize: '0.85rem', color: '#e0e7ff', lineHeight: '1.6' }
};

export default SubwayDeque;
