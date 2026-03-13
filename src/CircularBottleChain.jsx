import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CircularBottleChain = () => {
    const [bottles, setBottles] = useState([
        { id: 1, val: 'A' },
        { id: 2, val: 'B' },
        { id: 3, val: 'C' },
        { id: 4, val: 'D' },
        { id: 5, val: 'E' },
        { id: 6, val: 'F' },
        { id: 7, val: 'G' },
        { id: 8, val: 'H' }
    ]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);

    useEffect(() => {
        let interval;
        if (isRotating) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % bottles.length);
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isRotating, bottles.length]);

    const insertBottle = () => {
        if (bottles.length >= 12) return;
        const newId = Date.now();
        const newBottles = [...bottles];
        // Insert after index 2
        newBottles.splice(3, 0, { id: newId, val: '+' });
        setBottles(newBottles);
    };

    const deleteBottle = (id) => {
        if (bottles.length <= 3) return;
        setBottles(bottles.filter(b => b.id !== id));
        setActiveIndex(0);
    };

    const questions = [
        {
            id: 1,
            q: "Start rotation → which bottle gets the message after bottle 8?",
            a: "Bottle 1! In a circular list, the last node's 'Next' pointer loops back to the head.",
            options: ["None", "Bottle 1", "Bottle 7", "The End"]
        },
        {
            id: 2,
            q: "Delete bottle 5 → does the circle break?",
            a: "No. The previous bottle (4) simply updates its 'Next' to point to bottle 6, keeping the loop closed.",
            options: ["Yes", "No", "Only if it was the head", "Maybe"]
        },
        {
            id: 3,
            q: "Insert new bottle after bottle 3 → how many arrows change?",
            a: "Two. Bottle 3's 'Next' points to the new bottle, and the new bottle's 'Next' points to what was bottle 4.",
            options: ["1", "2", "All", "0"]
        },
        {
            id: 4,
            q: "In a circular list of 10 bottles, how many steps to return to start?",
            a: "10 steps. You visit every node and eventually land back where you began.",
            options: ["1", "9", "10", "Infinite"]
        }
    ];

    const codeSnippets = {
        python: `# Make circular
last.next = head

# Insert after current
new_node = Node("New Bottle")
new_node.next = current.next
current.next = new_node`,
        cpp: `// Circular link
last->next = head;

// Insert
Node* newNode = new Node("New");
newNode->next = current->next;
current->next = newNode;`,
        java: `// Make circular
last.next = head;

// Insert
Node newNode = new Node("New");
newNode.next = current.next;
current.next = newNode;`
    };

    const getPos = (idx) => {
        const radius = 150;
        const angle = (idx / bottles.length) * 2 * Math.PI - Math.PI / 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Circular Message Bottle Chain – Looping Structures</h2>
                <p style={styles.intro}>
                    Circular linked lists are like message bottles floating in a loop — the last bottle passes back to the first!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.waterContainer}>
                    <div style={styles.pool}>
                        <AnimatePresence>
                            {bottles.map((bottle, idx) => {
                                const pos = getPos(idx);
                                const nextPos = getPos((idx + 1) % bottles.length);
                                return (
                                    <React.Fragment key={bottle.id}>
                                        <motion.div
                                            layout
                                            initial={{ scale: 0 }}
                                            animate={{ x: pos.x, y: pos.y, scale: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            whileHover={{ y: pos.y - 10 }}
                                            style={{
                                                ...styles.bottle,
                                                borderColor: activeIndex === idx ? '#3b82f6' : '#94a3b8',
                                                backgroundColor: activeIndex === idx ? '#eff6ff' : '#fff'
                                            }}
                                            onClick={() => deleteBottle(bottle.id)}
                                        >
                                            <span style={styles.emoji}>🍾</span>
                                            <span style={styles.val}>{bottle.val}</span>
                                            <div style={styles.deletePoint}>Click to pop</div>
                                        </motion.div>
                                        <svg style={styles.svg}>
                                            <motion.line
                                                x1={pos.x + 200} y1={pos.y + 180}
                                                x2={nextPos.x + 200} y2={nextPos.y + 180}
                                                stroke={idx === bottles.length - 1 ? '#ef4444' : '#94a3b8'}
                                                strokeWidth="2"
                                                strokeDasharray={idx === bottles.length - 1 ? "5 3" : "0"}
                                            />
                                        </svg>
                                    </React.Fragment>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={() => setIsRotating(!isRotating)} style={styles.btnPrimary}>
                        {isRotating ? 'Stop Rotation' : 'Start Rotation'}
                    </button>
                    <button onClick={insertBottle} style={styles.btnSecondary}>Insert Bottle</button>
                    <div style={styles.complexityTag}>{isRotating ? 'Round-Robin In Progress' : 'Circular Loop Closed'}</div>
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
                    <h3 style={styles.codeTitle}>Circular List Logic</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#3b82f6' : 'transparent',
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
        backgroundColor: '#f0f9ff',
        borderRadius: '32px',
        padding: '2rem',
        border: '1px solid #bae6fd',
        marginBottom: '3rem',
        minHeight: '550px'
    },
    waterContainer: {
        width: '100%',
        height: '360px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    pool: { position: 'relative', width: '100%', height: '100%' },
    bottle: {
        position: 'absolute',
        top: '140px',
        left: '160px',
        width: '70px',
        height: '90px',
        borderRadius: '16px',
        border: '3px solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        zIndex: 5
    },
    emoji: { fontSize: '2rem' },
    val: { fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' },
    deletePoint: { fontSize: '0.5rem', color: '#94a3b8', position: 'absolute', bottom: '-15px' },
    svg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', marginTop: '2rem' },
    btnPrimary: { padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    btnSecondary: { padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    complexityTag: { padding: '8px 16px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '100px', fontWeight: '800', fontSize: '0.8rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#f0f9ff', borderRadius: '12px', color: '#0369a1', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#60a5fa', overflowX: 'auto' }
};

export default CircularBottleChain;
