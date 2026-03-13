import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CafeteriaPlateTower = () => {
    const [plates, setPlates] = useState([]);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');

    const MAX_PLATES = 10;
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // Push new plates
                if (plates.length < 3) {
                    const newPlate = { id: Date.now(), color: colors[plates.length % colors.length], value: String.fromCharCode(65 + plates.length) };
                    setPlates(prev => [newPlate, ...prev]);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Pop top plate
                if (plates.length > 0) {
                    setPlates(prev => prev.slice(1));
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Underflow
                setError('Underflow! No plates left');
                setAnimationStep(3);
            } else if (animationStep === 3) {
                // Overflow
                setError(null);
                const fullStack = Array.from({ length: 10 }, (_, i) => ({
                    id: i,
                    color: colors[i % colors.length],
                    value: String.fromCharCode(65 + i)
                }));
                setPlates(fullStack);
                setTimeout(() => {
                    setError('Overflow! Tower full');
                    setTimeout(() => {
                        setError(null);
                        setPlates([]);
                        setAnimationStep(0);
                    }, 1500);
                }, 800);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, plates.length]);

    const pushPlate = () => {
        setIsAutoPlaying(false);
        if (plates.length >= MAX_PLATES) {
            setError('Overflow! Tower full');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const newPlate = { id: Date.now(), color: colors[plates.length % colors.length], value: String.fromCharCode(65 + plates.length) };
        setPlates([newPlate, ...plates]);
        setError(null);
    };

    const popPlate = () => {
        setIsAutoPlaying(false);
        if (plates.length === 0) {
            setError('Underflow! No plates left');
            setTimeout(() => setError(null), 2000);
            return;
        }
        setPlates(plates.slice(1));
        setError(null);
    };

    const emptyTower = () => {
        setIsAutoPlaying(false);
        setPlates([]);
        setError(null);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Push plates A, B, C → what is on top?",
            a: "Plate C! Stacks are LIFO (Last In, First Out). The last plate added is always on top.",
            options: ["Plate A", "Plate B", "Plate C", "None"]
        },
        {
            id: 2,
            q: "Pop twice → which plate is removed last?",
            a: "Plate B! First pop removes top (C), second pop removes new top (B).",
            options: ["Plate A", "Plate B", "Plate C", "Plate D"]
        },
        {
            id: 3,
            q: "Push 10 plates → try push 11th → what happens?",
            a: "Overflow! The stack has reached its maximum capacity.",
            options: ["It works", "Underflow", "Overflow", "Nothing"]
        },
        {
            id: 4,
            q: "Start empty → pop → what error? Why?",
            a: "Underflow! You cannot remove an item from an empty stack.",
            options: ["Overflow", "Underflow", "EmptyError", "NullPointer"]
        },
        {
            id: 5,
            q: "Why is stack perfect for Undo button in apps?",
            a: "Because you always want to undo the RECENT-most action first (LIFO).",
            options: ["It saves memory", "It's faster", "LIFO property", "It's sorted"]
        }
    ];

    const codeSnippets = {
        python: `stack = []
stack.append("Plate A")   # push
top = stack.pop()         # pop

# Overflow check
if len(stack) >= max_size:
    print("Stack Overflow")`,
        cpp: `#include <stack>
std::stack<string> plates;

plates.push("Plate A"); // push
string top = plates.top();
plates.pop(); // pop (void in C++)

// Overflow check
if (plates.size() >= max_size) {
    // throw overflow
}`,
        java: `import java.util.Stack;
Stack<String> plates = new Stack<>();

plates.push("Plate A"); // push
String top = plates.pop(); // pop

// Overflow check
if (plates.size() >= maxSize) {
    // throw overflow
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Stacks – Cafeteria Plate Tower</h2>
                <p style={styles.intro}>
                    Stacks are like a tower of plates in a cafeteria — you can only add or remove from the top (Last In, First Out)!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.towerArea}>
                    <div style={styles.tray}>
                        <div style={styles.trayBase}></div>
                        <div style={styles.trayStand}></div>
                    </div>

                    <div style={styles.platesContainer}>
                        <AnimatePresence>
                            {plates.map((plate, idx) => (
                                <motion.div
                                    key={plate.id}
                                    layout
                                    initial={{ y: -300, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -300, opacity: 0, x: [0, 50, -50, 0] }}
                                    transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                                    style={{
                                        ...styles.plate,
                                        backgroundColor: plate.color,
                                        zIndex: plates.length - idx,
                                        bottom: (plates.length - 1 - idx) * 15
                                    }}
                                >
                                    <div style={styles.plateInner}>
                                        <span style={styles.plateVal}>{plate.value}</span>
                                        {idx === 0 && <div style={styles.topLabel}>TOP</div>}
                                    </div>
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
                    <button onClick={pushPlate} style={styles.btnPrimary}>Push new plate</button>
                    <button onClick={popPlate} style={styles.btnPrimary}>Pop top plate</button>
                    <button onClick={emptyTower} style={styles.btnSecondary}>Empty tower</button>
                </div>
            </div>

            <div style={styles.stackViz}>
                <h4 style={styles.vizTitle}>Real-time Stack Visualization (LIFO)</h4>
                <div style={styles.vizTower}>
                    {plates.length === 0 && <div style={styles.emptyMsg}>Stack is Empty</div>}
                    {plates.map((p, i) => (
                        <div key={p.id} style={{ ...styles.vizNode, borderLeft: i === 0 ? '4px solid #4f46e5' : '1px solid #e2e8f0' }}>
                            <span style={styles.vizIdx}>[{plates.length - 1 - i}]</span>
                            <span style={styles.vizVal}>{p.value}</span>
                            {i === 0 && <span style={styles.vizArrow}>← TOP</span>}
                        </div>
                    ))}
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
                    <h3 style={styles.codeTitle}>Stack Operations</h3>
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
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        position: 'relative'
    },
    towerArea: {
        height: '350px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '20px'
    },
    tray: {
        position: 'absolute',
        bottom: 0,
        width: '200px',
        zIndex: 1
    },
    trayBase: {
        height: '10px',
        backgroundColor: '#94a3b8',
        borderRadius: '5px'
    },
    trayStand: {
        width: '100px',
        height: '5px',
        backgroundColor: '#cbd5e1',
        margin: '0 auto'
    },
    platesContainer: {
        width: '160px',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center'
    },
    plate: {
        position: 'absolute',
        width: '160px',
        height: '30px',
        borderRadius: '40px / 15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1), inset 0 -4px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(0,0,0,0.1)'
    },
    plateInner: {
        width: '80%',
        height: '60%',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    plateVal: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
    },
    topLabel: {
        position: 'absolute',
        top: '-25px',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontSize: '0.6rem',
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: 'bold'
    },
    errorBanner: {
        position: 'absolute',
        top: '20px',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        padding: '10px 20px',
        borderRadius: '12px',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid #fca5a5',
        zIndex: 10
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' },
    btnPrimary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.1s', boxShadow: '0 4px 6px rgba(249, 115, 22, 0.3)' },
    btnSecondary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    stackViz: {
        marginBottom: '3rem',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '24px',
        border: '1px solid #e2e8f0'
    },
    vizTitle: { margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    vizTower: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    vizNode: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px'
    },
    vizIdx: { color: '#94a3b8', fontSize: '0.8rem', width: '30px' },
    vizVal: { fontWeight: 'bold', color: '#1e293b' },
    vizArrow: { color: '#4f46e5', fontSize: '0.8rem', fontWeight: 'bold' },
    emptyMsg: { textAlign: 'center', color: '#94a3b8', padding: '20px' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' },
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

export default CafeteriaPlateTower;
