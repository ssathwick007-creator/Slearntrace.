import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BrowserHistoryStack = () => {
    const [history, setHistory] = useState([{ id: 1, title: 'Home', icon: '🏠' }]);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');

    const pages = [
        { title: 'Google Search', icon: '🔍' },
        { title: 'YouTube', icon: '📺' },
        { title: 'Twitter', icon: '🐦' },
        { title: 'GitHub', icon: '💻' },
        { title: 'Netflix', icon: '🎬' },
        { title: 'Amazon', icon: '🛒' }
    ];

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // User navigates: push new pages
                if (history.length < 4) {
                    const newPage = {
                        id: Date.now(),
                        ...pages[history.length % pages.length]
                    };
                    setHistory(prev => [newPage, ...prev]);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Click back button -> top thumbnail pops off
                if (history.length > 2) {
                    setHistory(prev => prev.slice(1));
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Click back again
                if (history.length > 1) {
                    setHistory(prev => prev.slice(1));
                } else {
                    setAnimationStep(3);
                }
            } else if (animationStep === 3) {
                // Underflow
                setError('No more history! Underflow');
                setTimeout(() => {
                    setError(null);
                    setHistory([{ id: 1, title: 'Home', icon: '🏠' }]);
                    setAnimationStep(0);
                }, 1500);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, history.length]);

    const visitPage = () => {
        setIsAutoPlaying(false);
        const newPage = {
            id: Date.now(),
            ...pages[Math.floor(Math.random() * pages.length)]
        };
        setHistory([newPage, ...history]);
        setError(null);
    };

    const goBack = () => {
        setIsAutoPlaying(false);
        if (history.length <= 1) {
            setError('No more history! Underflow');
            setTimeout(() => setError(null), 2000);
            return;
        }
        setHistory(history.slice(1));
        setError(null);
    };

    const clearHistory = () => {
        setIsAutoPlaying(false);
        setHistory([{ id: Date.now(), title: 'Home', icon: '🏠' }]);
        setError(null);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Visit Home → Google → YouTube → Twitter → click Back twice → which page are you on?",
            a: "Google! (Home → Google → YouTube → Twitter. Back 1: YouTube. Back 2: Google)",
            options: ["Home", "Google", "YouTube", "Twitter"]
        },
        {
            id: 2,
            q: "Why does Back always take you to the most recent previous page?",
            a: "Because browser history is a Stack (LIFO). The last page visited is the first one popped when you click Back.",
            options: ["It's alphabetical", "LIFO property", "It's random", "Most visited"]
        },
        {
            id: 3,
            q: "Visit 10 pages → try Back 11 times → what happens?",
            a: "Underflow! You reach the start of the history and cannot go back further.",
            options: ["App crashes", "Overflow", "Underflow", "Goes to Google"]
        },
        {
            id: 4,
            q: "How is browser history similar to Undo (Ctrl+Z) in apps?",
            a: "Both use Stacks to store actions/pages so they can be reversed in the exact opposite order they occurred.",
            options: ["Same icon", "Both use Stacks", "No similarity", "Both use Queues"]
        },
        {
            id: 5,
            q: "If you go Back to page 3, then visit a new page → where does the old forward history go?",
            a: "It's cleared! In most browsers, visiting a new page while in 'back' history wipes the 'forward' stack.",
            options: ["Stay in memory", "Gets cleared", "Moves to bottom", "Saved to file"]
        }
    ];

    const codeSnippets = {
        python: `history = []
history.append("Home")      # push new page
history.append("Google")
current = history.pop()     # back button (pop)

# Underflow check
if not history:
    print("No more pages")`,
        cpp: `#include <stack>
std::stack<string> history;

history.push("Home");   // push
history.push("Google");
string curr = history.top();
history.pop();          // back button (pop)

if (history.empty()) {
    // Underflow: "No more pages"
}`,
        java: `import java.util.Stack;
Stack<String> history = new Stack<>();

history.push("Home");   // push
history.push("Google");
String curr = history.pop(); // back button (pop)

if (history.isEmpty()) {
    // Underflow: "No more pages"
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Browser Back Button History – Real-World LIFO</h2>
                <p style={styles.intro}>
                    Your browser's back button works like a stack: every new page you visit is pushed on top — clicking back pops the most recent one!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.windowArea}>
                    <div style={styles.thumbnailsContainer}>
                        <AnimatePresence>
                            {history.map((page, idx) => (
                                <motion.div
                                    key={page.id}
                                    layout
                                    initial={{ y: -100, opacity: 0, scale: 0.8 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        scale: idx === 0 ? 1 : 0.9,
                                        boxShadow: idx === 0 ? '0 10px 25px rgba(79, 70, 229, 0.2)' : '0 4px 6px rgba(0,0,0,0.05)'
                                    }}
                                    exit={{
                                        x: 200,
                                        opacity: 0,
                                        scale: 0.5,
                                        transition: { duration: 0.4 }
                                    }}
                                    transition={{ type: 'spring', damping: 18, stiffness: 150 }}
                                    style={{
                                        ...styles.thumbnail,
                                        zIndex: history.length - idx,
                                        marginTop: idx === 0 ? 0 : -40,
                                        border: idx === 0 ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                                        background: idx === 0 ? '#fff' : '#f8fafc'
                                    }}
                                >
                                    <div style={styles.thumbHeader}>
                                        <div style={styles.dots}>
                                            <div style={{ ...styles.dot, background: '#ff5f56' }}></div>
                                            <div style={{ ...styles.dot, background: '#ffbd2e' }}></div>
                                            <div style={{ ...styles.dot, background: '#27c93f' }}></div>
                                        </div>
                                        <div style={styles.addressBar}>{page.title.toLowerCase().replace(' ', '')}.com</div>
                                    </div>
                                    <div style={styles.thumbContent}>
                                        <span style={styles.pageIcon}>{page.icon}</span>
                                        <span style={styles.pageTitle}>{page.title}</span>
                                        {idx === 0 && <div style={styles.currentBadge}>ACTIVE</div>}
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
                            🚫 {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <button onClick={visitPage} style={styles.btnPrimary}>
                        Visit new page (Push)
                    </button>
                    <button
                        onClick={goBack}
                        style={{
                            ...styles.btnPrimary,
                            opacity: history.length <= 1 ? 0.5 : 1,
                            cursor: history.length <= 1 ? 'not-allowed' : 'pointer',
                            backgroundColor: history.length <= 1 ? '#94a3b8' : '#4f46e5'
                        }}
                        disabled={history.length <= 1}
                        title={history.length <= 1 ? "Nothing left to go back to" : ""}
                    >
                        Back (Pop)
                    </button>
                    <button onClick={clearHistory} style={styles.btnSecondary}>
                        Clear history
                    </button>
                </div>
            </div>

            <div style={styles.stackViz}>
                <h4 style={styles.vizTitle}>Real-time History Stack (LIFO)</h4>
                <div style={styles.vizTower}>
                    {history.length === 0 && <div style={styles.emptyMsg}>History is Empty</div>}
                    {history.map((p, i) => (
                        <div key={p.id} style={{ ...styles.vizNode, borderLeft: i === 0 ? '4px solid #4f46e5' : '1px solid #e2e8f0' }}>
                            <span style={styles.vizIdx}>[{history.length - 1 - i}]</span>
                            <span style={styles.vizVal}>{p.icon} {p.title}</span>
                            {i === 0 && <span style={styles.vizArrow}>← CURRENT</span>}
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
                    <h3 style={styles.codeTitle}>Minimal Matching Code</h3>
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
        minHeight: '450px'
    },
    windowArea: {
        height: '400px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        perspective: '1000px'
    },
    thumbnailsContainer: {
        width: '320px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    thumbnail: {
        width: '100%',
        height: '180px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    thumbHeader: {
        height: '30px',
        backgroundColor: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: '10px'
    },
    dots: { display: 'flex', gap: '4px' },
    dot: { width: '8px', height: '8px', borderRadius: '50%' },
    addressBar: {
        flex: 1,
        height: '18px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        fontSize: '0.6rem',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '8px'
    },
    thumbContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    pageIcon: { fontSize: '2.5rem' },
    pageTitle: { fontWeight: 'bold', color: '#1e293b' },
    currentBadge: {
        position: 'absolute',
        top: '40px',
        right: '10px',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontSize: '0.6rem',
        padding: '2px 8px',
        borderRadius: '20px',
        fontWeight: 'bold'
    },
    errorBanner: {
        position: 'absolute',
        top: '20px',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        padding: '12px 24px',
        borderRadius: '16px',
        fontWeight: 'bold',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #fca5a5',
        zIndex: 100
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' },
    btnPrimary: { minHeight: '48px', padding: '14px 28px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(51, 65, 85, 0.4)' },
    btnSecondary: { minHeight: '48px', padding: '14px 28px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' },
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
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        transition: 'all 0.2s'
    },
    vizIdx: { color: '#94a3b8', fontSize: '0.8rem', width: '40px' },
    vizVal: { fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' },
    vizArrow: { color: '#4f46e5', fontSize: '0.8rem', fontWeight: 'bold' },
    emptyMsg: { textAlign: 'center', color: '#94a3b8', padding: '40px' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' },
    quizCard: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
    questionText: { fontSize: '1rem', color: '#1e293b', marginBottom: '1.5rem', lineHeight: '1.5' },
    options: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    optBtn: { padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s' },
    answer: { marginTop: '1.5rem', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '16px', color: '#4338ca', fontSize: '0.9rem', lineHeight: '1.5', borderLeft: '4px solid #4f46e5' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '32px', padding: '2.5rem', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    codeTitle: { margin: 0, fontSize: '1.4rem', fontWeight: 'bold' },
    langSelector: { display: 'flex', gap: '10px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '10px', padding: '6px 16px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.2s' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', fontSize: '1rem', color: '#a5b4fc', overflowX: 'auto', border: '1px solid #334155' }
};

export default BrowserHistoryStack;
