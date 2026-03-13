import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CallStackDolls = () => {
    const [stack, setStack] = useState([]);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [returnValue, setReturnValue] = useState(null);

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // main() -> factorial(5) -> ... -> factorial(1)
                if (stack.length === 0) {
                    setStack([{ id: 'main', name: 'main()', color: '#dc2626', level: 0 }]);
                } else if (stack.length < 6) {
                    const n = 6 - stack.length;
                    const newCall = {
                        id: `fact${n}`,
                        name: `factorial(${n})`,
                        color: colors[stack.length % colors.length],
                        level: stack.length
                    };
                    setStack(prev => [newCall, ...prev]);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // factorial(1) finishes -> pops off
                if (stack.length > 1) {
                    const n = stack.length - 1;
                    setReturnValue(n === 1 ? 1 : '...');
                    setStack(prev => prev.slice(1));
                } else {
                    setReturnValue(null);
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Push too many nested calls -> Stack Overflow
                if (stack.length < 12) {
                    const newCall = {
                        id: `err${stack.length}`,
                        name: `recursive_call()`,
                        color: '#94a3b8',
                        level: stack.length
                    };
                    setStack(prev => [newCall, ...prev]);
                } else {
                    setError('Stack Overflow! Too many nested calls');
                    setAnimationStep(3);
                }
            } else if (animationStep === 3) {
                setTimeout(() => {
                    setError(null);
                    setStack([]);
                    setAnimationStep(0);
                }, 1500);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, stack.length]);

    const runFactorial = () => {
        setIsAutoPlaying(false);
        setStack([]);
        setError(null);
        setReturnValue(null);

        // Manual sequence for factorial(5)
        let count = 0;
        const mainCall = { id: 'main', name: 'main()', color: colors[0], level: 0 };
        setStack([mainCall]);

        const interval = setInterval(() => {
            count++;
            if (count <= 5) {
                const n = 6 - count;
                const newCall = {
                    id: `fact${n}`,
                    name: `factorial(${n})`,
                    color: colors[count % colors.length],
                    level: count
                };
                setStack(prev => [newCall, ...prev]);
            } else {
                clearInterval(interval);
                // Return phase
                setTimeout(() => {
                    const returnInterval = setInterval(() => {
                        setStack(prev => {
                            if (prev.length <= 1) {
                                clearInterval(returnInterval);
                                return prev;
                            }
                            return prev.slice(1);
                        });
                    }, 600);
                }, 1000);
            }
        }, 600);
    };

    const runOverflow = () => {
        setIsAutoPlaying(false);
        setStack([]);
        setError(null);
        setReturnValue(null);

        let count = 0;
        const interval = setInterval(() => {
            count++;
            if (count <= 15) {
                const newCall = {
                    id: `deep${count}`,
                    name: `nested_call(${count})`,
                    color: '#94a3b8',
                    level: count
                };
                setStack(prev => [newCall, ...prev]);
            } else {
                clearInterval(interval);
                setError('Stack Overflow! Too many nested calls');
                setTimeout(() => setError(null), 3000);
            }
        }, 200);
    };

    const clearStack = () => {
        setIsAutoPlaying(false);
        setStack([]);
        setError(null);
        setReturnValue(null);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Call factorial(3) → how many dolls are pushed before popping starts?",
            a: "4 dolls! (main → factorial(3) → factorial(2) → factorial(1)). The base case must be reached first.",
            options: ["1", "2", "3", "4"]
        },
        {
            id: 2,
            q: "When factorial(1) finishes → which doll pops next?",
            a: "factorial(2)! Stacks are LIFO, so the function that called factorial(1) is the one that resumes.",
            options: ["main()", "factorial(2)", "factorial(1) again", "None"]
        },
        {
            id: 3,
            q: "Why does too many nested calls cause Stack Overflow?",
            a: "The stack has limited memory. Each doll (frame) takes space, and eventually the program runs out of room.",
            options: ["Too much CPU", "Memory limit reached", "Internet error", "Logic error"]
        },
        {
            id: 4,
            q: "In recursion, why must the base case be reached before returning?",
            a: "Without a base case, the function calls itself forever, causing an infinite loop and Stack Overflow.",
            options: ["To save energy", "To stop recursion", "For better speed", "It's optional"]
        },
        {
            id: 5,
            q: "Compare: function call stack vs browser back stack — both LIFO, but different use?",
            a: "Call stack tracks program execution flow (automatic); browser history tracks user navigation (manual).",
            options: ["They are identical", "Both are LIFO", "One is for code, one for URLs", "All of the above"]
        }
    ];

    const codeSnippets = {
        python: `def factorial(n):
    if n == 1:               # base case
        return 1
    return n * factorial(n-1)  # push new frame

# Call stack grows:
# main() -> fact(3) -> fact(2) -> fact(1)`,
        cpp: `int factorial(int n) {
    if (n <= 1) return 1;    // base case
    return n * factorial(n - 1); // push frame
}

// Stack Overflow often throws:
// segmentation fault (core dumped)`,
        java: `public int factorial(int n) {
    if (n == 1) return 1;    // base case
    return n * factorial(n - 1);
}

// Error: java.lang.StackOverflowError`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Function Call Stack – Nested Russian Dolls</h2>
                <p style={styles.intro}>
                    Every time a function calls another, it pushes a new 'doll' onto the stack. When the inner function finishes, its doll pops off — until we return to the main program!
                </p>
            </div>

            <div style={{ ...styles.visualCard, backgroundColor: error ? '#fef2f2' : '#f8fafc' }}>
                <div style={styles.dollArea}>
                    <div style={styles.dollsContainer}>
                        <AnimatePresence>
                            {stack.map((item, idx) => {
                                const size = 280 - (idx * 20);
                                const zIndex = stack.length - idx;
                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ y: 200, opacity: 0, scale: 0.5 }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            scale: 1,
                                            rotateX: error ? [0, 5, -5, 0] : 0,
                                            x: error ? [0, 5, -5, 5, -5, 0] : 0
                                        }}
                                        exit={{ y: 200, opacity: 0, scale: 0.5 }}
                                        style={{
                                            ...styles.doll,
                                            width: size,
                                            height: size * 1.2,
                                            backgroundColor: item.color,
                                            zIndex: zIndex,
                                            bottom: idx * 5,
                                            border: error ? '2px solid #ef4444' : '2px solid rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <div style={styles.dollFace}>
                                            <div style={styles.eyes}><span>•</span><span>•</span></div>
                                            <div style={styles.smile}>◡</div>
                                        </div>
                                        <div style={styles.dollLabel}>
                                            <div style={styles.dollName}>{item.name}</div>
                                            {idx === 0 && !error && (
                                                <div style={styles.activeTag}>CURRENT</div>
                                            )}
                                        </div>

                                        {/* Crack overlay for error */}
                                        {error && idx === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                style={styles.crackOverlay}
                                            >
                                                ⚡ 🪓 ⚡
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {returnValue && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            style={styles.returnBubble}
                        >
                            Return: {returnValue}
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.1, opacity: 1 }}
                            style={styles.errorBanner}
                        >
                            💥 {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <button onClick={runFactorial} style={styles.btnPrimary}>Call factorial(5)</button>
                    <button onClick={runOverflow} style={{ ...styles.btnPrimary, backgroundColor: '#ef4444' }}>Call too deep (15)</button>
                    <button onClick={clearStack} style={styles.btnSecondary}>Clear stack</button>
                </div>
            </div>

            <div style={styles.stackViz}>
                <h4 style={styles.vizTitle}>Real-time Call Stack (Memory)</h4>
                <div style={styles.vizTower}>
                    {stack.length === 0 && <div style={styles.emptyMsg}>Stack is Empty (Standard IDLE)</div>}
                    {stack.map((item, i) => (
                        <div key={item.id} style={{
                            ...styles.vizNode,
                            borderLeft: i === 0 ? '4px solid #4f46e5' : '1px solid #e2e8f0',
                            backgroundColor: i === 0 ? '#eef2ff' : '#f8fafc'
                        }}>
                            <span style={styles.vizIdx}>#{stack.length - 1 - i}</span>
                            <span style={styles.vizVal}>{item.name}</span>
                            {i === 0 && <span style={styles.vizArrow}>← ACTIVE FRAME</span>}
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
                    <h3 style={styles.codeTitle}>Recursive Factorial Implementation</h3>
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
        position: 'relative',
        minHeight: '500px',
        overflow: 'hidden',
        transition: 'background-color 0.3s'
    },
    dollArea: {
        height: '400px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '40px'
    },
    dollsContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        width: '300px',
        height: '100%'
    },
    doll: {
        position: 'absolute',
        borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1), inset 0 -10px 10px rgba(0,0,0,0.1)',
        paddingTop: '20px'
    },
    dollFace: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: '8px',
        borderRadius: '50%',
        width: '40px',
        height: '40px'
    },
    eyes: { display: 'flex', gap: '8px', fontSize: '12px', color: '#334155' },
    smile: { fontSize: '14px', color: '#334155', lineHeight: 1 },
    dollLabel: {
        marginTop: '10px',
        textAlign: 'center'
    },
    dollName: {
        color: 'white',
        fontWeight: '900',
        fontSize: '0.9rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    activeTag: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        color: '#4f46e5',
        fontSize: '0.6rem',
        padding: '2px 4px',
        borderRadius: '4px',
        fontWeight: 'bold',
        marginTop: '4px'
    },
    crackOverlay: {
        position: 'absolute',
        top: '20px',
        fontSize: '2rem',
        color: '#ef4444',
        textShadow: '0 0 10px white'
    },
    returnBubble: {
        position: 'absolute',
        top: '20px',
        right: '40px',
        backgroundColor: '#10b981',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '24px',
        fontWeight: 'bold',
        boxShadow: '0 10px 15px rgba(16, 185, 129, 0.3)'
    },
    errorBanner: {
        position: 'absolute',
        top: '20px',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '16px',
        fontWeight: 'bold',
        boxShadow: '0 20px 25px rgba(239, 68, 68, 0.4)',
        zIndex: 100,
        textAlign: 'center'
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' },
    btnPrimary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.1s', boxShadow: '0 4px 6px rgba(220, 38, 38, 0.3)' },
    btnSecondary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    stackViz: {
        marginBottom: '3rem',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '32px',
        border: '1px solid #e2e8f0'
    },
    vizTitle: { margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' },
    vizTower: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    vizNode: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        borderRadius: '12px',
        transition: 'all 0.2s'
    },
    vizIdx: { color: '#94a3b8', fontSize: '0.8rem', width: '40px' },
    vizVal: { fontWeight: 'bold', color: '#1e293b' },
    vizArrow: { color: '#4f46e5', fontSize: '0.8rem', fontWeight: 'bold' },
    emptyMsg: { textAlign: 'center', color: '#94a3b8', padding: '40px' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
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

export default CallStackDolls;
