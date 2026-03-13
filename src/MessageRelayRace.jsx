import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageRelayRace = () => {
    const [runners, setRunners] = useState([
        { id: 1, label: 'Head' },
        { id: 2, label: 'Node 1' },
        { id: 3, label: 'Node 2' },
        { id: 4, label: 'Node 3' },
        { id: 5, label: 'Node 4' },
        { id: 6, label: 'Node 5' },
        { id: 7, label: 'Node 6' },
        { id: 8, label: 'Tail' }
    ]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [traversing, setTraversing] = useState(false);
    const [targetPos, setTargetPos] = useState(4);
    const [showError, setShowError] = useState(false);
    const [lengthFound, setLengthFound] = useState(null);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);

    const traverseTo = async (pos) => {
        if (pos < 1 || pos > runners.length) return;
        setTraversing(true);
        setLengthFound(null);
        setActiveIdx(0);

        for (let i = 0; i < pos; i++) {
            setActiveIdx(i);
            await new Promise(r => setTimeout(r, 600));
        }
        setTraversing(false);
    };

    const findLength = async () => {
        setTraversing(true);
        setLengthFound(null);
        for (let i = 0; i < runners.length; i++) {
            setActiveIdx(i);
            await new Promise(r => setTimeout(r, 400));
        }
        setLengthFound(runners.length);
        setTraversing(false);
    };

    const tryDirectAccess = () => {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
    };

    const questions = [
        {
            id: 1,
            q: "To reach runner 4 → how many handoffs occur?",
            a: "3 handoffs (1→2, 2→3, 3→4). You must pass through every previous runner.",
            options: ["1", "3", "4", "0"]
        },
        {
            id: 2,
            q: "Why can't the message go straight to runner 9?",
            a: "Because runners only know who is immediately behind them (the 'Next' pointer).",
            options: ["Too far", "No direct link", "Lazy runners", "Windy day"]
        },
        {
            id: 3,
            q: "Find the length of a 7-runner race → how many total runners visited?",
            a: "All 7. You must traverse the entire list to count them.",
            options: ["1", "7", "0", "14"]
        },
        {
            id: 4,
            q: "Compare: accessing position 5 in array vs linked list — which is faster?",
            a: "Array is faster (O(1) via index). Linked list is slower (O(n) via traversal).",
            options: ["Array", "Linked List", "Same", "Neither"]
        },
        {
            id: 5,
            q: "If list has 100 nodes and you need the 100th → how many steps?",
            a: "99 steps/handoffs. This is a disadvantage of Linked Lists for random access.",
            options: ["1", "50", "99", "100"]
        }
    ];

    const codeSnippets = {
        python: `current = head
position = 5
count = 0
while current and count < position:
    current = current.next
    count += 1
if current:
    print(current.data)  # found!`,
        cpp: `Node* current = head;
int position = 5;
int count = 0;
while (current != nullptr && count < position) {
    current = current->next;
    count++;
}
if (current) cout << current->data;`,
        java: `Node current = head;
int position = 5;
int count = 0;
while (current != null && count < position) {
    current = current.next;
    count++;
}
if (current != null) System.out.println(current.data);`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Message Relay Race – Traversal & Why Random Access is Slow</h2>
                <p style={styles.intro}>
                    Linked lists are like a relay race: to reach the 5th runner, the baton must pass through every runner before — no shortcuts!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.track}>
                    <div style={styles.runnersList}>
                        {runners.map((runner, idx) => (
                            <React.Fragment key={runner.id}>
                                <div style={styles.runnerWrapper}>
                                    <motion.div
                                        animate={{
                                            scale: activeIdx === idx ? [1, 1.1, 1] : 1,
                                            y: activeIdx === idx ? [0, -10, 0] : 0
                                        }}
                                        transition={{ repeat: activeIdx === idx ? Infinity : 0, duration: 0.6 }}
                                        style={{
                                            ...styles.runner,
                                            backgroundColor: activeIdx === idx ? '#f59e0b' : '#fff'
                                        }}
                                    >
                                        <div style={styles.batonHolder}>
                                            {activeIdx === idx && (
                                                <motion.div
                                                    initial={{ rotate: -20 }}
                                                    animate={{ rotate: 20 }}
                                                    transition={{ repeat: Infinity, repeatType: 'reverse' }}
                                                    style={styles.baton}
                                                >
                                                    🥢
                                                </motion.div>
                                            )}
                                        </div>
                                        <div style={styles.emoji}>🏃</div>
                                        <div style={styles.label}>{runner.label}</div>
                                    </motion.div>
                                </div>
                                {idx < runners.length - 1 && (
                                    <div style={styles.path}>
                                        <div style={{
                                            ...styles.line,
                                            backgroundColor: idx < activeIdx ? '#f59e0b' : '#e2e8f0'
                                        }}></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {showError && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={styles.errorBanner}
                        >
                            🚫 Can't skip! Must traverse from head. Runner {targetPos} shrugs.
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={styles.controls}>
                    <div style={styles.inputGroup}>
                        <span style={styles.inputLabel}>Position (1-8):</span>
                        <input
                            type="number"
                            min="1"
                            max="8"
                            value={targetPos}
                            onChange={(e) => setTargetPos(parseInt(e.target.value))}
                            style={styles.input}
                        />
                    </div>
                    <button onClick={() => traverseTo(targetPos)} style={styles.btnPrimary} disabled={traversing}>
                        Traverse to {targetPos}
                    </button>
                    <button onClick={tryDirectAccess} style={styles.btnSecondary}>Direct Access to {targetPos}</button>
                    <button onClick={findLength} style={styles.btnSecondary} disabled={traversing}>Find Length</button>
                    {lengthFound && <div style={styles.lengthBanner}>Length: {lengthFound}</div>}
                    <div style={styles.complexityTag}>O(n) Access</div>
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
                    <h3 style={styles.codeTitle}>Linked List Traversal Logic</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#f59e0b' : 'transparent',
                                    color: language === lang ? 'white' : '#94a3b8'
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
    intro: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px', maxWidth: '700px', margin: '10px auto' },
    visualCard: {
        backgroundColor: '#fff',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    },
    track: {
        overflowX: 'auto',
        padding: '3rem 1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        scrollbarWidth: 'none'
    },
    runnersList: { display: 'flex', alignItems: 'center', minWidth: 'fit-content', padding: '0 2rem' },
    runnerWrapper: { position: 'relative' },
    runner: {
        width: '80px',
        height: '100px',
        borderRadius: '20px',
        border: '2px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
    },
    batonHolder: { height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    baton: { fontSize: '1.2rem' },
    emoji: { fontSize: '2rem' },
    label: { fontSize: '0.7rem', fontWeight: 'bold', color: '#64748b', marginTop: '5px' },
    path: { width: '40px', height: '4px', display: 'flex', alignItems: 'center' },
    line: { width: '100%', height: '2px', transition: 'background 0.3s ease' },
    errorBanner: {
        backgroundColor: '#fef2f2',
        color: '#b91c1c',
        padding: '1rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '1rem',
        border: '1px solid #fee2e2',
        fontWeight: 'bold'
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' },
    inputGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
    inputLabel: { fontSize: '0.9rem', fontWeight: 'bold', color: '#64748b' },
    input: { width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' },
    btnPrimary: { padding: '12px 24px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    btnSecondary: { padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    lengthBanner: { padding: '8px 16px', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '8px', fontWeight: 'bold' },
    complexityTag: { padding: '8px 16px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '100px', fontWeight: '800', fontSize: '0.8rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '1rem', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    optBtn: { padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' },
    answer: { marginTop: '1rem', padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '12px', color: '#9a3412', border: '1px solid #ffedd5' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#fbbf24', overflowX: 'auto' }
};

export default MessageRelayRace;
